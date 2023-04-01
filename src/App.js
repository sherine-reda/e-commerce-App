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
import { useState } from 'react';
import jwtDecode from 'jwt-decode';

function App() {
  const [userData, setUserData] = useState(null);
  function saveUserData(){
     let encodedToken = localStorage.getItem('userToken');
     let decodedToken = jwtDecode(encodedToken);
     setUserData(decodedToken);
  }
 
  const routers = createBrowserRouter([
    {path:'',element:<Layout setUserData={setUserData} userData={userData}/> , children:[
      {index:true,element:<Home />},
      {path:'cart',element:<Cart/>},
      {path:'products',element:<Products/>},
      {path:'categories',element:<Categories/>},
      {path:'brands',element:<Brands/>},
      {path:'login',element:<Login saveUserData={saveUserData}/>},
      {path:'register',element:<Register/>},
      {path:'*',element:<Notfound/>},

    ]}
  ])
  return <>
   <RouterProvider router={routers}></RouterProvider>
  </>
}

export default App;
