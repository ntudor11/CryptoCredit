CREATE DATABASE IF NOT EXISTS cryptocredit;

USE cryptocredit;

CREATE TABLE users (
  id int not null auto_increment primary key,
  email varchar(100) not null,
  password varchar(255) not null,
  usertype varchar(255) not null,
  interest_level int not null,
  exp_timeframe int not null
);

CREATE TABLE transactions (
  id int not null auto_increment primary key,
  investor_id int not null,
  borrower_id int not null,
  type varchar(255) not null,
  value int not null,
  foreign key (investor_id) references users(id),
  foreign key (borrower_id) references users(id)
);

ALTER TABLE transactions
  ADD COLUMN transaction_time TIMESTAMP NOT NULL;

INSERT INTO transactions (
  investor_id,
  borrower_id,
  type,
  value,
  transaction_time
) values (
  3,
  4,
  'Loan',
  40,
  NOW()
);

INSERT INTO transactions (
  investor_id,
  borrower_id,
  type,
  value
) values (
  2,
  5,
  'Loan',
  20
);

INSERT INTO transactions (
  investor_id,
  borrower_id,
  type,
  value
) values (
  1,
  4,
  'Instalment',
  4
);

INSERT INTO transactions (
  investor_id,
  borrower_id,
  type,
  value
) values (
  2,
  5,
  'Instalment',
  5
);
