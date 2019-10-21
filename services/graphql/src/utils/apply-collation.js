module.exports = ({ field }) => (field && field !== '_id' ? { locale: 'en_US' } : undefined);
