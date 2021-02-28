package icl.rus.spring.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import icl.rus.spring.model.dto.MessageDTO;
import icl.rus.spring.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class ChatWebSocketHandler extends TextWebSocketHandler {
    private final List<WebSocketSession> webSocketSessions = new ArrayList<>();

    @Autowired
    private MessageService messageService;

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        webSocketSessions.add(session);

        for (MessageDTO message : messageService.getMessages()) {
            session.sendMessage(new TextMessage(new ObjectMapper().writeValueAsString(message)));
        }
    }

    @Override
    protected void handleTextMessage(WebSocketSession session, TextMessage message) {
        webSocketSessions.forEach(clientSession -> {
            try {
                clientSession.sendMessage(message);
            } catch (IOException e) {
                System.out.println("Cannot send message to session: " + session.getId());
                e.printStackTrace();
            }
        });
    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status) {
        webSocketSessions.remove(session);
    }
}
