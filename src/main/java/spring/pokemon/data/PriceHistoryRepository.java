package spring.pokemon.data;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import spring.pokemon.data.entities.FolderPriceHistory;
import spring.pokemon.data.entities.PriceHistory;

import java.math.BigInteger;
import java.util.List;
import java.util.UUID;

public interface PriceHistoryRepository extends CrudRepository<PriceHistory, BigInteger> {
    List<PriceHistory> findBySkuId(Integer skuId);

    @Query(value = "SELECT MONTH(ph.insert_time) as month, YEAR(ph.insert_time) as year, SUM(ph.market_price_snapshot) as price \n" +
            "FROM price_history ph \n" +
            "INNER JOIN card_collection cc ON cc.sku_id = ph.sku_id \n" +
            "INNER JOIN card_collection_card_folders cccf ON cccf.card_collection_product_id = cc.product_id \n" +
            "where cccf.card_folders_folder_id= ?1 \n" +
            "GROUP BY YEAR(ph.insert_time), MONTH(ph.insert_time)", nativeQuery = true)
    List<FolderPriceHistory> getFolderPriceHistory(UUID folderId);
}
