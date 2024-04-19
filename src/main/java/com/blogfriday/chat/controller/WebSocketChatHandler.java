package com.blogfriday.chat.controller;

import java.io.IOException;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import com.blogfriday.chat.dto.ChatMessageDto;
import com.blogfriday.chat.dto.MessageDto;
import com.blogfriday.chat.service.MessageStoreService;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@RequiredArgsConstructor
public class WebSocketChatHandler extends TextWebSocketHandler {
    private final ObjectMapper mapper;
    private final ConcurrentHashMap<String, WebSocketSession> userIdToSession = new ConcurrentHashMap<>();
    
    @Autowired
    private MessageStoreService messageStoreService;
    
    private String getUserId(WebSocketSession session) {
        // 세션에서 사용자 ID를 추출하되, null 값이 반환될 경우 적절히 처리
        Object userId = session.getAttributes().get("userId");
        if (userId == null) {
            log.error("User ID is null for session ID: {}", session.getId());
            return null; // null 반환하거나, 기본값 설정 가능
        }
        return userId.toString();
    }
    
    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws Exception {
        String userId = extractUserId(session);
        if (userId == null || userId.isEmpty()) {
            log.error("User ID is missing or empty for session ID: {}", session.getId());
            session.close(CloseStatus.BAD_DATA); // 적절한 종료 상태 코드로 세션 종료
            return;
        }

        session.getAttributes().put("userId", userId); // 세션 속성에 userId 저장
        userIdToSession.put(userId, session); // 사용자 ID와 세션 매핑
        log.info("user ID 들어옴: {} with session ID: {}", userId, session.getId());

        resendStoredMessages(userId, session);
    }
    
    private void resendStoredMessages(String userId, WebSocketSession session) {
        List<MessageDto> messages = messageStoreService.findMessagesByRecipientIdProcess(userId);
        if (messages != null) {
            for (MessageDto message : messages) {
                try {
                    // JSON 형식으로 메시지 변환 후 전송
                    String messageJson = mapper.writeValueAsString(message);
                    session.sendMessage(new TextMessage(messageJson));
                    log.info("Sent stored message to {}: {}", userId, message.getMessage());
                } catch (IOException e) {
                    log.error("Failed to send stored message: ", e);
                }
            }
        }
    }
    

    private String extractUserId(WebSocketSession session) {
        UriComponents uriComponents = UriComponentsBuilder.fromUriString(session.getUri().toString()).build();
        return uriComponents.getQueryParams().getFirst("userId");
    }


    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        log.info("{} 연결 끊김", session.getId());
        // 세션 제거 로직 추가, 예: 사용자 ID와 세션 매핑 해제
    }
    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
        String payload = message.getPayload();
        log.info("payload {}", payload);
//        ChatMessageDto chatMessageDto = mapper.readValue(payload, ChatMessageDto.class);
//        log.info("진짜 궁금함1",chatMessageDto);
        
        JSONObject json = new JSONObject(payload);
        ChatMessageDto chatMessageDto = new ChatMessageDto();
        chatMessageDto.setSender_id(json.getString("sender_id"));
        chatMessageDto.setMessage(json.getString("message"));
        chatMessageDto.setRecipient_id(json.getString("recipient_id"));
        log.info("진짜 궁금함1 {}",chatMessageDto);
        
        
        // 데이터베이스에 메시지 저장
        MessageDto dbMessage = new MessageDto();
        dbMessage.setSender_id(chatMessageDto.getSender_id());
        dbMessage.setRecipient_id(chatMessageDto.getRecipient_id());
        dbMessage.setMessage(chatMessageDto.getMessage());
        //dbMessage.setTimestamp(new Date());  // 현재 시간 설정
        log.info("진짜 궁금함2 {}",dbMessage);
        messageStoreService.saveMessage(dbMessage);
        
        
        
        handleTalk(chatMessageDto);  // 대화 처리 로직
    }

    private void handleTalk(ChatMessageDto chatMessageDto) {
        String recipientId = chatMessageDto.getRecipient_id();
        WebSocketSession recipientSession = userIdToSession.get(recipientId);
        if (recipientSession != null && recipientSession.isOpen()) {
            sendMessage(recipientSession, chatMessageDto);
            log.info("Message from {} to {} sent.", chatMessageDto.getSender_id(), recipientId);
        } else {
            log.warn("No active session for user {}", recipientId);
        }
    }

    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            session.sendMessage(new TextMessage(mapper.writeValueAsString(message)));
        } catch (IOException e) {
            log.error("Failed to send message: ", e);
        }
    }
}
