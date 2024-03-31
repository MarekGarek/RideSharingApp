package com.RideSharingApp.services.impl;

import com.RideSharingApp.domain.dto.ChattersProjection;
import com.RideSharingApp.domain.entities.MessageEntity;
import com.RideSharingApp.repositories.MessageRepository;
import com.RideSharingApp.repositories.RoomRepository;
import com.RideSharingApp.services.ChatService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {
    private MessageRepository messageRepository;
    private RoomRepository roomRepository;

    public ChatServiceImpl(MessageRepository messageRepository, RoomRepository roomRepository) {
        this.messageRepository = messageRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public List<ChattersProjection> findChatters(String user) {
        return messageRepository.findChattersOfUser(user);
    }

    @Override
    public List<MessageEntity> findMessagesOfRoom(int room) {
        return messageRepository.findMessagesOfRoom(room);
    }
}
