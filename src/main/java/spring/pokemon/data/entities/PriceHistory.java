package spring.pokemon.data.entities;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;

@Getter
@Setter
@Builder
@Entity(name = "PriceHistory")
@Table(name = "price_history")
@AllArgsConstructor
public class PriceHistory {
    protected PriceHistory() {
    }

    @Id
    @Column(name="id")
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private Integer skuId;
    private BigDecimal lowestListingPriceSnapshot;
    private BigDecimal marketPriceSnapshot;
    private Date insertTime;
    private Integer month;
    private Integer year;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        PriceHistory that = (PriceHistory) o;

        return new EqualsBuilder().append(id, that.id).append(skuId, that.skuId).append(lowestListingPriceSnapshot, that.lowestListingPriceSnapshot).append(marketPriceSnapshot, that.marketPriceSnapshot).append(insertTime, that.insertTime).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(id).append(skuId).append(lowestListingPriceSnapshot).append(marketPriceSnapshot).append(insertTime).toHashCode();
    }
}
