import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home/Home'
import Products from './pages/Products/Products'
import Product from './pages/Product/Product'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/results/:search' element={<Products />} />
        <Route path='/product/:id' element={<Product />} />
      </Routes>
    </>
  )
}
