import React, { useEffect, useState } from 'react'
import HeaderNav from '../components/HeaderNav'
import BreadCrumb from '../components/BreadCrumb'
import { Col, Container, Button, Row,Form } from 'react-bootstrap'
import axios from 'axios'
import Nodata from '../components/Nodata'
import { ClockLoader } from 'react-spinners'
import { useAuth } from './AuthContext'
import { useNavigate } from "react-router-dom";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { useCart } from './CartContext'


const Shop = () => {

  const[loading,setLoading]=useState(true)

  const {isLoggedIn}=useAuth()

  const {addItemToCart}=useCart()

  const banner1='./assets/shop_banner8.png'

  const apiurl='https://fakestoreapi.com/products'

  const [productList,setProductlist]=useState([])

  const[categorylist,setcategorylist]=useState({})

  const navigate=useNavigate()


  useEffect(()=>{

  const fetchProduct=async()=>{
    try {
      setLoading(true)
      const response = await axios.get(apiurl)
      if(response.status===200){
      setProductlist(response.data)
      }
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
    finally{
      setLoading(false)
    }
  }

  fetchProduct()
  fetchcategory()

},[])

  const addTocard = (cartItem) => {
    addItemToCart(cartItem);
  };

  // const addItemToCart=(item)=>{
  //   const updatCartItems=[...cartItems,item]
  //   setCartItems(updatCartItems)
  //   console.log('updatCartItems',updatCartItems)
  //   updateLocalStorage(updatCartItems);
  // }

  const loginHandler = () =>{
    navigate('/login');
}
// useEffect(()=>{fetchcategory()},[])
const fetchcategory = async ()=>{
  try {
    const response = await axios.get('https://fakestoreapi.com/products/categories')
    setcategorylist(response.data)
    console.log("categorylist.....",categorylist)
  } catch (error) {
    console.log(error)
  }
}

  return (
     <>
      <HeaderNav/>
      <BreadCrumb pageTitle={'Shop'} bannerImg={banner1}/>
      <div className='product-list-section' >
        <Container>
           <Row>
            <Col md={12}>
            <Form.Select aria-label="Floating label select example">
            <option>ALL</option>
            {categorylist.length > 0 && categorylist.map((items,index)=>{
              return(
                <option key={index} value="items">{items}</option>
              )
            })}
            </Form.Select>
            </Col>
           </Row>
           <Row>
             {productList.length > 0 ? (
              productList.map((product)=>{
                const { image, title, category, price, rating } = product;
                return(
                  <Col md={3} key={product.id}>
                    {/* <ProductCard product={product}  /> */}
                    <div className="product-card">
                      <img src={image} />
                      <div className="product-content">
                        <h4 className="title"> {title}</h4>
                        <span className="category">{category}</span>
                        <p className="cost">
                          <FaIndianRupeeSign /> {price}
                        </p>
                        <p>
                          Rating: {rating.rate} Count: {rating.count}
                        </p>
                        {isLoggedIn ? (
                          <Button
                            className="btn btn-primary" 
                               onClick={()=>addTocard(product)}           
                          >
                            Add to cart
                          </Button>
                        ) : (
                          <Button
                            className="btn btn-primary"
                            onClick={() => loginHandler()}
                          >
                            Add to cart
                          </Button>
                        )}
                      </div>
                    </div>
                  </Col>
                )
              })
             ):(
              <>
                <Nodata />
              </>
             )}
           </Row>

        </Container>
      </div>
      <div>
        {loading ? (
          <div className="customloader">
            <ClockLoader color="#c43af2" 
             loading={loading}
             size={40}
             aria-label="Loading Spinner"
             data-testid="loader"
             className="windowCenter"
            />
            </div>
        ):(
           " "
        )}
      </div>
      </>
  
    
  )
}

export default Shop
