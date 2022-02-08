"""Flask backend for JCR Dict web app."""
import os
import string
from flask import Flask, request, send_from_directory, jsonify
from flask_restful import Api, Resource, reqparse
from utils import load_dictionary, get_edit_distance
from spell import correction

# from flask_cors import CORS

app = Flask(__name__, static_url_path='/frontend/build',
            static_folder='../frontend/build')
# CORS(app)
api = Api(app)


parser = reqparse.RequestParser()
parser.add_argument('word')

dictionary = load_dictionary('data/dictionary.csv')


def lookup_word(word):
    """Get word definition from dictionary file"""
    return dictionary.get(word)


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    """Serve static react files."""
    print("catching")
    path_dir = os.path.abspath("./frontend/build")  # path react build
    if path != "" and os.path.exists(os.path.join(path_dir, path)):
        return send_from_directory(os.path.join(path_dir), path)
    else:
        return send_from_directory(os.path.join(path_dir), 'index.html')


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
        distance = get_edit_distance(word.lower(), input_word.lower())
        if distance < min_distance:
            min_distance = distance
            min_word = word
    return min_word


def get_corrections(input_string):
    """Takes a string and returns corrections as a list"""
    words = input_string.split()
    words = [word.translate(str.maketrans(
        '', '', string.punctuation)) for word in words]
    # words = [word.lower() for word in words]
    corrections = []
    for word in words:
        if check_presence(word.lower()):
            corrections.append("")
        else:
            corrections.append(correction(word.lower()))
    return {'words': words, 'corrections': corrections}


@app.route('/api/check_spelling', methods=['POST'])
def check_spelling():
    """Route for getting spelling corrections."""
    print(request.get_data(as_text=True))
    print(request.content_length)
    if request.content_length > 100000:
        return 'Too many characters (max: 100000)', 413
    return get_corrections(request.get_data(as_text=True).replace('\\n', ''))


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
