import React from 'react'
import HeaderNav from '../components/HeaderNav'
import BreadCrumb from '../components/BreadCrumb'

const Contact = () => {
  const banner ='assets/shop_banner_character1.png';
  return (
    <div>
        <HeaderNav/>
        <BreadCrumb pageTitle={'Contact'} bannerImg={banner}/>
      <h1>Contact</h1>
    </div>
  )
}

export default Contact
