package spring.pokemon.controller;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import spring.pokemon.client.TCGPlayerClient;
import spring.pokemon.client.model.TCGProductDetail;
import spring.pokemon.data.entities.ProductDetails;
import spring.pokemon.data.entities.SkuPrice;
import spring.pokemon.model.SearchRequest;
import spring.pokemon.service.ProductService;

import java.util.List;
import java.util.Set;

@RestController
@RequestMapping("/pokemon/api")
public class ProductController {

    @Autowired
    TCGPlayerClient tcgPlayerClient;

    @Autowired
    ProductService productService;

    @PostMapping("/products/search")
    public List<TCGProductDetail> productSearch(@RequestBody SearchRequest searchRequest) {
        Set<Integer> matchingProductIds = tcgPlayerClient.productSearch(searchRequest);
        return tcgPlayerClient.getProductDetails(matchingProductIds, false);
    }

    @GetMapping("products/{productIds}")
    public List<ProductDetails> getProductDetails(@PathVariable String productIds) {
        productIds = StringUtils.stripStart(productIds, ",");
        return productService.getProductDetails(productIds, true);
    }

    @GetMapping("products/pricing/skus/{skuIds}")
    public List<SkuPrice> getSkuPrices(@PathVariable String skuIds) {
        skuIds = StringUtils.stripStart(skuIds, ",");
        return productService.getSkuPrices(skuIds);
    }
}
