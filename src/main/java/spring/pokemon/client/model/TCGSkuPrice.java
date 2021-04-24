package spring.pokemon.client.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TCGSkuPrice {
    private Integer skuId;
    private BigDecimal lowPrice;
    private BigDecimal lowestShipping;
    private BigDecimal lowestListingPrice;
    private BigDecimal marketPrice;
}
