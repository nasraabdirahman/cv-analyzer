

def test_create_endpoint(client, mocker):
    fake_redis = mocker.Mock()
    fake_redis.incr.return_value = 1
    #variable r on "job.py" is replaced by my fake redis
    mocker.patch('services.job.r', fake_redis)
    response = client.post("/create", data={
        "company": "Google",
        "title": "Developer",
        "location": "something",
        "shortDescription": "short",
        "longDescription": "long",
        "releaseDate": "2025-01-01",
        "removalDate": "2025-02-01",
        "startDate": "2025-03-01"
    })

    assert response.status_code == 302