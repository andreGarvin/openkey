from flask import Flask, request, jsonify, render_template, redirect, url_for
from json import loads, dumps
from random import randint
import requests
import os

app = Flask(__name__)

# db for the saving the keys and geetting all the words from the JSON obj
db = loads( open('db.json', 'r').read() )



# check url function
def check_url( url ):

    from urlparse import urlparse

    """
        this function checks wether the url sent
        by the user is valid or does nopt leasd to a
        broken url
    """

    try:
        req = requests.get( url )

        if req.status_code == 200:

            valid = urlparse( url )

            return { 'secure': valid.shceme, 'status': True, 'msg': 'url OK'}

        else:
            return { 'status': False, 'msg': 'bad url/link'}

    except:

        return { 'status': None, 'msg': 'not a valid url'}



def post_key( post_data ):

    """
        posts a new url to the db.json file
    """

    resp = check_url( post_data['link'] )

    if resp['status'] == True:

        post_data['proto'] = resp['secure']
        post_data['key'] = db['word_bank'][randint(0, len( db['word_bank'] )  - 1 )]


        for j in db['activeKeys']['keys']:
            while j['key'] == post_data['key']:
                post_data['key'] = db['word_bank'][randint(0, len( db['word_bank'] )  - 1 )]

        db['activeKeys']['count'] += 1
        db['activeKeys']['keys'].append( post_data )

        print("\nopenkey: new key was created: '%s'.\n" % post_data['key'])

        open('db.json', 'w').write( dumps( db ) )

        return render_template('resultPage.html', link=post_data['link'], key=post_data['key'], time=post_data['time'])

    return render_template('index.html', keys='')




def find_key( method, key ):

    result = None

    for i in db['activeKeys']['keys']:

        if i['key'].lower() == key.lower():
            result = { 'link': i['link'], 'status': True }

            if method == 'POST':

                return jsonify( result )

            elif method == 'GET':

                return redirect( result['key'] )

    if result == None and method == 'GET':

        return jsonify({ 'error_message': "Key '%s' does not exist or is expired." % ( key ), 'status': None })

    if result == None and method == 'POST':

        return redirect(url_for('home'))




@app.route('/', methods=['GET', 'POST'])
def home():

    if request.method == 'POST':

        if len( request.form['link'] ) != 0:

            return post_key({
                'link': request.form['link'],
                'time': request.form['time']
            })

    elif db['activeKeys']['count'] == 0:

        return render_template('index.html', keys='')

    return render_template('index.html', keys=db['activeKeys']['keys'])




@app.route('/<key>', methods=['GET', 'POST'])
def GETkey( key ):

    resp = find_key( request.method, key )

    if request.method == 'POST':
        return resp

    return resp



if __name__ == '__main__':
    # app.run()
    app.run(host=os.getenv('IP', '0.0.0.0'), port=int(os.getenv('PORT', 8080)),debug=False)
