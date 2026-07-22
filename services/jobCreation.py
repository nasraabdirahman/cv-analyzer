from database.redisClient import db
import time

r = db.db_connection()


class Job_creation:
    #create a job annonce
    def creating_job(self, company, title, location, shortDescription, longDescription, releaseDate, removalDate, startDate):
        job_id = r.incr("next_job_id")
        r.hset (f"job:{job_id}", mapping={
            'company': company,
            'title': title,
            'location': location,
            'shortDescription': shortDescription,
            'longDescription': longDescription,
            #unix for this
            'releaseDate': releaseDate,
            'removalDate': removalDate,
            'startDate': startDate,
            'applyCounter': 0
        })
        #get the current unix_timestamp
        unix_timestamp = int(time.time())
        # do a list of jobs. sorted by latest date. only the number
        r.zadd("jobs:by-create-date", {job_id: unix_timestamp})
        return job_id