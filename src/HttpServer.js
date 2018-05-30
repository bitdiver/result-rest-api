import cors from 'cors'
import express from 'express'
import ArrangoDB from './ArrangoDB'
import { getLogAdapter } from './logAdapter'

const app = express()
app.use(cors())
const arrangoDB = new ArrangoDB()
const LOGGER = getLogAdapter()

// disable console logging
LOGGER.writeConsole = true

app.get('/runs', async (req, res) => {
  res.send(await arrangoDB.getRuns())
})

app.get('/testcases/:runId', async (req, res) => {
  res.send(await arrangoDB.getTestcases(req.params.runId))
})

app.get('/teststeps/:testcaseId', async (req, res) => {
  res.send(await arrangoDB.getTeststeps(req.params.testcaseId))
})

app.get('/health', (req, res) => {
  LOGGER.logInfo('/health')
  res.send('OK')
})

app.on('close', () => {
  LOGGER.logInfo('Call server close()')
  app.close()
})

/**
 * Startet die Express APP.
 * @param expressPort {numbner} Der Port der Express Application
 * @return app {object} Die Express app
 */
export async function startServer({ expressPort } = getParameter()) {
  LOGGER.logInfo('Rest Service startet at port: ' + expressPort)
  // Starten des Express servers
  return new Promise((resolve, reject) => {
    const httpServer = app.listen(expressPort, err => {
      if (err) {
        reject(err)
      } else {
        resolve({ httpServer, express: app })
      }
    })
  })
}

/**
 * Reads all the expected variables and checks that they exsist
 * @returns env {object} An object with all the needed parameters
 */
export function getParameter() {
  const env = {
    expressPort: process.env.EXPRESS_PORT || 3000,
  }

  return env
}
