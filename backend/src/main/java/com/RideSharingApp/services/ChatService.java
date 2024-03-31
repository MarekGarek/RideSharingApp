package com.RideSharingApp.services;

import com.RideSharingApp.domain.dto.ChattersProjection;
import com.RideSharingApp.domain.entities.MessageEntity;

import java.util.List;

public interface ChatService {
    List<ChattersProjection> findChatters(String user);

    List<MessageEntity> findMessagesOfRoom(int room);
}
