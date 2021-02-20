package icl.rus.spring.model.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import icl.rus.spring.model.Message;
import icl.rus.spring.model.dto.base.BaseDTO;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class MessageDTO extends BaseDTO<Message> {
    @ApiModelProperty("Сообщение")
    private String message;
    @ApiModelProperty("Дата сообщения")
    private LocalDateTime createDate;
}
