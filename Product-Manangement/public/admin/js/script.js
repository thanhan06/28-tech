// Button Status
const buttonStatus = document.querySelectorAll('[button-status]');

if(buttonStatus.length>0){
    buttonStatus.forEach(button=>{
        button.addEventListener("click",()=>{
            const status = button.getAttribute("button-status");
            console.log(status);
        });

    });
}