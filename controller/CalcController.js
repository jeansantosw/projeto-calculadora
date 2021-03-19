/*
        setTimeout(()=>{                    SetTimeout espera um tempo em 'milissegundos'para que ele seja visivel ao usuário.
            clearTimeout( interval );       nesse caso ele está usando o clearTimeout para parar o setInterval passando uma string
        }, 10000)                           com a id do setInterval
        */
        class calcController {
            constructor() {
        
                this._lastOperator = '';
                this._lastNumber = '';
                this._operation = [];
                this._localeDate = "pt-BR";
                this._displayCalcEl = document.querySelector("#display");
                this._correntDateEl = document.querySelector("#data");
                this._hourEl = document.querySelector("#hora")
                this.selectButtons();
                this._correntDate;
                this.initialize();
            }
        
            initialize() {
        
                this.setDisplayDateTime()
        
                setInterval(() => {
        
                    this.setDisplayDateTime()
        
                }, 1000);
                this.setLastNumberToDisplay();
        
            }
        
            addEventListenerAll(element, events, func) {
        
                events.split(' ').forEach(event => {
                    element.addEventListener(event, func, false);
                }
                )
        
            }
        
            // Start of calculator operation
        
            clearAll() {
        
                this._operation = [];
                this._lastNumber = '';
                this._lastOperator = '';
        
                this.setLastNumberToDisplay();
            }
        
            clearEntry() {
        
                this._operation.pop();
                this.setLastNumberToDisplay();
            }
        
        
            getLastOperation() {
        
                return this._operation[this._operation.length - 1];
        
            }
        
            getOperation(value) {
                return ([' + ', ' - ', ' * ', ' / ', ' % '].indexOf(value) > -1);
            }
        
            setLastOperation(value) {
                return this._operation[this._operation.length - 1] = value;
            }
        
            pushOperation(value) {
                this._operation.push(value);
        
                if (this._operation.length > 3) {
                    this.calc();
        
                }
        
            }
            // TESTE
            getResult() {
               
                return eval(this._operation.join(""));
            }
        
            calc() {
                let last = '';
                this._lastOperator = this.getLastItem();
        
                if (this._operation.length < 3) {
        
                    let firstItem = this._operation[0];

                    this._operation = [firstItem, this._lastOperator, this._lastNumber];
        
                }
        
                if (this._operation.length > 3) {
        
                    last = this._operation.pop();
                    this._lastNumber = this.getResult();
        
                } else if (this._operation.length == 3) {
        
                    this._lastNumber = this.getLastItem(false);
        
                }
           
                let result = this.getResult();
        
                if (last == ' % ') {
                    result /= 100;
                    this._operation = [result];
        
                  
        
                } else {
                    this._operation = [result];
        
                    if (last) this._operation.push(last);
        
        
        
                }
        
                this.setLastNumberToDisplay();
            }
        
            getLastItem(getOperation = true) {
        
                let lastItem;
        
                for (let i = this._operation.length - 1; i >= 0; i--) {
        
                    if (this.getOperation(this._operation[i]) == getOperation) {
                        lastItem = this._operation[i];
                        break;
                    }
                }
        
                if (!lastItem) {
                    lastItem = (getOperation) ? this._lastOperator : this._lastNumber; //IF alternario sempre retorna true.  ? segnifica então, : segnifica se nao for verdade
        
                }
                return lastItem;
            }
        
            setLastNumberToDisplay() {
        
                let lastNumber = this.getLastItem(false);
                
                if (!lastNumber) lastNumber = 0;
                
        
                this.displayCalc = lastNumber;
            }
        
            addOperation(value) {
        
                if (isNaN(this.getLastOperation())) { // Utimo valor do array não é um número.
        
                    if (this.getOperation(value)) {
        
                        this.setLastOperation(value);
        
                    } else {
                        this.pushOperation(value); //Adicionar a primeira possição no array.
                        this.setLastNumberToDisplay();
        
                    }
        
                } else {
                    // O ultimo valor do array é um numero.
                    if (this.getOperation(value)) {  // verifica se a possição atual do array é uma operação.
        
                        this.pushOperation(value);
        
                    } else {
        
                        let newValue = this.getLastOperation().toString() + value.toString();
        
        
                        this.setLastOperation(newValue);
        
                        this.setLastNumberToDisplay();
        
                    }
        
                }
        
        
            }
        
            setError() {
                this.displayCalc = "Error"
            }
        
        
            // End of operation on the calculator

            addDot(){

                let lastOperation = this.getLastOperation();

                if (typeof lastOperation === 'string' && lastOperation.split('').indexOf('.') > -1) return;
                
                if (this.getOperation(lastOperation) || !lastOperation) {
                    this.pushOperation('0.');
                }else{
                    this.setLastOperation(lastOperation.toString() + '.');
                }

                this.setLastNumberToDisplay();
                
            }
        
            execButtons(value) {
        
                switch (value) {
                    case 'ac':
                        this.clearAll();
                        break;
                    case 'ce':
                        this.clearEntry();
                        break;
                    case 'porcento':
                        this.addOperation(' % ');
                        break;
                    case 'ponto':
                        this.addDot();
                        break;
                    case 'igual':
                        this.calc();
                        break;
                    case 'soma':
                        this.addOperation(' + ');
                        break;
                    case 'subtracao':
                        this.addOperation(' - ');
                        break;
                    case 'divisao':
                        this.addOperation(' / ');
                        break
                    case 'multiplicacao':
                        this.addOperation(' * ');
                        break;
        
                    case '0':
                    case '1':
                    case '2':
                    case '3':
                    case '4':
                    case '5':
                    case '6':
                    case '7':
                    case '8':
                    case '9':
                        this.addOperation(parseInt(value));
                        break;
        
                    default:
                        this.setError();
                        break;
                }
        
            }
        
        
            // Seleção do botão pelo usuario. 
        
        
            selectButtons() {
                let buttons = document.querySelectorAll("#buttons > g, #parts > g")
        
                buttons.forEach((btn, index) => {
        
                    this.addEventListenerAll(btn, 'click drag', e => {
                        let textBtn = btn.className.baseVal.replace("btn-", "")
        
                        this.execButtons(textBtn);
                    });
        
                    this.addEventListenerAll(btn, 'mouseover mouseup mousedown', e => {
                        btn.style.cursor = "pointer"
                    })
        
                });
        
            }
        
            setDisplayDateTime() {
                this.displayTime = this.correntDate.toLocaleTimeString(this._localeDate);
                this.displayCorrentDate = this.correntDate.toLocaleDateString(this._localeDate, {
                    day: '2-digit',
                    month: 'short',
                    year: 'numeric'
                }
                );
        
            }
        
            get displayTime() {
                return this._hourEl.innerHTML;
            }
        
            set displayTime(value) {
                this._hourEl.innerHTML = value;
            }
        
            get displayCorrentDate() {
                return this._correntDateEl.innerHTML;
            }
        
            set displayCorrentDate(value) {
                this._correntDateEl.innerHTML = value;
            }
        
            get displayCalc() {
                return this._displayCalcEl.innerHTML;
            }
            set displayCalc(value) {
                this._displayCalcEl.innerHTML = value;
            }
        
            get correntDate() {
                return new Date();
            }
            set correntDate(value) {
                this._correntDateEl.innerHTML = value;
            }
        }