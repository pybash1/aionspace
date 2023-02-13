from flask import Flask, jsonify, request
import openai
from flask_cors import CORS
from deta import Deta
import os

app = Flask(__name__)
CORS(app, origins=["*"])
deta = Deta(os.getenv("DETA_PROJECT_KEY"))
db = deta.Base("gpt")


@app.post("/summarise")
def summarise():
    apikey = db.get("token")
    if not apikey:
        return jsonify({"error": "token not found"})
    try:
        openai.api_key = apikey
        res = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"""Summarise the following:
{request.get_json()["text"]}
""",
            temperature=0.8,
            max_tokens=2000,
        )
    except openai.error.RateLimitError:
        return jsonify({"error": "exceeded quota"})
    except openai.error.AuthenticationError:
        return jsonify({"error": "invalid token"})
    except:
        return jsonify({"error": "other error"})
    return jsonify({"text": res["choices"][0]["text"]})


@app.post("/paraphrase")
def paraphrase():
    apikey = db.get("token")
    if not apikey:
        return jsonify({"error": "token not found"})
    try:
        openai.api_key = apikey
        res = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"""Paraphrase, fix grammar, and format the following:
{request.get_json()["text"]}
""",
            temperature=0.8,
            max_tokens=2000,
        )
    except openai.error.RateLimitError:
        return jsonify({"error": "exceeded quota"})
    except openai.error.AuthenticationError:
        return jsonify({"error": "invalid token"})
    except:
        return jsonify({"error": "other error"})
    return jsonify({"text": res["choices"][0]["text"]})


@app.post("/generate/ideas")
def genideas():
    apikey = db.get("token")
    if not apikey:
        return jsonify({"error": "token not found"})
    try:
        openai.api_key = apikey
        res = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"""Generate 5 ideas for the following:
Topic: {request.get_json()["topic"]}
Purpose: {request.get_json()["for"]}
""",
            temperature=0.8,
            max_tokens=2000,
        )
    except openai.error.RateLimitError:
        return jsonify({"error": "exceeded quota"})
    except openai.error.AuthenticationError:
        return jsonify({"error": "invalid token"})
    except:
        return jsonify({"error": "other error"})
    return jsonify({"text": res["choices"][0]["text"]})


@app.post("/generate/songs")
def gensongs():
    apikey = db.get("token")
    if not apikey:
        return jsonify({"error": "token not found"})
    try:
        openai.api_key = apikey
        res = openai.Completion.create(
            model="text-davinci-003",
            prompt=f"""Recommend 5 songs that match the vibe or theme of the following song:
1. {request.get_json()["song"]} by {request.get_json()["artist"]}
""",
            temperature=0.8,
            max_tokens=2000,
        )
    except openai.error.RateLimitError:
        return jsonify({"error": "exceeded quota"})
    except openai.error.AuthenticationError:
        return jsonify({"error": "invalid token"})
    except:
        return jsonify({"error": "other error"})
    return jsonify({"text": res["choices"][0]["text"]})


if __name__ == "__main__":
    app.run()
