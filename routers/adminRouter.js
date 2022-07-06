import express from 'express'
import debug from 'debug'
import { MongoClient } from 'mongodb'
import sessionsData from '../data/sessions.json'

const adminDebug = debug('app:adminRouter')
const adminRouter = express.Router()

adminRouter.route('/').get((req, res) => {
  const url = `mongodb+srv://proc-gen-ttrpg:${process.env.DBPASS}@proc-gen-ttrpg.tbychge.mongodb.net/?retryWrites=true&w=majority`
  const dbName = 'procgenttrpg';
  (async () => {
    let client
    try {
      client = await MongoClient.connect(url)
      adminDebug('Connected to the MongoDB')

      const db = client.db(dbName)

      // Populate table
      const response = await db.collection('sessions').insertMany(sessionsData)
      res.json(response)
    } catch (error) {
      adminDebug(error.stack)
    }
  })()
})

export default adminRouter
