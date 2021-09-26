package spring.pokemon.data.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
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

//    @OneToMany(
//            mappedBy = "userMetadata",
//            cascade = CascadeType.ALL,
//            orphanRemoval = true
//    )
//    @JsonBackReference()
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private List<CardCollection> cardCollection;

//    @OneToMany(
//            mappedBy = "userMetadata",
//            cascade = CascadeType.ALL,
//            orphanRemoval = true
//    )
//    @JsonBackReference()
//    @OnDelete(action = OnDeleteAction.CASCADE)
//    private List<CardFolder> cardFolders;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        UserMetadata that = (UserMetadata) o;

        return new EqualsBuilder().append(userId, that.userId).append(nickname, that.nickname).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(userId).append(nickname).toHashCode();
    }
}
