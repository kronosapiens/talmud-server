# talmud-server

Computational Governance

## Setup Instructions

1. Run the following commands:

```
git clone git@github.com:kronosapiens/talmud-server.git
cd talmud-server
npm install
```

2. Update `knexfile.js` with your preferred SQL configuration (and make sure your SQL server is running).

3. Create a `.env` file with the following keys (values are for example only):

```
USER='kronosapiens'
NODE_ENV='development'
PORT=3000
SALT_ROUNDS=8
JWT_SECRET='secret'
```

4. Run `npm run test` to ensure everything is working.

5. To run a local development server, first run `npm run migrate` (once), and then `npm run start`.

6. To run in production, set `NODE_ENV='production'`, and optionally add the following SSL configuration:

```
USE_SSL=true
SSL_CERT='path/to/cert.pem'
SSL_KEY='path/to/key.pem'
```

Then run `npm run migrate` (once) amd `npm run start`.

## Further Readings

### [An Analysis of Pairwise Preference](http://nbviewer.jupyter.org/github/kronosapiens/thesis/blob/master/tex/thesis.pdf)

### [Blockchain As Talmud](http://kronosapiens.github.io/blog/2016/01/11/blockchain-as-talmud.html)


## Development notes

To work on the D3 or Vega visualizations with local data, run `npm start` and navigate to `{d3, vega}.html`

To make a new migration: `knex migrate:make migration_name`

To access db in REPL: `const db = require('./src/db')`

Set env variables (AWS Beanstalk only): `eval "$(sudo /opt/elasticbeanstalk/bin/get-config environment | ./json2env.sh)"`
