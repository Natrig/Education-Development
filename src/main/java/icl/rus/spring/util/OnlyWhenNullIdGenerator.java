package icl.rus.spring.util;

import icl.rus.spring.model.entity.base.BaseEntity;
import org.hibernate.HibernateException;
import org.hibernate.engine.spi.SharedSessionContractImplementor;
import org.hibernate.id.UUIDGenerator;

import java.io.Serializable;

public class OnlyWhenNullIdGenerator extends UUIDGenerator {

    @Override
    public Serializable generate(SharedSessionContractImplementor session, Object object) throws HibernateException {
        if (object instanceof BaseEntity) {
            BaseEntity entity = (BaseEntity) object;

            if (entity.getId() != null) {
                return entity.getId();
            }
        }

        return super.generate(session, object);
    }
}
