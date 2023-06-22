const fetch = require('node-fetch');
let getCurrentNews = () => new Promise(async (resolve, reject) => {
    const apiUrl = 'https://content.guardianapis.com/search?api-key=3870464e-7f05-4b36-b799-d2ec57c31099';
    const response = await fetch(apiUrl)
    console.log(response);
    if(response)
        resolve(response)
    reject("error");
});

module.exports = {
    getCurrentNews
};