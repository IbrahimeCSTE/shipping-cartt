import React, { useEffect } from 'react';
import formatCurrency from "../util";
import { useDispatch, useSelector } from 'react-redux';
import { fetchOrders } from '../actions/orderActions';

const Orders = () => {
  const  orders=useSelector(state=>state.order.orders)
  console.log(orders)
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchOrders())
  },[dispatch])
  return (
    <div>
      {
        !orders ? (
          <div>Loading....</div>
        ) : (
          <div className="orders">
            <h2>Orders</h2>
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADDRESS</th>
                  <th>ITEMS</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr>
                    <td>{order._id}</td>
                    <td>{order.createdAt}</td>
                    <td> {formatCurrency(order.total)}</td>
                    <td>{order.name}</td>
                    <td>{order.email}</td>
                    <td>{order.address}</td>
                    <td>
                      {order.cartItems.map((item) => (
                        <div>
                          {item.count} {" x "} {item.title}
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
    </div>
  );
};

export default Orders;

