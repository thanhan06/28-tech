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

// [PATCH] /admin/products/change-status/:status/:id

module.exports.changeStatus=async (req,res)=>{
    const status = req.params.status;
    const id= req.params.id;

    await Product.updateOne({_id:id},{status:status})

    res.redirect("back");
}
// [PATCH] /admin/products/change-multi

module.exports.changeMulti=async (req,res)=>{
    console.log(req.body); // cài đặt thư viện body parser để lấy body
    const type = req.body.type;
    const ids= req.body.ids.split(", ");// chuyển chuổi thành mảng
// Update bằng mảng id
    switch (type){
        case "active": 
            await Product.updateMany(
                { _id: { $in: ids } },
                { status : "active" }
              )
            break;
        case "inactive":
            await Product.updateMany(
                { _id: { $in: ids } },
                { status : "inactive" }
              )
            break;
        default:
            break;
    }

    res.redirect("back");
}