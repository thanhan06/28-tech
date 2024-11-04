// Button Status
const buttonStatus = document.querySelectorAll('[button-status]');

if(buttonStatus.length>0){

    let url = new URL(window.location.href); // lấy url hiện tại và NEW để sửa được url
    // console.log(url);

    buttonStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const status = button.getAttribute("button-status");
            
            if(status){
                url.searchParams.set("status",status);  //phần sau dấu hỏi nta gọi là params
            } else {
                url.searchParams.delete("status");
            }

            window.location.href = url.href;
        });

    });
}
//
// Form Search
 const formSearch  = document.querySelector("#form-search");

 if(formSearch){
    let url = new URL(window.location.href); // lấy url hiện tại và NEW để sửa được url

    console.log(formSearch)
    formSearch.addEventListener("submit",(e)=>{
        e.preventDefault(); // chặn load lại trang khi submit
        const keyword =e.target.elements.keyword.value

        if(keyword){
            url.searchParams.set("keyword",keyword);  //phần sau dấu hỏi nta gọi là params
        } else {
            url.searchParams.delete("keyword");
        }
        window.location.href = url.href;
    });
 }