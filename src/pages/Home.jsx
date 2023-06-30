import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Home = () => {

    return (
        <div className='relative flex items-center justify-center h-[80vh] w-full'>
            <div className='flex flex-col gap-10 text-center'>
                <h3 className='text-4xl font-bold text-gray-500'>Products Dashboard</h3>
                <NavLink to={'/create'}>
                    <button className="btn btn-wide bg-black text-neutral-content hover:bg-white hover:text-black">Create new products</button>
                </NavLink>
                <NavLink to={'/load'}>
                    <button className="btn btn-wide  bg-black text-neutral-content hover:bg-white hover:text-black">View and edit products</button>
                </NavLink>


            </div>


        </div>

    );
}

export default Home;
