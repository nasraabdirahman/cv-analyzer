from database.redisClient import db

r = db.db_connection()

class Job_application:
    #create a job application
    def creating_application(self, job_id, firstName, lastname, phonenumber, email, cv_filename, coverLetter_filename):
        application_id = r.incr("next_application_id")
        r.hset (f"application:{application_id}", mapping={
            'job_id': job_id,
            'firstName': firstName,
            'lastname': lastname,
            'phonenumber': phonenumber,
            'email': email,
            'cv': cv_filename,
            'coverLetter': coverLetter_filename,
        })
        return application_id