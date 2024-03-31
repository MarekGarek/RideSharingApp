package com.RideSharingApp.repositories;

import com.RideSharingApp.domain.dto.ChattersProjection;
import com.RideSharingApp.domain.entities.MessageEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends CrudRepository<MessageEntity, Integer> {

    @Query(value = "SELECT subquery.room, MIN(subquery.user) AS user, subquery.name, subquery.trip " +
            "FROM (SELECT DISTINCT m.room, m.user, r.name, r.trip " +
            "FROM messages m " +
            "JOIN rooms r ON m.room = r.id_room " +
            "WHERE m.room IN (SELECT DISTINCT room FROM messages WHERE user = :user) " +
            "AND m.user <> :user) AS subquery " +
            "GROUP BY subquery.room, subquery.name, subquery.trip", nativeQuery = true)
    List<ChattersProjection> findChattersOfUser(@Param("user") String user);

    @Query(value= "SELECT * FROM messages WHERE room=:room", nativeQuery = true)
    List<MessageEntity> findMessagesOfRoom(@Param("room") int room);
}
