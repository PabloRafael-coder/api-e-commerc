const { Router } = require('express');

    const routes = new Router()

    routes.get('/', (resquest, response) => {

        return response.json({message: 'Você conseguiu, hello would'})
    })

    module.exports = routes;