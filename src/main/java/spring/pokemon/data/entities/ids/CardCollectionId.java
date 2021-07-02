package spring.pokemon.data.entities.ids;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.Id;
import java.io.Serializable;
import java.util.UUID;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class CardCollectionId implements Serializable {
    protected CardCollectionId() {
    }

    @Id
    private UUID userId;
    @Id
    private Integer productId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        CardCollectionId that = (CardCollectionId) o;

        return new EqualsBuilder().append(userId, that.userId).append(productId, that.productId).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(userId).append(productId).toHashCode();
    }
}
