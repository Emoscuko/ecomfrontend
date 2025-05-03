// src/environments/environment.ts
export const environment = {
    production: false,
    apiBaseUrl: 'http://localhost:8080/api',
    stripePublicKey: 'pk_test_51RFZuGR2QBitwP7HUoWMjP4xkC5XgVzCQ5uWdVBHqhC9xDDL8tPc1jzkMlCiy1q2ajHc62YbBS8xBUv9aBiKjkTU00GhYl1Nzu',  // replace with your Stripe test key
    payPalClientId: 'AUXu2FWkHA80KFeN-EDIunKA76EIUv8XBMOJJ6P2QvEErqsxAXZ8rijzrV-yJiiSp8sQa05LBL-Wpe4v'   // PayPal sandbox client ID if using PayPal SDK
  };