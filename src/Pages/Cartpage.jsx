import React, { useEffect, useState } from 'react'
import HeaderNav from '../components/HeaderNav';
import BreadCrumb from '../components/BreadCrumb';
import { useCart } from './CartContext';
import { Container, Row, Col, Table ,Button} from 'react-bootstrap';
import Nodata from '../components/Nodata'


const Cartpage = () => {
  const cartBanner = 'assets/shop_banner8.png';
  
  const { grandtotal,cartItems,removeItemFromCart } = useCart();

  const [cartData, setCartdata] = useState([])

  useEffect(() => {
    setCartdata(cartItems)
  }, [cartItems])

  const removeHandler=(id)=>{
    removeItemFromCart(id)  ;
  
  }
  return (
    <div>
      <HeaderNav />
      <BreadCrumb pageTitle={'Cart'} bannerImg={cartBanner} />
      <Container>
        <Row>
          <Col>
            {cartData.length > 0 ? (
              <Table style={{marginTop:'300px'}}>
                <thead>
                  <tr>
                    <th>Sno</th>
                    <th>Product Img</th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                 
                    {cartData.map((items,index)=>{
                       const {id, image, title, price, category} = items;
                      return(
                        <>
                        <tr key={id}>
                        <td>{index+1}</td>
                          <td><img src={image} style={{height:'40px'}}/></td>
                          <td>{title}</td>
                          <td>{category}</td>
                          <td>{price}</td>
                          <td><Button onClick={()=>removeHandler(id)}>Remove</Button></td>   
                        </tr>     
                        </>
                      )
                    })}
                    <tr >
                      <td colSpan={5} className='text-right' >total:</td>
                      <td>{grandtotal}</td>
                    </tr>
                </tbody>
              </Table>
            ) :(<Nodata />)}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Cartpage
