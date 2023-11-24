from flask import Flask, jsonify, request
from flask_cors import CORS
import random, json

app = Flask(__name__)
CORS(app) #maybe add origins


words = []
prompt = None
title = None

@app.route("/random", methods=['GET'])
def get_random_prompt():
    global prompt
    global title
    words.clear()
    with open('../data/prompts.json') as file:
        data = json.load(file)
    title = random.choice(list(data.keys()))
    curr = data[title]
    prompt = curr
    
    return jsonify(curr)


@app.route("/add", methods=['POST'])
def add():
    # words = []
    try:
        data = request.json
        words.append(data)
        response_data = jsonify({'message': 'Received the following data:', 'data': data})
        return response_data, 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@app.route("/final", methods=['GET'])
def final():
    global prompt
    global title
    # return jsonify(prompt)
    app.logger.debug(words)
    ret = ''
    maxlen = max(len(words), len(prompt['prompt']))

    for i in range(maxlen):
        if i < len(prompt['prompt']):
            ret += prompt['prompt'][i]

        if i < len(words):
            ret += words[i]['inputVal']
    response = jsonify({'final_result': ret, 'title': title})
    return response


if __name__ == "__main__":
    app.run(debug=True)