package spring.pokemon.client;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.PropertySource;
import org.springframework.stereotype.Component;
import spring.pokemon.client.model.*;
import spring.pokemon.errors.CardNotFoundException;
import spring.pokemon.errors.TCGPlayerClientException;
import spring.pokemon.model.SearchRequest;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@Component
@PropertySource("classpath:tcg.properties")
public class TCGPlayerClient {

    @Autowired
    HttpClient client;

    @Value("${client.id}")
    private String clientId;

    @Value("${client.secret}")
    private String clientSecret;

    @Value("${partner.user.agent}")
    private String partnerUserAgent;

    public static HttpRequest.BodyPublisher ofFormData(Map<Object, Object> data) {
        var builder = new StringBuilder();
        for (Map.Entry<Object, Object> entry : data.entrySet()) {
            if (builder.length() > 0) {
                builder.append("&");
            }
            builder.append(URLEncoder.encode(entry.getKey().toString(), StandardCharsets.UTF_8));
            builder.append("=");
            builder.append(URLEncoder.encode(entry.getValue().toString(), StandardCharsets.UTF_8));
        }
        return HttpRequest.BodyPublishers.ofString(builder.toString());
    }

    public TCGToken generateNewToken() {
        // form parameters
        Map<Object, Object> data = new HashMap<>();
        data.put("grant_type", "client_credentials");
        data.put("client_id", clientId);
        data.put("client_secret", clientSecret);

        HttpRequest request = HttpRequest.newBuilder(
                URI.create("https://api.tcgplayer.com/token"))
                .header("User-Agent", partnerUserAgent)
                .header("Content-Type", "application/x-www-form-urlencoded")
                .POST(ofFormData(data))
                .build();

        try {
            var response = client.send(request, new JsonBodyHandler<>(TCGToken.class));
            return response.body().get();
        } catch (IOException | InterruptedException ex) {
            System.out.println(ex.getLocalizedMessage());
            throw new TCGPlayerClientException();
        }
    }

    public List<TCGProductDetail> getProductDetails(Set<Integer> productIds, boolean includeSkus) {
        String commaSeparatedProductIds = StringUtils.join(productIds, ",");
        return getProductDetails(commaSeparatedProductIds, includeSkus);
    }

    public List<TCGProductDetail> getProductDetails(String productIds, boolean includeSkus) {
        String token = TokenManager.getInstance().getToken();
        HttpRequest request = HttpRequest.newBuilder(
                URI.create("https://api.tcgplayer.com/catalog/products/" + productIds + "?getExtendedFields=true&includeSkus=" + includeSkus))
                .header("User-Agent", partnerUserAgent)
                .header("Accept", "application/json")
                .header("Authorization", "Bearer " + token)
                .build();

        try {
            var response = client.send(request, new JsonBodyHandler<>(TCGProductDetails.class));
            TCGProductDetails productDetailsResponse = response.body().get();

            List<String> errors = productDetailsResponse.getErrors();
            if (!errors.isEmpty()) {
                System.out.println(errors);
                throw new TCGPlayerClientException();
            }
            return productDetailsResponse.getResults();
        } catch (IOException | InterruptedException ex) {
            System.out.println(ex.getLocalizedMessage());
            throw new CardNotFoundException();
        }
    }

    public Set<Integer> productSearch(SearchRequest searchRequest) {
        String token = TokenManager.getInstance().getToken();
        String requestData = "{\n" +
                "            \"sort\": \"name\",\n" +
                "                \"limit\": 20,\n" +
                "                \"offset\": 0,\n" +
                "                \"filters\": [\n" +
                "            { \"name\": \"ProductName\", \"values\": [ \"" + searchRequest.getProductName() + "\" ] },\n" +
                "            { \"name\": \"SetName\", \"values\": [ \"" + searchRequest.getSetName() + "\" ] }\n" +
                "    ]\n" +
                "        }";

        HttpRequest request = HttpRequest.newBuilder(
                URI.create("https://api.tcgplayer.com/catalog/categories/3/search"))
                .header("User-Agent", partnerUserAgent)
                .header("Accept", "application/json")
                .header("Content-Type", "application/json")
                .header("Authorization", "Bearer " + token)
                .POST(HttpRequest.BodyPublishers.ofString(requestData))
                .build();

        try {
            var response = client.send(request, new JsonBodyHandler<>(TCGSkuPricingResponse.SearchResponse.class));
            TCGSkuPricingResponse.SearchResponse searchResponse = response.body().get();

            List<String> errors = searchResponse.getErrors();
            if (!errors.isEmpty()) {
                System.out.println(errors);
                throw new TCGPlayerClientException();
            }
            return searchResponse.getResults();
        } catch (IOException | InterruptedException ex) {
            System.out.println(ex.getLocalizedMessage());
            throw new CardNotFoundException();
        }
    }

    public List<TCGSkuPrice> getPricing(Set<Integer> skuIds) {
        String token = TokenManager.getInstance().getToken();
        // Convert list of skuIds to csv
        String commaSeparatedSkus = StringUtils.join(skuIds, ",");

        HttpRequest request = HttpRequest.newBuilder(
            URI.create("https://api.tcgplayer.com/pricing/sku/" + commaSeparatedSkus))
                .header("User-Agent", partnerUserAgent)
                .header("Accept", "application/json")
                .header("Authorization", "Bearer " + token)
                .build();

        try {
            var response = client.send(request, new JsonBodyHandler<>(TCGSkuPricingResponse.class));
            TCGSkuPricingResponse pricingResponse = response.body().get();

            List<String> errors = pricingResponse.getErrors();
            if (!errors.isEmpty()) {
                System.out.println(errors);
                throw new TCGPlayerClientException();
            }
            return pricingResponse.getResults();
        } catch (IOException | InterruptedException ex) {
            System.out.println(ex.getLocalizedMessage());
            throw new CardNotFoundException();
        }
    }
}
