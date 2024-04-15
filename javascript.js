const expression = [];
const displayElement = document.querySelector(".display");
let unaryNegative = false;

let buttons = document.querySelectorAll(".buttons-container button");
buttons.forEach(button => button.addEventListener('click', updateExpression))


function lastIndex() {
    return expression.length - 1;
}
function lastElement() {
    return expression[expression.length - 1];
}

function isDigit(string) {
    return !isNaN(string); //implicit conversion from string to Number if it can, thus returning true :D
}

function isOperator(string) {
    const opRegex = /\+|\-$|x|\//i;
    return opRegex.test(string);
}

function updateExpression(event) {
    const buttonContent = event.target.textContent.trim();

    if(buttonContent == '=') {
        operate();
    }

    if(isDigit(buttonContent)) {
        dealWithDigit(buttonContent);
    } 
    else if(isOperator(buttonContent)) {
        dealWithOperator(buttonContent);
    }

    else if(buttonContent == 'CE')
        expression.pop();
    
    display();
    
};

function divide(op1, op2) {
    if(op2 == 0) {
        alert(  "I see what your doing over there -_-\n" +
                "\tBe more careful next time...\n" +
                "\t\tpeople be breakin calculators like they made of nothin");
                
        expression = [];
    }
    return op1 / op2;
}

function multiply(op1, op2) {
    return op1 * op2;
};

function subtract(op1, op2) {
    return op1 - op2;
}

function add(op1, op2) {
    return op1 + op2;
}

function operate() {

    if(expression.length > 3) {
        if(expression.length > 3) return console.error("expression has more elements than normal!");
        return;
    }

    if(expression.length < 3) {
        alert("an expression needs at least 2 operands to get result");
        return;
    }

    const operand2 = +expression.pop();
    const operator = expression.pop();
    const operand1 = +expression.pop();




    
    let result = 0;
    
    switch(operator){
        case "/": result = divide(operand1, operand2); break;
        case "x": result = multiply(operand1, operand2); break;
        case "-": result = subtract(operand1, operand2); break;
        case "+": result = add(operand1, operand2); break;
        default:  throw new Error("undefined operator");
    }
    
    //if float values, then use precision based on min significant number length
    const resultStr = '' + result;

    if(!resultStr.includes('.')) {
        expression.push(resultStr)
    } else {
        const index = resultStr.indexOf('.');
        reducedResult = resultStr.slice(0, index + 4)
        expression.push(reducedResult);
    }

}

function dealWithDigit(operand) {
    //deal first with unary operator (-) before checking for isOperator which might confuse it for binary operator
    if(!expression.length) {
        expression.push(operand);
    } else if(unaryNegative) {
        expression[lastIndex()] += operand;
        unaryNegative = false;

    } else if(isOperator(lastElement())) {
        expression.push(operand);

    } else {
        expression[lastIndex()] += operand;
    }
}

function dealWithUnaryNegativeOperator() {
    if(!expression.length || !isOperator(lastElement)) {
        expression.push('-');
        unaryNegative = true;
    }
}

function dealWithOperator(operator) {
    if(operator == '-') dealWithUnaryNegativeOperator();

    if(!expression.length) return;
    if(unaryNegative) return;

    if(expression.length == 3) {
        operate();
    }
    if(isOperator(lastElement())) {
        console.log("no two consecutive operators allowed except if unary negative");
        return;
    }

    expression.push(operator);
}

function display() {
    let result = "";
    expression.forEach(element => result += element + " ");
    displayElement.textContent = result;
}
