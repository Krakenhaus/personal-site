package spring.pokemon.data;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import spring.pokemon.data.entities.CardCollection;
import spring.pokemon.data.entities.ids.CardCollectionId;

import javax.transaction.Transactional;
import java.math.BigDecimal;
import java.util.UUID;

public interface CardCollectionRepository extends PagingAndSortingRepository<CardCollection, CardCollectionId> {

    Page<CardCollection> findByUserId(UUID userId, Pageable pageable);
    Page<CardCollection> findByUserIdAndProductDetailsCardType(UUID userId, String cardType, Pageable pageable);
    Page<CardCollection> findByUserIdAndCardFoldersFolderId(UUID userId, UUID folderId, Pageable pageable);
    Page<CardCollection> findByUserIdAndProductDetailsCardTypeAndCardFoldersFolderId(UUID userId, String cardType, UUID folderId, Pageable pageable);

    @Query(value = "SELECT sum(sp.market_price * c.card_count) FROM card_collection c INNER JOIN sku_price sp ON sp.sku_id = c.sku_id WHERE user_id= ?1", nativeQuery = true)
    BigDecimal sumSkuPriceMarketPriceByUserId(UUID userId);
    @Query(value = "SELECT" +
            " sum(sp.market_price  * c.card_count) FROM card_collection c" +
            " INNER JOIN sku_price sp ON sp.sku_id = c.sku_id" +
            " INNER JOIN product_details pd ON pd.product_id = c.product_id" +
            " WHERE c.user_id = ?1 AND pd.card_type = ?2", nativeQuery = true)
    BigDecimal sumSkuPriceMarketPriceByUserIdAndProductDetailsCardType(UUID userId, String cardType);
    @Query(value = "SELECT sum(sp.market_price * c.card_count) FROM card_collection c" +
            " INNER JOIN sku_price sp ON sp.sku_id = c.sku_id" +
            " INNER JOIN card_collection_card_folders cccf ON cccf.card_collection_product_id = c.product_id" +
            " WHERE c.user_id = ?1 AND cccf.card_folders_folder_id = ?2", nativeQuery = true)
    BigDecimal sumSkuPriceMarketPriceByUserIdAndCardFoldersFolderId(UUID userId, UUID folderId);
    @Query(value = "SELECT sum(sp.market_price * c.card_count) FROM card_collection c" +
            " INNER JOIN sku_price sp ON sp.sku_id = c.sku_id" +
            " INNER JOIN product_details pd ON pd.product_id = c.product_id" +
            " INNER JOIN card_collection_card_folders cccf ON cccf.card_collection_product_id = c.product_id" +
            " WHERE c.user_id = ?1 AND cccf.card_folders_folder_id = ?2 AND pd.card_type = ?3", nativeQuery = true)
    BigDecimal sumSkuPriceMarketPriceByUserIdAndProductDetailsCardTypeAndCardFoldersFolderId(UUID userId, UUID folderId, String cardType);

    CardCollection findByUserIdAndProductId(UUID userId, Integer productId);

    @Transactional
    void deleteByUserIdAndProductId(UUID userId, Integer productId);
}
