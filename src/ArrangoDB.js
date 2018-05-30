import { Database } from 'arangojs'
import { getParameter } from './Environment'
import { getLogAdapter } from './logAdapter'

const envParam = getParameter()
const LOGGER = getLogAdapter()
LOGGER.writeConsole = true

export const TIMEOUT = 30000
export default class ArrangoDB {
  constructor(opts = {}) {
    this.timeout = opts.timeout ? opts.timeout : TIMEOUT
    this.db = this._arangoConnect({
      scheme: 'http',
      hostname: envParam.arango_hostname,
      port: envParam.arango_port,
      database: envParam.arango_dbname,
      username: envParam.arango_username,
      password: envParam.arango_password,
    })
  }

  async getRuns() {
    const query =
      'FOR c IN run FOR v IN 1..2 OUTBOUND c runHasLog FILTER ' +
      "v.data.message == 'Run Stats' RETURN {run: c.data,  log:v.data,  runId:c.meta.run.id,    " +
      'duration_in_min: (v.meta.time  - v.meta.run.start)/1000/60 }'
    return this.execute(query)
  }

  getTestcases(runId) {
    const query =
      "FOR runHasTestcase IN 1..1 OUTBOUND 'run/" +
      runId +
      "' runHasTestcase " +
      ' SORT runHasTestcase.meta.tc.countCurrent DESC ' +
      'RETURN runHasTestcase'
    return this.execute(query)
  }

  getTeststeps(testcaseId) {
    const query =
      "FOR testcaseHasStep IN 1..1 OUTBOUND 'testcase/" +
      testcaseId +
      "' testcaseHasStep RETURN testcaseHasStep"

    return this.execute(query)
  }

  async execute(query) {
    return this.db
      .query(query)
      .then(async cursor => {
        return cursor.all()
      })
      .then(async doc => {
        return doc
      })
      .catch(err => {
        LOGGER.logError(err)
        throw err
      })
  }

  _arangoConnect(opts) {
    const scheme = opts.scheme
    const host = opts.hostname
    const port = opts.port
    const database = opts.database
    const username = opts.username
    const password = opts.password

    const url = `${scheme}://${username}:${password}@${host}:${port}`

    LOGGER.logInfo(`Database connection: ${url} on database ${database}`)

    const db = new Database({ url })
    db.useDatabase(database)
    db.useBasicAuth(username, password)
    return db
  }
}
