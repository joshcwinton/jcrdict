from flask import Flask, request, jsonify
import json
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
CORS(app)
api = Api(app)

parser = reqparse.RequestParser()
parser.add_argument('word')

lines = []
with open('JCR_words') as f:
    lines = f.readlines()

lines = [line.strip() for line in lines]

class CheckWord(Resource):
    def get(self):
        args = parser.parse_args()
        if (args['word'] in lines):
            return jsonify(True)
        return jsonify(False) 

api.add_resource(CheckWord, '/check_word')

# # get all words
# @app.route("/words")
# def get_all_words():
#     return json.dumps(lines)


# # check if word is in dictionary
# @app.route("/check_word")
# def check_word():
#     if (request.args.get('word', '') in lines):
#         return jsonify(True)
#     return jsonify(False)


# # get nearest word
# @app.route("/nearest_word")
# def nearest_word():
#     min_distance = float('inf')
#     min_word = ''
#     input_word = request.args.get('word', '')
#     for word in lines:
#         if len(word) == len(input_word):
#             distance = 0
#             for i in range(len(word)):
#                 if word[i] != input_word[i]:
#                     print(word[i], input_word[i], word[i] != input_word[i])
#                     distance += 1
#             if distance < min_distance:
#                 min_distance = distance
#                 min_word = word
#     return jsonify({'word': min_word, 'distance': min_distance})


if __name__ == '__main__':
    app.run(debug=True)