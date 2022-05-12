# JCR Dict
### Overview
This repository contains the source code for [jcrdict.com](), a website for displaying information about Jamaican Creole words.

I created this website because Jamaican Creole is commonly spoken among Jamaicans but has rarely been written until recently. I learned that the Bible was translated into Jamaican Creole by the West Indies Bible Society in 2012 I saw an opportunity to create a website that makes information about the words used in that publication more accessible.

I used a Python script to parse the text on [bible.com](https://www.bible.com/versions/476-jnt-di-jamiekan-nyuu-testiment) and compiled a list of the words that appear in the text.

## Stack
- Frontend: React
- Backend : Flask

## Install and Run
### Prequisites
- Python
- Node
### Install 
```
$ git clone git@github.com:joshcwinton/jcrdict.git
$ pip install -r requirements.txt
$ cd frontend
$ npm i 
```
### Run
```
$ flask run
$ npm run start
```
## Functionality
### Word Lookup
Users can enter a word and see whether it's in the dictionary and, if it's been defined, the English definition:
<img width="1624" alt="word lookup" src="https://user-images.githubusercontent.com/29495809/168148597-9482869c-9074-4060-aab5-94b44bd4016a.png">
### Word List
Users can view a table with all of the words in the dictionary and, for those that are defined, their definitions:
<img width="1624" alt="Screen Shot 2022-05-12 at 3 01 44 PM" src="https://user-images.githubusercontent.com/29495809/168149204-bf2ad965-a974-4f58-aa7e-6bbd8759ef98.png">

## Future Work
### Near Future
I see quite a few opportunities for this data and website including:
- Creating a spell checker that validates words in input text by checking whether they appear in the dictionary
- Adding a way to go from English to Jamaican
- When an entered word isn't present, display a suggested word in case there was a typo
- Add an index that shows where the word appears and context to show how it an be used
### Long Term
I also have some ideas for more complex projects that go beyond the scope of dictionary/index functionality and more into the realm of language processing:
- Automatically assign a part of speech to each word
- Identify which words are names
- Identify similar words using something like Word2Vec 
- Automatic translation
- Leverage the Cassidy system of translation
- Apply techniques for low-resource language proccessing
