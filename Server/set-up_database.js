// Import the required modules
const express = require("express");
const dbcon = require("./database");

//  Connect to the database
let connection = dbcon.getConnection();
connection.connect((err) => {
    if(err)	throw err;
    	console.log("Connected to db");
});

/**  
 *  Create CATEGORY Table in Database
 */
let sqlCreat1 ="DROP TABLE IF EXISTS CATEGORY;"
                     +"CREATE TABLE CATEGORY("
                     +" CATEGORY_ID int NOT NULL AUTO_INCREMENT,"
                     +"Category_Name varchar(255) NOT NULL,"
                     +" PRIMARY KEY (`CATEGORY_ID`))";

/**  
 *  Execute SQL to create CATEGORY table
 */
li_con.execute(sqlCreat1, (err, records) => {
	if(err) {
		console.log("Error while creating table: CATEGORY");
	}
	else {
		console.log("CATEGORY Table created");
	}
});
/**  
 *  Execute SQL to create DONATION table
 */
let sqlCreat2 ="DROP TABLE IF EXISTS DONATION;" +
                    "CREATE TABLE DONATION ( "+
                        "DONATION_ID int NOT NULL AUTO_INCREMENT,"+
                        "DATE date NOT NULL,"+
                        "AMOUNT decimal(15,2) NOT NULL,"+
                        "GIVER varchar(255) NOT NULL,"+
                        "FUNDRAISER_ID int NOT NULL,"+
                        "PRIMARY KEY (DONATION_ID),"+
                        "KEY donation_fundraiser_FUNDRAISER_ID_fk (FUNDRAISER_ID),"+
                        "CONSTRAINT donation_fundraiser_FUNDRAISER_ID_fk FOREIGN KEY (FUNDRAISER_ID) REFERENCES fundraiser (FUNDRAISER_ID))";
/**  
 *  Execute SQL to create DONATION table
 */
li_con.execute(sqlCreat2, (err, records) => {
	if(err) {
		console.log("Error while creating table: DONATION");
	}
	else {
		console.log("DONATION Table created");
	}
});
/**  
 *  Create FUNDRAISER Table in Database
 */
let sqlCreat3 ="DROP TABLE IF EXISTS FUNDRAISER;" +
                    "CREATE TABLE FUNDRAISER ( "+
                    "FUNDRAISER_ID int NOT NULL AUTO_INCREMENT,"+
					"ORGANIZER varchar(255) NOT NULL," +
					"CAPTION varchar(255) NOT NULL,"+
					"TARGET_FUNDING decimal(15,2) NOT NULL,"+
					"CURRENT_FUNDING decimal(15,2) NOT NULL,"+
					"CITY varchar(100) NOT NULL,"+
					"ACTIVE tinyint(1) NOT NULL,"+
					"CATEGORY_ID int DEFAULT NULL,"+
					"PRIMARY KEY (FUNDRAISER_ID),"+
					"KEY CATEGORY_ID (CATEGORY_ID),"+
					"CONSTRAINT fundraiser_ibfk_1 FOREIGN KEY (CATEGORY_ID) REFERENCES category (CATEGORY_ID)) ";
/**  
 *  Execute SQL to create FUNDRAISER table
 */
li_con.execute(sqlCreat3, (err, records) => {
	if(err) {
		console.log("Error while creating table: FUNDRAISER");
	}
	else {
		console.log("FUNDRAISER Table created");
	}
});

/**
 * Insert Data into FUNDRAISER Table
 * This section inserts multiple rows into the FUNDRAISER table.
 */
let sqlarr= new Array();
sqlarr[1]="INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES ('Bit', 'donated 700 dollar', 700.00, 400.00, 'Sydney', TRUE, 2)";
sqlarr[2]="INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES ('Hobbit', 'donated 5000 dollar', 5000.00, 400.00, 'Sydney', false, 4)";
sqlarr[3]="INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES ('Eva', 'donated 900 dollar', 900.00, 145.00, 'New York', TRUE, 3)";
sqlarr[4]="INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES ('Allar', 'donated 100 books for children', 1290.00, 1155.00, 'Perth', TRUE, 3)";	
sqlarr[5]="INSERT INTO FUNDRAISER (ORGANIZER, CAPTION, TARGET_FUNDING, CURRENT_FUNDING, CITY, ACTIVE, CATEGORY_ID) VALUES ('S1mple', 'donated 1000 dollar', 1000.00, 500.00, 'Beijing', TRUE, 1)";

// Execute SQL statements to insert data into FUNDRAISER table
for(let i=1; i < sqlarr.length; i++)
{
	li_con.execute(sqlarr[i], (err, records) => {
		if(err) {
			console.log("It is Inserting  Error");
		}
		else {
			console.log("Success!SQL is executed for inserting into FUNDRAISER table");
		}
    });
}
/**
 * Insert Data into DONATION Table
 * This section inserts multiple rows into the DONATION table.
 */
let sqlarr2= new Array();
sqlarr2[0]="INSERT INTO DONATION VALUES (1,'2024-09-01',100.00,'Alice',1)";
sqlarr2[1]="INSERT INTO DONATION VALUES (2,'2024-09-05',250.00,'Bob',2)";
sqlarr2[2]="INSERT INTO DONATION VALUES (3,'2024-09-10',500.00,'Charlie',7)";
sqlarr2[3]="INSERT INTO DONATION VALUES (4,'2024-09-12',150.00,'David',6)";
sqlarr2[4]="INSERT INTO DONATION VALUES (5,'2024-09-15',75.00,'Eva',2)";
sqlarr2[5]="INSERT INTO DONATION VALUES (6,'2024-09-20',200.00,'Frank',5)";
sqlarr2[6]="INSERT INTO DONATION VALUES (7,'2024-09-22',300.00,'Grace',8)";
sqlarr2[7]="INSERT INTO DONATION VALUES (8,'2024-09-25',125.00,'Hank',6)";
sqlarr2[8]="INSERT INTO DONATION VALUES (9,'2024-09-28',400.00,'Ivy',9)";
sqlarr2[9]="INSERT INTO DONATION VALUES (10,'2024-09-30',175.00,'Jack',3)"; 

// Execute SQL statements to insert data into DONATION table
for(let i=0; i < sqlarr2.length; i++)
    {
        li_con.execute(sqlarr2[i], (err, records) => {
            if(err) {
                console.log("It is Inserting  Error");
            }
            else {
                console.log("Success!SQL is executed for inserting into DONATION table");
            }
        });
    }

/**
 * Insert Data into CATEGORY Table
 * This section inserts multiple rows into the CATEGORY table.
 */
let sqlinsert= new Array(); 
sqlinsert[0]="INSERT INTO CATEGORY (Category_Name) VALUES ('Health')";
sqlinsert[1]="INSERT INTO CATEGORY  (Category_Name) VALUES ('Education')";
sqlinsert[2]="INSERT INTO CATEGORY  (Category_Name) VALUES ('Children')";
sqlinsert[3]="INSERT INTO CATEGORY  (Category_Name) VALUES ('Pool')";

// Execute SQL statements to insert data into CATEGORY table
for(let i=0; i < sqlinsert.length; i++)
    {
        li_con.execute(sqlinsert[i], (err, records) => {
            if(err) {
                console.log("It is Inserting  Error");
            }
            else {
                console.log("Success!SQL is executed for inserting into CATEGORY  table");
            }
        });
    }
