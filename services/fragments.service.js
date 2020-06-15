const axios = require("axios");

const CMS_API = 'https://sfx-cmsapi.herokuapp.com/sf';
let fragments = [];

const setFragmentsCache = async () => {

    const fragmentsFromApi = await getFragmentsFromApi();
    fragments = fragmentsFromApi;
    console.log("fragments cache init");

    setInterval(async () => {
        const fragmentsFromApi = await getFragmentsFromApi();
        fragments = fragmentsFromApi;
    },10000)

    return true;
}

const getFragmentsFromApi = async () => {
    const request = `${CMS_API}/fragments`;
    const fragmentsFromApi = (await axios.get(request)).data;

    return fragmentsFromApi;
}

const findReplacements = (html) => {
    let result = [];
    const regex = /\##(.*?)\##/g

    const matches = html.match(regex);

    for (let match of matches) {
        const find = '##';
        const re = new RegExp(find, 'g');

        match = match.replace(re, '');
        match = match.replace("data.", '');
        result.push(match);
    }

    return result;
}


const getFragments = () => {
    return fragments;
}


const getFragment = async(name, version) => {
    const fragment = fragments.find(i => i.name === name && i.version === version);
    console.log(fragment);

    return fragment;
}

const renderFragment = async (name, version, data) => {
    
    const fragment = getFragment(name, version);
    let result = false;

    if(fragment){
        const replacements = findReplacements(fragment.html);

        for (const replacement of replacements) {
            result = result.replace(`##data.${replacement}##`, data[replacement]);
        }
    }

    return result;

    

    return result;
}

module.exports.renderFragment = renderFragment;
module.exports.setFragmentsCache = setFragmentsCache;