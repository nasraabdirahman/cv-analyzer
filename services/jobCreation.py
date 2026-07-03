from database.redisClient import db

r = db.db_connection()


class Job_creation:
    #create a job annonce
    def creating_job(self, company, title, description, releaseDate, removalDate):
        job_id = r.incr("next_job_id")
        r.hset (f"job:{job_id}", mapping={
            'company': company,
            'title': title,
            'description': description,
            'releaseDate': releaseDate,
            #change name to minimize confusion
            'removalDate': removalDate
        })
        return job_id