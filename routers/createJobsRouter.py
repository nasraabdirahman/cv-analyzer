from flask import Flask, Blueprint, request
import redis
import json
from services.jobCreation import Job_creation

class Job_Creation:
    def __init__(self):
        #creating a blueprint
        self.bp = Blueprint("jobs", __name__)
    def register_routes(self):
        self.bp.route("/jobCreation", methods=["POST"])(self.job_created)

#Handles the submitted data
    def job_created():
        job_id = Job_creation.creating_job(
            request.form["company"],
            request.form["title"],
            request.form["description"],
            request.form["startDate"],
            request.form["endDate"]
        )
        return f"job created {job_id}"