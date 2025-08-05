import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from "./ui/Home"
import Menu, { menuLoader } from "./features/menu/Menu"
import Cart from "./features/cart/Cart"
import Order, { orderLoader } from "./features/order/Order"
import CreateOrder, {action as createOrder} from "./features/order/CreateOrder"
import AppLayout from "./ui/appLayout"
import Error from "./ui/Error"
import { action as updateOrderAction } from "./features/order/updateOrder"


const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/menu',
        element: <Menu />,
        loader: menuLoader,
        errorElement: <Error />,
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/order',
        element: <Order />
      },
      {
        path: '/order/new',
        element: <CreateOrder />,
        action: createOrder
      },
      {
        path: '/order/:orderId',
        loader: orderLoader,
        element: <Order />,
        action: updateOrderAction
      },
    ]
  },

])

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
