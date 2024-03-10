const { ObjectId } = require('mongodb');
const { database } = require('../database');
const { ItemService } = require('./item.service')
const { ProductService } = require('./product.service');

const COLLECTION = 'facturas';

const getAll = async () => {
    const documento = await database(COLLECTION);
    const facturas = await documento.find({}).toArray();

    const facturasMap = facturas.map((factura) => {
        const fecha = new Date(factura.fecha)

        const format = {
            dd: fecha.getDate(),
            mm: fecha.getMonth() + 1,
            yyyy: fecha.getFullYear(),
            hh: fecha.getHours(),
            min: fecha.getMinutes()
        }

        return {
            _id: factura._id,
            cliente_id: factura.cliente_id,
            fecha: `${ format.dd }-${ format.mm }-${ format.yyyy } ${ format.hh }:${ format.min }`,
        }
    })

    return facturasMap
}

const getById = async (id) => {
    const IVA = 0.12
    const documento = await database(COLLECTION);
    const factura =  await documento.findOne({ _id: ObjectId.createFromHexString(id) });

    const fecha = new Date(factura.fecha)

    const format = {
        dd: fecha.getDate(),
        mm: fecha.getMonth() + 1,
        yyyy: fecha.getFullYear(),
        hh: fecha.getHours(),
        min: fecha.getMinutes()
    }

    const items = await ItemService.getByIdFactura(id);

    const subtotal = items.reduce((currentValue, currentIndex) => {
        if(currentValue.precio_total && currentIndex.precio_total) {
            currentValue.precio_total += currentIndex.precio_total
        }

        return currentValue.precio_total;
    })

    const subtotalIva = subtotal * IVA;
    const total = subtotal + subtotalIva;

    const itemProducts = items.map(async (item) => {
        const id = item.producto_id
        const producto = await ProductService.getById(id.toString())
        return {
            producto: producto.nombre,
            precio: producto.precio,
            cantidad: item.cantidad
        }
    })

    const productos = []

    for(const product of itemProducts) {
        productos.push(await product);
    }

    return {
        _id: factura._id,
        cliente_id: factura.cliente_id,
        fecha: `${ format.dd }-${ format.mm }-${ format.yyyy } ${ format.hh }:${ format.min }`,
        detalle: productos,
        subtotal: `$ ${ subtotal }`,
        "iva 12%": `$ ${ subtotalIva }`,
        total: `$ ${ total }`
    }
}

const createFactura = async (clienteId, products) => {
    const documento = await database(COLLECTION);
    const resultado = await documento.insertOne({
        cliente_id: ObjectId.createFromHexString(clienteId),
        fecha: new Date()
    });

    const facturaId = resultado.insertedId
    const isItemCreated = await ItemService.createItem(products, facturaId)

    if(!isItemCreated) {
        return "No se ingreso todos los items";
    }

    return "Factura creada"

}

module.exports.FacturaService = {
    getAll,
    getById,
    createFactura,
}