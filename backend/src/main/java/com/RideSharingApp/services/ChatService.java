package com.RideSharingApp.services;

import com.RideSharingApp.domain.dto.ChattersProjection;
import com.RideSharingApp.domain.entities.*;

import java.util.List;

public interface ChatService {
    List<ChattersProjection> findChatters(String user);

    List<MessageEntity> findMessagesOfRoom(int room);

    RoomEntity saveRoom(TripEntity savedTripEntity);

    MessageEntity saveMessage(RoomEntity room, UserEntity user);

    void addUserToRoom(PassengerListEntity savedPassEntity);

    void logOutPassanger(int id, String passenger);

    void deleteTripChat(int id);

    Integer findRoom(String login, String user);

    MessageEntity saveMessageEntity(MessageEntity messageEntity);
}
