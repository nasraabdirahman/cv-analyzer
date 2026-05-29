import ollama
from readfile import cv_file, job_des_file
#create client
client = ollama.Client()
#define model
model = "llama3"

cv = cv_file()
job = job_des_file()

#print(f""" {cv}, {job} """)
#specify what ollama should do
prompt = f"""
You are recruter. 
CV: {cv} 
Job description: {job}. 
Determine wheter the canditate is qualified"""
#send th query to the model
response = client.generate(model = model, prompt=prompt)
#print response
print("Response from Ollama:")
print(response.response)