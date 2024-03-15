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
@Table(name = "reviews")
public class ReviewEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_review")
    private int idReview;

    @ManyToOne
    @JoinColumn(name = "author", referencedColumnName = "login", nullable = false)
    private UserEntity author;

    @ManyToOne
    @JoinColumn(name = "reviewer", referencedColumnName = "login", nullable = false)
    private UserEntity reviewer;

    @Column(nullable = false, length = 500)
    private String text;

    @Column(nullable = false)
    private String date;

    @Column(nullable = false)
    private short stars;

    @Column(nullable = false, length = 45)
    private String title;

    @Column(nullable = false)
    private boolean recommendation;
}
