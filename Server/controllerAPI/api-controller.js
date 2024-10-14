/**
 * This file is for the database API.
 */

// import required modules
const express = require('express');
const router = express.Router();
const database = require("../crowdfunding_db");
const connection = database.getConnection();

// Connect to database
connection.connect()

/**
 * The following part is for the database API
 * These api will be used to query the database
 */

/**
 * GET Active Fundraisers
 * This method will retrieve data and display in Home page
 */
router.get("/getActiveFundraiser", (req, res) => { // use express router to make a GET API
    connection.query( // mysql query
        "SELECT * FROM FUNDRAISER JOIN CATEGORY ON CATEGORY.CATEGORY_ID = FUNDRAISER.CATEGORY_ID WHERE `ACTIVE` = '1'", // select data which is activated
        (err,records)=>{ // get result
            if(err){ // if error occurred
                console.error("An error occurred while querying FUNDRAISER", err) // send an error message
            }
            else{
                res.send(records); // send result
            }
        }
    )
});

/**
 * Get Categories
 * The following part will get some categories for the search page.
 */
/**
 * GET All Fundraisers
 * This method will retrieve data and display in Home page
 */
router.get("/getAllFundraiser", (req, res) => { // use express router to make a GET API
    connection.query( // mysql query
        "SELECT * FROM FUNDRAISER ", // select data which is activated
        (err,records)=>{ // get result
            if(err){ // if error occurred
                console.error("An error occurred while querying FUNDRAISER", err) // send an error message
            }
            else{
                res.send(records); // send result
            }
        }
    )
});
/**
 * GET CATEGORY
 * This API will get all categories from the database
 */
router.get("/getCategory", (req, res)=>{
    connection.query(
        "SELECT * FROM CATEGORY", // get all categories
        (err, records)=>{
            if(err){
                console.error("An error occurred while querying categories", err);
            }
            else{
                res.send(records);
            }
        });
});
/**
 * GET ORGANIZER
 * This API will get all organizers from the database
 */
router.get("/getOrganizer", (req, res)=>{
    connection.query(
        "SELECT DISTINCT `ORGANIZER` FROM FUNDRAISER", // get all organizers
        (err, records)=>{
            if(err){
                console.error("An error occurred while querying organizers", err);
            }
            else{
                res.send(records);
            }
        });
});
/**
 * GET CITY
 * This API will get all cities from the database
 */
router.get("/getCity",(req, res)=>{
   connection.query("SELECT DISTINCT `CITY` FROM FUNDRAISER", // get all cities
       (err, records)=>{
       if(err){
           console.error("An error occurred while querying city", err);
       }
       else{
           res.send(records);
       }
   });
});
/**
 * GET The last one's ID
 * This method will use to get the last one's ID to insert the new number
 */
router.get('/getLastFundraiserId', (req, res) => {
    const sql = 'SELECT MAX(FUNDRAISER_ID) AS maxId FROM FUNDRAISER';
    connection.query(sql, (error, results) => {
      if (error) {
        return res.status(500).json({ error });
      }
      const maxId = results[0].maxId || 0; 
      res.json(maxId);
    });
  });
  
/**
 * GET Specific category fundraiser
 * This method will need user select specific category to search fundraisers
 * @param city
 * @param organizer
 * @param category
 */
