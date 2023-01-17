const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator{
     
    constructor(previousOperationText,currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""

    }
    // Adicionando digito a tela addDigt() 1º passo
    addDigit(digit){

    // Checando se a opreção corrente ja tem um ponto
    
    if(digit === "." && this.currentOperationText.innerText.includes(".")){
        return;
    }

        this.currentOperation = digit
        this.upDateScreen()

    }
    //Precessa todas as operações

    processOperation(operation){
        //Checar e o valor atal está vazio
        if(this.currentOperationText.innerText ==="" && operation !== "C"){
            // Muda operação
            if(this.previousOperationText.innerText !== ""){ 
                this.changeOperation(operation);  
                
            }
            return;
        }

        //Pegar o valor atual eo antetior

        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;



        switch(operation){
            case "+":
                operationValue = previous + current
                this.upDateScreen(operationValue, operation,current,previous)
                break;
            case "-":
                operationValue = previous - current
                this.upDateScreen(operationValue, operation,current,previous)
                break
            case "/":
                operationValue = previous / current
                this.upDateScreen(operationValue, operation,current,previous)
                break
            case "*":
                operationValue = previous * current
                this.upDateScreen(operationValue, operation,current,previous)
                break;
            case "DEL":
                this.processDelOperator()
                break;
            case "CE":
                this.processCEOperator()
                break;
            case "C":
                this.processCperator()
                break;
            case "=":
                this.processEqualsOperator()
                break;
                default:
                return;
        }


    }

    //Muda os valores da tela da calculadora
    upDateScreen(operationValue = null, operation= null,current=null, previous=null){

        

       if(operationValue===null){
        this.currentOperationText.innerText += this.currentOperation;
       }else{

        //Checa se o valor é zero, se ele for adicionado o valor atual
        if(previous === 0){
            operationValue = current
        }
        //Adicviona o valor atual ao previous
        this.previousOperationText.innerText = `${operationValue} ${operation}`
        this.currentOperationText.innerText = ""

       }
    }

    //Chang
    changeOperation(operation){
        const mathOperations =["*","/","-","+"]

        if(!mathOperations.includes(operation)){
            return
        }

        this.previousOperationText.innerText = this.previousOperationText.innerText.slice(0, -1) + operation
    }
    processDelOperator(){
        this.currentOperationText.innerText= 
            this.currentOperationText.innerText.slice(0,-1);
    }

    processCEOperator(){
        this.currentOperationText.innerText= "";
    }

    processCperator(){
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
    }
    processEqualsOperator(){
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}
    const calc  = new Calculator(previousOperationText,currentOperationText);
buttons.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        const value = e.target.innerText;

        if(+value >= 0  || value === "."){
            calc.addDigit(value);
        }else{
            calc.processOperation(value)
        }
    })
})