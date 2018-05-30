import express from 'express'
import cors from 'cors'
import ArrangoDB from './ArrangoDB'

const app = express()
app.use(cors())

const arrangoDB = new ArrangoDB()

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
  console.log('/health', req.body)
  res.send('OK')
})

app.on('close', () => {
  // eslint-disable-next-line no-console
  console.log('Call server close()')
  app.close()
})

/**
 * Startet die Express APP.
 * @param expressPort {numbner} Der Port der Express Application
 * @return app {object} Die Express app
 */
export async function startServer({ expressPort } = getParameter()) {
  // eslint-disable-next-line no-console
  console.log('Server startet at port: ' + expressPort)
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
    expressPort: process.env.EXPRESS_PORT || 3712,
  }

  return env
}
