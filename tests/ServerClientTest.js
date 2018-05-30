import { startServer, getLogAdapter } from '../lib/index'

const LOGGER = getLogAdapter()
// disable console logging
LOGGER.writeConsole = true

test('Start und Stop Server', async done => {
  const { httpServer, express } = await startServer()
  expect(httpServer).not.toBeUndefined()
  expect(express).not.toBeUndefined()
  httpServer.close()
  await uicServer.stop()
  done()
})
