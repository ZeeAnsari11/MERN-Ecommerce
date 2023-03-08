import React from 'react'
import { FooterCol } from './FooterCol'
import { COMPANY, LEGAL } from './FooterCols'

const Footer = () => {
  return (
    <footer className='w-full justify-evenly border-2 border-t-gray-400'>
      <div className='flex justify-evenly text-gray-700 body-font mt-7'>
        <div className='flex-col space-y-4'>
          {
            COMPANY.map((item, index) => <FooterCol key={index} title={item.title} path={item.path} />)
          }
        </div>
        <div className='flex-col space-y-4'>
          {
            LEGAL.map((item, index) => <FooterCol key={index} title={item.title} path={item.path} />)
          }
        </div>
        <div className='space-y-4'>
          <p>NEWSLETTER</p>
          <input />
        </div>
        <div className='space-y-4'>
          <p>CURRENCY</p>
          <input />
        </div>
      </div>
      <div className='py-5 text-center'>
        Hyvä Themes© 2020 Hyva Themes B.V. — @hyva_io
      </div>
    </footer>
  )
}

export default Footer