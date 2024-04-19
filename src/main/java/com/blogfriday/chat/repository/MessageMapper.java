package com.blogfriday.chat.repository;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;


import com.blogfriday.chat.dto.MessageDto;


@Mapper
public interface MessageMapper {
	public void insertMessage(MessageDto message);
	public List<MessageDto> findMessagesByRecipientId(String recipientId);
	public void deleteMessageById(Long id);
}