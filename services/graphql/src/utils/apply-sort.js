module.exports = ({ field, order }) => ({ [field]: order === 'asc' ? 1 : -1 });
