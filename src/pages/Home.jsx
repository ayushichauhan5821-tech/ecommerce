import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
<>
    <div className="w-full h-screen flex items-center justify-center">
       
        <Link>
            <button classname="w-full rounded-2xl text-white bg-black">Go To Login Page</button>
        </Link>
       
    </div>
 </>
 
  )
}

export default Home