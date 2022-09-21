import type { NextPage } from 'next'
import { firestore, storage } from '../firebase/clientApp';
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs} from "@firebase/firestore";
import { useState, useEffect } from 'react';
import { doc } from '@firebase/firestore'; // for creating a pointer to our Document
import { setDoc } from 'firebase/firestore'; // for adding the Document to Collection
import { useRouter } from 'next/router';
import Header from '../components/Header';
import { ref, getDownloadURL } from 'firebase/storage';




const Home: NextPage = () => {
    const router = useRouter(); 

    const [data, setData] = useState<DocumentData[]>([]);
    const [imageNames, setImageNames] = useState<string[]>([]);
    const [urls, setUrls] = useState<string[]>([]);
    const info = collection(firestore,'pictures');
 
    const getData = async () => {
     
        const testQuery = query(info,limit(20));
    
        const querySnapshot = await getDocs(testQuery);
        const result: DocumentData[] = [];
        querySnapshot.forEach((doc) => {
          result.push(doc.data());
        });
        console.log(result);
        let list = []; 
        for (let i = 0; i < result.length; i++) {
          list.push(result[i].imageId);
        }
        setImageNames(list); 
     };

    useEffect( () => {
      getData();
      console.log(imageNames); 
      getUrl(imageNames);
    },[]);

    function getUrl(names: string[]) {
      console.log('hei')
      let list: string[] = []; 
      for (let i = 0; i < names.length; i++) {
        const pathReference = ref(storage, 'images/'+names[i]); 
        getDownloadURL(pathReference)
          .then((url) => {
              console.log('huh', url);
              list.push(url); 
        });
      }
      console.log(list, 'hei');
      setUrls(list);      
    }

    function tester(url: string) {
      console.log('hva'); 
      return <img src={url} alt="image" style={{width: '15%'}} />; 
    }
    
    
  return (
    <div>
        <Header />
        <div style={{backgroundColor: '#284b63', height: '100vh', display: 'flex', alignItems:'center', justifyContent:'center'}}>  
            <div style={{display: 'flex'}}>
              {urls.map(elem => tester(elem))}
            </div>
        </div>
    </div>
  )
}

export default Home