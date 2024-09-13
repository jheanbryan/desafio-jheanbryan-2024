class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanhoTotal: 10, animais: [{ especie: 'MACACO', quantidade: 3, tamanho: 1 }] },
            { numero: 2, bioma: 'floresta', tamanhoTotal: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanhoTotal: 7, animais: [{ especie: 'GAZELA', quantidade: 1, tamanho: 2 }] },
            { numero: 4, bioma: 'rio', tamanhoTotal: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanhoTotal: 9, animais: [{ especie: 'LEAO', quantidade: 1, tamanho: 3 }] },
        ];

        this.animais = {
            'LEAO': { tamanho: 3, biomas: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, biomas: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, biomas: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, biomas: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, biomas: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, biomas: ['savana', 'rio'], carnivoro: false },
        };
    }

    analisaRecintos(especie, quantidade) {
        if (!this.animais[especie]) {
            return { erro: "Animal inválido" };
        }

        if (quantidade <= 0 || !Number.isInteger(quantidade)) {
            return { erro: "Quantidade inválida" };
        }

        const animal = this.animais[especie];
        const recintosViaveis = [];

        for (const recinto of this.recintos) {
            const biomasRecinto = recinto.bioma.split(' e ');

            if (biomasRecinto.some(bioma => animal.biomas.includes(bioma))) {
                const espacoOcupado = recinto.animais.reduce((total, a) => total + (a.quantidade * a.tamanho), 0);
                let espacoExtra = 0;

                if (recinto.animais.length > 0 && recinto.animais[0].especie !== especie) {
                    espacoExtra = 1;
                }

                let espacoDisponivel = recinto.tamanhoTotal - espacoOcupado - espacoExtra;
                const espacoNecessario = quantidade * animal.tamanho;
                const animaisExistentes = recinto.animais;
                const temCarnivoro = animaisExistentes.some(a => this.animais[a.especie].carnivoro);

                if (animal.carnivoro && animaisExistentes.length > 0) continue;
                if (temCarnivoro && animaisExistentes.length > 0 && animaisExistentes[0].especie !== especie) continue;

                if (especie === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio') continue;

                if (espacoDisponivel >= espacoNecessario) {
                    recintosViaveis.push(`Recinto ${recinto.numero} (espaço livre: ${espacoDisponivel - espacoNecessario} total: ${recinto.tamanhoTotal})`);
                }
            }
        }

        return recintosViaveis.length > 0 ? { recintosViaveis } : { erro: "Não há recinto viável" };
    }
}

export { RecintosZoo as RecintosZoo };
