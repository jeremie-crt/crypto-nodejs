const { MongoClient, ObjectId } = require('mongodb')
const connectionUrl = 'mongodb://localhost:27017'
const dbName = 'cryptomarket'

let db

const init = (app) =>
    MongoClient.connect(connectionUrl, { useNewUrlParser: true,  useUnifiedTopology: true }).then((client) => {
        db = client.db(dbName)
        console.log('Connected successfully to server');
        //db.createCollection('users');
        //db.createCollection('data_market');
        //db.createCollection('list_currencies');
        //db.createCollection('logs_calls');
        app.locals.db = db;
    }).catch(err => console.error(err.stack))

//Column = Field
//Row = Document
//Table = Collection
const insertItem = (inCollection, item) => {
    const collection = db.collection(inCollection)
    return collection.insertOne(item)
}

const insertManyItems = (inCollection, item) => {
    const collection = db.collection(inCollection)
    return collection.insertMany(item)
}

const getItems = (inCollection) => {
    const collection = db.collection(inCollection)
    return collection.find({}).toArray()
}

const getCollection = (inCollection) => {
    const collection = db.collection(inCollection)
    return collection.find()
}

const updateOneItem = (inCollection, id, values) => {
    const collection = db.collection(inCollection)
    return collection.updateOne({ _id: ObjectId(id) }, values)
}

const updateItem = (inCollection, id, values) => {
    const collection = db.collection(inCollection)
    return collection.update(id, {
        $set: values
    })
}

const removeItem = (inCollection, item) => {
    const collection = db.collection(inCollection)
    return collection.remove(item);
}

const removeCollection = (inCollection) => {
    const collection = db.collection(inCollection)
    return collection.remove({});
}

module.exports = { init, insertItem, insertManyItems, getItems, updateOneItem, updateItem, removeItem, removeCollection }