package com.RideSharingApp.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "messages")
public class MessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_message")
    private int idMessage;

    @ManyToOne
    @JoinColumn(name = "user", referencedColumnName = "login", nullable = false)
    private UserEntity user;

    @ManyToOne
    @JoinColumn(name = "room", referencedColumnName = "id_room", nullable = false)
    private RoomEntity room;

    @Column(nullable = false, length = 500)
    private String message;

    @Column(nullable = false)
    private Date date;
}