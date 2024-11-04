const Product= require("../../models/product.model")
const filterStatusHelper = require("../../helpers/filterStatus")
// [GET] /admin/products
module.exports.index = async (req,res)=>{
    // Đoạn bộ lọc
    const filterStatus = filterStatusHelper(req.query);
    // console.log(req.query.status);
    let find={
        deleted: false
    }

    let keyword="";
    if(req.query.keyword){
        keyword =req.query.keyword;

        const regex =new RegExp(keyword,"i");// tìm sản phẩm có chứa chuỗi ng dùng đã nhập "i" là không phân biệt chữ hoa chữ thường
        find.title=regex;
    }

    if(req.query.status)
    {
        find.status= req.query.status;
    }

    const products = await Product.find(find);

    console.log(products);
        res.render("admin/pages/products/index",{
            pageTitle :"Trang sản phẩm",
            products: products,
            filterStatus : filterStatus,
            keyword:keyword
        }
        );
    
    };