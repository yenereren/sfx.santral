const axios = require("axios");
const requireFromString = require('require-from-string');
const CMS_API = 'https://sfx-cmsapi.herokuapp.com/sf';

let services = [];

const setServicesCache = async () => {

    const servicesFromApi = await getServicesFromApi();
    services = servicesFromApi;
    console.log("services cache init");

    setInterval(async () => {
        const servicesFromApi = await getServicesFromApi();
        services = servicesFromApi;
    },10000)

    return true;
}

const getServicesFromApi = async () => {
    const request = `${CMS_API}/services`;
    const servicesFromApi = (await axios.get(request)).data;

    return servicesFromApi;
}

const getService = async (name, version) => {
    const service = services.find(i => i.name === name && i.version === parseInt(version));
    
    return service;
}

const getData = async (name, version) => {
    const service = await getService(name, version);
    
    if(service){
        const serviceFromString = requireFromString(service.js);
        
        if(serviceFromString){
            const data = await serviceFromString.service();
            return data;
        }
    }

    return false;
}


module.exports.setServicesCache = setServicesCache;
module.exports.getService = getService;
module.exports.getData = getData;
