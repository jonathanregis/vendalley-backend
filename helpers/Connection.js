const {MongoClient} = require('mongodb');
const config = require('../config.json');

/**
 * This class will initialise and hold the connection to our database.
 * We do this to avoid using too many connect-disconnect in the app or
 * keeping too many connections open.
 */
class MongodbConnection {
  /**
   * this function connects to the database and returns the client with db.
   */
  static async connectToDB() {
    if (this.db) return this.db;
    this.db = await MongoClient.connect(this.url, this.options);
    return this.db;
  }
}

MongodbConnection.db = null;
MongodbConnection.url = config.mongodbUrl;
MongodbConnection.options = {useUnifiedTopology: true, useNewUrlParser: true};

/**
 * @todo add other databases in case someone won't use mongodb.
 */
module.exports = {MongodbConnection};
