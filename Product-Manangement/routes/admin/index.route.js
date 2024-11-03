const dashboarsRoutes =require("./dashboard.route")
const productRoutes = require("./products.route")
const systemConfig = require("../../config/system")
const PATH_ADMIN = systemConfig.prefixAdmin;

module.exports=(app)=>{
    app.use(PATH_ADMIN + "/dashboard",dashboarsRoutes);
    app.use(PATH_ADMIN + "/products",productRoutes);
    
}