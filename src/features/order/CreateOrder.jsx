import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';
  const { username, status: addressStatus, position, address, error: errorAddress } = useSelector(state => state.user);
  const isLoadingAddress = addressStatus === 'loading';
  const formErrors = useActionData();
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart)
  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * .2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>


      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40" >First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className="text-xs mt-2 bg-red-200 text-red-700 p-2 rounded-md">{formErrors.phone}</p>}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" disabled={isLoadingAddress} defaultValue={address} required />
            {addressStatus === 'error' && <p className="text-xs mt-2 bg-red-200 text-red-700 p-2 rounded-md">{errorAddress}</p>}
          </div>
          {!position.latitude && !position.longitude && <span className="absolute md:right-1.25 z-50 md:top-1.25 top-[50%] right-[3px]  sm:right-[3px] sm:top-[3px] ">
            <Button disabled={isLoadingAddress} type="small" onClick={(e) => {
              e.preventDefault();
              dispatch(fetchAddress())
            }}>Get position</Button>
          </span>}
        </div>

        <div className="mb-12 flex gap-5 items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400
            focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">Want to yo give your order priority?</label>
        </div>
        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.latitude}, ${position.longitude}` : ""} />
          <Button type='primary' disabled={isSubmitting || isLoadingAddress}>{isSubmitting ? 'Placing order..' : `Order now from ${formatCurrency(totalPrice)}`}</Button>
        </div>
      </Form>
    </div>
  );
}

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  }

  let newOrder = await createOrder(order);
  const errors = {};
  if (!isValidPhone(order.phone)) errors.phone = 'Please give us correct phone number.'

  store.dispatch(clearCart());
  return Object.keys(errors).length > 0 ? errors : redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
