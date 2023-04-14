
import React from 'react';
import Nav from '../components/NavBar/Nav';
import aboutimg from '../images/workerimage.jpg'
import ABOUTW from '../images/ABOUTW.jpg';
import aboutuser from '../images/shuffleimages.jpg';


const AboutPage = () => {
  return (<React.Fragment>
    <div>
      <Nav/>
    </div>
    {/* <div className='about-hero  '>
    <img className='w-full'  src={aboutimg} />
    <h1 className='ab-heading text-center text-4xl font-serif mt-5'>Who We Are</h1>
    <div className='Text mt-10 '>We team vijay shakti working on a problem statement of rural area where we are solving the problem of unskilled labour by providing them a platform which connect the worker and a user in a very simply way through our project <strong>श्रम साथी</strong>. The श्रम साथी provides a great user experience available in both languages Hindi and English with the feature of map locator and the functionality of automatic mailing system</div>
    <h1 className=' bg-gray-600 mt-8 text-center text-2xl font-merry '> 
    Functionality for the Worker</h1>
    <div className='workersection flex'>
    <img src={ABOUTW} className='w-[300px] h-[280px] mt-10 ml-10 rounded-sm'/>
  
    <ul className='mt-10 ml-[500px] leading-[70px] italic'>
   <li className='font-bold'> Important points</li>

      <li>Simple user experience for rural lavours</li>
       <li>Available in both languages Hindi & English</li>
        <li>Maps Feature for finding location of a user ETC.</li>
    </ul>
    </div>
    <h1 className='bg-gray-600  mt-8 text-center text-2xl font-merry '> Functionality for the User </h1>
    <div className='usersection flex'>
 <img  className='w-[300px] h-[280px] mt-10 ml-10 rounded-sm'  src={aboutuser}></img>
  <ul className='mt-10 ml-[500px] leading-[70px] italic'>
   <li className='font-bold'> Important points</li>

      <li>No need to find worker here and there</li>
       <li>Location of the worker easily find through maps feature</li>
        <li>Proper authentication and mailing system along with profile system</li>
    </ul>
    </div>
    </div> */}

    <div className='flex w-full justify-space-between items-center p-10'>
      <div classname="w-[50vw]">

            <img className='h-80 w-full rounded-xl'  src={aboutimg} />
            <img className='h-80  rounded-xl absolute left-[27%] top-[50%]'  src={aboutuser} />

      </div>
      <div classname="p-4 w-[50%]">

        <h2>Who We Are!!!</h2>

      </div>
    </div>
    </React.Fragment>

  )
}

export default AboutPage