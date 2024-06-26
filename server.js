// require online files
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

// require local file
const db  = require('./utils/db.js');


const app = express();
app.use(express.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/we360/v1/superAdmin',require('./routes/superAdminRoute.js'));
app.use('/we360/v1/admin',require('./routes/adminRoutes.js'));
app.use('/we360/v1/employee',require('./routes/employeeRoute.js'));
app.use('/we360/v1/client',require('./routes/clientRoute.js'));


app.listen(process.env.PORT,()=>{
    console.log('listening on port',process.env.PORT);
})
