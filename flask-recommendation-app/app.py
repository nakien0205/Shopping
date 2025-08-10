from flask import Flask, jsonify, render_template
import pandas as pd
import os

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/recommend', methods=['GET'])
def recommend():
    try:
        # Get the absolute path to the CSV file
        csv_path = os.path.join(os.path.dirname(__file__), 'data', 'Amazon_products.csv')
        
        # Load the product data from the CSV file
        products = pd.read_csv(csv_path)
        
        # Select a random product
        random_product = products.sample().iloc[0]
        
        # Prepare the response
        response = {
            'title': random_product['title'],
            'final_price': random_product['final_price'],
            'rating': random_product['rating'],
            'url': random_product['url']
        }
        
        return jsonify(response)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)