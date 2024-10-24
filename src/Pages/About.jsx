import React from 'react'
import HeaderNav from '../components/HeaderNav'
import BreadCrumb from '../components/BreadCrumb'
import Contact from '../components/Contact';


const About = () => {
  const banner ='assets/shop_banner_character1.png';
  return (
    <div>
     <HeaderNav/>
     <BreadCrumb  pageTitle={'About us'} bannerImg={banner}/>
     <Contact/>
     About
    </div>
  )
}

export default About
