from services.job import Job


def test_job(mocker): 
    fake_redis = mocker.Mock()
    fake_redis.incr.return_value = 1
    #variable r on "job.py" is replaced by my fake redis
    mocker.patch('services.job.r', fake_redis)
    service = Job()
    result = service.creating_job(
        "Google",
        "Developer",
        "location",
        "Short",
        "Long", 
        "2025-01-01",
        "2025-02-01",
        "2025-03-01"
    )
    #checking if r.incr(...) returns something
    assert result == 1
    #check if they are called once
    fake_redis.incr.assert_called_once_with("next_job_id")
    fake_redis.hset.assert_called_once()
    fake_redis.zadd.assert_called_once()
    fake_redis.expireat.assert_called_once()