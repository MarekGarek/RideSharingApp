package com.RideSharingApp.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Table(name = "rooms")
public class RoomEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_room")
    private int idRoom;

    @Column(nullable = true, length = 45)
    private String name;

    @ManyToOne
    @JoinColumn(name = "trip", referencedColumnName = "id_trip", nullable = true)
    private TripEntity trip;
}
