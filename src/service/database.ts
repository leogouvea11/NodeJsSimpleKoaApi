import { Db, MongoClient, ObjectId } from 'mongodb'

let database: Db
let mongoClient: MongoClient

const isDatabaseConnected = () => {
  return !!mongoClient && !!database && mongoClient.isConnected()
}

export const getDb = async (): Promise<Db> => {
  if (database && isDatabaseConnected()) {
    return database
  }

  const { MONGO_URL } = process.env
  if (!MONGO_URL) {
    throw new Error('No MONGO_URL or MONGO_DATABASE defined')
  }

  mongoClient = await MongoClient.connect(MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  database = mongoClient.db()

  return database
}

export const safelyCloseConnectionIfOpen = async () => {
  if (mongoClient) {
    try {
      await mongoClient.close()
      database = null as any
    } catch (err) {
      throw new Error('CLOSE_CONNECTION_ERROR: Could not close connection with MONGO_DB')
    }
  }
}
