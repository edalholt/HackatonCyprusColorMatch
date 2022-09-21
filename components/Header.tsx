import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import React from 'react'

const Header: NextPage = () => {
    const router = useRouter(); 
    
  return (
    <div style={{backgroundColor: '#284b63', color: 'white', height: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', justifyItems:'center'}}>  
        <div style={{ }}>
            <p style={{ marginBottom: 0}} >ICON</p>
            <p style={{ fontSize: 'small', marginTop: 0 }} >artMatch</p>
        </div>
        <p></p>
        <p onClick={ () => router.push(`/upload`) }>Upload</p>  
        <p onClick={ () => router.push(`/upload`) }>Explore</p>
        <p onClick={ () => router.push(`/upload`) }>For the artist</p>     
    </div>
  )
}

export default Header