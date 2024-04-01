package com.RideSharingApp.controllers;

import com.RideSharingApp.domain.dto.ChattersProjection;
import com.RideSharingApp.domain.dto.MessageDto;
import com.RideSharingApp.domain.dto.ReviewDto;
import com.RideSharingApp.domain.entities.MessageEntity;
import com.RideSharingApp.domain.entities.ReviewEntity;
import com.RideSharingApp.mappers.impl.MessageMapper;
import com.RideSharingApp.services.ChatService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class ChatController {
    private ChatService chatService;
    private MessageMapper messageMapper;

    public ChatController(ChatService chatService, MessageMapper messageMapper) {
        this.chatService = chatService;
        this.messageMapper = messageMapper;
    }

    @GetMapping(path = "/chatters")
    public List<ChattersProjection> getChatters(@RequestParam(name = "user") String user) {
        return chatService.findChatters(user);
    }

    @GetMapping(path = "/messages")
    public List<MessageDto> getMessages(@RequestParam(name = "room") int room) {
        List<MessageEntity> messageEntities = chatService.findMessagesOfRoom(room);
        return messageEntities.stream().map(messageMapper::mapTo).collect(Collectors.toList());
    }

    @GetMapping(path = "/room")
    public Integer getRoom(@RequestParam(name = "login") String login,@RequestParam(name = "user") String user) {
        return chatService.findRoom(login, user);
    }

    @PostMapping(path = "/messages")
    public ResponseEntity<MessageDto> createMessage(@RequestBody MessageDto messageDto) {
        MessageEntity messageEntity = messageMapper.mapFrom(messageDto);
        MessageEntity savedMessageEntity = chatService.saveMessageEntity(messageEntity);
        return new ResponseEntity<>(messageMapper.mapTo(savedMessageEntity), HttpStatus.CREATED);
    }
}
