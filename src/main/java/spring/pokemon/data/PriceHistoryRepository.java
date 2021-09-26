package spring.pokemon.data;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import spring.pokemon.data.entities.PriceHistory;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.UUID;

public interface PriceHistoryRepository extends CrudRepository<PriceHistory, BigInteger> {
    List<PriceHistory> findBySkuId(Integer skuId);

    @Query(value = "with ranked as (\n" +
            "        select *, ROW_NUMBER() OVER (PARTITION BY sku_id ORDER BY insert_time DESC) AS rn\n" +
            "        from price_history WHERE insert_time < ?2 AND sku_id in (\n" +
            "                select sku_id from card_collection where product_id in\n" +
            "                (\n" +
            "                        select card_collection_product_id from card_collection_card_folders where card_folders_folder_id = ?1\n" +
            "                )\n" +
            "        )\n" +
            ")\n" +
            "select sum(market_price_snapshot) from ranked where rn=1;", nativeQuery = true)
    List<BigDecimal> getFolderPriceHistory(UUID folderId, Date atDate);
}
