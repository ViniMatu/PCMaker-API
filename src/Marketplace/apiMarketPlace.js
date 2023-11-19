const axios = require('axios');
function normalizeString(string) {
    return string.toLowerCase().replace(/[^a-z0-9]/gi, '');
}

const excludedTerms = ["case", "capa", "acessório", "kit", "Shieldx"];
function isExcluded(title) {
    return excludedTerms.some(term => normalizeString(title).includes(normalizeString(term)));
}

async function scrapeMercadoLivre(searchQuery) {
    const urlML = `https://api.mercadolibre.com/sites/MLB/search?q=${encodeURI(searchQuery)}`;

    try{
        const responseML = await axios.get(urlML);
        const results = responseML.data.results;
        let items = [];

        results.forEach(item => {
            let title = item.title || "Null";
            let price = item.price || "Null";
            let link = item.permalink || "Null";
            let sellerReputation = item.seller.seller_reputation;

            if(normalizeString(title).includes(normalizeString(searchQuery)) && !isExcluded(title)){
                const objeto = {
                    title: title,
                    price: price,
                    link: link,
                    sellerReputation: sellerReputation
                };
                items.push(objeto);
            }
        });

        //Filtro de reputação
        items = items.filter(item => item.sellerReputation.level_id === '5_green');

        //organiz preço
        items = items.sort((a, b) => a.price - b.price);

        //retorna o melhor preco e de boa reputation
        return items.length > 0 ? items.slice(0, 1) : [];

    } catch (error) {
        console.error('Erro na requisição:', error);
        return [];
    }
}