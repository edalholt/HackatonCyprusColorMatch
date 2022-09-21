import type { NextPage } from 'next'
import { firestore } from '../firebase/clientApp';
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs} from "@firebase/firestore";
import { useState, useEffect } from 'react';
import { doc } from '@firebase/firestore'; // for creating a pointer to our Document
import { setDoc } from 'firebase/firestore'; // for adding the Document to Collection

const Test: NextPage = () => {

  const timestamp: string = Date.now().toString();
const [data, setData] = useState<DocumentData[]>([]);
const info = collection(firestore,'test');
const addInfo = doc(firestore, `test/${timestamp}`);

const getData = async () => {
 
    const testQuery = query(info,limit(10));

    const querySnapshot = await getDocs(testQuery);
    const result: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    setData(result);
    
    
    await setDoc(addInfo, {data: '42'});
 };

 useEffect( () => {
  getData();
},[]);

  return !data ? (<>loading</>) : ( 
    <>
    data:
    {data.map(elem =>
    elem.data
    )}
    </>
  )
}

export default Test
