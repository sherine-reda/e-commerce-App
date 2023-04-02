import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import './App.css';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Cart from './Components/Cart/Cart';
import Products from './Components/Products/Products';
import Categories from './Components/Categories/Categories';
import Brands from './Components/Brands/Brands';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';

function App() {
  useEffect(() => {
   if(localStorage.getItem('userToken')!==null){
    saveUserData();
   }
  }, [])
  
  const [userData, setUserData] = useState(null);
  function saveUserData(){
     let encodedToken = localStorage.getItem('userToken');
     let decodedToken = jwtDecode(encodedToken);
     setUserData(decodedToken);
  }
 
  const routers = createBrowserRouter([
    {path:'e-commerce-App',element:<Layout setUserData={setUserData} userData={userData}/> , children:[
      {index:true,element:<ProtectedRoute><Home /></ProtectedRoute>},
      {path:'e-commerce-App/cart',element:<ProtectedRoute><Cart/></ProtectedRoute>},
      {path:'e-commerce-App/products',element:<ProtectedRoute><Products/></ProtectedRoute>},
      {path:'e-commerce-App/productDetails/:id',element:<ProtectedRoute><ProductDetails/></ProtectedRoute>},
      {path:'e-commerce-App/categories',element:<ProtectedRoute><Categories/></ProtectedRoute>},
      {path:'e-commerce-App/brands',element:<ProtectedRoute><Brands/></ProtectedRoute>},
      {path:'e-commerce-App/login',element:<Login saveUserData={saveUserData}/>},
      {path:'e-commerce-App/register',element:<Register/>},
      {path:'*',element:<Notfound/>},

    ]}
  ])
  return <>
   <RouterProvider router={routers}></RouterProvider>
  </>
}

export default App;
