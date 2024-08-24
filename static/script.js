function appendToDisplay(value) {
    document.getElementById('display').value += value;
}

function clearDisplay() {
    document.getElementById('display').value = '';
}

function backspace() {
    var display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

// function calculatePercentage() {
//     var display = document.getElementById('display');
//     var currentValue = parseFloat(display.value);
//     if (!isNaN(currentValue)) {
//         display.value = (currentValue / 100).toString();
//     }
// }

function calculatePercentage() {
    const display = document.getElementById('display');
    let expression = display.value;

    console.log('Original Expression:', expression);

    const lastNumberMatch = expression.match(/(\d+\.?\d*)$/);

    if (lastNumberMatch) {
        const lastNumber = parseFloat(lastNumberMatch[0]);
        const percentage = lastNumber / 100;

        console.log('Last Number:', lastNumber);
        console.log('Calculated Percentage:', percentage);

        expression = expression.replace(/(\d+\.?\d*)$/, percentage.toString());
        display.value = expression;
    }
}


