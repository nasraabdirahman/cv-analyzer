import os
from flask import Flask, Blueprint, render_template, request
from services.jobCreation import Job_creation
from services.extractInfo import Extract_details
from services.application import Job_application
from services.validation import Validation
from werkzeug.utils import secure_filename

#creates a web aplication object
app = Flask(__name__)
upload_folder = "uploads"
os.makedirs(upload_folder, exist_ok=True)

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
        return "Job Created"
    return render_template("jobCreation.html")

@app.route("/market")
def main_page():
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
        return "Application Created"
    
    return render_template("apply.html", job=job)

if __name__ == "__main__":
    # runs in http://127.0.0.1:5000
    app.run(debug=True)