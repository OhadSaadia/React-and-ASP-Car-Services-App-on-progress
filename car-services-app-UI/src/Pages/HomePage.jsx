import React from 'react';
import CardsBar from '../components/CardsBar';
import SearchBar from '../components/SearchBar';

 function HomePage(props) {

    const {bestSellers , newest} = props;

    return (
        <div className='container'>
            <SearchBar/>
        <br></br>
        <h1>Car Services</h1>
        <h3>A web site were you can find car for rent and for sale</h3>
        <p>
            Here you can find the best cars on market, with most trustable service.<br/>
            We wish you good like with choosing your next car!!
        </p>
        <CardsBar title="Check out our newest cars for rent" cars={newest}/>
        <br />
        <br />
        <CardsBar title="Check out our best sellers"  cars={bestSellers}/>
        </div> 
        
    );
 }
 
 export default HomePage;