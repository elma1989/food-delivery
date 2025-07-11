CREATE TABLE customer (
    cus_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    cus_email TEXT NOT NULL UNIQUE,
    cus_hash_password CHAR(32) NOT NULL,
    cus_first_name TEXT NOT NULL,
    cus_last_name TEXT NOT NULL,
    cus_birth_date DATE NOT NULL,
    cus_street_no VARCHAR(30) NOT NULL,
    cus_zip CHAR(5) NOT NULL,
    cus_city VARCHAR(24) NOT NULL
);

CREATE TABLE item (
    item_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    item_name TEXT NOT NULL UNIQUE,
    item_type VARCHAR(10) NOT NULL,
    item_description TEXT NOT NULL,
    item_price DECIMAL(5,2) NOT NULL
);

CREATE TABLE delivery (
    del_id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    del_time DATETIME NOT NULL,
    cus_id INTEGER NOT NULL REFERENCES customer(cus_id) ON DELETE CASCADE
);

CREATE TABLE delivery_item (
    del_id INTEGER NOT NULL REFERENCES delivery(ord_id) ON DELETE CASCADE,
    item_id INTEGER NOT NULL REFERENCES item(item_id),
    PRIMARY KEY (del_id, item_id)
);