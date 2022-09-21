import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import Header from '../components/header'
import axios from 'axios'
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage'
import { firestore, storage } from '../firebase/clientApp';
import { fileURLToPath } from 'url'
import { collection, doc, DocumentData, getDocs, limit, query, setDoc } from 'firebase/firestore'

const Home: NextPage = () => {
    const router = useRouter();
    const [colors, setColors] = useState<string[]>(); 
    const [correctUrl, getCorrectUrl] = useState<string>(); 
    const getColors = async(color: string ) => {
        let hexColorList: string[] = []; 
        const {data} = await axios({
            method: 'get', 
            url: `https://www.thecolorapi.com/scheme?hex=${color}&mode=monochrome&format=json&count=5`, 
            responseType: 'stream'
        }); 
        for (let i = 0; i < 5; i++) {
            let color: string = data.colors[i].hex.clean; 
            hexColorList.push(color);
        }
        setColors(hexColorList);
    }

    const pathReference = ref(storage, 'IMG_1660.jpg' ); 
    getDownloadURL(pathReference)
        .then((url) => {
            getCorrectUrl(url);
    });



    const [selectedFile, setSelectedFile] = useState<File>(); 
    const [isFilePicked, setIsFilePicked] = useState(false); 

    const metadata = {contentType: 'image/jpg'}; 

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.currentTarget.files); 
        if (event.currentTarget.files !== null) {
            setSelectedFile(event.currentTarget.files[0]);
            setIsFilePicked(true);
        }
    }

    const handleSubmission = () => {
        if (selectedFile !== undefined) {
            const storageRef = ref(storage, 'images/' + selectedFile.name);
            const uploadTask = uploadBytesResumable(storageRef, selectedFile, metadata);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100; 
                    console.log('Upload is' + progress + '% done'); 
                }
            );
            getData(selectedFile.name, 'potato');
        }
    }

    
    const timestamp: string = Date.now().toString();
    const addInfo = doc(firestore, `pictures/${timestamp}`);

    const getData = async(imagename: string, hexColors: string) => {
        await setDoc(addInfo, {imageId: imagename, colors: hexColors});
     };


  return (
    <div>
        <Header />
        <div>  
            <img src={correctUrl} alt="" style={{width: '20%'}}/>
            <input type="file" name="file" onChange={changeHandler} />
            <button onClick={handleSubmission} >Submit</button>
            <button onClick={ () => getColors('100100')} >Click to generate colors</button>
            <p>{colors}</p>
        </div>
    </div>
  )
}

export default Home