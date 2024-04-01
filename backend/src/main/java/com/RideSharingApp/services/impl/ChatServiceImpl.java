package com.RideSharingApp.services.impl;

import com.RideSharingApp.domain.dto.ChattersProjection;
import com.RideSharingApp.domain.entities.*;
import com.RideSharingApp.repositories.MessageRepository;
import com.RideSharingApp.repositories.RoomRepository;
import com.RideSharingApp.repositories.UserRepository;
import com.RideSharingApp.services.ChatService;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Service
public class ChatServiceImpl implements ChatService {
    private MessageRepository messageRepository;
    private RoomRepository roomRepository;
    private UserRepository userRepository;

    public ChatServiceImpl(MessageRepository messageRepository, RoomRepository roomRepository, UserRepository userRepository) {
        this.messageRepository = messageRepository;
        this.roomRepository = roomRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<ChattersProjection> findChatters(String user) {
        return messageRepository.findChattersOfUser(user);
    }

    @Override
    public List<MessageEntity> findMessagesOfRoom(int room) {
        return messageRepository.findMessagesOfRoom(room);
    }

    @Override
    public RoomEntity saveRoom(TripEntity savedTripEntity) {
        String name = savedTripEntity.getSrcTown() + " -> " + savedTripEntity.getDstTown();
        RoomEntity roomEntity = RoomEntity.builder()
                .name(name)
                .trip(savedTripEntity)
                .build();
        return roomRepository.save(roomEntity);
    }

    @Override
    public MessageEntity saveMessage(RoomEntity room, UserEntity user) {
        Date date = new Date();
        MessageEntity message = createMessageEntity(room,user);
        return messageRepository.save(message);
    }

    @Override
    public void addUserToRoom(PassengerListEntity savedPassEntity) {
        RoomEntity room = roomRepository.findByTrip(savedPassEntity.getTrip().getIdTrip());
        MessageEntity message = createMessageEntity(room,savedPassEntity.getPassenger());
        messageRepository.save(message);
    }

    @Override
    public void logOutPassanger(int id, String passenger) {
        RoomEntity room = roomRepository.findByTrip(id);
        messageRepository.updateLogOutUser(room.getIdRoom(),passenger);
    }

    @Override
    public void deleteTripChat(int id) {
        RoomEntity room = roomRepository.findByTrip(id);
        messageRepository.deleteByRoom(room.getIdRoom());
        roomRepository.delete(room);
    }

    @Override
    public Integer findRoom(String login, String user) {
        if (roomRepository.findRoom(login, user) == null) {
            RoomEntity room = RoomEntity.builder().build();
            RoomEntity savedRoom = roomRepository.save(room);

            UserEntity chatter1 = userRepository.findById(login).get();
            UserEntity chatter2 = userRepository.findById(user).get();
            messageRepository.save(this.createMessageEntity(savedRoom,chatter1));
            messageRepository.save(this.createMessageEntity(savedRoom,chatter2));
        }
        return roomRepository.findRoom(login, user);
    }

    @Override
    public MessageEntity saveMessageEntity(MessageEntity messageEntity) {
        return messageRepository.save(messageEntity);
    }

    private MessageEntity createMessageEntity(RoomEntity savedRoom, UserEntity user) {
        Date date = new Date();
        return MessageEntity.builder()
                .room(savedRoom)
                .user(user)
                .message("Ahoj.")
                .date(date)
                .build();
    }
}
