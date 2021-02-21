package icl.rus.spring.unit;

import icl.rus.spring.model.Message;
import icl.rus.spring.repository.MessageRepository;
import icl.rus.spring.service.MessageService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.*;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MessageServiceTest {
    @Autowired
    private MessageService service;

    // This is mockRepository that is help us to mock DB actions
    // And do not create real DB entities
    @MockBean
    private MessageRepository mockRepository;

    @Test
    public void getMessagesTest() {
        assertNotEquals(null, service.getMessages());
    }

    @Test
    public void addMessageTest() {
        Message message = new Message();

        message.setMessage("hello test");

        boolean isMessageCreated = service.addMessage(message);

        assertTrue(isMessageCreated);
        Mockito.verify(mockRepository, Mockito.times(1)).save(message);
    }
}
