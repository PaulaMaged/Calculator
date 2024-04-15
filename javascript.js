let expression = [];
let unaryNegative = false;

let buttons = document.querySelectorAll(".buttons-container button");
buttons.forEach(button => button.addEventListener('click', updateExpression))

function isNumber(string) {
    return !isNaN(parseInt(string));
}

function isOperator(string) {
    const opRegex = /\+|\-|x|\//i;
    return opRegex.test(string);
}

function updateExpression(event) {
    const buttonContent = event.target.textContent.trim();

    if(buttonContent == '=') {
        operate();
    }

    if(isNumber(buttonContent)) {
        dealWithNumber(parseInt(buttonContent));
    } 
    else if(isOperator(buttonContent)) {
        dealWithOperator(buttonContent);
    }

    display();

};



