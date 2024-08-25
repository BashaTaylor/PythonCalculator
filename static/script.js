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
    let expression = document.getElementById('expression').value;
    let result;

    try {
        // Perform the calculation
        result = eval(expression);

        // Round the result to 2 decimal places
        result = Math.round(result * 100) / 100;

        document.getElementById('result').innerText = result;
    } catch (error) {
        document.getElementById('result').innerText = 'Error';
    }
}


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

var bgVideo = document.getElementById('bg-video');
if (window.innerWidth <= 768) { // Adjust the width based on your design
    bgVideo.src = "{{ url_for('static', filename='video/numbers-mobile.mp4') }}";
}

function formatNumber(number) {
    // Round to two decimal places
    number = parseFloat(number).toFixed(2);

    // Add commas for thousands
    const parts = number.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join('.');
}

// Update the display with the formatted result
function updateDisplay(result) {
    const display = document.getElementById('result-display');
    display.value = formatNumber(result);
}

