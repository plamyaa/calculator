function calc(operation, num1, num2) 
{
    const ifNotValid = num1 === undefined || num2 === undefined || typeof num1 != 'number' || typeof num2 != 'number'
    if(ifNotValid) 
    {
        return ('Error');
    }
    let operations = {
        '+': num1 + num2,
        '-': num1 - num2,
        '×': num1 * num2,
        '÷': (num2 === 0) ? ('Error') : num1 / num2,
    };
    return operations[operation];
}
let operations = {
    '+': 1,
    '-': 2,
    '×': 3,
    '÷': 4
};
import {resultOutput, calcBtnsNum, calcBtnDel, calcBtnClear, calcBtnsOperators, calcBtnEqual} from './view.js'

let a = '0';
let b = '';
let operator = '';
let globalCounter = 0;
let operationCounter = 0;
calcBtnsNum.forEach (function (calcBtnNum) {
    calcBtnNum.addEventListener('click', function(){
        if (resultOutput.textContent.length < 5 && !operator) {
            ++globalCounter;
            resultOutput.textContent = resultOutput.textContent === '0' ? calcBtnNum.textContent : (resultOutput.textContent + calcBtnNum.textContent)
            if (calcBtnNum.textContent === '0' && resultOutput.textContent === '0') 
                globalCounter--;
            a = resultOutput.textContent
        }
        else if (resultOutput.textContent.length < 11 && operator) {
            ++globalCounter;
            resultOutput.style.fontSize = resultOutput.textContent.length > 4 ? '40px' : null;
            resultOutput.textContent = resultOutput.textContent === '0' ? calcBtnNum.textContent : (resultOutput.textContent + calcBtnNum.textContent)
            if (calcBtnNum.textContent === '0' && resultOutput.textContent === '0') 
                globalCounter--;
            !operator ? a = resultOutput.textContent : b = resultOutput.textContent.slice(a.length + 1, resultOutput.textContent.length);
        }

    })
})

calcBtnDel.addEventListener('click', function(){
    globalCounter = resultOutput.textContent.length;
    if (globalCounter > 1){
        if (resultOutput.textContent.slice(-1) in operations) {
            operationCounter = 0;
            operator = '';
        }
        resultOutput.textContent = resultOutput.textContent !== '' ? resultOutput.textContent.slice(0, - 1): '0' ;
        !operator ? a = resultOutput.textContent : b = resultOutput.textContent.slice(a.length + 1, resultOutput.textContent.length);
        globalCounter--;
        if (globalCounter < 6){
            resultOutput.style.fontSize = null;
        }
    }
    else if (globalCounter <= 1){
        resultOutput.textContent = '0';
        globalCounter = 0;
        operationCounter = 0;
    }
})

calcBtnsOperators.forEach (function (calcBtnOperator) {
    calcBtnOperator.addEventListener('click', function(){
        ++operationCounter;
        if (operationCounter == 1){
            resultOutput.style.fontSize = resultOutput.textContent.length > 4 ? '40px' : null;
            resultOutput.textContent += calcBtnOperator.textContent;
            globalCounter++;
            operator = calcBtnOperator.textContent;
        }
    })
})

calcBtnEqual.addEventListener('click', function() {
    if (b) {
        resultOutput.textContent = String(calc(operator, +a, +b)).slice(0, 11);
        resultOutput.style.fontSize = resultOutput.textContent.length > 5 ? '40px' : null;
        operationCounter = 0;
        a = resultOutput.textContent;
        b = '';
    }
    
})

calcBtnClear.addEventListener('click', function(){
    resultOutput.style.fontSize = null;
    resultOutput.textContent = '0';
    a = '0';
    b = '';
    operator = '';
    globalCounter = 0;
    operationCounter = 0;
});
