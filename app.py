"""Flask backend for JCR Dict web app."""
import os
from flask import Flask, jsonify, send_from_directory
from flask_restful import Api, Resource, reqparse
from utils import load_dictionary

# from flask_cors import CORS

app = Flask(__name__, static_url_path='', static_folder='frontend/build')
# CORS(app)
api = Api(app)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Serves root of react app."""
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')


parser = reqparse.RequestParser()
parser.add_argument('word')

dictionary = load_dictionary('data/dictionary.csv')


def lookup_word(word):
    """Get word definition from dictionary file"""
    return dictionary.get(word)


def check_presence(word):
    """Check whether a given word exists in the JCR dictionary"""
    if word in dictionary:
        return True
    return False


def get_nearest_word(input_word):
    """Gets most similar word in word list."""
    min_distance = float('inf')
    min_word = ''
    for word in dictionary:
        if len(word) == len(input_word):
            distance = 0
            for count, value in enumerate(word):
                if value != input_word[count]:
                    distance += 1
            if distance < min_distance:
                min_distance = distance
                min_word = word
    return min_word


class LookupWord(Resource):
    """Interface for getting word definition."""

    def get(self):
        """Gets word definition from csv."""
        args = parser.parse_args()
        word = args['word']
        word_data = {
            'word': word,
            'present': check_presence(word),
            'definition': lookup_word(word),
            'nearest': get_nearest_word(word)
        }
        return jsonify(word_data)


class Words(Resource):
    """Interface for reading entire dictionary."""

    def get(self):
        """Gets dictionary."""
        return jsonify(dictionary)


api.add_resource(Words, '/api/words')
api.add_resource(LookupWord, '/api/lookup_word')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, use_reloader=True)
