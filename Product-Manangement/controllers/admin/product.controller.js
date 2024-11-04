const Product= require("../../models/product.model")

// [GET] /admin/products
module.exports.index = async (req,res)=>{
// Danh sách button bên file page/admin/product/index.pug
    let filterStatus = [
        {
            name : "Tất cả",
            status:"",
            class:""

        },
        {
            name : "Hoạt động",
            status:"active",
            class:""

            
        },
        {
            name : "Dừng hoạt động",
            status:"inactive",
            class:""


        }
    ]
    if(req.query.status)
    {
        const index = filterStatus.findIndex(item =>item.status == req.query.status )
        filterStatus[index].class ="active";
    }else{
        const index = filterStatus.findIndex(item =>item.status =="" )
        filterStatus[index].class ="active";
    }


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