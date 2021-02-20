package icl.rus.spring.model.dto.base;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import icl.rus.spring.model.base.BaseEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class BaseDTO<T extends BaseEntity> implements Serializable {
    private UUID id;

    public BaseDTO(T entity) {
        if (entity == null) return;

        loadProperties(entity);
    }

    public void loadProperties(T pEntity) {
        this.id = pEntity.getId();
    }
}
