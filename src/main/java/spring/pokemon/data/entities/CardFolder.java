package spring.pokemon.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;
import spring.pokemon.data.entities.ids.CardCollectionId;
import spring.pokemon.data.entities.ids.CardFolderId;

import javax.persistence.*;
import java.io.Serializable;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@Entity(name = "CardFolder")
@Table(name = "card_folder")
@IdClass(CardFolderId.class)
@AllArgsConstructor
public class CardFolder implements Serializable {
    protected CardFolder() {
    }

    @Id
    private UUID userId;
    @Id
    private UUID folderId;
    private String folderName;
    private String color;
    private Integer displayOrder;

    @ManyToMany(
            mappedBy = "cardFolders",
            cascade = CascadeType.ALL
    )
    @JsonBackReference()
    private List<CardCollection> cardCollection;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userId", insertable = false, updatable = false)
    @JsonIgnore
    private UserMetadata userMetadata;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        CardFolder that = (CardFolder) o;

        return new EqualsBuilder().append(userId, that.userId).append(folderId, that.folderId).append(folderName, that.folderName).append(color, that.color).append(displayOrder, that.displayOrder).append(cardCollection, that.cardCollection).append(userMetadata, that.userMetadata).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(userId).append(folderId).append(folderName).append(color).append(displayOrder).append(cardCollection).append(userMetadata).toHashCode();
    }
}
