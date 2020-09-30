const {MongodbConnection} = require('./Connection');
const exec = require('child_process').exec;

const getDatabase = async () => {
  await MongodbConnection.connectToDB();
  return MongodbConnection.db.db('charcoal');
};

/**
 * This function reads records from the specified collection
 * @param {string} from the collection from which data should be fetched.
 * @param {object} options [optional] object containing conditions defining
 * which records we want to return.
 */
exports.read = async (from, options = {}) => {
  try {
    const database = await getDatabase();
    const collection = database.collection(from);
    const query = options;
    const records = [];
    const cursor = await collection.find(query);
    while (await cursor.hasNext()) {
      records.push(await cursor.next());
    }
    return records;
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * This function creates records in the specified collection.
 * @param {string} insertIn the collection in which data should be inserted.
 * @param {array} data Provided array of data to be inserted.
 */
exports.create = async (insertIn, data) => {
  try {
    const cmd = `php -r "echo password_hash('${data.pwd}', PASSWORD_BCRYPT);";`;
    await exec(cmd, function(e, s, se) {
      data.pwd = s;
    });
    data.role = 1;
    const dataArray = [data];
    const database = await getDatabase();
    const collection = database.collection(insertIn);
    const IDs = await collection.insertMany(dataArray);
    return IDs;
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * This function creates records in the specified collection.
 * @param {string} insertIn The collection in which data should be updated.
 * @param {string} options Object holding the conditions (criteria) of records
 * to be updated.
 * @param {object} data Provided object containing modifications.
 */
exports.update = async (insertIn, options, data) => {
  try {
    const database = await getDatabase();
    const collection = database.collection(insertIn);
    const result = await collection.updateMany(options, {$set: data});
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};

/**
 * This function reads records from the specified collection
 * @param {string} from the collection from which data should be deleted.
 * @param {object} options [optional] object containing conditions defining
 * which records we want to delete.
 */
exports.del = async (from, options) => {
  try {
    const database = await getDatabase();
    const collection = database.collection(from);
    const result = await collection.deleteMany(options);
    return result;
  } catch (e) {
    console.log(e);
    return null;
  }
};
