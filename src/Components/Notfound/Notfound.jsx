import React from 'react'
import styles from './Notfound.module.css'
import notfound from '../../assests/error.svg'
export default function Notfound() {
  return <>
 <div className="container">
 <div className="row d-flex justify-content-center align-items-center p-5">
 <img className='w-100' src={notfound} alt="" />
 </div>
 </div>
  </>
}
