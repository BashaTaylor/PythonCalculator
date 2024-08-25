function appendToDisplay(value) {
    var display = document.getElementById('display');
    display.value += value;
}

function clearDisplay() {
    var display = document.getElementById('display');
    display.value = '';
}

function backspace() {
    var display = document.getElementById('display');
    display.value = display.value.slice(0, -1);
}

function formatNumberWithCommas(number) {
    // Ensure the number is a valid number
    if (isNaN(number)) {
        return number;
    }

    // Round the number to two decimal places
    number = parseFloat(number).toFixed(2);

    // Add commas for thousands
    const [integerPart, decimalPart] = number.split('.');
    const formattedIntegerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${formattedIntegerPart}.${decimalPart}`;
}

function calculate() {
    var display = document.getElementById('display');
    var expression = display.value;
    var result;

    try {
        // Perform the calculation
        result = eval(expression);

        // Check if the result is a number
        if (typeof result === 'number' && !isNaN(result)) {
            // Round to 2 decimal places and format with commas
            result = formatNumberWithCommas(result);
            display.value = result;
        } else {
            display.value = 'Error';
        }
    } catch (error) {
        display.value = 'Error';
        console.error('Calculation Error:', error);
    }
}




function calculatePercentage() {
    var display = document.getElementById('display');
    var expression = display.value;

    console.log('Original Expression:', expression);

    var lastNumberMatch = expression.match(/(\d+\.?\d*)$/);

    if (lastNumberMatch) {
        var lastNumber = parseFloat(lastNumberMatch[0]);
        var percentage = lastNumber / 100;

        console.log('Last Number:', lastNumber);
        console.log('Calculated Percentage:', percentage);

        expression = expression.replace(/(\d+\.?\d*)$/, percentage.toString());
        display.value = expression;
    }
}
