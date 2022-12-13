import React, { useEffect } from "react";
import './CSS Files/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout'
import HomePage from './Pages/HomePage'
import SearchPage from './Pages/SearchPage'
import CarDetailsPage from "./Pages/CarDetailsPage";
import Sign from './components/Sign';
import ErrorPage from "./Pages/ErrorPage";
import { useState } from "react";
import { AuthContext } from './GlobalContexts';
import CartPage from "./Pages/CartPage";
import api from "./components/api";
import AddCarPage from "./Pages/AddCarPage";




function App() {
  const carsForSale = [
    { id: 1, model: "Civik", company: "Honda", year: 2018 },
    { id: 2, model: "3", company: "Mazda", year: 2014 },
    { id: 3, model: "Tuson", company: "Hyundai", year: 2013 },
    { id: 4, model: "Sonata", company: "Hyundai", year: 2022 },
    { id: 5, model: "Lanser", company: "Mitsubishi", year: 2017 },
  ];
  const carsForRent = [
    { id: 1, model: "Civik", company: "Honda", year: 2018 },
    { id: 2, model: "3", company: "Mazda", year: 2014 },
    { id: 3, model: "Tuson", company: "Hyundai", year: 2013 },
    { id: 4, model: "Sonata", company: "Hyundai", year: 2022 },
    { id: 5, model: "Lanser", company: "Mitsubishi", year: 2017 },
  ];


  const getPicingDetails = (dealType, carId) => {

    if(dealType="Bay"){
      var salePricingDetails = {
        carId: carId,
       saleType: 'Bay',
       price: 67000,
       features: [
           "Immediate supply!",
           "5 Year warranty!!!"
        ]
      };
      return salePricingDetails;
    }
    
    if(dealType="Rent"){
      var rentPricingDetails = {
        carId: carId,
        saleType: 'Rent',
        price: 220
      };
      rentPricingDetails.features = [
       "Best price on market!",
       `10 day for only ${rentPricingDetails.price * 10 - rentPricingDetails.price}$!!`,
       `1 month for only ${rentPricingDetails.price * 30 - rentPricingDetails.price * 5}$!!!`
      ]
      return rentPricingDetails;
    }
  }

  const [carsArrey, setCarsArrey] = useState();

  const [isAuthenticated, setIsAuthenticated] = useState();

    var token = localStorage.getItem('Token');
    if(token){
      api.get('accounts/jwtcheck', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
            .then(res => {
              if (res.status == 200) {
                setIsAuthenticated(true);
              }
            })
            .catch(err => {
              if (err.code == "ERR_BAD_REQUEST") {
                localStorage.clear();
                setIsAuthenticated(false);
              }
              if (err.code == "ERR_NETWORK") {
                window.location.href = 'errorpage'
              }
            }) 
    }

  return (
    <AuthContext.Provider value={{isAuthenticated, setIsAuthenticated}}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route path='/' element={<HomePage bestSellers={carsForRent} newest={carsForRent} />} />
              <Route path='/forrentpage' element={<SearchPage title="Cars For Rent" getPicingDetails={getPicingDetails}/>} />
              <Route path='/forsalepage' element={<SearchPage title="Cars For Sale" getPicingDetails={getPicingDetails}/>} />
              <Route path='/cardetails/:id' element={<CarDetailsPage getPicingDetails={getPicingDetails} />} />
              <Route path='/cart' element={<CartPage />} />
              <Route path='/addnewcar' element={<AddCarPage />} />
            </Route>
            <Route path='/signin' element={<Sign title='in' />} />
            <Route path='/signup' element={<Sign title='up' />} />
            <Route path='/errorpage' element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
    </AuthContext.Provider>

  );
}

export default App;
