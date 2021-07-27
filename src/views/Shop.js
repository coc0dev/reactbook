import React, { useContext } from 'react'
import { DataContext } from '../contexts/DataProvider'
import { Products } from './Products';

export const Shop = () =>
{
    const { products } = useContext(DataContext);
    console.log(products)
    return (
        <React.Fragment>
            <h3>Shop</h3>
            <hr />
​
            <div className="card-deck">
               {products.map(p => <Products key={p.id} product={p} /> )}
            </div>
        </React.Fragment>
    )
}