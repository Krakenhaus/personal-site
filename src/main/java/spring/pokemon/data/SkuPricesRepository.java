package spring.pokemon.data;

import org.springframework.data.repository.CrudRepository;
import spring.pokemon.data.entities.ProductDetails;
import spring.pokemon.data.entities.SkuDetails;
import spring.pokemon.data.entities.SkuPrice;

import java.util.List;

public interface SkuPricesRepository extends CrudRepository<SkuPrice, Integer> {
    SkuPrice findById(int skuId);
    List<SkuPrice> findAllById(Iterable<Integer> skuIds);
}
