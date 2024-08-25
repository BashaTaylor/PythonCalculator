from flask import Flask, render_template, request, redirect, url_for
from flask_wtf import CSRFProtect
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
import os


app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'fallback_key')  # Use a fallback key for local development

csrf = CSRFProtect(app)

class CalculatorForm(FlaskForm):
    expression = StringField('')
    submit = SubmitField('=')
    clear_history = SubmitField('Clear History')

calculations = []

@app.route('/', methods=['GET', 'POST'])
def calculator():
    form = CalculatorForm()
    result = None
    if form.validate_on_submit():
        if form.expression.data:
            expression = form.expression.data
            try:
                result = eval(expression)
                calculations.append({'expression': expression, 'result': result})
            except Exception as e:
                result = 'Error'
        elif form.clear_history.data:
            calculations.clear()
        return redirect(url_for('calculator'))
    return render_template('calculator.html', form=form, result=result, calculations=calculations)

@app.route('/calculate', methods=['POST'])
def calculate():
    expression = request.form['expression']

    try:
        # Perform the calculation
        result = eval(expression)

        # Format the result to 2 decimal places
        formatted_result = "{:.2f}".format(result)

        # Add the formatted result to the history
        calculations.append(f"{expression} = {formatted_result}")

    except Exception as e:
        formatted_result = "Error"

    return render_template('calculator.html', result=formatted_result, calculations=calculations)





@app.route('/clear_history', methods=['POST'])
def clear_history():
    calculations.clear()
    return redirect(url_for('calculator'))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
