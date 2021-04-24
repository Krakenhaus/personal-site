package spring.pokemon.data.entities;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
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
public class ProductDetails {
    public ProductDetails(Integer productId, String name, Integer groupId, String imageUrl, String url, List<SkuDetails> skuDetails) {
        this.productId = productId;
        this.name = name;
        this.groupId = groupId;
        this.imageUrl = imageUrl;
        this.url = url;
        this.skuDetails = skuDetails;
    }

    protected ProductDetails() {
    }

    @Id
    private Integer productId;
    private String name;
    private Integer groupId;
    private String imageUrl;
    private String url;

    @OneToMany(
        mappedBy = "productDetails",
        cascade = CascadeType.ALL,
        orphanRemoval = true
    )
    @JsonManagedReference
    @OnDelete(action = OnDeleteAction.CASCADE)
    private List<SkuDetails> skuDetails = new ArrayList<>();
}
