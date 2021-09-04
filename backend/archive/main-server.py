from flask import Flask, request

app = Flask(__name__)
app.config["DEBUG"] = True
PROXY_URL = '/main-server'

@app.route(PROXY_URL, methods=['GET'])
def hello_world():
    return 'Hello World'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='5001')