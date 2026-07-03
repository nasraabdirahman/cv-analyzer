# cv-analyzer
Llama3 reads and comparing users cv to job description. The ai decides if the person is qualified or not.

## How to get access to the Model
The model used is llama3. Download llama to get access to the model.

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
`/fullDetailsPage`
