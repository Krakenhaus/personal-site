package spring.pokemon.data.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@Builder
@Entity(name = "SkuPrice")
@Table(name = "sku_price")
@AllArgsConstructor
public class SkuPrice {
    protected SkuPrice() {
    }

    @Id
    private Integer skuId;
    private BigDecimal lowPrice;
    private BigDecimal lowestShipping;
    private BigDecimal lowestListingPrice;
    private BigDecimal marketPrice;
    private Date lastUpdateTime;

    @OneToMany(
            mappedBy = "skuPrice",
            cascade = CascadeType.ALL
    )
    @JsonBackReference()
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<CardCollection> cardCollection;
}
