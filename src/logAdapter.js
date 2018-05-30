export const LEVEL_DEBUG = 'debug'
export const LEVEL_INFO = 'info'
export const LEVEL_WARNING = 'warning'
export const LEVEL_ERROR = 'error'
export const LEVEL_FATAL = 'fatal'

function getTime() {
  function fill(val) {
    if (val < 10) {
      return '0' + val
    }
    return val
  }
  const date = new Date(Date.now())
  const dateStr = `${date.getFullYear()}-${fill(date.getMonth() + 1)}-${fill(
    date.getDate()
  )}`
  const timeStr = `${fill(date.getHours())}:${fill(date.getMinutes())}:${fill(
    date.getSeconds()
  )}`
  return dateStr + ' ' + timeStr
}

/**
 * Implements a default logAdapter
 * @class
 */
export class LogAdapter {
  constructor() {
    // default is to write to console
    this.writeConsole = true
    this.storeLog = false

    // Stores all the messages
    this.entries = {
      debug: [],
      info: [],
      warning: [],
      error: [],
      fatal: [],
    }
  }

  /**
   * This method will be called each time the runner
   * starts a new run
   */
  reset() {}

  log(logMessage, level) {
    if (this.writeConsole) {
      // eslint-disable-next-line no-console
      console.log(`${getTime()}: ${level.toUpperCase()}: ${logMessage}`)
    }

    let logEntry = logMessage
    if (typeof logMessage === 'string') {
      logEntry = { message: logMessage }
    }

    logEntry.created = getTime()
    logEntry.level = level

    if (this.storeLog) {
      this.entries[level].push(logMessage)
    }
  }

  logDebug(logMessage) {
    this.log(logMessage, LEVEL_DEBUG)
  }
  logInfo(logMessage) {
    this.log(logMessage, LEVEL_INFO)
  }
  logWarning(logMessage) {
    this.log(logMessage, LEVEL_WARNING)
  }
  logError(logMessage) {
    this.log(logMessage, LEVEL_ERROR)
  }
  logFatal(logMessage) {
    this.log(logMessage, LEVEL_FATAL)
  }
}

// Stores the logger instance
const logAdapter = new LogAdapter()

export function getLogAdapter() {
  return logAdapter
}
