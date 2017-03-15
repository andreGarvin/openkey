from flask import Flask, request, jsonify, render_template, redirect
from random import randint
import os

app = Flask(__name__)

db = {
  'db_len': 0,
  'activeKeys': {
      'count': 0,
      'keys': []
  },
  'db-route': '/route/db/admin?p=f$BTN7@1',
  'connections': 0,
  'word_bank': [ 'pillow', 'house', 'cat', 'key', 'dogs', 'umbrella', 'brother', 'car', 'spider', 'kill', 'code', 'snap', 'sister', 'paper', 'guitar', 'icon', 'tree', 'leaf', 'master' ]
}

@app.route('/', methods=['GET', 'POST'])
def home():


    if request.method == 'POST':

        if len( request.form['link'] ) != 0:


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

            return render_template('resultPage.html', link=new_key['link'], key=new_key['key'])

    return render_template('index.html', keys=db['activeKeys']['keys'])


@app.route('/GETkey/<key>')
def GETkey( key ):

    for i in db['activeKeys']['keys']:

        if i['key'] == key:

            return jsonify({ 'key': i['link'], 'status': True })

    return jsonify({ 'error_message': 'Key not found or is expired.', 'status': None })

if __name__ == '__main__':
    app.run()
