const { renderFragment } = require('../services/fragments.service');

const fragmentsController = (app) => {

    app.get('/render-fragment', async (req, res) => {
        
        const fragmentName = req.query.name;
        const fragmentVersion = req.query.version;

        //const data = JSON.parse(dataAsString);

        const renderedFragment = await renderFragment(fragmentName, fragmentVersion);

        res.send(renderedFragment);;
        
    })    
}

module.exports = fragmentsController;



