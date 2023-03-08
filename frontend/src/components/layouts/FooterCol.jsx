import React from 'react'
import { Link } from "react-router-dom";


export const FooterCol = ({ title, path}) => {
  return (
    <div>
    <Link to={path}>{title}</Link>
    </div>
  )
}