router.get("/searchFundraiser",(req, res)=>{
    const {city, organizer, category} = req.query; // get the query param
    /* INITIALIZE SQL */
    let sql = "SELECT * FROM FUNDRAISER JOIN CATEGORY ON CATEGORY.CATEGORY_ID = FUNDRAISER.CATEGORY_ID WHERE `ACTIVE` = '1'";
    let queryParam=[];
    /* DETECT QUERY PARAMS */
    /*
    This part of code will detect the user input settings.
    if user input city, organizer or category,
    it will add the param into the sql query.
     */
    if(city){ // if user selected city option
        sql+= " AND (" // use and to connect different properties
        let array = city.split(","); // split the input string
        i =array.length;
        array.forEach((item)=>{// loop through the array
            sql += "`CITY` = ?"; // add city into the sql
            queryParam.push(item); // add parameter
            if(i>1){ // if more than 1 city selected
                sql+=" OR " // use OR to select more than one parameter
                i--;
            }
        });
        sql+=")" // Right bracket
    }
    if(organizer){ // if user selected organizer option
        sql+= " AND (" // use and to connect different properties
        let array = organizer.split(","); // split the input string
        i =array.length;
        array.forEach((item)=>{ // loop through the array
            sql += "`ORGANIZER` = ?"; // add city into the sql
            queryParam.push(item); // add parameter
            if(i>1){ // if more than 1 city selected
                sql+=" OR " // use OR to select more than one parameter
                i--;
            }
        });
        sql+=")" // Right bracket
    }
    if(category){ // if user selected organizer option
        sql+= " AND (" // use and to connect different properties
        let array = category.split(","); // split the input string
        i =array.length;
        array.forEach((item)=>{ // loop through the array
            sql += "`Category_Name` = ?"; // add city into the sql
            queryParam.push(item); // add parameter
            if(i>1){ // if more than 1 city selected
                sql+=" OR " // use OR to select more than one parameter
                i--;
            }
        });
        sql+=")" // Right bracket
    }
    // query the data from database
    connection.execute(sql, queryParam,(err, records)=>{
        if(err){
            console.error("An error occurred while searching", err);
        }
        else{
            res.send(records);
        }
    })
});
/**
 * Get Fundraiser by id
 * This will return the detail of fundraiser exclude donation details
 */
router.get("/getFundraiserById/:id", (req, res)=>{
    const { id } = req.params;
    const sql = `SELECT * FROM FUNDRAISER JOIN CATEGORY ON CATEGORY.CATEGORY_ID = FUNDRAISER.CATEGORY_ID WHERE FUNDRAISER_ID = ?`
    connection.execute(sql,[id],(err,records,fields) => {
        if (err) {
            console.error('Error retrieving data:', err);
        } else {
            res.send(records);
        }
    });
})
/**
 * GET Fundraiser details
 * This API will need the id of fundraiser and respond the detail of the fundraiser.
 */
router.get('/fundraiser/:id',  (req, res) => {
    const { id } = req.params;
    const sql=` SELECT FUNDRAISER.FUNDRAISER_ID, FUNDRAISER.ORGANIZER, FUNDRAISER.CAPTION, FUNDRAISER.TARGET_FUNDING, FUNDRAISER.CURRENT_FUNDING, FUNDRAISER.CITY, FUNDRAISER.ACTIVE, FUNDRAISER.CATEGORY_ID, CATEGORY.Category_Name, DONATION.DONATION_ID, DONATION.DATE, DONATION.AMOUNT, DONATION.GIVER FROM FUNDRAISER LEFT JOIN CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID  LEFT JOIN  DONATION ON FUNDRAISER.FUNDRAISER_ID = DONATION.FUNDRAISER_ID  WHERE FUNDRAISER.FUNDRAISER_ID = ?;`
    connection.execute(sql,[id],(err,records,fields) => {
        if (err) {
            console.error('Error retrieving data:', err);
        } else {
            res.send(records);
        }
    });
});
/**
 * POST Donation
 * This api will create a record to DONATION table
 * and add the amount of how much the user donated into the FUNDRAISER table.
 */
