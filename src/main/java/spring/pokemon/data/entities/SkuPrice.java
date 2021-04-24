package spring.pokemon.data.entities;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;

@Getter
@Setter
@Builder
@Entity(name = "SkuPrice")
@Table(name = "sku_price")
public class SkuPrice {
    public SkuPrice(Integer skuId, BigDecimal lowPrice, BigDecimal lowestShipping, BigDecimal lowestListingPrice, BigDecimal marketPrice, Date lastUpdateTime, SkuDetails skuDetails) {
        this.skuId = skuId;
        this.lowPrice = lowPrice;
        this.lowestShipping = lowestShipping;
        this.lowestListingPrice = lowestListingPrice;
        this.marketPrice = marketPrice;
        this.lastUpdateTime = lastUpdateTime;
        this.skuDetails = skuDetails;
    }

    protected SkuPrice() {
    }

    @Id
    private Integer skuId;
    private BigDecimal lowPrice;
    private BigDecimal lowestShipping;
    private BigDecimal lowestListingPrice;
    private BigDecimal marketPrice;
    private Date lastUpdateTime;

    @OneToOne(cascade = CascadeType.ALL, optional = false)
    @JoinColumn(name="skuId")
    private SkuDetails skuDetails;
}
