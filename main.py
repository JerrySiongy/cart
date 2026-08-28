from flask import Flask, render_template


app = Flask(__name__)


app.secret_key = 'asjnjkabsfkasdnfafhaiouefaoufheuafejfa230029jrysabjfjasdafaosiongy254'

@app.route('/')
def home():

    return render_template('index.html')

@app.route('/cart')
def cart():

    return render_template('cart.html')


app.run(debug=True)