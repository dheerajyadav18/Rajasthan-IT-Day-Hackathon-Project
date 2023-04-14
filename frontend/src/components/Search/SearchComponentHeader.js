import React from 'react';
import { Link } from 'react-router-dom';

const SearchComponentHeader = () => {
  return (
    <div className='p-2 pl-10 pr-10'>
        <ul className='flex text-white text-md gap-6'>
            <li className='hover:text-blue-200 ease-in-out transition-all transition-300'><Link to={"/"} className="">Home</Link></li>
            <li className='hover:text-blue-200 ease-in-out transition-all transition-300'><Link to='/user/profile'>Profile</Link></li>
            <li className='hover:text-blue-200 ease-in-out transition-all transition-300'><Link to='/explore'>Explore</Link></li>
            <li className='hover:text-blue-200 ease-in-out transition-all transition-300'><Link to='/about'>About</Link></li>
            <li className='hover:text-blue-200 ease-in-out transition-all transition-300'><Link to='/user/profile'>Profile</Link></li>

        </ul>
    </div>
  )
}

export default SearchComponentHeader;