package icl.rus.spring.unit;

import icl.rus.spring.service.MessageService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotEquals;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MessageServiceTest {
    @Autowired
    private MessageService service;

    @Test
    public void getMessagesTest() {
        assertNotEquals(null, service.getMessages());

    }
}
