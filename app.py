from flask import Flask

#creates a web aplication object
app = Flask(__name__)

app.register_blueprint()
if __name__ == "__main__":
    # runs in http://127.0.0.1:5000
    app.run(debug=True)