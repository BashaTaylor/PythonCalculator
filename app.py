from flask import Flask, render_template, request, redirect, url_for
import os
import datetime
import re

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'fallback_key')

# Example in-memory storage for history
calculations = []

def calculate_expression(expression):
    try:
        # Replace percentage expressions with their calculated values
        expression = re.sub(r'(\d+(\.\d+)?)%','(\\1/100)', expression)
        # Evaluate the expression
        result = eval(expression)
        return f"{result:,.2f}" if isinstance(result, (int, float)) else 'Error'
    except Exception as e:
        return 'Error'

@app.route('/', methods=['GET', 'POST'])
def index():
    global calculations
    expression = request.form.get('expression', '')  # Retrieve expression from hidden field
    result = ''
    
    if request.method == 'POST':
        button = request.form.get('button')
        if button == 'C':
            expression = ''  # Clear the expression
        elif button == 'Backspace':
            expression = expression[:-1]  # Remove last character
        elif button == '=':
            result = calculate_expression(expression)
            # Save to history
            calculations.append({'expression': expression, 'result': result, 'timestamp': datetime.datetime.now()})
            expression = ''  # Clear expression after calculation
        else:
            expression += button  # Append the clicked button to the expression
        
    return render_template('calculator.html', expression=expression, result=result, calculations=calculations)

@app.route('/clear-history', methods=['POST'])
def clear_history():
    global calculations
    calculations = []
    return redirect(url_for('index'))

if __name__ == "__main__":
    app.debug = True
    app.run(host='0.0.0.0', port=5000)


