const express = require("express");
const bodyParser = require('body-parser')
const methodOverride = require('method-override');
require("dotenv").config();

const database = require("./config/database")

const routeAdmin = require("./routes/admin/index.route");
const route = require("./routes/client/index.route");

const systemConfig = require("./config/system")
database.connect();
const app = express();
app.use(bodyParser.urlencoded({ extended: false })); //  support encoded bodies

app.use(methodOverride('_method'))
const port=process.env.PORT;

app.set("views","./views");
app.set("view engine","pug");

// App Locals Variables
app.locals.prefixAdmin= systemConfig.prefixAdmin;/*Cái này để sử dụng biến từ file js sang tất cả các file pug */

app.use(express.static("public"));

routeAdmin(app);
route(app);

app.listen(port,()=>{
    console.log(`App is listening on port ${port}`);
})