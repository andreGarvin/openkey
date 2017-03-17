from flask import Flask, jsonify, redirect, request
import requests

app = Flask(__name__)

def check_url( url ):
    try:
        req = requests.get( url )

        if req.status_code == 200:
            return { 'status': True, 'msg': 'url OK'}
        else:
            return { 'status': False, 'msg': 'bad url/link'}

    except:

        return { 'status': None, 'msg': 'not a valid url'}



@app.route('/')
def home():

    url = request.args.get('url')

    print( url )
    return redirect(url)

    # req = check_url(url)
    #
    # return jsonify({ 'url': url, 'status': None })

if __name__ == '__main__':
    app.run(debug=True)
