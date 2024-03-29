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
@Table(name = "cars")
public class CarEntity {
    @Id
    @Column(name = "id_car",nullable = false, columnDefinition = "CHAR(7)")
    private String idCar;

    @ManyToOne
    @JoinColumn(name = "owner", referencedColumnName = "login", nullable = false)
    private UserEntity owner;

    @Column(nullable = false, length = 45)
    private String model;

    @Column(nullable = false)
    private Date stk;

    @Column(nullable = false)
    private byte seats;

    @Column(name ="model_year", nullable = false)
    private short modelYear;

    @Column(name = "trunk_space", nullable = false)
    private short trunkSpace;

    @Column(nullable = true, length = 1000)
    private String img;
}
