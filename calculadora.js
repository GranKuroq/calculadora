let firstNumber = null;
let secondNumber = null;
let currentOperation = null;
let inputComplete = false;
const inputDisplay = document.getElementById('calculator-input');
const logBox = document.getElementById('log-box');
let currentLogEntry = '';  // Variable para almacenar la entrada actual del log
let lastResult = null;  // Variable para almacenar el último resultado

// Función para manejar el ingreso de números
inputDisplay.addEventListener('input', function(e) {
    inputComplete = true;
});

// Función para agregar operaciones al log
function addToLog(entry) {
    logBox.textContent += entry + '\n';
    logBox.scrollTop = logBox.scrollHeight;  // Hacer scroll automáticamente al final
}

// Función para manejar operaciones
function handleOperation(operation) {
    if (inputComplete) {
        if (firstNumber === null) {
            firstNumber = parseFloat(inputDisplay.value);
            currentOperation = operation;
            currentLogEntry = `${firstNumber} ${operation}`;  // Crear la entrada temporal sin imprimir aún
            inputDisplay.value = '';  // Limpiar el visor
            inputComplete = false;
            inputDisplay.focus();  // Mantener el foco en el visor
        }
    }
}

// Función para calcular el resultado y mostrarlo en el log
function calculate() {
    if (inputComplete && currentOperation !== null) {
        secondNumber = parseFloat(inputDisplay.value);
        let result;
        switch (currentOperation) {
            case '+':
                result = firstNumber + secondNumber;
                break;
            case '-':
                result = firstNumber - secondNumber;
                break;
            case '*':
                result = firstNumber * secondNumber;
                break;
            case '/':
                result = firstNumber / secondNumber;
                break;
        }
        currentLogEntry += ` ${secondNumber} = ${result}`;  // Completar la entrada temporal
        logBox.textContent += `\n${currentLogEntry}`;  // Agregar la operación completa al log
        inputDisplay.value = '';  // Limpiar el visor para permitir nuevas operaciones
        firstNumber = null;  // Reiniciar el primer número
        secondNumber = null;
        currentOperation = null;
        inputComplete = false;
        inputDisplay.focus();  // Mantener el foco en el visor tras calcular

        lastResult = result;  // Almacenar el último resultado
    }
}
function pasteLastResult() {
    if (lastResult !== null) {
        inputDisplay.value = lastResult;  // Pegar el último resultado en el visor
        firstNumber = parseFloat(lastResult);  // Convertir el resultado a número para la próxima operación
        currentOperation = null;  // Reiniciar la operación
        inputComplete = false;  // Marcar que la operación no está completa
    }
}




// Agregar eventos a los botones de operaciones
document.getElementById('add').addEventListener('click', function() {
    handleOperation('+');
});
document.getElementById('subtract').addEventListener('click', function() {
    handleOperation('-');
});
document.getElementById('multiply').addEventListener('click', function() {
    handleOperation('*');
});
document.getElementById('divide').addEventListener('click', function() {
    handleOperation('/');
});

// Botón "=" para calcular y mostrar el resultado
document.getElementById('equals').addEventListener('click', function() {
    calculate();
});

// Función para borrar el último número ingresado
document.getElementById('delete-last').addEventListener('click', function() {
    inputDisplay.value = inputDisplay.value.slice(0, -1);
});

// Función para limpiar el historial
document.getElementById('clear-log').addEventListener('click', function() {
    logBox.textContent = '';
});
