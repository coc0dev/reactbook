const stripeAPI = require('../../stripe');

async function createCheckoutSession(req,res) {
    const domainUrl = process.env.WEB_APP_URL;
}

let session;

try {
    session = await stripeAPI.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: [
            {
                price: '',
                quantity: 1,
            },
        ],
        succes_url: `${domainUrl}/succes?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${domainUrl}/canceled`
    });
    res.status(200).json({ sessionID: session.id })
    } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'an error'});
    }

module.exports = createCheckoutSession;