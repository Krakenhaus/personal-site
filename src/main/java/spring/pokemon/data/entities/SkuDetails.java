package spring.pokemon.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Getter
@Setter
@Builder
@Entity(name = "SkuDetails")
@Table(name = "sku_details")
public class SkuDetails {
    public SkuDetails(Integer skuId, Integer languageId, Integer printingId, Integer conditionId, Integer productId, ProductDetails productDetails, SkuPrice skuPrice) {
        this.skuId = skuId;
        this.languageId = languageId;
        this.printingId = printingId;
        this.conditionId = conditionId;
        this.productId = productId;
        this.productDetails = productDetails;
        this.skuPrice = skuPrice;
    }

    protected SkuDetails() {
    }

    @Id
    private Integer skuId;
    private Integer languageId;
    private Integer printingId;
    private Integer conditionId;
    @Column(insertable=false, updatable=false)
    private Integer productId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="productId")
    @JsonBackReference()
    private ProductDetails productDetails;

    @OneToOne(mappedBy="skuDetails")
    @JsonIgnore
    private SkuPrice skuPrice;
}
