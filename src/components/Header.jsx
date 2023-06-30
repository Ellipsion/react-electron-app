import React from 'react';
import { NavLink } from 'react-router-dom';

import { BiSolidLeftArrow, BiLogoGithub } from "react-icons/bi"
import logo from "../assets/GFX1_300x.avif"

const Header = () => {

    return (
        <div className="navbar bg-black text-neutral-content">
            <div className="navbar-start">
                <div className="dropdown">
                    <NavLink to={"/"}>
                        <label className="btn btn-ghost">
                            <BiSolidLeftArrow />
                        </label>
                    </NavLink>

                </div>
                <a className="btn btn-ghost normal-case text-xl">
                    <img src={logo} className='w-28' alt="" />
                </a>
            </div>
            <div className='navbar-end'>
                <a onClick={() => window.services.openLink("https://github.com/Ellipsion")} title='My Github' className="btn  btn-ghost normal-case  text-3xl">
                    <BiLogoGithub />
                </a>
            </div>


        </div>
    );
}

export default Header;
