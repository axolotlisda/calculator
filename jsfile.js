//empty variables to use in value manipulation
let operator = '';
let previousValue = '';
let currentValue = '';
let equalsvalue = '';

document.addEventListener("DOMContentLoaded", function(){
  //Store all components on HTML in our JS
  let clear = document.querySelector(".clear");
  let equal = document.querySelector(".equal");
  let decimal = document.querySelector(".decimal");

  let numbers = document.querySelectorAll(".number");
  let operators = document.querySelectorAll(".operator");

  let previousScreen = document.querySelector(".previous");
  let currentScreen = document.querySelector(".current");
  
 

  numbers.forEach((number) => number.addEventListener("click", function(e){
    handleNumber(e.target.textContent);
    currentScreen.textContent = currentValue;
  }));


  operators.forEach((op) => op.addEventListener("click", function(e){
    handleOperator(e.target.textContent);
    previousScreen.textContent = previousValue + " " + operator;
    currentScreen.textContent = currentValue;
  }));

  clear.addEventListener("click", function(){
    previousValue = '';
    currentValue = '';
    operator = '';
    equalsvalue = '';

    previousScreen.textContent = currentValue;
    currentScreen.textContent = currentValue;
  });

      equal.addEventListener("click", function(){
        
        //if user tries to divide by zero
        if(previousValue != '' && operator == '/' && currentValue == '0'){
          console.log("ERRoR");
          currentScreen.textContent = "ERROR! Infinity?";
          currentValue = '';
        }
            else if(currentValue !='' && previousValue != ''){
            calculate();
            previousScreen.textContent = '';

              currentScreen.textContent = previousValue;
              previousValue = '';
              equalsvalue = currentValue;
              currentValue = '';
          }
      });

      decimal.addEventListener("click", function(){
        addDecimal();
      })
  });



function handleNumber(num){
  
  //no to duplicate zeros
  if(currentValue === '0'){
    currentValue = '';
  }

    if(currentValue == '' && equalsvalue != ''){
    equalsvalue = '';
  }
   else if(currentValue.length <= 12){
    currentValue += num;
   }

}


function handleOperator(op){
  
  //if user pressed the equals button the equalsvalue will be transfered to current value so the operation will recommence
  if(equalsvalue != ''){
    currentValue = equalsvalue;
  }
  
  //operator won't press if there is no current number
  if(currentValue === ''){
    return '';
  }
  
  if(previousValue === ''){
    console.log("initial");
    previousValue = currentValue;
    currentValue = '';
    operator = op;
  }


  previousValue = Number(previousValue);
  currentValue = Number(currentValue);


  if(operator === "+" && previousValue != '' && currentValue != ''){
    previousValue += currentValue;
  }
  else if(operator === "-" && previousValue != '' && currentValue != ''){
    previousValue -= currentValue;
  }
  else if (operator === "x" && previousValue != '' && currentValue != ''){
    previousValue *= currentValue;

  }
  else if(operator === "/" && previousValue != '' && currentValue != ''){
    if(previousValue != '' && operator == '/' && currentValue == '0'){
      console.log("ERRoR");
      currentScreen.textContent = "ERROR! Infinity?";
      currentValue = '';
    }
    else{
      previousValue /= currentValue;
    }
    
  }


  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();
  operator = op;
  previousValue = currentValue;
  currentValue = '';
  console.log("prev: "+previousValue);
  console.log("curr: "+currentValue)
}

function calculate(){
  previousValue == '';
  previousValue = Number(previousValue);
  currentValue = Number(currentValue);

  if(operator === "+" && previousValue != '' && currentValue != ''){
    previousValue += currentValue;
  }
  else if(operator === "-" && previousValue != '' && currentValue != ''){
    previousValue -= currentValue;
  }
  else if (operator === "x" && previousValue != '' && currentValue != ''){
    previousValue *= currentValue;
  }
  else if(operator === "/" && previousValue != '' && currentValue != ''){
      previousValue /= currentValue;
  }
  previousValue = roundNumber(previousValue);
  previousValue = previousValue.toString();
  currentValue = previousValue.toString();


}

function roundNumber(num){
  return Math.round(num * 1000)/1000;
}

function addDecimal(){
  if(!currentValue.includes(".")){
    currentValue += '.';
  }
}
