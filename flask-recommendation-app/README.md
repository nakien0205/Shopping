# Flask Recommendation App

This is a simple Flask application that provides product recommendations from a dataset of Amazon products.

## Project Structure

```
flask-recommendation-app
├── app.py                  # Main entry point of the Flask application
├── data
│   └── Amazon_products.csv  # CSV file containing product data
├── templates
│   └── index.html          # HTML template for the main page
├── static
│   ├── css
│   │   └── style.css       # CSS styles for the application
│   └── js
│       └── script.js       # JavaScript for client-side interactions
├── requirements.txt        # List of dependencies
└── README.md               # Project documentation
```

## Setup Instructions

1. **Clone the repository**:
   ```
   git clone <repository-url>
   cd flask-recommendation-app
   ```

2. **Install dependencies**:
   It is recommended to use a virtual environment. You can create one using:
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```
   Then install the required packages:
   ```
   pip install -r requirements.txt
   ```

3. **Run the application**:
   Start the Flask application by running:
   ```
   python app.py
   ```
   The application will be available at `http://127.0.0.1:5000`.

## Usage

- Navigate to the main page of the application in your web browser.
- Click the button to get a random product recommendation.
- The application will display the product's title, final price, rating, and URL.

## License

This project is licensed under the MIT License.