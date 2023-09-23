const { readFile } = require('fs/promises')
const file = './src/database/jogos.json'

class JogoRepository{
    constructor(){
        this.file = file
    }

    async __readFile() {
        return JSON.parse(await readFile(this.file))
    }

    async getAll(){
        const all = await this.__readFile()
        if(all) 
            return all

        return null
    }

}

const jogosRepository = new JogoRepository({
    file: './src/database/jogos.json'
})

// jogosRepository.find(1).then(console.log).catch(err => console.log(err))

module.exports = JogoRepository 