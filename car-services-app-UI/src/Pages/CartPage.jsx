import { Button } from '@mui/material';
import React from 'react';
import CartLists from '../components/CartLists';
import { AuthContext} from '../GlobalContexts';

export default function CartPage() {

    // const [totalPrice, setTotalPrice] = useState(0);
    // const { isAuthenticated } = useContext(AuthContext);

    // if (isAuthenticated) {
    //     api.get(`orders`, {
    //       headers: {
    //         'Authorization': `Bearer ${token}`
    //       }
    //     })
    //     .then(res => {

    //     })
    // }

   


    return (
        <div className="container">
            <br />
            <h1>Order Detailes</h1>
            <br />   
                <CartLists/>
            <div style={{position: "relative"}}>
                Total Price:
                <div className='pay-button'>
                    <Button variant="contained">Pay Now!</Button>
                </div>
            </div>
           
              
        </div>
       

    );
}
