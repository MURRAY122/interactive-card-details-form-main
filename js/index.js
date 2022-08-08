
/* Display thank you message on form vaild  */
const formBox = document.getElementById('formBox');
const thanksBox = document.getElementById('thanksBox');
function displayThanks(){
    formBox.classList.add('hide');
    thanksBox.classList.remove('hide');
}

/* Display a form error div when child is not vaild and add class to input  */
function displayErrorMsg(parent, child, msg){
    //Check if parent has error already and remove
    let oldError = parent.querySelector('.section__content__form__error');
    if(oldError != null || oldError != undefined){
        parent.removeChild(oldError);
    }
    // Romve error border for input
    child.classList.remove('section__content__form-inputs-error');

    if(msg != ""){
    //Create new error to display
    const div = document.createElement("div");
    div.classList.add("section__content__form__error");
    div.innerHTML = msg;
    parent.appendChild(div);
    child.classList.add('section__content__form-inputs-error');
    }
}

/* Check if input element is valid and return true if so. Also updates displayed cards with inputs value  */
const displayCardNum = document.getElementById('disCard-number');
const displayCardName = document.getElementById('disCard-name');
const displayCardMon = document.getElementById('disCard-mon');
const displayCardYear = document.getElementById('disCard-year');
const displayCardCvc = document.getElementById('disCard-cvc');

function checkValid(e){
    var parentNode;
    // Set parent node from input element
    if(e.target == undefined){
        input = e;
        parentNode = e.parentNode;
    } else {
        input = e.target;
        parentNode = e.target.parentNode;
    }

    var numRegExp = /[a-zA-Z]/g; //To check for letters in string
    var stringRegExp = /[0-9]/; //To check for numbers in string

    // Switch input and validate | Return false if not valid
    switch (input.getAttribute('name')) {
        case "card-name":
            if(typeof input.value != 'string' || input.value.length == 0 ){
                displayErrorMsg(parentNode,input, "Can't be blank");
                return false;
            }
            if(stringRegExp.test(input.value)){
                displayErrorMsg(parentNode, input, "Wrong format, letters only");
                return false;
            }
            displayCardName.innerHTML = input.value;
            break;
        case "card-number":
            if(input.value.length == 0 ){
                displayErrorMsg(parentNode,input,"Can't be blank");
                return false;
            }
            if(typeof parseInt(input.value) != 'number' || numRegExp.test(input.value)){
                displayErrorMsg(parentNode, input, "Wrong format, numbers only");
                return false;
            }
            if(input.value.length < 16 || input.value.length > 16){
                displayErrorMsg(parentNode, input, "Must only be 16 characters long");
                return false;
            }
            // Long way to go about it but will update later
            var newValue = input.value.substring(0,4)+" " + input.value.substring(4,8) + " " + input.value.substring(8,12) + " " + input.value.substring(12,16);
            displayCardNum.innerHTML = newValue;
            break;                
        case "card-month":
            if(typeof parseInt(input.value) != 'number' || input.value.length == 0 ){
                displayErrorMsg(parentNode, input, "Can't be blank");
                return false;
            }
            if(parseInt(input.value) > 12 || parseInt(input.value) <= 0){
                displayErrorMsg(parentNode, input, "Wrong format, month only");
                return false;
            }
            displayCardMon.innerHTML = input.value;
            break;
        case "card-year":
            if(typeof parseInt(input.value) != 'number' || input.value.length == 0 ){
                displayErrorMsg(parentNode, input, "Can't be blank");
                return false;
            }
            if(input.value.length > 2 || input.value.length < 2){
                displayErrorMsg(parentNode, input, "Wrong format, year only");
                return false;
            }
            displayCardYear.innerHTML = input.value;
            break;
        case "card-cvc":
            if(typeof parseInt(input.value) != 'number' || input.value.length == 0 ){
                displayErrorMsg(parentNode, input, "Can't be blank");
                return false;
            }
            if(numRegExp.test(input.value)){
                displayErrorMsg(parentNode, input, "Can't contain letters");
                return false;
            }
            if(input.value.length > 3 || input.value.length < 3){
                displayErrorMsg(parentNode, input, "Wrong format, 3 digits only");
                return false;
            }
            displayCardCvc.innerHTML = input.value;
            break;
        default:
            return false;
            break;
    }
    //Remove on error displayed
    displayErrorMsg(parentNode, input, "");
    //Return true for vaild form
    return true;
}


function main(){
    // Get form inputs and submit button
    var elements = document.getElementsByTagName("INPUT");
    var submitBtn = document.getElementById('formSubmitBtn');

    //add listener to submit btn
    submitBtn.addEventListener('click', function(){
        var isValid = true;
        var checksValid = true;
        // For each input check if vaild
        for (var i = 0; i < elements.length; i++) {
                if(checksValid){
                checksValid  = checkValid(elements[i]);
                if(checksValid == false){
                    isValid = false;
                }
            }
        }
        // if form valid display thanks
        if(isValid){
            return displayThanks();
        } else {
            //else return
            return;
        }
        })

    //Add event listeners to inputs
    for (var i = 0; i < elements.length; i++) {
        elements[i].addEventListener('change', function(e){
            checkValid(e);
        })
    }
}

// Start Main JS
main();