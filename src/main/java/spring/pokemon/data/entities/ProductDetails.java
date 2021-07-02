package spring.pokemon.data.entities;

import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@Entity(name = "ProductDetails")
@Table(name = "product_details")
@AllArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProductDetails {
    protected ProductDetails() {
    }

    @Id
    private Integer productId;
    private String name;
    private Integer groupId;
    private String imageUrl;
    private String url;
    private String cardType;
    private String rarity;
    private String cardNumber;

    @OneToMany(
        mappedBy = "productDetails",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @JsonManagedReference
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<SkuDetails> skuDetails = new ArrayList<>();

    @OneToMany(
            mappedBy = "productDetails",
            cascade = CascadeType.ALL,
            orphanRemoval = true
    )
    @JsonBackReference()
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<CardCollection> cardCollection;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;

        if (o == null || getClass() != o.getClass()) return false;

        ProductDetails that = (ProductDetails) o;

        return new EqualsBuilder().append(productId, that.productId).append(name, that.name).append(groupId, that.groupId).append(imageUrl, that.imageUrl).append(url, that.url).append(cardType, that.cardType).append(rarity, that.rarity).append(cardNumber, that.cardNumber).append(skuDetails, that.skuDetails).append(cardCollection, that.cardCollection).isEquals();
    }

    @Override
    public int hashCode() {
        return new HashCodeBuilder(17, 37).append(productId).append(name).append(groupId).append(imageUrl).append(url).append(cardType).append(rarity).append(cardNumber).append(skuDetails).append(cardCollection).toHashCode();
    }
}
