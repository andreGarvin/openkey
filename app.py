from flask import Flask, request, jsonify, render_template, redirect
from random import randint
import requests
import os

app = Flask(__name__)

# db for the saving the keys and geetting all the words
db = {
  'db_len': 0,
  'activeKeys': {
      'count': 0,
      'keys': []
  },
  'word_bank': [
      'card',
      'pillow',
      'house',
      'cat',
      'key',
      'CD',
      'cellphone',
      'dogs',
      'umbrella',
      'brother',
      'car',
      'DVD',
      'spider',
      'kill',
      'plate',
      'snap',
      'sister',
      'pencil',
      'editor',
      'paper',
      'guitar',
      'icon',
      'tree',
      'code',
      'fork',
      'leaf',
      'super',
      'soda',
      'pepsi',
      'phone',
      'cup',
      'bottle',
      'printer',
      'photo',
      'window',
      'paper',
      'master',
      'water',
      'pen',
      'book',
      'console',
      'spoon',
      'word',
      'python',
      'new',
      'jacket'
  ]
}


def check_url( url ):

    try:
        req = requests.get( url )

        if req.status_code == 200:
            return { status: True, msg: 'url OK'}
        else:
            return { status: False, msg: 'bad url/link'}

    except:

        return { status: None, msg: 'not a valid url'}

def find_key( key ):


@app.route('/', methods=['GET', 'POST'])
def home():


    if request.method == 'POST':

        if len( request.form['link'] ) != 0:

            resp = check_url( request.form['link'] )

            if resp.status:


                new_key = {
                    'link': request.form['link'],
                    'time': request.form['time'],
                    'key': db['word_bank'][randint(0, len( db['word_bank'] )  - 1 )]
                }


                for j in db['activeKeys']['keys']:
                    while j['key'] == new_key['key']:
                        new_key['key'] = db['word_bank'][randint(0, len( db['word_bank'] )  - 1 )]



                db['activeKeys']['count'] += 1
                db['activeKeys']['keys'].append( new_key )

                print("\nopenkey: new key was created: '%s'.\n" % new_key['key'])

                return render_template('resultPage.html', link=new_key['link'], key=new_key['key'], time=new_key['time'])

    return render_template('index.html', keys=db['activeKeys']['keys'])


@app.route('/GETkey/<key>', methods=['GET', 'POST'])
def GETkey( key ):

    if request.method === 'POST':
        for i in db['activeKeys']['keys']:

            if i['key'] == key:

                return jsonify({ 'key': i['link'], 'status': True })

            return jsonify({ 'error_message': "Key '%s' does not exist or is expired." % ( key ), 'status': None })

    elif request.method === 'GET':
        for i in db['activeKeys']['keys']:

            if i['key'] == key:

                return redirect()

            return jsonify({ 'error_message': "Key '%s' does not exist or is expired." % ( key ), 'status': None })

if __name__ == '__main__':
    app.run()
