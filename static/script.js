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

function calculate() {
    var display = document.getElementById('display');
    var expression = display.value;
    var result;

    try {
        // Perform the calculation
        result = eval(expression);

        // Round the result to 2 decimal places and format with commas
        result = (Math.round(result * 100) / 100).toFixed(2);

        // Update the display with the formatted result
        display.value = result;
    } catch (error) {
        display.value = 'Error';
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

var bgVideo = document.getElementById('bg-video');
if (window.innerWidth <= 768) { // Adjust the width based on your design
    bgVideo.src = "{{ url_for('static', filename='video/numbers-mobile.mp4') }}";
}

function formatNumber(number) {
    // Ensure number is a string with 2 decimal places
    number = Number(number).toFixed(2);

    // Add commas for thousands
    var parts = number.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
}

function updateDisplay(result) {
    const display = document.getElementById('display');
    display.value = formatNumber(result);
}
