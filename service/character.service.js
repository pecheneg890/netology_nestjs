const characterModel = require('../model/character.model');

class CharacterModel {
    async getAll() {
        return await characterModel.find().select('-__v');
    }

    async getOne(id) {
        return await characterModel.findOne({id: id}).select('-__v');
    }
}   

module.exports = new CharacterModel();