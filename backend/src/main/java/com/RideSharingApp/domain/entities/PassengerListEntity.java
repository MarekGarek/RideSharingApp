package com.RideSharingApp.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
@IdClass(PassengerListId.class)
@Table(name = "passengerslists")
public class PassengerListEntity {
    @Id
    @ManyToOne
    @JoinColumn(name = "passenger", referencedColumnName = "login", nullable = false)
    private UserEntity passenger;

    @Id
    @ManyToOne
    @JoinColumn(name = "trip", referencedColumnName = "id_trip", nullable = false)
    private TripEntity trip;

    @Column(nullable = false)
    private byte seats;

    @Column(name = "trunk_space", nullable = false)
    private short trunkSpace;

    @Column(nullable = false)
    private String payment;
}