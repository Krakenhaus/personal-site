package spring.pokemon.client.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TCGToken {
    @JsonProperty("access_token")
    private String accessToken;
    @JsonProperty(".issued")
    private Date issued;
    @JsonProperty(".expires")
    private Date expires;
}
