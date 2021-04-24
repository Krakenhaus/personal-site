package spring.pokemon.data;

import org.springframework.data.repository.CrudRepository;
import spring.pokemon.data.entities.SkuDetails;

import java.util.List;

public interface SkuDetailsRepository extends CrudRepository<SkuDetails, Integer> {
    SkuDetails findById(int skuId);
    List<SkuDetails> findAllById(Iterable<Integer> skuIds);
}
