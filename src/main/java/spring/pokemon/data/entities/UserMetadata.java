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

import javax.persistence.*;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@Entity(name = "UserMetadata")
@Table(name = "user_metadata")
@AllArgsConstructor
public class UserMetadata {
    protected UserMetadata() {
    }

    @Id
    private UUID userId;
    private String nickname;

    @OneToMany(
            mappedBy = "userMetadata",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonBackReference()
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<CardCollection> cardCollection;

    @OneToMany(
            mappedBy = "userMetadata",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonBackReference()
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<CardFolder> cardFolders;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        UserMetadata that = (UserMetadata) o;

        return new EqualsBuilder().append(userId, that.userId).append(nickname, that.nickname).append(cardCollection, that.cardCollection).append(cardFolders, that.cardFolders).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(userId).append(nickname).append(cardCollection).append(cardFolders).toHashCode();
    }
}
