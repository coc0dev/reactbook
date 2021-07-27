const stripeAPI = require('stripe')(process.env.STRIPE_PUBLISHABLE_KEY);

module.exports = stripeAPI;