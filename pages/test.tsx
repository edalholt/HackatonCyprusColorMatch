import type { NextPage } from 'next'
import { firestore } from '../firebase/clientApp';
import {collection,QueryDocumentSnapshot,DocumentData,query,where,limit,getDocs} from "@firebase/firestore";
import { useState } from 'react';

const info = collection(firestore,'test');
const [data,setData] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);


const getTodos = async () => {
    // construct a query to get up to 10 undone todos 
    const testQuery = query(info,limit(10));
    // get the todos
    const querySnapshot = await getDocs(testQuery);
    
    // map through todos adding them to an array
    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot) => {
    result.push(snapshot);
    });
    // set it to state
    setData(result);
 };

const Test: NextPage = () => {
  return !data ? (null) : ( 
    <>
    data:
    {data}
    </>
  )
}

export default Test
