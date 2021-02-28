package icl.rus.spring.service;

import icl.rus.spring.converter.MessageConverter;
import icl.rus.spring.model.dto.MessageDTO;
import icl.rus.spring.repository.MessageRepository;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertNotEquals;
import static org.junit.Assert.assertTrue;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MessageServiceTest {
    @Autowired
    private MessageService service;

    @Autowired
    private MessageConverter messageConverter;

    @MockBean
    private MessageRepository mockRepository;

    @Test
    public void getMessagesTest() {
        assertNotEquals(null, service.getMessages());
    }

    @Test
    public void addMessageTest() {
        MessageDTO message = new MessageDTO();

        message.setMessage("hello test");

        boolean isMessageCreated = service.addMessage(message);

        assertTrue(isMessageCreated);
        Mockito.verify(mockRepository, Mockito.times(1)).save(messageConverter.toEntity(message));
    }
}
