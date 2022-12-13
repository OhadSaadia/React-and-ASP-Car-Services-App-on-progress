import React, { useContext } from 'react';
import { CartContext } from '../GlobalContexts';
import OrderBar from './OrderBar';


function CartLists() {
    const {getCart} = useContext(CartContext);
    let cartArr = getCart();
    
    let rentLines = [];
    let bayLines = [];
    
    if (cartArr && cartArr.length > 0) {
        for (let i = 0; i < cartArr.length; i++) {
            const line = cartArr[i];

            if (line.dealType === "Rent") {
                line.id = i;
                rentLines.push(line);
            }
            if (line.dealType === "Bay") {
                line.id = i;
                bayLines.push(line);
            }
        }
    }
    

    return (
        <>
        <h3 className='sub-title'>Rent:</h3>
        {
            rentLines.map(line => 
                    <OrderBar key={line.id} order={line} />
            )  
        }
        <br/>
        <h3 className='sub-title'>Bay:</h3>
        {
            bayLines.map(line => 
                    <OrderBar  key={line.id} order={line} />
            )  
        }
        </>
    );
}

export default CartLists;