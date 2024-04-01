package com.RideSharingApp.repositories;

import com.RideSharingApp.domain.dto.ChattersProjection;
import com.RideSharingApp.domain.entities.MessageEntity;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MessageRepository extends CrudRepository<MessageEntity, Integer> {

    @Query(value = "SELECT m.room, COALESCE(MIN(CASE WHEN m.user <> :user THEN m.user END), null) AS user, r.name, r.trip " +
            "FROM messages m " +
            "JOIN rooms r ON m.room = r.id_room " +
            "WHERE m.room IN (SELECT room FROM messages WHERE user = :user) " +
            "GROUP BY m.room, r.name, r.trip",nativeQuery = true)
    List<ChattersProjection> findChattersOfUser(@Param("user") String user);

    @Query(value= "SELECT * FROM messages WHERE room=:room", nativeQuery = true)
    List<MessageEntity> findMessagesOfRoom(@Param("room") int room);

    @Modifying
    @Transactional
    @Query(value= "update messages set user='Odhlásený' where room=:idRoom and user=:passenger", nativeQuery = true)
    void updateLogOutUser(@Param("idRoom")int idRoom,@Param("passenger") String passenger);

    @Modifying
    @Transactional
    @Query(value= "DELETE FROM messages WHERE room=:idRoom", nativeQuery = true)
    void deleteByRoom(@Param("idRoom")int idRoom);
}
