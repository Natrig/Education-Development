package icl.rus.spring.converter;

import icl.rus.spring.model.dto.MessageDTO;
import icl.rus.spring.model.entity.Message;
import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

@Lazy
@Component
public class MessageConverter {
    public Message toEntity(MessageDTO dto) {
        Message employee = new Message();

        if (dto.getId() != null) {
            employee.setId(dto.getId());
        }

        employee.setMessage(dto.getMessage());

        return employee;
    }

    public MessageDTO fromEntity(Message message) {
        MessageDTO messageDTO = new MessageDTO();

        messageDTO.setId(message.getId());
        messageDTO.setMessage(message.getMessage());
        messageDTO.setCreateDate(message.getCreateDate());

        return messageDTO;
    }
}
