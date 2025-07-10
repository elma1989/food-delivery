CREATE TABLE customer (
    cus_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    cus_email TEXT NOT NULL,
    cus_hash_password CHAR(32) NOT NULL,
    cus_street_no VARCHAR(30) NOT NULL,
    cus_zip CHAR(5) NOT NULL,
    cus_city VARCHAR(24) NOT NULL
);

CREATE TABLE item (
    item_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    item_name TEXT NOT NULL,
    item_description TEXT NOT NULL,
    item_price DECIMAL(5,2) NOT NULL,
);

CREATE TABLE order (
    ord_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    ord_time DATETIME NOT NULL,
    cus_id INTEGER NOT NULL REFERENCES customer(cus_id)
);

CREATE TABLE order_item (
    ord_id INTEGER NOT NULL REFERENCES order(ord_id),
    item_id INTEGER NOT NULL REFERENCES item(item_id),
    PRIMARY KEY (ord_id, item_id)
);