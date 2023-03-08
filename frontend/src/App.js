import Header from "./components/layouts/Header";
import Footer from "./components/layouts/Footer"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PLP from "./Pages/PLP";
import PDP from "./components/layouts/PDPCard";
import SignIn from "./Pages/SignIn";
import CreateUser from "./Pages/CreateNewUser";
import ForgotPassword from "./Pages/ForgotPassword";
import RecoveryPassword from "./Pages/RecoveryPassword";
import CheckOut from "./Pages/CheckOut";
import { useEffect } from "react";
import axios from 'axios'
import MiniCart from "./components/MiniCart";


function App() {
  
  // useEffect(() => {

  //   // fetch("http://localhost:4000/api/v1/products")
  //   //   .then((res) => res.json())
  //   //   .then((data) => console.log("===========",data));

  //   axios({

  //     // Endpoint to send files
  //     url: "http://localhost:4000/api/v1/products",
  //     method: "GET"
  //   }).then((res)=>{
  //     console.log("===============", res.data);
  //   })
  // }, []);


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route index element={<PLP />} />
        <Route path='/plp' element={<PLP />} />
        <Route path='/pdp/:id' element={<PDP/>} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/create/user/acount' element={<CreateUser />} />
        <Route path='/forgotpassword' element={<ForgotPassword />} />
        <Route path='/recovery-password' element={<RecoveryPassword />} />
        <Route path='/checkout' element={<CheckOut />} />
        {/* <Route path='/mini-cart' element={<MiniCart />} /> */}
        {/* <Route path='*' element={<NotFound />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
