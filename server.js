

const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const path = require('path');
const express = require('express');
const cors = require('cors');


//databse
// const sequelize = require('./config/database');
// const { DataTypes } = require('sequelize');

// //test
// sequelize.authenticate().catch(err => console.log('Error: ' + err))
 
// sequelize.sync().catch((error) => {
//     console.error('Unable to create table : ', error);
//  });



const app = express();

//cors
app.use(cors());


//middleware to parse json body
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


app.post('/create', (req,res) => {
    const formData = req.body;
    console.log(formData);
    res.send({status:200, message:"created succesfully"})
})

const PORT = process.env.PORT || 3001;


app.use('/user', require('./routes/user')); 




app.listen(PORT, () => {
    console.log(`Server is running in mode on port ${PORT}`)
});

