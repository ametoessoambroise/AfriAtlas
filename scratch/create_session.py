import requests
import json

url = "http://localhost:8000/api/v1/places/tsevie-1/vr-sessions"
headers = {
    "accept": "application/json",
    "Content-Type": "application/json"
}
data = {
    "title": "Visite Virtuelle de Tsévié",
    "description": "Découvrez les charmes de Tsévié en VR",
    "duration_minutes": 30,
    "price": 5000,
    "currency": "XOF",
    "max_participants": 10,
    "is_active": True
}

response = requests.post(url, headers=headers, data=json.dumps(data))
print(f"Status: {response.status_code}")
print(f"Response: {response.text}")
