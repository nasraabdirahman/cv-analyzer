from flask import Flask, Blueprint, render_template
from routers.createJobsRouter import Job_Creation
from services.extractInfo import Extract_details

#creates a web aplication object
app = Flask(__name__)

#shows the page
@app.route("/create")
def job_post():
    return render_template("jobCreation.html")

@app.route("/mainPage")
def main_page():
    jobs = Extract_details.get_jobs()
    return render_template("market.html", jobs=jobs)

job_controller = Job_Creation()
app.register_blueprint(job_controller.bp)
if __name__ == "__main__":
    # runs in http://127.0.0.1:5000
    app.run(debug=True)