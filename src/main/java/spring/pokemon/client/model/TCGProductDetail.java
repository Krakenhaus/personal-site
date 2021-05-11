package spring.pokemon.client.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class TCGProductDetail {
    private Integer productId;
    private String name;
    private String imageUrl;
    private Integer groupId;
    private String url;
    private Set<TCGSku> skus;
    private List<TCGProductExtendedData> extendedData;
}
