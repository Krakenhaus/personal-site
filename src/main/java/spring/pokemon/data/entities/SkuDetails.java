package spring.pokemon.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;

@Getter
@Setter
@Builder
@Entity(name = "SkuDetails")
@Table(name = "sku_details")
@AllArgsConstructor
public class SkuDetails {
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

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        SkuDetails that = (SkuDetails) o;

        return new EqualsBuilder().append(skuId, that.skuId).append(languageId, that.languageId).append(printingId, that.printingId).append(conditionId, that.conditionId).append(productId, that.productId).append(productDetails, that.productDetails).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(skuId).append(languageId).append(printingId).append(conditionId).append(productId).append(productDetails).toHashCode();
    }
}
