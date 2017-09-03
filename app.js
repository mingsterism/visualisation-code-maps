const express = require('express')
const url = require('url')
const randomString = require('randomstring')
const request = require('request')

const app = express()

const rString = randomString.generate();
console.log("Random String -----", rString)

const CLIENT_ID = 123
const CLIENT_SECRET = 12344

const githubOauthParams = {
  "client_id": CLIENT_ID, 
  //"redirect_uri": "https://coders-map-visualisation.herokuapp.com/callback",
  "redirect_uri": "http://54.255.249.246:5000/callback", 
  "state": rString,
}

const githubPostParams = (codeString) => {
   const postObj = {
      "client_id": CLIENT_ID, 
      "client_secret": CLIENT_SECRET
      "code": codeString, 
  }
   return postObj;
}

const requestOptions = (OAUTH_TOKEN) => {
   const payload = {
      url: "https://api.github.com/user", 
      headers: {
      "Authorization": "token " + OAUTH_TOKEN,
      'User-Agent': 'request', 
      }
   }
    console.log("PAYLOAD --------", payload)
  return payload
  }

app.get('/', (req, res) => {
  console.log("Initializing Request ...", Object.keys(req));
  res.redirect(url.format({
    pathname: "http://github.com/login/oauth/authorize", 
    query: githubOauthParams,
  }))
})

const middle1 = (req, res, next) => {
  console.log("===================== middle1")
  next() 
}

const middle2 = (req, res, next) => {
  console.log("--------------------- middle2")
  next()
}

app.get('/callback', middle1, middle2, (req, res, next) => {
  request.post({ url:"https://github.com/login/oauth/access_token", 
   form: githubPostParams(req.query.code)}, 
   (err, httpResponse, body) => {
    console.log('----------------------')
     TOKEN = httpResponse.body.split("=")[1]
      TOKEN_FINAL = TOKEN.split("&")[0]
    console.log("============================")
      request(requestOptions(TOKEN_FINAL), (err, resp, body) => {
        console.log("Body: ------ ", body)
      })
   }
  )
  res.send("IT is the end")
});

app.get('/redirected', (req, res) => {
  console.log("Calling redirected", Object.keys(req))
})

app.listen(5000, () => {
  console.log("Listening on port", 5000)
})
