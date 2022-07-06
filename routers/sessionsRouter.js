import express from 'express'
import debug from 'debug'
import { MongoClient, ObjectID } from 'mongodb'

const sessionsRouter = express.Router()
const sessionsDebug = debug('app:sessionsRouter')

sessionsRouter.route('/').get((req, res) => {
  const url = `mongodb+srv://proc-gen-ttrpg:${process.env.DBPASS}@proc-gen-ttrpg.tbychge.mongodb.net/?retryWrites=true&w=majority`
  const dbName = 'procgenttrpg';
  (async () => {
    let client
    try {
      client = await MongoClient.connect(url)
      sessionsDebug('Connected to the MongoDB')

      const db = client.db(dbName)

      // Populate table
      const sessions = await db.collection('sessions').find().toArray()
      res.render('sessions', { sessions })
    } catch (error) {
      sessionsDebug(error.stack)
    }
  })()
})

sessionsRouter.route('/:id').get((req, res) => {
  const { id } = req.params
  const url = `mongodb+srv://proc-gen-ttrpg:${process.env.DBPASS}@proc-gen-ttrpg.tbychge.mongodb.net/?retryWrites=true&w=majority`
  const dbName = 'procgenttrpg';
  (async () => {
    let client
    try {
      client = await MongoClient.connect(url)
      sessionsDebug('Connected to the MongoDB')

      const db = client.db(dbName)

      // Populate table
      const session = await db.collection('sessions').findOne({ _id: new ObjectID(id) })
      res.render('session', { session })
    } catch (error) {
      sessionsDebug(error.stack)
    }
  })()
})

export default sessionsRouter
