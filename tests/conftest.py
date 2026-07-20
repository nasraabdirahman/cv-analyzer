import pytest
from app import app

#gives result to the test whenever a test asks for client
@pytest.fixture
def client():
    app.config["TESTING"] = True
    with app.test_client() as client:
        yield client