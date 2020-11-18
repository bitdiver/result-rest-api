export default class LogAdapterDispatcher {
  constructor(opts = {}) {
    this.logAdapterList = opts.logAdapterList
  }
  async log(logMessage) {
    if (this.logAdapterList !== undefined && this.logAdapterList.length > 0) {
      const promisses = []
      for (const logger of this.logAdapterList) {
        promisses.push(
          logger.log(logMessage).catch((err) => {
            // eslint-disable-next-line no-console
            console.log(err)
          })
        )
      }

      return Promise.all(promisses)
    }
  }
  /**
   * sets a new log level
   * @param level {number/string} The logLevel as number or String value
   */
  set level(level) {
    if (this.logAdapterList !== undefined && this.logAdapterList.length > 0) {
      for (const logger of this.logAdapterList) {
        logger.level = level
      }
    }
  }
  /**
   * Returns the logLevel as a string
   * @return level {string} The logLevel
   */
  get level() {
    if (this.logAdapterList !== undefined && this.logAdapterList.length > 0) {
      return this.logAdapterList[0].level
    }
  }

  /**
   * Returns the logLevel as a number
   *
   * @return level {string} The logLevel
   */
  get levelNumber() {
    if (this.logAdapterList !== undefined && this.logAdapterList.length > 0) {
      return this.logAdapterList[0].levelNumber
    }
  }

  reset() {
    if (this.logAdapterList !== undefined && this.logAdapterList.length > 0) {
      for (const logger of this.logAdapterList) {
        logger.reset()
      }
    }
  }
}
