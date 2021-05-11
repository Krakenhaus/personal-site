package spring.pokemon.client.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TCGSkuPricingResponse {
    private Boolean success;
    private List<String> errors;
    private List<TCGSkuPrice> results;

    @Getter
    @Setter
    @NoArgsConstructor
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static class SearchResponse {
        private Integer totalItems;
        private Boolean success;
        private List<String> errors;
        private Set<Integer> results;
    }
}
