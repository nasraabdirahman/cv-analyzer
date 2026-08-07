from database.redisClient import db

r = db.db_connection()


class Extract_details:
    @staticmethod
    def get_jobs():
        jobs = []
        for key in r.keys("job:*"):
            job = r.hgetall(key)
            #include the job_id in the list
            job["id"] = key.split(":")[1] 
            jobs.append(job)
        
        return jobs
    @staticmethod
    def get_job(job_id):
        job = r.hgetall(f"job:{job_id}")
        job["id"] = job_id
        return job
        
