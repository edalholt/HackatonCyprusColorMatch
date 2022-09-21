import type { NextPage } from 'next'
import { firestore } from '../firebase/clientApp';
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs} from "@firebase/firestore";
import { useState, useEffect } from 'react';

const Test: NextPage = () => {

const [data, setData] = useState<DocumentData[]>([]);
const info = collection(firestore,'test');

const getData = async () => {
 
    const testQuery = query(info,limit(10));

    const querySnapshot = await getDocs(testQuery);
    const result: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data());
    });
    setData(result);
    console.log(result)
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
