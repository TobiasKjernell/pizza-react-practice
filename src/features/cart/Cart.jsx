import Button from '../../ui/Button';
import LinkButton from '../../ui/LinkButton';
import CartItem from './CartItem';

const fakeCart = [
  {
    pizzaId: 12,
    name: 'Mediterranean',
    quantity: 2,
    unitPrice: 16,
    totalPrice: 32,
  },
  {
    pizzaId: 6,
    name: 'Vegetale',
    quantity: 1,
    unitPrice: 13,
    totalPrice: 13,
  },
  {
    pizzaId: 11,
    name: 'Spinach and Mushroom',
    quantity: 1,
    unitPrice: 15,
    totalPrice: 15,
  },
];

function Cart() {
  const cart = fakeCart;

  return (
    <div className='px-4 py-3'>
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className='mt-7 text-xl font-semibold'>Your cart, %NAME%</h2>
      <ul className='divide-y divide-stone300 border-b mt-3 '>
        {cart.map(item => <CartItem item={item} key={item.pizzaId} />)}
      </ul>
      <div className='mt-6 space-x-2'>
        <Button type='primary' to="/order/new">Order pizzas</Button>
        <Button type='secondary'>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;
