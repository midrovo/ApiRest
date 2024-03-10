const { response } = require('../common/response');
const { ProductService } = require('../services/product.service');

const debug = require('debug')('app:controller-product');
const createError = require('http-errors');

const getProducts = async (req, res) => {
    try {
        const products = await ProductService.getAll();
        response.success(res, 200, 'Productos', products);

    } catch (error) {
        debug(error);
        response.error(res);
    }
}

const getProduct = async (req, res) => {
    try {
        const { params: { id } } = req;

        const product = await ProductService.getById(id);

        if(!product) {
            response.error(res, new createError.NotFound());

        } else {
            response.success(res, 200, 'Producto encontrado', product);
        }

    } catch (error) {
        debug(error);
        response.error(res);
    }
}

const createProduct = async (req, res) => {
    try {
        const { body: product } = req

        if(!product || Object.keys(product).length === 0) {
            response.error(res, new createError.BadRequest());

        } else {
            const insertedId = await ProductService.createProduct(product);
            response.success(res, 201, 'Producto ingresado', insertedId);
        }
        
    } catch (error) {
        debug(error);
        response.error(res);        
    }
}

const updateProduct = async (req, res) => {
    try {
        const { params: { id } } = req;
        const { body: product } = req;

        if(!product || Object.keys(product).length === 0) {
            response.error(res, new createError.BadRequest());

        } else if(await ProductService.updateProduct(id, product) !== 1) {
            response.error(res, new createError.NotFound());

        } else {
            response.success(res, 200, 'Producto actualizado', { success: true });
        }

    } catch (error) {
        debug(error);
        response.error(res);
    }

}

const deleteProduct = async (req, res) => {
    try {
        const { params: { id } } = req;

        if(await ProductService.deleteProduct(id) !== 1) {
            response.error(res, new createError.NotFound());
    
        } else {
            response.success(res, 200, 'Producto eliminado', { success: true })
        }
    } catch (error) {
        debug(error);
        response.error(res);
    }

}

const generateReport = async (req, res) => {
    try {
        ProductService.generateReport('Inventario', res);
    } catch (error) {
        debug(error);
        response.error(res);
        
    }
}

module.exports.ProductControllers = {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
    generateReport
}