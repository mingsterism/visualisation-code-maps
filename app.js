const express = require('express')
const url = require('url')
const randomString = require('randomstring')
const request = require('request')

const app = express()

const rString = randomString.generate();
console.log("Random String -----", rString)

const githubOauthParams = {
  "client_id": "e03a564f48f8a2ed28b4", 
  //"redirect_uri": "http://54.255.249.246:3000/callback", 
  "redirect_uri": "https://coders-map-visualisation.herokuapp.com/callback",
  "state": rString,
}

const githubPostParams = (codeString) => {
   const postObj = {
      "client_id": "e03a564f48f8a2ed28b4", 
      "client_secret": "130c08d6c7fa6bea7119ba607f96ba7baad7e1c8",
      "code": codeString, 
  }
   return postObj;
}

app.get('/', (req, res) => {
  console.log("Initializing Request ...", Object.keys(req));
  res.redirect(url.format({
    pathname: "http://github.com/login/oauth/authorize", 
    query: githubOauthParams,
  }))
})
 

app.get('/callback', (req, res) => {
  console.log(req.query)
  request.post({ url:"https://github.com/login/oauth/access_token", 
   form: githubPostParams(req.query.code)}, 
   (err, httpResponse, body) => {
      console.log("Body: ", body)
   }
  )
  res.send("")
});

app.get('/redirected', (req, res) => {
  console.log("Calling redirected", Object.keys(req))
})

app.listen(3000, () => {
  console.log("Listening on port 3000")
})
