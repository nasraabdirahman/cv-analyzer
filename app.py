from flask import Flask, Blueprint, render_template, request
from services.jobCreation import Job_creation
from services.extractInfo import Extract_details
from services.application import Job_application

#creates a web aplication object
app = Flask(__name__)

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
    if request.method == "POST":
        service = Job_application()
        service.creating_application(
            job_id,
            request.form["firstName"],
            request.form["lastname"],
            request.form["phonenumber"],
            request.form["email"],
            request.form["cv"],
            request.form["coverLetter"]
        )
    print("application Created")
    job = Extract_details.get_job(job_id)
    return render_template("apply.html", job=job)

if __name__ == "__main__":
    # runs in http://127.0.0.1:5000
    app.run(debug=True)