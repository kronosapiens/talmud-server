# talmud-server
Computational Governance

## Further Readings

### [An Analysis of Pairwise Preference](http://nbviewer.jupyter.org/github/kronosapiens/thesis/blob/master/tex/thesis.pdf)

### [Blockchain As Talmud](http://kronosapiens.github.io/blog/2016/01/11/blockchain-as-talmud.html)


## Development notes

To work on the D3 or Vega visualizations with local data, run `npm start` and navigate to `{d3, vega}.html`

To make a new migration: `knex migrate:make migration_name`

To access db in REPL: `const db = require('./src/db')`

Set env variables: `eval "$(sudo /opt/elasticbeanstalk/bin/get-config environment | ./json2env.sh)"`
