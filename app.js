const express = require('express')
const url = require('url')
const randomString = require('randomstring')
const request = require('request')

const app = express()

const rString = randomString.generate();
console.log("Random String -----", rString)

const githubOauthParams = {
  "client_id": "e03a564f48f8a2ed28b4", 
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

const middle1 = (req, res, next) => {
  console.log("===================== middle1")
  console.log('res.locals: ', res.locals)
  console.log('req.locals:', req.locals)
  next() 
}

const middle2 = (req, res, next) => {
  console.log("--------------------- middle2")
  console.log('res.locals: ', res.locals)
  console.log('req.locals:', req.locals)
  next()
}

app.get('/callback', middle1, middle2, (req, res, next) => {
  console.log("##############################################")
  console.log(req.body)
  console.log(Object.keys(req)
  request.post({ url:"https://github.com/login/oauth/access_token", 
   form: githubPostParams(req.query.code)}, 
   (err, httpResponse, body) => {
      const stringSplit = body.split("=")
      console.log(stringSplit)
      console.log(httpResponse)
      res.locals.accesscode = body
   }
  )

  const data = request.get({url: "https://api.github.com/user?"+req.query.body}, 
    (err, httpResponse, body) => {
      return body
    })
  console.log('@@@@@@@@@@@@@@@', data)
  res.send(data)
});

app.get('/redirected', (req, res) => {
  console.log("Calling redirected", Object.keys(req))
})

app.listen(process.env.PORT || 5000, () => {
  console.log("Listening on port", process.env.PORT)
})
