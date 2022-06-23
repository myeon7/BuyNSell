
-- Creating TABLES in PostgreSQL 

CREATE TABLE bsuser (
    "_id" serial NOT NULL,
    "firstname" varchar NOT NULL,
    "lastname" varchar NOT NULL,
    "age" integer NOT NULL,
    "state" varchar NOT NULL,
    "zipcode" integer NOT NULL,
    "address1" varchar,
    "address2" varchar,
    CONSTRAINT "pk_bsuser" PRIMARY KEY ("_id")
) WITH (OIDS=FALSE);

CREATE TABLE bsusers (
    "user_id" bigint NOT NULL,
    "id" varchar NOT NULL,
    "pw" varchar NOT NULL,
    CONSTRAINT "fk0_bsusers" FOREIGN KEY ("user_id") REFERENCES bsuser("_id") 
) WITH (OIDS=FALSE);

CREATE TABLE product (
    "_id" serial NOT NULL,
    "category" varchar NOT NULL,
    "name" varchar NOT NULL,
    "price" integer NOT NULL,
    "condition" varchar NOT NULL,
    "upload_date" DATE NOT NULL,
    "zipcode" integer NOT NULL,
    "details" varchar NOT NULL,
    "status" varchar NOT NULL,
    "seller_id" bigint NOT NULL,
    "buyer_id" bigint,
    CONSTRAINT "pk_product" PRIMARY KEY ("_id"),
    CONSTRAINT "fk0_product" FOREIGN KEY ("seller_id") REFERENCES bsuser("_id"),
    CONSTRAINT "fk1_product" FOREIGN KEY ("buyer_id") REFERENCES bsuser("_id")
) WITH (OIDS=FALSE);

CREATE TABLE transaction_method (
    "product_id" serial NOT NULL,
    "pickup" boolean NOT NULL,
    "delivery" boolean NOT NULL,
    "shipping" boolean NOT NULL,
    CONSTRAINT "fk0_transaction_method" FOREIGN KEY ("product_id") REFERENCES product("_id")
) WITH (OIDS=FALSE);

CREATE TABLE selling_list (
    "user_id" bigint NOT NULL,
    "product_id" bigint NOT NULL,
    CONSTRAINT "fk0_selling_list" FOREIGN KEY ("user_id") REFERENCES bsuser("_id"),
    CONSTRAINT "fk1_selling_list" FOREIGN KEY ("product_id") REFERENCES product("_id")
) WITH (OIDS=FALSE);

CREATE TABLE purchased_list (
    "user_id" bigint NOT NULL,
    "product_id" bigint NOT NULL,
    "date" DATE NOT NULL,
    CONSTRAINT "fk0_purchased_list" FOREIGN KEY ("user_id") REFERENCES bsuser("_id"),
    CONSTRAINT "fk1_purchased_list" FOREIGN KEY ("product_id") REFERENCES product("_id")
) WITH (OIDS=FALSE);

CREATE TABLE interested_list (
    "user_id" bigint NOT NULL,
    "product_id" bigint NOT NULL,
    CONSTRAINT "fk0_interested_list" FOREIGN KEY ("user_id") REFERENCES bsuser("_id"),
    CONSTRAINT "fk1_interested_list" FOREIGN KEY ("product_id") REFERENCES product("_id")
) WITH (OIDS=FALSE);



-- SAMPLE DATA IN TABLES
INSERT INTO bsuser VALUES (1, 'Matthew', 'Yeon', 25, 'GA', 30329, '1579 Avenue Place');
INSERT INTO bsuser VALUES (2, 'J', 'Yeon', 24, 'GA', 30328, '1578 Avenue Place');
INSERT INTO bsusers VALUES (1, 'myeon', 1234);
INSERT INTO bsusers VALUES (2, 'jyeon', 12345);

INSERT INTO product VALUES (1, 'furniture', 'desk', 60, 'Almost New', '2022-06-21', 30329, 'Moving out, need to get it sold immediately!', 'unsold', 1, 2);
INSERT INTO product VALUES (2, 'furniture', 'lamp', 20, 'New', '2022-06-20', 30329, 'Beautiful bright lamp', 'sold', 1);
INSERT INTO product VALUES (3, 'furniture', 'chair', 50, 'Used', '2022-06-20', 30328, 'Best chair in the world', 'unsold', 2);
INSERT INTO transaction_method VALUES (1, true, false, false);
INSERT INTO transaction_method VALUES (2, true, true, true);
INSERT INTO transaction_method VALUES (3, true, false, true);

INSERT INTO selling_list VALUES (1, 2);
INSERT INTO selling_list VALUES (1, 2);
INSERT INTO selling_list VALUES (2, 3);

INSERT INTO purchased_list VALUES (2, 2, '2022-06-21');

INSERT INTO interested_list VALUES (2, 1);
