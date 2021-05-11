package spring.pokemon.data;

import org.springframework.data.repository.CrudRepository;
import spring.pokemon.data.entities.ProductDetails;

import java.util.List;

public interface ProductDetailsRepository extends CrudRepository<ProductDetails, Integer> {
    ProductDetails findById(int productId);
    List<ProductDetails> findAllById(Iterable<Integer> productIds);
}
