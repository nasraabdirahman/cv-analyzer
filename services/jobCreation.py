from database.redisClient import db

r = db.db_connection()


class Job_creation:
    #create a job annonce
    def creating_job(self, company, title, description, startDate, endDate):
        job_id = r.incr("next_job_id")
        r.hset (f"job:{job_id}", mapping={
            'company': company,
            'title': title,
            'description': description,
            'startDate': startDate,
            'endDate': endDate
        })
        return job_id