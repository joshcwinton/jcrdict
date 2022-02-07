"""Util functions for JCRDict"""
import csv


def load_dictionary(dictionary_path):
    """Read dictionary from CSV."""
    result = {}
    with open(dictionary_path, encoding='utf-8-sig') as file:
        for line in csv.DictReader(file, fieldnames=('jamaican', 'english')):
            result[line['jamaican']] = line['english']
    return result
