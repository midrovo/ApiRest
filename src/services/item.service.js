const { ObjectId } = require('mongodb');
const { database } = require('../database');
const { ProductService } = require('./product.service')

const COLLECTION = 'items';

const getAll = async () => {
    const documento = await database(COLLECTION);
    return await documento.find({}).toArray();
}

const getByIdFactura = async (id) => {
    const documento = await database(COLLECTION);
    return await documento.find({ factura_id: ObjectId.createFromHexString(id) }).toArray()
}

const getById = async (id) => {
    const documento = await database(COLLECTION);
    return await documento.findOne({ _id: ObjectId.createFromHexString(id) });
}

const createItem = async (products, facturaId) => {
    const items = products.map((product) => {
        return {
            factura_id: facturaId,
            producto_id: ObjectId.createFromHexString(product._id),
            cantidad: product.cantidad,
            precio_total: product.precio * product.cantidad
        }
    });

    const documento = await database(COLLECTION);
    const resultado = await documento.insertMany(items);

    if(resultado.insertedCount === products.length) {
        for(const productUpdate of products) {
            if(productUpdate.cantidad) {
                const producto = await ProductService.getById(productUpdate._id);
                productUpdate.cantidad = producto.cantidad - productUpdate.cantidad;
                await ProductService.updateProduct(productUpdate._id, productUpdate);            
            }
        }
        return true;
    }

    return false
}

module.exports.ItemService = {
    getAll,
    getByIdFactura,
    getById,
    createItem
}