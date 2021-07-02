package spring.pokemon.data.entities;

import java.math.BigDecimal;

public interface FolderPriceHistory {
    Integer getMonth();
    Integer getYear();
    BigDecimal getPrice();
}
