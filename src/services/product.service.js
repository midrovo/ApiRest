const { ObjectId } = require('mongodb');
const { database } = require('../database');
const { ProductsUtil } = require('../utils/excel.util');

const COLLECTION = 'productos';

const getAll = async () => {
    const documento = await database(COLLECTION);
    return await documento.find({}).toArray();
}

const getById = async (id) => {
    const documento = await database(COLLECTION);
    return await documento.findOne({ _id: ObjectId.createFromHexString(id) });
}

const createProduct = async (producto) => {
    const documento = await database(COLLECTION);
    const resultado = await documento.insertOne(producto);

    return resultado.insertedId;
}

const updateProduct = async (id, producto) => {
    const documento = await database(COLLECTION);

    const updateProduct = {
        $set: {}
    }

    if(Object.keys(producto).length === 1) {
        updateProduct.$set[Object.keys(producto)[0]] = producto.cantidad
    }

    for (const key in producto) {
        if(key !== "_id") {
            updateProduct.$set[key] = producto[key];
        }
    }

    const resultado = await documento.updateOne({ _id: ObjectId.createFromHexString(id) }, updateProduct);

    return resultado.modifiedCount;
}

const deleteProduct = async (id) => {
    const documento = await database(COLLECTION);
    const resultado = await documento.deleteOne({ _id: ObjectId.createFromHexString(id) })
    
    return resultado.deletedCount
}

const generateReport = async (name, res) => {
    let productos = await getAll();
    ProductsUtil.excelGenerator(productos, name, res);
}

module.exports.ProductService = {
    getAll,
    getById,
    createProduct,
    updateProduct,
    deleteProduct,
    generateReport
}
