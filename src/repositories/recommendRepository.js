const { readFile } = require("fs/promises")
const file = "./src/database/motherboard.json"

class RecommendRepository{

    constructor(){
        this.file = file
    }

    async __readFile(){
        return JSON.parse(await readFile(this.file))
    }

    async getAmd(type){
        const allMotherboards = await this.__readFile()

        let model = type.substring(0, 7)

        return allMotherboards["AMD"][model]
    }

    async getIntel(model){
        const allMotherboards = await this.__readFile()

        const type = model.split("Core ")[1].substring(0, 2)
        const gen = model.split("-")[1]


        if(gen.replace('K', '').length === 4){
            return allMotherboards['Intel'][`${gen.charAt(0)}th Gen`][type]
        } else {
            return allMotherboards['Intel'][`${gen.substring(0, 2)}th Gen`][type]
        }
    }
}

module.exports = RecommendRepository