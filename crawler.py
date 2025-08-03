import requests

url = "https://api.brightdata.com/datasets/v3/trigger"
headers = {
	"Authorization": "Bearer 6f59a25d-cb60-487d-b6a4-058206e91ca6",
}
params = {
	"dataset_id": "gd_l7q7dkf244hwjntr0",
	"include_errors": "true",
	"type": "discover_new",
	"discover_by": "keyword",
}
files = {"data": ("data.csv", open(r"D:\Python\Projects\Shopping\keywords.csv", "rb"), "text/csv")}

response = requests.post(url, headers=headers, params=params, files=files)
print(response.json())