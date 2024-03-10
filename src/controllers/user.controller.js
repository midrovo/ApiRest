const { response } = require('../common/response');
const { UserService } = require('../services/user.service');

const debug = require('debug')('app:controller-users');
const createError = require('http-errors');

const getUsers = async (req, res) => {
    try {
        const users = await UserService.getAll();
        response.success(res, 200, 'Usuarios', users);

    } catch (error) {
        debug(error);
        response.error(res);
    }
}

const getUser = async (req, res) => {
    try {
        const { params: { id } } = req;
        const user = await UserService.getById(id);

        if(!user) {
            response.error(res, new createError.NotFound())

        } else {
            response.success(res, 200, 'Usuario encontrado', user);
        }
        
    } catch (error) {
        debug(error);
        response.error(res);
    }
}

const createUser = async (req, res) => {
    try {
        const { body: usuario } = req

        if(!usuario || Object.keys(usuario).length === 0) {
            response.error(res, new createError.BadRequest());
            
        } else {
            const insertedId = await UserService.createUser(usuario);
            response.success(res, 201, 'Usuario agregado', insertedId);
        }

        
    } catch (error) {
        debug(error)
        response.error(res);
    }
}

const updateUser = async (req, res) => {
    try {
        const { params: { id } } = req;
        const { body: user } = req;
    
        if(!user || Object.keys(user).length === 0) {
            response.error(res, new createError.BadRequest());
    
        } else if(await UserService.updateUser(id, user) !== 1) {
            response.error(res, new createError.NotFound())
    
        } else {
            response.success(res, 200, 'Usuario actualizado', { success: true });
        }
    } catch (error) {
        debug(error);
        response.error(res);
    }

}

const deleteUser = async (req, res) => {
    try {
        const { params: { id } } = req;
    
        if(await UserService.deleteUser(id) !== 1) {
            response.error(res, new createError.NotFound());
    
        } else {
            response.success(res, 200, 'Usuario eliminado', { success: true })
        }
        
    } catch (error) {
        debug(error)
        response.error(res)        
    }

}

module.exports.UserControllers = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    deleteUser,
}