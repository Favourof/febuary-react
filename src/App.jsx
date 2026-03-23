
import Counter from "./Conter";
import Interpolation from "./Interpolation";
// import appStyle from './App.module.css'
import Button from "./Button";
import InputValue from "./InputValue";
import { Navber } from "./components/Navber";
import { Footer } from "./components/Footer";
import { Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import { Product } from "./pages/Product";
import { About } from "./pages/About";
import { Contact } from "./pages/contact";
import { NotFound } from "./components/NotFound";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { ProductDetails } from "./pages/ProductDetails";
import { Register } from "./pages/register";


function App() {

  return (
    <>

      <Navber />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="product" element={<Product />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="profile/:user" element={<Profile />} />
        <Route path="productDetail/:id" element={<ProductDetails />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* <Footer /> */}
    </>


  )
}

export default App