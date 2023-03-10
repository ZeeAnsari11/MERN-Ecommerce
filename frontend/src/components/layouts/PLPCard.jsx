import React from 'react'
import { Link } from 'react-router-dom'


const PLPCard = ({id, image, name, price, description}) => {

    
    return (
        <div className="rounded-lg shadow-lg flex flex-col justify-center items-center w-full bg-white">
          <Link to={`/pdp/${id}`}>
            <img className="rounded-t-lg" src={image} alt=""/>
          </Link>
          <div className="p-6">
            <h5 className="text-gray-900 text-xl font-medium mb-2">{name}</h5>
            <h5 className="text-gray-900 text-xl font-medium mb-2">{price}</h5>
            <p className="text-gray-700 text-base mb-4">
             {description}
            </p>
            <button type="button" className=" inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Button</button>
          </div>
        </div>
      
    )
}

export default PLPCard