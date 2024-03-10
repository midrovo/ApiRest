const express = require('express');
const debug = require('debug')('app:server');

const { config } = require('./src/config');
const { ProductRoutes } = require('./src/routes/product.route');
const { UserRoutes } = require('./src/routes/user.route'); 
const { ItemRoutes } = require('./src/routes/item.route');
const { FacturaRoutes } = require('./src/routes/factura.route');

const PORT = config.port;

// middlewares
const app = express();
app.use(express.json());

// rutas de acceso
app.use('/api/productos', ProductRoutes);
app.use('/api/usuarios', UserRoutes);
app.use('/api/ventas', ItemRoutes);
app.use('/api/facturas', FacturaRoutes);


app.listen(PORT, () => {
    debug(`Servidor escuchando en el puerto ${ PORT }`)
})