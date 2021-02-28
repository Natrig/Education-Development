package icl.rus.spring.model.entity;

import icl.rus.spring.model.entity.base.BaseEntity;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Table;

@Getter
@Setter
@Entity
@Table(name = "messages")
public class Message extends BaseEntity {
    @Column
    private String message;
}
