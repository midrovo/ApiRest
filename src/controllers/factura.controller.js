const { response } = require('../common/response');
const { FacturaService } = require('../services/factura.service');

const debug = require('debug')('app:controller-facturas');
const createError = require('http-errors');

const getFacturas = async (req, res) => {
    try {
        const facturas = await FacturaService.getAll();
        response.success(res, 200, 'Facturas', facturas);

    } catch (error) {
        debug(error);
        response.error(res);
    }
}

const getFactura = async (req, res) => {
    try {
        const { params: { id } } = req;
        const factura = await FacturaService.getById(id);

        if(!factura) {
            response.error(res, new createError.NotFound())

        } else {
            response.success(res, 200, 'Factura encontrada', factura);
        }
        
    } catch (error) {
        debug(error);
        response.error(res);
    }
}

const createFactura = async (req, res) => {
    try {
        const { params: { id } } = req
        const { body: products } = req

        const resultado = await FacturaService.createFactura(id, products);        
        response.success(res, 201, 'Factura ingresada', { success: resultado });
        
    } catch (error) {
        debug(error)
        response.error(res);
    }
}

const updateFactura = async (req, res) => {
    try {

    } catch (error) {
        debug(error);
        response.error(res);
    }

}

const deleteFactura = async (req, res) => {
    try {

        
    } catch (error) {
        debug(error)
        response.error(res)        
    }

}

module.exports.FacturaControllers = {
    getFacturas,
    getFactura,
    createFactura,
    updateFactura,
    deleteFactura,
}