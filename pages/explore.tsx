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
        <div style={{backgroundColor: '#284b63', height: '100vh', display: 'flex', alignItems:'center', justifyContent:'center'}}>  
            <p>explore</p>
        </div>
    </div>
  )
}

export default Home