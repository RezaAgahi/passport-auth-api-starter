# API authentication using passportjs

A simple starter API with these routes:

All are POST requests

`/register`

`/login`

`/logout`

---
Example of a register:

```
curl --location 'http://localhost:3000/register' \
--header 'Content-Type: application/json' \
--data-raw '{
     "name":"reza",
     "email":"reza@a.com",
     "password":"reza1234@" 
}'
```

Example of a login:
```
curl --location 'http://localhost:3000/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "email":"reza@a.com",
    "password":"reza1234@"
}'
```



Once authenticated will redirect to `\dashboard` which is a protected route and stays signed in via sessions.
Even if server is restarted, user stays authenticated because session is stored in mongodb via **connect-mongo** store.

Before starting make sure you have a MongoDB instance and then renmae the `config\.env.example` to `.env` and set these
variables:
`NODE_ENV="development"`

`PORT=3000`

`mongoURI=<YOUR-MONGO-URI>`

`SESSION_SECRET=<SECRET>`

---

Install dependencies
`npm install`

run the dev server
`npm run dev`

for production
`npm start`
