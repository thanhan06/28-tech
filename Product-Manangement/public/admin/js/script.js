// Button Status
const buttonStatus = document.querySelectorAll('[button-status]');

if(buttonStatus.length>0){

    let url = new URL(window.location.href); // lấy url hiện tại và NEW để sửa được url
    // console.log(url);

    buttonStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const status = button.getAttribute("button-status");
            
            if(status){
                const curentStatus=url.searchParams.get("status");
                if(curentStatus !=  status){
                    url.searchParams.set("page",1); // Khi chọn trạng thái khác thì quay về trang 1
                }

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

    // console.log(formSearch)
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
 // End Form  Search

 // Pagination
const buttonPagination = document.querySelectorAll("[button-pagination]");
if(buttonPagination){
    let url = new URL(window.location.href);
    buttonPagination.forEach(button=>{
        button.addEventListener("click",()=>{
            const page=button.getAttribute("button-pagination");
            url.searchParams.set("page",page);
            window.location.href = url.href;
        })  
    })
}
 // End Pagination

 // Checkbox Multi
 const checkboxMulti = document.querySelector("[checkbox-multi]");
 if(checkboxMulti){
    const inputCheckAll= checkboxMulti.querySelector("input[name='checkall']");
    const inputsId= checkboxMulti.querySelectorAll("input[name='id']");
    // chọn ô checkboxAll  thì các checkbox  khác sẽ được chọn
    inputCheckAll.addEventListener("click",()=>{
        if(inputCheckAll.checked){
            inputsId.forEach(input=>{
                input.checked=true;
            })
        }else{
            inputsId.forEach(input=>{
                input.checked=false;
            })
        }
    });

    // chọn tất cả các ô checkbox thì checkboxAll tự được chọn
    inputsId.forEach((input)=>{
        input.addEventListener("click",()=>{
            const countChecked = checkboxMulti.querySelectorAll("input[name='id']:checked").length;// tìm các ô đã checked
            if(countChecked==inputsId.length){
                inputCheckAll.checked=true;
            }
            else{
                inputCheckAll.checked=false;
            }

        });
    });
 }
 // End Checkbox Multi

 // Form Change Multi
const formChangeMulti = document.querySelector("[form-change-multi]");
if(formChangeMulti){
    formChangeMulti.addEventListener("submit",(e)=>{
        e.preventDefault();
        const checkboxMulti = document.querySelector("[checkbox-multi]");
        const inputsChecked =checkboxMulti.querySelectorAll("input[name='id']:checked");
        if(inputsChecked.length>0){
            let ids=[];
            const inputIds=formChangeMulti.querySelector("input[name='ids']");

            inputsChecked.forEach(input=>{
                const id = input.value;
                ids.push(id);
            });
            //console.log(ids.join(", ")); chuyển mảng thành chuỗi các ptu ngăn cách nhau bỏi dấu ", "
            inputIds.value=ids.join(", ");
            formChangeMulti.submit();
        }else{
            alert("Vui lòng chọn ít nhất một bản ghi!");
        }
    });
}
 // End Form Change Multi