router.get("/getDonation/:id", (req, res) => {
    const { id } = req.params;
    const sql = `SELECT * FROM DONATION WHERE FUNDRAISER_ID = ?`
    connection.execute(sql,[id],(err,records,fields) => {
        if (err) {
            console.error('Error retrieving data:', err);
        } else {
            res.send(records);
        }
    });
})
router.post("/donation", (req, res) => {
    // read variables from front-end
    let amount = req.body.amount;
    let giver = req.body.giver;
    let fundraiserId = req.body.fundraiserId;
    // Generate a date message
    const date = new Date();
    // initialize sql query
    let sql1 = `INSERT INTO DONATION (AMOUNT, GIVER, FUNDRAISER_ID, DATE) VALUES (?,?,?,?)`
    let sql2 = `UPDATE FUNDRAISER SET CURRENT_FUNDING = CURRENT_FUNDING + ? WHERE FUNDRAISER_ID = ?`
    // First query to add a donation record
    connection.execute(sql1,[amount,giver,fundraiserId,date],(err, records)=>{
        if(err){
            console.error('Error inserting data:', err);
        }
    })
    // Second query to add the payment
    connection.execute(sql2,[amount,fundraiserId],(err, records)=>{
        if(err){
            console.error('Error changing data:', err);
        }
        else{
            res.send({message: "inserting and change success"});
        }
    })
});
/**
 *  POST Fundraiser
 *  This api will create a new fundraiser record
 */
router.post("/fundraiser", (req, res) => {
    // read variables from front-end
    let organizer = req.body.organizer;
    let caption = req.body.caption;
    let targetFunding = req.body.targetFunding;
    let city = req.body.city;
    let categoryId = req.body.categoryId;
    let active = req.body.active;
    // initialize sql query
    let sql = `INSERT INTO FUNDRAISER(ORGANIZER, CAPTION, TARGET_FUNDING, CITY, CATEGORY_ID, ACTIVE) VALUES(?,?,?,?,?,?)`

    connection.execute(sql,[organizer, caption, targetFunding, city, categoryId,active],(err, records)=>{
        if(err){
            console.error('Error inserting data:', err);
        }
        else{
            res.send({message: "insert success"});
        }
    })
})
/**
 * PUT Fundraiser
 * This api can be used to update something for the fundraiser.
 */
router.put("/fundraiser/:id", (req, res) => {
    const { id } = req.params; // read id to select the target fundraiser.
    // read variables from front-end
    let organizer = req.body.organizer;
    let caption = req.body.caption;
    let targetFunding = req.body.targetFunding;
    let city = req.body.city;
    let categoryId = req.body.categoryId;
    let active = req.body.active;
    // initialize sql query
    let sql= `UPDATE FUNDRAISER SET ORGANIZER = ?, CAPTION = ?, TARGET_FUNDING = ?, CITY = ?, CATEGORY_ID = ?, ACTIVE = ? WHERE FUNDRAISER_ID = ?`; // initialize sql command
    let values = [organizer, caption, targetFunding, city, categoryId, active, id];

    connection.query(sql, values,(err,records)=>{
        if(err){
            console.error('Error while changing data:', err);
        }
        else{
            res.send({message: "change success"});
        }
    })
})
/**
 * DELETE Fundraiser details
 * This API will need the id of fundraiser and respond with the details of the fundraiser.
 */
router.delete('/deleteFundraiser/:id', (req, res) => {
    const id = req.params.id;

    // SQL query to delete donations related to the fundraiser first
    let deleteDonations = `DELETE FROM DONATION WHERE FUNDRAISER_ID = ?`;

    // Execute the first SQL to delete related donations
    connection.execute(deleteDonations, [id], (err, result) => {
        if (err) {
            console.log("Error deleting donations related to fundraiser", err);
            return res.send("Error deleting related donations.");
        }

        // Proceed to delete the fundraiser even if no donations were found
        const deleteFundraiserSql = `DELETE FROM FUNDRAISER WHERE FUNDRAISER_ID = ?`;

        connection.execute(deleteFundraiserSql, [id], (err, result) => {
            if (err) {
                console.error('Error deleting fundraiser:', err);
                return res.send("Error deleting fundraiser.");
            }

            // Check if the fundraiser was actually deleted
            if (result.affectedRows === 0) {
                return res.send("Fundraiser not found.");
            }

            res.send(`Fundraiser with ID ${id} successfully deleted.`);
        });
    });
});

// Export router
module.exports = router;