const { ObjectId } = require('mongodb')
const { database } = require('../database');

const COLLECTION = 'users';

const getAll = async () => {
    const documento = await database(COLLECTION);
    return await documento.find({}).toArray();
}

const getById = async (id) => {   
    const documento = await database(COLLECTION);
    return await documento.findOne({ _id: ObjectId.createFromHexString(id) });
}

const createUser = async (user) => {
    const documento = await database(COLLECTION);
    const resultado = await documento.insertOne(user);

    return resultado.insertedId;
}

const updateUser = async (id, user) => {
    const documento = await database(COLLECTION);
    const userUpdate = {
        $set: {}
    }

    for (const key in user) {
        userUpdate.$set[key] = user[key];
    }

    const resultado = await documento.updateOne({ _id: ObjectId.createFromHexString(id) }, userUpdate);

    return resultado.modifiedCount;
}

const deleteUser = async (id) => {
    const documento = await database(COLLECTION);
    const resultado = await documento.deleteOne({ _id: ObjectId.createFromHexString(id) })
    
    return resultado.deletedCount
}

module.exports.UserService = {
    getAll,
    getById,
    createUser,
    updateUser,
    deleteUser
}
