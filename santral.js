const express = require('express')
const cors = require('cors')

const app = express()
const { setFragmentsCache } = require('./services/fragments.service');
const { setServicesCache } = require('./services/services.service');
app.use(cors())

const port = Number(process.env.PORT || 4005);

const startCacheIntervalsThenServer = async () => {
    const fragmentsIntervalStarted = await setFragmentsCache();
    const servicesIntervalStarted = await setServicesCache();

    if(fragmentsIntervalStarted && servicesIntervalStarted){
        app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
    }
}

require('./controllers/fragments.controller')(app);
require('./controllers/services.controller')(app);

startCacheIntervalsThenServer();
