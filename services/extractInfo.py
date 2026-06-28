from database.redisClient import db

r = db.db_connection()


class Extract_details:
    @staticmethod
    def get_jobs():
        job = []
        for key in r.keys("job:*"):
            jobs = r.hgetall(key)

            job.append(jobs)
        
        return job
