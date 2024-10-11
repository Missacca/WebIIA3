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
        "SELECT * FROM `FUNDRAISER` where `ACTIVE` = '1'", // select data which is activated
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
 * GET CATEGORY
 * This API will get all categories from the database
 */
router.get("/getCategory", (req, res)=>{
    connection.query(
        "SELECT * FROM `CATEGORY`", // get all categories
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
        "SELECT DISTINCT `ORGANIZER` FROM `FUNDRAISER`", // get all organizers
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
   connection.query("SELECT DISTINCT `CITY` FROM `FUNDRAISER`", // get all cities
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
 * GET Specific category fundraiser
 * This method will need user select specific category to search fundraisers
 * @param city
 * @param organizer
 * @param category
 */
router.get("/searchFundraiser",(req, res)=>{
    const {city, organizer, category} = req.query; // get the query param
    /* INITIALIZE SQL */
    let sql = "SELECT * FROM `fundraiser` JOIN crowdfunding_db.category c on c.CATEGORY_ID = fundraiser.CATEGORY_ID WHERE `ACTIVE` = '1'";
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
            sql += "`NAME` = ?"; // add city into the sql
            queryParam.push(item); // add parameter
            if(i>1){ // if more than 1 city selected
                sql+=" OR " // use OR to select more than one parameter
                i--;
            }
        });
        sql+=")" // Right bracket
    }
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
 * GET Fundraiser details
 * This API will need the id of fundraiser and respond the detail of the fundraiser.
 */
router.get('/fundraiser/:id',  (req, res) => {
    const { id } = req.params;
    const sql=` SELECT * FROM fundraiser JOIN crowdfunding_db.category c on c.CATEGORY_ID = fundraiser.CATEGORY_ID WHERE FUNDRAISER_ID = ?`
    connection.query(sql,[id],(err,records,fields) => {
        if (err) {
            console.error('Error retrieving product:', err);
        } else {
            res.send(records);
        }
    });
});
/**
 * POST Donation
 * This api will post the
 */

router.post("/donation", (req, res) => {
    let amount = req.body.amount;
    let giver = req.body.giver;
    let fundraiserId = req.body.fundraiserId;
    const date = new Date();
    let sql1 = `INSERT INTO donation (AMOUNT, GIVER, FUNDRAISER_ID, DATE) VALUES (?,?,?,?)`
    let sql2 = `UPDATE fundraiser SET CURRENT_FUNDING = CURRENT_FUNDING + ? WHERE FUNDRAISER_ID = ?`
    connection.query(sql1,[amount,giver,fundraiserId,date],(err, records)=>{
        if(err){
            console.error('Error inserting data:', err);
        }
        else{
            res.send({message: "insert success"});
        }
    })
    connection.query(sql2,[amount,fundraiserId],(err, records)=>{
        if(err){
            console.error('Error changing data:', err);
        }
        else{
            res.send({message: "change success"});
        }
    })
});
router.post("/fundraiser", (req, res) => {
    let organizer = req.body.organizer;
    let caption = req.body.caption;
    let targetFunding = req.body.targetFunding;
    let city = req.body.city;
    let categoryId = req.body.categoryId;
    let sql = `INSERT INTO fundraiser(ORGANIZER, CAPTION, TARGET_FUNDING, CITY, CATEGORY_ID) VALUES(?,?,?,?,?)`

    connection.query(sql,[organizer, caption, targetFunding, city, categoryId],(err, records)=>{
        if(err){
            console.error('Error inserting data:', err);
        }
        else{
            res.send({message: "insert success"});
        }
    })
})
// Export router
module.exports = router;