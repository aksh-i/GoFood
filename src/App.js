import './App.css';
import Home from './screens/Home';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap-dark-5/node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap-dark-5/node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup';
import { CartProvider } from './components/ContextReducer';
import MyOrder from './screens/MyOrder';


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>

  );
}

export default App;









// Notes: --------------------------------------------

//  To start: cd mernapp 
//npm start

//1.  Goal of reactor: To make the application a single
// page application

// 2.  react router dom is used to make this application
//  a single page application. It converts the anchor 
// tag into link tag 

//3.  MongoDB (NoSQL) is used where data is updated very frequently like stock market
//Advantages: very fast, Schemaless  

//4. I have imported data set into my mongodb Atlas through 
//the import mongodb database tool

//5. With the help of mongoose, aap schema bana sakte ho in mongodb
//(which is otherwise schemaless)
//Mongoose connects your database with mongodb

