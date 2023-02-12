from flask import Flask, jsonify, request
import openai
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["*"])

@app.post("/<apikey>/summarise")
def summarise(apikey):
    openai.api_key = apikey
    res = openai.Completion.create(model="text-davinci-003", prompt=f"""Summarise the following:
{request.get_json()["text"]}
""", temperature=0.8, max_tokens=2000)
    return jsonify({ "text": res["choices"][0]["text"] })

@app.post("/<apikey>/paraphrase")
def paraphrase(apikey):
    openai.api_key = apikey
    res = openai.Completion.create(model="text-davinci-003", prompt=f"""Paraphrase, fix grammar, and format the following:
{request.get_json()["text"]}
""", temperature=0.8, max_tokens=2000)
    return jsonify({ "text": res["choices"][0]["text"] })

@app.post("/<apikey>/generate/ideas")
def genideas(apikey):
    openai.api_key = apikey
    res = openai.Completion.create(model="text-davinci-003", prompt=f"""Generate 5 ideas for the following:
Topic: {request.get_json()["topic"]}
Purpose: {request.get_json()["for"]}
""", temperature=0.8, max_tokens=2000)
    return jsonify({ "text": res["choices"][0]["text"] })

@app.post("/<apikey>/generate/songs")
def gensongs(apikey):
    openai.api_key = apikey
    res = openai.Completion.create(model="text-davinci-003", prompt=f"""Recommend 5 songs that match the vibe or theme of the following song:
1. {request.get_json()["song"]} by {request.get_json()["artist"]}
""", temperature=0.8, max_tokens=2000)
    return jsonify({ "text": res["choices"][0]["text"] })

if __name__ == "__main__":
    app.run()