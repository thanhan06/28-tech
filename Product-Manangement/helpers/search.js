module.exports=(query)=>{
    let objecrSearch={
        keyword: "",
        regex :""
    };
    if(query.keyword){
        objecrSearch.keyword =query.keyword;

        const regex =new RegExp(objecrSearch.keyword,"i");// tìm sản phẩm có chứa chuỗi ng dùng đã nhập "i" là không phân biệt chữ hoa chữ thường
       objecrSearch.regex=regex;
       
    }

    return objecrSearch;

}