import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
import Info from './Info';
const Layout = () => {

    return (
        <div>
            <Header />
            <Outlet />
            <Info />
        </div>
    );
}

export default Layout;
