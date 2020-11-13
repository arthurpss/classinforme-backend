const xlsxFile = require('read-excel-file/node');

let produtos = [];

module.exports = {
    async leCatalogo(request, response) {
        await xlsxFile('src/files/catalogo.xlsx').then((rows) => {
            rows.forEach((col) => {
                col.forEach((data) => {
                    produtos.push(data);
                })
            })
        })
        return response.json(produtos);
    }
}
