import os
from database.redisClient import db
from flask import Flask, Blueprint, render_template, request, redirect, url_for, flash, jsonify
from ollama import generate
from services.jobCreation import Job_creation
from services.extractInfo import Extract_details
from services.application import Job_application
from services.validation import Validation
from werkzeug.utils import secure_filename

#creates a web aplication object
app = Flask(__name__)
app.secret_key = "your-secret-key"
r = db.db_connection()
upload_folder = "uploads"
os.makedirs(upload_folder, exist_ok=True)

@app.route("/")
def route_index():
    return render_template("index.html")

@app.route("/api/get-jobs")
def api_newJobs():
    # 📌 if multiple keys.
    jobID = request.args.getlist("id", type=int)
    if jobID != None:
        jobs = []
        for _id in jobID:
            job = r.hgetall(f"job:{_id}")
            job["job"] = _id
            jobs.append(job)
        return jsonify(jobs)

    # 📌 if requesting a sorted list.
    limit = request.args.get("limit", default=5, type=int)
    key = request.args.get("list-key", type=str) 
    if key != None:
        list_jobID = r.zrevrange(key, 0, limit - 1)
        jobs = []
        for _id in list_jobID:
            job = r.hgetall(f"job:{_id}")
            job["job"] = key
            jobs.append(job)
        return jsonify(jobs)
    
    arg = request.query_string.decode("utf-8")
    if arg == "":
        return jsonify([]) 
    return jsonify({"title":"Invalid Request", "shortDescription":f"request.args: \"{arg}\""})

@app.route("/api/ai-analyze")
def api_ai_analyze():
    desc = request.args.get("self-description", type=str)
    if desc == "":
        return jsonify({"response":"Fill your self description to get analyzes form our AI ;)"})
    
    jobID = request.args.get("id", type=int)
    job = r.hgetall(f"job:{jobID}")
    jobShortDesc = job.get("shortDescription")
    jobLongDesc = job.get("longDescription")
    if jobShortDesc == None or jobLongDesc == None:
        return jsonify({"response": "The job has no description"})

    jobDesc = "<The job description starts here>" + jobShortDesc + jobLongDesc + "<The job description ends here>"
    restriction = "Be concise and direct. Do not include acknowledgements, pleasantries, or filler. Start with the answer immediately. Analyze if the user is capable of this job based on the user prompt. "

    res = generate(model='llama3', prompt=desc, system = restriction + jobDesc)
    return jsonify({"response": res.get("response")})


#shows the page
@app.route("/create", methods=["GET", "POST"])
def job_post():
    if request.method == "POST":
        service = Job_creation()
        service.creating_job(
            request.form["company"],
            request.form["title"],
            request.form["location"],
            request.form["shortDescription"],
            request.form["longDescription"],
            request.form["releaseDate"],
            request.form["removalDate"],
            request.form["startDate"]
        )
        flash("Job created successfully!") #flask stores the first POST request data as a message
        return redirect(url_for("main_page")) ##why is the market called main_page?
    return render_template("jobCreation.html")

@app.route("/market")
def market():
    jobs = Extract_details.get_jobs()
    return render_template("market.html", jobs=jobs)

@app.route("/job/<job_id>", methods=["GET", "POST"])
def apply(job_id):
    job = Extract_details.get_job(job_id)
    if request.method == "POST":
        errors = Validation.validate_application(request)
        if errors :
            return render_template("apply.html", job=job, errors=errors)
        
        cv = request.files["cv"]
        coverLetter = request.files["coverLetter"]

        cv_filename =secure_filename(cv.filename)
        coverLetter_filename =secure_filename(coverLetter.filename)

        cv.save(os.path.join("uploads", cv_filename))
        coverLetter.save(os.path.join("uploads", coverLetter_filename))
        
        service = Job_application()
        service.creating_application(
            job_id,
            request.form["firstName"],
            request.form["lastname"],
            request.form["phonenumber"],
            request.form["email"],
            cv_filename,
            coverLetter_filename
        )
        flash("Application Created") 
        return redirect(url_for("market"))
    return render_template("apply.html", job=job)

if __name__ == "__main__":
    # runs in http://127.0.0.1:5000
    app.run(debug=True)