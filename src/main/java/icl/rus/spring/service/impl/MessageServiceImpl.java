package icl.rus.spring.service.impl;

import icl.rus.spring.model.Message;
import icl.rus.spring.repository.MessageRepository;
import icl.rus.spring.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageService {
    @Autowired
    MessageRepository repository;

    public List<Message> getMessages() {
        return repository.findAll();
    }

    public boolean addMessage(Message message) {
        repository.save(message);

        return true;
    }
}
