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
public class CardFolderId implements Serializable {
    protected CardFolderId() {
    }

    @Id
    private UUID userId;
    @Id
    private UUID folderId;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        CardFolderId that = (CardFolderId) o;

        return new EqualsBuilder().append(userId, that.userId).append(folderId, that.folderId).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(userId).append(folderId).toHashCode();
    }
}
