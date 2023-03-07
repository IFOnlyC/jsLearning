console.log('Exporting shoppingCart module');

export const cart = [];

export default function (product, quantity) {
  cart.push({ product, quantity });
  console.log(`${quantity} ${product} add to cart`);
}
