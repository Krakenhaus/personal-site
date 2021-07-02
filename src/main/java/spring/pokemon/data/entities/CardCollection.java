package spring.pokemon.data.entities;

import com.fasterxml.jackson.annotation.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import org.apache.commons.lang3.builder.EqualsBuilder;
import org.apache.commons.lang3.builder.HashCodeBuilder;
import org.hibernate.annotations.*;
import spring.pokemon.data.entities.ids.CardCollectionId;

import javax.persistence.*;
import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Getter
@Setter
@Builder
@Entity(name = "CardCollection")
@Table(name = "card_collection")
@AllArgsConstructor
@IdClass(CardCollectionId.class)
@DynamicUpdate
@JsonInclude(JsonInclude.Include.NON_NULL)
public class CardCollection implements Serializable {
    protected CardCollection() {
    }

    @Id
    @NotNull(message = "userId cannot be null")
    private UUID userId;

    @Id
    private Integer productId;
    private Integer skuId;
    private Integer cardCount;
    private Integer displayOrder;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="productId", insertable = false, updatable = false)
    @Fetch(value = FetchMode.SELECT)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private ProductDetails productDetails;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="skuId", insertable = false, updatable = false)
    @Fetch(value = FetchMode.SELECT)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private SkuPrice skuPrice;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinColumn(name="folderId", insertable = false, updatable = false)
    @Fetch(value = FetchMode.SELECT)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private List<CardFolder> cardFolders = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="userId", insertable = false, updatable = false)
    @JsonIgnore
    private UserMetadata userMetadata;

}
