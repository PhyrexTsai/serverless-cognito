/** Table users **/
CREATE TABLE IF NOT EXISTS User (
  userId            serial PRIMARY key,
  "name"            text,
  email             text NOT NULL,
  "password"        text NOT NULL,
  mobile            text,     
  "status"          smallint,
  memo              text,
  createTimestamp   TIMESTAMP WITH TIME ZONE
  updateTimestamp   TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS PrivateKey (
	privateKeyId			serial PRIMARY key,
	userId						integer NOT NULL,
	keystore					text NOT NULL,
	passphrase				text NOT NULL,
	publickey					text NOT NULL,
	privatekey				text NOT NULL,
	"status"					smallint,
	createTimestamp   TIMESTAMP WITH TIME ZONE
	updateTimestamp   TIMESTAMP WITH TIME ZONE
);

CREATE TABLE IF NOT EXISTS TransactionData (
	transactionDataId 		serial primary key,
	transactionHash 			text NOT NULL,
	"status" 							text, -- UNCONFIRM, PENDING, CONFIRMED, FAILED
	network 							text, -- mainnet, ropsten, localhost
	transactionTimestamp 	TIMESTAMP WITH TIME ZONE,
	updateTimestamp 			TIMESTAMP WITH TIME ZONE,
	blockNumber 					bigint,
	blockHash 						text,
	fromAddress 					text,
	toAddress							text,
	"value"								text  -- in wei
);

CREATE TABLE IF NOT EXISTS EventData (
	
);