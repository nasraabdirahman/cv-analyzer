# cv-analyzer
Llama3 reads and comparing users cv to job description. The ai decides if the person is qualified or not.

## Setting Up Ollama

This project uses the **Llama 3** model through **Ollama**. The model must be installed locally before running the application.

### 1. Install Ollama

Download and install Ollama:

https://ollama.com/download

### 2. Download the model

Open a terminal and run:

```bash
ollama run llama3
```

The first time you run this command, Ollama will automatically download the model. This may take several minutes depending on your internet connection.

### 3. Verify Ollama is running

You should receive a response from the model after entering a prompt. If you do, the installation was successful.

### 4. Start the Flask application

Run your Flask project as usual. The application communicates with Ollama through:

```
http://localhost:11434
```

> **Note:** Ollama must be running whenever you use the application.


## How to start the website
Be in the working directory: [root](./).
Dependecies:

Flask: `pip install flask`

Redis: `pip install redis`

Open Docker 
```
docker run --name redis -p 6379:6379 -d redis
```
Start the app
```
python app.py
```
Open the app in the webbrowser with: 

`http://127.0.0.1:5000`

Followed by the name of the selected page:

`/create`

`/market`
