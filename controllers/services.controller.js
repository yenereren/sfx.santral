//const { renderFragment } = require('../services/fragments.service');

const servicesController = (app) => {

    app.get('/api', async (req, res) => {

        const name = req.query.name;
        const version = req.query.version;
        const data = await getData(name, version);

        res.send(data);
    })    
}

module.exports = servicesController;



