CREATE TABLE IF NOT EXISTS product_details (
  product_id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  group_id INT NOT NULL,
  image_url VARCHAR(255),
  url VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS sku_details (
  sku_id INT PRIMARY KEY,
  product_id INT NOT NULL,
  language_id INT NOT NULL,
  printing_id INT NOT NULL,
  condition_id INT NOT NULL,
  FOREIGN KEY (product_id) REFERENCES product_details(product_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sku_price (
  sku_id INT PRIMARY KEY,
  low_price FLOAT(4),
  lowest_shipping FLOAT(4),
  lowest_listing_price FLOAT(4),
  market_price FLOAT(4),
  last_update_time TIMESTAMP,
  FOREIGN KEY (sku_id) REFERENCES sku_details(sku_id) ON DELETE CASCADE
);


