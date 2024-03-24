package com.RideSharingApp.domain.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
@Data
@Table(name = "trips")
public class TripEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_trip")
    private int idTrip;

    @ManyToOne
    @JoinColumn(name = "driver", referencedColumnName = "login", nullable = false)
    private UserEntity driver;

    @ManyToOne
    @JoinColumn(name = "car", referencedColumnName = "id_car", nullable = false)
    private CarEntity car;

    @Column(nullable = false)
    private Date date;

    @Column(name ="src_town", nullable = false)
    private String srcTown;

    @Column(name = "dst_town", nullable = false)
    private String dstTown;

    @Column(name ="src_time", nullable = false)
    private LocalTime srcTime;

    @Column(name = "dst_time", nullable = false)
    private LocalTime dstTime;

    @Column(nullable = false)
    private byte seats;

    @Column(name = "trunk_space", nullable = false)
    private short trunkSpace;

    @Column(nullable = false)
    private float price;

    @Column(nullable = true)
    private String info;
}