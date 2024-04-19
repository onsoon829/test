package com.blogfriday.chat.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.blogfriday.chat.dto.MessageDto;
import com.blogfriday.chat.repository.MessageMapper;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class MessageStoreServiceimp implements MessageStoreService {

	@Autowired
	private MessageMapper messageMapper;
	
	@Override
	public void saveMessage(MessageDto message) {
		log.info("서비스 측에서 제대로 오는지{}",message);
		messageMapper.insertMessage(message);
		
	}

	@Override
	public List<MessageDto> findMessagesByRecipientIdProcess(String recipientId) {
		return messageMapper.findMessagesByRecipientId(recipientId);
	}

	@Override
	public void clearMessages(String userId) {
		// TODO Auto-generated method stub
		
	}

}
