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
                # Format result to 2 decimal places and add commas
                result = "{:,.2f}".format(result)
                calculations.append({'expression': expression, 'result': result})
            except Exception as e:
                result = 'Error'
        elif form.clear_history.data:
            calculations.clear()
        return redirect(url_for('calculator'))
    return render_template('calculator.html', form=form, result=result, calculations=calculations)

@app.route("/", methods=["GET", "POST"])
def index():
    result = ""
    if request.method == "POST":
        expression = request.form.get("expression")
        try:
            # Perform the calculation
            result = eval(expression)
            # Round the result to 2 decimal places
            result = round(result, 2)
        except Exception as e:
            result = f"Error: {e}"
    return render_template("calculator.html", result=result)

@app.route('/clear_history', methods=['POST'])
def clear_history():
    calculations.clear()
    return redirect(url_for('calculator'))

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
