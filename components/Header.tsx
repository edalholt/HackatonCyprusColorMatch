import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import React from 'react'

const Header: NextPage = () => {
    const router = useRouter(); 
    
  return (
    <div style={{ backgroundColor: '#284b63', color: 'white', height: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr 1fr', justifyItems:'center'}}>  
        <img style={{ cursor: 'pointer', width: '20%', margin: '5% 20%', placeSelf: 'start'}} src="/logo.svg" onClick={ () => router.push(`/frontpage`)} alt="logo" />
        <p></p>
        <p></p>
        <p style={{marginTop: '10%', cursor: 'pointer'}} onClick={ () => router.push(`/upload`) }>Upload</p>  
        <p style={{marginTop: '10%', cursor: 'pointer'}} onClick={ () => router.push(`/explore`) }>Explore</p>
        <p style={{marginTop: '10%', cursor: 'pointer'}} onClick={ () => router.push(`/artist`) }>For the artist</p>    
    </div>
  )
}

export default Header