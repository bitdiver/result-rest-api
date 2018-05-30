import { getLogAdapter } from './logAdapter'
const LOGGER = getLogAdapter()
LOGGER.writeConsole = true

/**
 * Reads all the expetced variables and checks that they exsist
 * @returns env {object} An object with all the needed parameters
 */
export function getParameter() {
  const env = {
    express_port: process.env.EXPRESS_PORT || 3712,
    arango_hostname: process.env.ARANGO_HOSTNAME || 'localhost',
    arango_port: process.env.ARANGO_PORT || 8529,
    arango_dbname: process.env.ARANGO_DBNAME || 'log',
    arango_username: process.env.ARANGO_USERNAME || 'log',
    arango_password: process.env.ARANGO_PASSWORD || 'log',
  }

  _validate(env)
  return env
}

function _validate(obj) {
  let err = false
  Object.keys(obj).forEach(name => {
    if (!obj[name]) {
      LOGGER.logWarning(`The env variable '${name.toUpperCase()}' is not set`)
      err = true
    }
  })

  if (err) {
    process.exit(1)
  }
}
