from flask import Flask, Blueprint, render_template, request
from services.jobCreation import Job_creation
from services.extractInfo import Extract_details

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
            request.form["description"],
            request.form["startDate"],
            request.form["endDate"]
        )
        return "Job Created"
    return render_template("jobCreation.html")

@app.route("/mainPage")
def main_page():
    jobs = Extract_details.get_jobs()
    return render_template("market.html", jobs=jobs)
if __name__ == "__main__":
    # runs in http://127.0.0.1:5000
    app.run(debug=True)