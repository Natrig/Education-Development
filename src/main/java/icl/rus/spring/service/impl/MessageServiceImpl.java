package icl.rus.spring.service.impl;

import icl.rus.spring.converter.MessageConverter;
import icl.rus.spring.model.dto.MessageDTO;
import icl.rus.spring.repository.MessageRepository;
import icl.rus.spring.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    MessageRepository repository;
    @Autowired
    MessageConverter messageConverter;

    public List<MessageDTO> getMessages() {
        return repository
                .findAll().stream()
                .map(msg -> messageConverter.fromEntity(msg))
                .collect(Collectors.toList());
    }

    public boolean addMessage(MessageDTO message) {
        repository.save(messageConverter.toEntity(message));

        return true;
    }
}
