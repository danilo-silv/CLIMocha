const { readFile, writeFile } = require('fs');
const { promisify } = require('util')

const readFileAsync = promisify(readFile);
const writeFileAsync = promisify(writeFile);
//outra forma de obter dados de json
// const dadosJson = require('./herois.json');

class Database {
    constructor() {
        this.NOME_ARQUIVO = 'herois.json';
    }
    async obterDadosArquivos() {
        const arquivo = await readFileAsync(this.NOME_ARQUIVO, 'utf8');
        return JSON.parse(arquivo.toString());
    }

    async listar(id) {
        const dados = await this.obterDadosArquivos();
        const dadosFiltrados = dados.filter(item => (id ? (item.id === id) : true));
        return dadosFiltrados;
    }

    async escreverArquivos(dados) {
        await writeFileAsync(this.NOME_ARQUIVO, JSON.stringify(dados));
        return true
    }

    async cadastrar(heroi) {
        //pegando os dados salvos
        const dados = await this.obterDadosArquivos();
        const id = heroi.id <= 2 ? heroi.id : Date.now();
        //gerando um novo obejto com os dados do heroi enviado
        const heroiComId = {
            id,
            //contatena os dois objetos ou seja o objeto heroi contem um id
            ...heroi
        }

        //concatenando um array de objetos com os dados enviados como parametro pela função e com os dados salvos no arquivo

        const dadosFinal = [
            ...dados,
            heroiComId
        ]

        const resultado = await this.escreverArquivos(dadosFinal);
        return resultado;
    }
}

module.exports = new Database();