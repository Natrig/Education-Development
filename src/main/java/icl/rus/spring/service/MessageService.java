package icl.rus.spring.service;

import icl.rus.spring.model.dto.MessageDTO;

import java.util.List;

public interface MessageService {
    public List<MessageDTO> getMessages();

    public MessageDTO addMessage(MessageDTO message);
}
