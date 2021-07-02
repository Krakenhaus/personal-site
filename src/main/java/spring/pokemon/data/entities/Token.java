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
import java.util.Date;

@Getter
@Setter
@Builder
@Entity(name = "Token")
@Table(name = "token")
@AllArgsConstructor
public class Token {
    protected Token() {}

    @Id
    private String accessToken;
    private Date issued;
    private Date expires;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        Token token = (Token) o;

        return new EqualsBuilder().append(accessToken, token.accessToken).append(issued, token.issued).append(expires, token.expires).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(accessToken).append(issued).append(expires).toHashCode();
    }
}
