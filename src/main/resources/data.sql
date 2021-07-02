CREATE TABLE IF NOT EXISTS product_details (
  product_id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  group_id INT NOT NULL,
  image_url VARCHAR(255),
  url VARCHAR(255) NOT NULL,
  typing VARCHAR(50)
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

CREATE TABLE IF NOT EXISTS sku_price (
  sku_id INT PRIMARY KEY,
  low_price FLOAT(4),
  lowest_shipping FLOAT(4),
  lowest_listing_price FLOAT(4),
  market_price FLOAT(4),
  last_update_time TIMESTAMP,
  FOREIGN KEY (sku_id) REFERENCES sku_details(sku_id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS user_metadata (
  user_id UUID PRIMARY KEY,
  nickname VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS card_folder (
  user_id UUID,
  folder_id UUID,
  folder_name VARCHAR(255) NOT NULL,
  color VARCHAR(10),
  display_order BIGINT auto_increment,
  FOREIGN KEY (user_id) REFERENCES user_metadata(user_id) ON DELETE CASCADE,
  PRIMARY KEY(user_id, folder_id)
);

CREATE TABLE IF NOT EXISTS card_collection (
  user_id UUID,
  product_id INT NOT NULL,
  sku_id INT,
  card_count INT NOT NULL,
  display_order BIGINT auto_increment,
  folder_id ARRAY,
  FOREIGN KEY (sku_id) REFERENCES sku_price(sku_id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES product_details(product_id) ON DELETE CASCADE,
  FOREIGN KEY (folder_id) REFERENCES card_folder(folder_id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES user_metadata(user_id) ON DELETE CASCADE,
  PRIMARY KEY(user_id, product_id)
);

CREATE TABLE IF NOT EXISTS price_history (
    id IDENTITY NOT NULL PRIMARY KEY,
    sku_id INT,
    insert_date TIMESTAMP,
    market_price_snapshot FLOAT(4),
    lowest_listing_price_snapshot FLOAT(4),
    INDEX (sku_id)
);

--ALTER TABLE card_folder ALTER COLUMN display_order BIGINT AUTO_INCREMENT;
--ALTER TABLE card_collection ALTER COLUMN display_order BIGINT AUTO_INCREMENT;
--ALTER TABLE price_history ALTER COLUMN id LONG AUTO_INCREMENT;
--CREATE INDEX ix_market_price ON sku_price (market_price) USING BTREE;
--CREATE INDEX ix_lowest_listing_price ON sku_price (lowest_listing_price) USING BTREE;

