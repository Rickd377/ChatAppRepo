const form = document.querySelector(".signup form"),
continueBtn = form.querySelector(".button input");
errorText = form.querySelector(".error-txt");

form.onsubmit = (e)=>{
    e.preventDefault();
}


continueBtn.onclick = ()=>{
    // Get the input fields
    const inputs = form.querySelectorAll('input[type="text"], input[type="password"]');

    // Check if all fields are filled
    let allFilled = true;
    inputs.forEach(input => {
        if(input.value.trim() === '') {
            allFilled = false;
        }
    });

    // If not all fields are filled, show the error text and return
    if(!allFilled) {
        errorText.textContent = 'Please fill all the fields.';
        errorText.style.display = 'block';
        return;
    }

    // If all fields are filled, proceed with the AJAX request
    let xhr = new XMLHttpRequest();
    xhr.open("POST", "php/signup.php", true);
    xhr.onload = ()=>{
        if(xhr.readyState === XMLHttpRequest.DONE){
            if(xhr.status === 200){
                let data = xhr.response;
                if(data == "success"){
                    location.href = "users.php";
                }else{
                    errorText.textContent = data;
                    errorText.style.display = "block";
                }
            }
        }
    }
    let formData = new FormData(form);
    xhr.send(formData);
}