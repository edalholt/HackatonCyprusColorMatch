import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import React from 'react'
import Header from '../components/Header'
import { faDove } from '@fortawesome/free-solid-svg-icons'

const Home: NextPage = () => {
    const router = useRouter(); 
    
  return (
    <div>
        <Header />
        <div style={{backgroundColor: 'white', color: 'black', height: '100vh', display: 'flex', flexDirection: 'column', alignItems:'center', justifyContent:'center', fontWeight: 'lighter'}}>  
            <img style={{ width: '20%', margin: '5% 20%', placeSelf: 'start'}} src="/upload.svg" alt="upload icon" />
            <h3 style={{ margin: '0 20%'}}>Upload a picture of your surroundings and find the perfect art for your wall</h3>
        </div>
    </div>
  )
}

export default Home