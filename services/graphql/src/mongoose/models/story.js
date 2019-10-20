const connection = require('../connection');
const schema = require('../schema/story');

module.exports = connection.model('story', schema, 'stories');
