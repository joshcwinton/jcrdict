"""Util functions for JCRDict"""
import csv


def load_dictionary(dictionary_path):
    """Read dictionary from CSV."""
    result = {}
    with open(dictionary_path, encoding='utf-8-sig') as file:
        for line in csv.DictReader(file, fieldnames=('jamaican', 'english')):
            result[line['jamaican']] = line['english']
    return result


def get_edit_distance(word_a, word_b):
    """Calculate Levenshtein distance between two strings."""
    return lev(word_a, word_b)


def lev(word_a, word_b):
    """Logic for get_edit_distance"""
    if len(word_b) == 0:
        return len(word_a)
    if len(word_a) == 0:
        return len(word_b)
    if word_a[0] == word_b[0]:
        return lev(word_a[1:], word_b[1:])
    return 1 + min(lev(word_a[1:], word_b), lev(word_a, word_b[1:]), lev(word_a[1:], word_b[1:]))
