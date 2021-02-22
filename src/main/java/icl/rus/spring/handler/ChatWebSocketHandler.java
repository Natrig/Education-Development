package icl.rus.spring.handler;

import com.fasterxml.jackson.databind.ObjectMapper;
import icl.rus.spring.model.dto.MessageDTO;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

public class ChatWebSocketHandler extends TextWebSocketHandler {

    private final List<WebSocketSession> webSocketSessions = new ArrayList<>();

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        webSocketSessions.add(session);

        MessageDTO messageDto = new MessageDTO();
        messageDto.setId(UUID.randomUUID());
        messageDto.setMessage("test");
        messageDto.setCreateDate(LocalDateTime.now().toString());

        session.sendMessage(new TextMessage(new ObjectMapper().writeValueAsString(messageDto)));
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
