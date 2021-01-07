// eslint-disable-next-line import/no-unresolved
// import stripe from 'stripe';
import { loadStripe } from '@stripe/stripe-js';
import config from '../../config';

// let Stripe = window.Stripe;
// Stripe.setPublishableKey("pk_test_Casd");

// console.log('-------------------------', stripe)
// export default stripe(config.stripeKey);
export const stripePromise = loadStripe(config.stripeKey);
