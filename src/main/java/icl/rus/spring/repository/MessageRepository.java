package icl.rus.spring.repository;

import icl.rus.spring.model.Message;
import org.springframework.context.annotation.Lazy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Lazy
@Repository
public interface MessageRepository extends JpaRepository<Message, UUID> {
}
