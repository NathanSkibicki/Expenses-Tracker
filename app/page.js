'use client'
import React, {useState, useEffect} from 'react';
import {collection, addDoc, getDoc, QuerySnapshot, onSnapshot, query,deleteDoc, doc} from 'firebase/firestore'
import { db } from './firebase';
import { parse } from 'postcss';
 
export default function Home() {
  const [items, setItems] = useState([
  ])
  const [newItem, setNewItem] = useState({
    name: '',
    price: ''
  })
 
  const [total, setTotal] = useState(0);

  //add item to database
  const addItem = async(e) => {
    e.preventDefault()
    if (newItem.name !== "" && newItem.price !== ''){
      await addDoc(collection(db, 'items'), {
        name: newItem.name.trim(),
        price: newItem.price,
      });
      setNewItem({name: '', price: ''})
    }
  }

  //read items from database
  useEffect(() =>{
    const q = query(collection(db, 'items'))
    const unsubscribe = onSnapshot(q, (QuerySnapshot)=>{
      let itemsArr = []
      QuerySnapshot.forEach((doc) => {
        itemsArr.push({...doc.data(), id: doc.id})
      });
      setItems(itemsArr);

      //calculate total from db
      const calculateTotal = () =>{
        const totalPrice = itemsArr.reduce((sum, item) => sum + parseFloat(item.price), 0);
        setTotal(totalPrice)
      }
      calculateTotal();
      return () => unsubscribe();
    })
  }, []);
  //delete items from database
  const deleteItem = async(id) => {
    await deleteDoc(doc(db, `items`,id))
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between sm:p-24 p-4">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm">
          <h1 className='text-4xl p-4 text-center'>Expense Tracker</h1>


          <div className='bg-blue-400 p-4 rounded-lg'>
            <form className='grid grid-cols-6 items-center text-black'>
              <input 
              value = {newItem.name}
              onChange = {(e) => setNewItem({...newItem, name: e.target.value})}
              className='col-span-3 p-3 border' 
              type="text" 
              placeholder='Enter Item'/>

              <input 
              value = {newItem.price}
              onChange = {(e) => setNewItem({...newItem, price: e.target.value})}
              className='col-span-2 p-3 border mx-3' 
              type="text" 
              placeholder='Enter $'/>

              <button 
              onClick = {addItem}
              className='text-white bg-blue-600 hover:bg-blue-700 p-3 text-xl' type = 'submit'>+</button>
            </form>
          <ul>
            {items.map((items, id) =>(  
              <li key={id} className='my-4w-full flex justify-between bg-blue-500'>
                <div className='p-4 w-full flex justify-between'>
                  <span className='capitalize'>{items.name}</span>
                  <span>${items.price}</span>
                </div>
                <button onClick ={() => deleteItem(items.id)} className='ml-8 p-4 border-l-2 border-blue-600 hover:bg-blue-600 w-16'>X</button>
              </li>
            ))}
          </ul>
          {items.length < 1 ? ('') : (
            <div className='flex justify-between p-3'>
              <span>Total</span>
              <span>${total}</span>
            </div>
          )}
          </div>
      </div>
    </main>
  )
}
