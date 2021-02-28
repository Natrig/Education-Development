package icl.rus.spring.model.entity.base;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.proxy.HibernateProxy;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;
import java.util.UUID;

@Getter
@Setter
@NoArgsConstructor
@MappedSuperclass
public abstract class BaseEntity {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "icl.rus.spring.util.OnlyWhenNullIdGenerator"
    )
    @Column(updatable = false, nullable = false)
    private UUID id;

    @Column(name = "create_date", nullable = false)
    private LocalDateTime createDate;

    @Column(name = "change_date", nullable = false)
    private LocalDateTime changeDate;

    @PrePersist
    protected void onCreate() {
        createDate = LocalDateTime.now();
        changeDate = createDate;
    }

    @PreUpdate
    protected void onUpdate() {
        changeDate = LocalDateTime.now();
    }

    @Override
    public int hashCode() {
        return getId() == null ? super.hashCode() : Objects.hash(getId());
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null) return false;
        if (o instanceof HibernateProxy) {
            if (getClass() != Hibernate.getClass(o)) return false;
            BaseEntity that = ((BaseEntity) (((HibernateProxy) o).getHibernateLazyInitializer().getImplementation()));
            return Objects.equals(getId(), that.getId());
        } else {
            if (getClass() != o.getClass()) return false;
            BaseEntity that = (BaseEntity) o;
            return Objects.equals(getId(), that.getId());
        }
    }

    @Override
    public String toString() {
        final StringBuilder sb = new StringBuilder(getClass().getSimpleName());
        sb.append('{');
        sb.append("id=").append(getId());
        sb.append('}');
        return sb.toString();
    }
}
