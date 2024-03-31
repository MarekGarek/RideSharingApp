package com.RideSharingApp.mappers.impl;

import com.RideSharingApp.domain.dto.MessageDto;
import com.RideSharingApp.domain.entities.*;
import com.RideSharingApp.mappers.Mapper;
import com.RideSharingApp.repositories.RoomRepository;
import com.RideSharingApp.repositories.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Component;

@Component
public class MessageMapper implements Mapper<MessageEntity, MessageDto> {
    private ModelMapper modelMapper;
    private UserRepository userRepository;
    private RoomRepository roomRepository;

    public MessageMapper(ModelMapper modelMapper, UserRepository userRepository, RoomRepository roomRepository) {
        this.modelMapper = modelMapper;
        this.userRepository = userRepository;
        this.roomRepository = roomRepository;
    }

    @Override
    public MessageDto mapTo(MessageEntity messageEntity) {
        MessageDto messageDto = modelMapper.map(messageEntity, MessageDto.class);
        if (messageEntity.getUser() != null) {
            messageDto.setUser(messageEntity.getUser().getLogin());
        }

        if (messageEntity.getRoom() != null) {
            messageDto.setRoom(messageEntity.getRoom().getIdRoom());
        }

        return messageDto;
    }

    @Override
    public MessageEntity mapFrom(MessageDto messageDto) {
        MessageEntity messageEntity = modelMapper.map(messageDto, MessageEntity.class);
        UserEntity user = userRepository.findById(messageDto.getUser()).orElse(null);
        RoomEntity room = roomRepository.findById(messageDto.getRoom()).orElse(null);

        messageEntity.setUser(user);
        messageEntity.setRoom(room);

        return messageEntity;
    }
}
