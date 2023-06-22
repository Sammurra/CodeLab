const newsModel = require("../models/newsModel");
const axios = require('axios');



const apiKey = '00cc5677fa544d809fa388a874c65771'; // Replace with your News API key
const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${apiKey}`;

async function fetchNewsArticles() {
    try {
        const response = await axios.get(apiUrl);
        return response.data.articles;
    } catch (error) {
        console.error('Error fetching news articles:', error);
        return [];
    }
}

module.exports = {
    fetchNewsArticles
};
