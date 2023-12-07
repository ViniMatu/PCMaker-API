const axios = require('axios');

function normalizeString(string) {
    return string.toLowerCase().replace(/[^a-z0-9]/gi, '');
}

const excludedTerms = ["espelho", "case", "capa", "acessório", "kit", "Shieldx", "fan", "bucha", "espelho", "caixa", "adesivo", "cabochao", "cabocho", "correia"];

function isExcluded(title) {
    return excludedTerms.some(term => normalizeString(title).includes(normalizeString(term)));
}

async function getSellerReputation(sellerId) {
    const url = `https://api.mercadolibre.com/users/${sellerId}`;
    try {
        const response = await axios.get(url);
        return response.data.seller_reputation.level_id;
    } catch (e) {
        console.error(`Erro ao buscar reputação do vendedor ${sellerId}:`, e);
        return null;
    }
}

async function scrapeMercadoLivre(searchQuery) {
    const urlML = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURI(searchQuery)}`;
    console.log(searchQuery);
    try {
        const responseML = await axios.get(urlML);
        const results = responseML.data.results;
        let items = [];

        const sellerReputationPromises = results.map(item => getSellerReputation(item.seller.id));
        const sellerReputations = await Promise.all(sellerReputationPromises);

        items = filterConditions(results, sellerReputations, '5_green', 'new', searchQuery);
        if (items.length === 0) {
            items = filterConditions(results, sellerReputations, '4_yellow', 'new', searchQuery);
        }

        items = items.sort((a, b) => a.price - b.price);
        return items.length > 0 ? items.slice(0, 1) : [];

    } catch (error) {
        console.error('Erro na requisição:', error);
        return [];
    }
}

function filterConditions(results, reputations, reputationLevel, condition, query) {
    const normalizedQuery = normalizeString(query);
    return results.filter((item, index) =>
        reputations[index] === reputationLevel &&
        item.condition === condition &&
        normalizeString(item.title).includes(normalizedQuery)
    ).map(item => createItemObject(item));
}

function createItemObject(item) {
    let title = item.title || "Null";
    let price = item.price || "Null";
    let link = item.permalink || "Null";
    let image = item.thumbnail || "Null";

    return {
        title: title,
        price: price,
        link: link,
        image: image
    };
}

module.exports = {
    scrapeMercadoLivre
};
