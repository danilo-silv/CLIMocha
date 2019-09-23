const {
    deepEqual,
    ok
} = require('assert');

const dataBase = require('./database');
const DEFAULT_ITEM_CADASTRAR = { nome: 'Flash', poder: 'Speed', id: 1 }

describe('suite de manipulução de Herois', () => {
    //antes de tudo vamos salvar um objeto no arquivo para não ter problema com o proximo teste, ele pode ler um arquivo vazio e dar erro
    before(async () => {
        await dataBase.cadastrar(DEFAULT_ITEM_CADASTRAR);
    })

    it('deve listar o primerio usuario', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        //[] == pega a primeira posicao do array retornado.
        const [resultado] = await dataBase.listar(expected.id);
        deepEqual(resultado, expected);
    })

    it('deve cadastrar um heroi, usando arquivos', async () => {
        const expected = DEFAULT_ITEM_CADASTRAR;
        const resultado = await dataBase.cadastrar(DEFAULT_ITEM_CADASTRAR);
        const [actual] = await dataBase.listar(DEFAULT_ITEM_CADASTRAR.id);
        deepEqual(actual, expected);
    })
})