from flask import Flask, redirect, url_for, request, render_template
import requests
import json

# Define a flask app
app = Flask(__name__)
 
app:Flask(__name__, template_folder= 'Templates')
context_set: ""
 
@app.route('/',  methods=['GET', 'POST'])
def index():
 
    if request.method == 'GET':
        val = request.args.get('text')
        # val2 = request.args.get('text')
        
        if val is None:
            val = "Hello"
        
        if val == "":
            val = "Hello"
            
        # val:str(request.args.get('text'))
        data=json.dumps({"sender": "Rasa","message": val})
        headers={'Content-type': 'application/json', 'Accept': 'text/plain'}
        res=requests.post('http://localhost:5005/webhooks/rest/webhook', data= data, headers = headers)
        res=res.json()
        val=res[0]['text']
        # print(val)
        # val = val
    return render_template('index.html', val=val)


@app.route('/response',  methods=['GET', 'POST'])
def response():
 
    if request.method == 'GET':
        val = request.args.get('text')
        # val2 = request.args.get('text')
        
        if val is None:
            val = "Hello"
        
        if val == "":
            val = "Hello"
            
        # val:str(request.args.get('text'))
        data=json.dumps({"sender": "Rasa","message": val})
        headers={'Content-type': 'application/json', 'Accept': 'text/plain'}
        res=requests.post('http://localhost:5005/webhooks/rest/webhook', data= data, headers = headers)
        res=res.json()
        val=res[0]['text']
        # print(val)
        # val = val
    return val
 
if __name__ == '__main__':
  app.run(debug=True)