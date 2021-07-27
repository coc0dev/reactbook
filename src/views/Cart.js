import React, { useContext, useEffect, useState } from 'react'
import { CartItem } from '../components/CartItem'
import { useAuth } from '../contexts/AuthContext';
import { DataContext } from '../contexts/DataProvider';
import firebase from '../firebase';
import { Link } from 'react-router-dom'

import React, { useState, useEffect } from "react";
import "./App.css";

const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
        <h3>Stubborn Attachments</h3>
        <h5>$20.00</h5>
      </div>
    </div>
    <form action="/create-checkout-session" method="POST">
      <button type="submit">
        Checkout
      </button>
    </form>
  </section>
);

const Message = ({ message }) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}


export const Cart = () =>
{
    const db = firebase.firestore();
    const { currentUser } = useAuth();
    const { cart } = useContext(DataContext);
    const [newCart, setNewCart] = useState({});
    const handleUpdate = (infoObj) => {
        if (infoObj.id in newCart) {
            let newDict = {...newCart};
            newDict[infoObj.id] = infoObj.quantity;
            setNewCart(newDict);
        }
        else {
            let newDict = {};
            newDict[infoObj.id] = infoObj.quantity;
            setNewCart({...newCart, ...newDict })
        }
    }
    useEffect(() => {
        Object.keys(newCart).forEach(prod =>
        {
            db.collection('users').doc(currentUser.id).collection('cart').doc(prod).update({
                quantity: newCart[ prod ]
            }).catch(err => console.error(err))
        })
    }, [ newCart, currentUser.id, db])
    return (
        <div>
            <h3>Cart</h3>
            <hr />
            <div className="card shopping-cart">
                <div className="card-header bg-dark text-light">
                    <i className="fa fa-shopping-cart" aria-hidden="true"></i>
                    Shopping Cart
                    <Link to="/shop" className="btn btn-outline-info btn-sm pull-right">Continue Shopping</Link>
                    <div className="clearfix"></div>
                </div>
                <div className="card-body">
                    {/* <!-- PRODUCTS --> */}
                    {Object.values(cart.items).map(productInfo => <CartItem handleUpdate={handleUpdate} key={ productInfo.id } data={ productInfo } />) }
                    {/* <!-- END PRODUCTS --> */}
                    <div className="pull-right">
                        <button onClick={() => handleUpdate()} className="btn btn-outline-secondary pull-right">
                            Update Shopping Cart
                        </button>
                    </div>
                </div>
                <div className="card-footer">
                    {/* <!-- <div className="coupon col-md-5 col-sm-5 no-padding-left pull-left">
                                        <div className="row">
                                            <div className="col-6">
                                                <input type="text" className="form-control" placeholder="cupone code">
                    </div>
                                                <div className="col-6">
                                                    <input type="submit" className="btn btn-default" value="Use cupone">
                    </div>
                                                </div>
                                            </div> --> */}
                    <div className="text-right">
                        <div className="cart-totals">
                            Subtotal: <b>${cart.subtotal}</b>
                        </div>
                        <div className="cart-totals">
                            Tax: <b>${cart.taxes}</b>
                        </div>
                        <div className="cart-totals">
                            Grand total: <b>${cart.grandtotal}</b>
                        </div>
                    </div>
                    <div className="pull-right" style={{ margin: "10px" }}>
                        <form id="checkout-form" action="" method="POST">
                            <input type="submit" className="btn btn-success pull-right" value="Checkout" />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

