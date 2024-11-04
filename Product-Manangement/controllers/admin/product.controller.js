const Product= require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
const searchHelper = require("../../helpers/search")
const paginationHelper = require("../../helpers/pagination")

// [GET] /admin/products
module.exports.index = async (req,res)=>{
    // Đoạn bộ lọc
    const filterStatus = filterStatusHelper(req.query);
    // console.log(req.query.status);
    let find={
        deleted: false
    }

    
    if(req.query.status)
    {
        find.status= req.query.status;
    }

    const objectSearch = searchHelper(req.query);
    if(objectSearch.regex){
        find.title= objectSearch.regex;
    }
    // Pagination
    let objectPagination={
        currentPage:1,
        limitItems: 4
    };
    const countProducts = await Product.countDocuments(find);

    let pagination = paginationHelper(objectPagination,req.query,countProducts);

    // End Pagination

    const products = await Product.find(find).limit(
        pagination.limitItems).skip(pagination.skip);

    // console.log(products);
        res.render("admin/pages/products/index",{
            pageTitle :"Trang sản phẩm",
            products: products,
            filterStatus : filterStatus,
            keyword:objectSearch.keyword,
            pagination: pagination
        }
        );
    
    };