import React, {useState} from 'react';
import {Link} from "react-router-dom";
import * as FaIcon from "react-icons/fa";
import * as AiIcon from "react-icons/ai";
import { AdminNavbarData} from './AdminNavbarData';
import './AdminNavbar.css';
import { IconContext} from "react-icons";
import AdminLogout from "../pages/Admin/AdminLogout";
import {Nav, NavItem} from "reactstrap";

function AdminNavbar(props) {

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    return (
            <>
                <IconContext.Provider value={{color: '#fff'}}>
                    <div className="navbar">
                        <Link to="#" className="menu-bars">
                            <FaIcon.FaBars onClick={showSidebar}/>
                        </Link>

                        <Nav className='ml-auto' navbar>
                            <NavItem className='nav-text'>
                                <AdminLogout />
                            </NavItem>
                        </Nav>

                    </div>

                    {/*<ul className='nav-menu-items' onClick={showSidebar}>*/}

                    <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                        <ul className='nav-menu-items'>
                            <li className='navbar-toggle'>
                                <Link to='#' className='menu-bars'>
                                    <AiIcon.AiFillCloseCircle />
                                </Link>
                            </li>
                                {AdminNavbarData.map((item, index) =>{
                                    return (
                                        <li key={index} className={item.cName}>
                                            <Link to={item.path}>
                                                {item.icon}
                                                <span>{item.title}</span>
                                            </Link>
                                        </li>
                                    )
                                })}


                        </ul>
                    </nav>
                </IconContext.Provider>
            </>
        );
}

export default AdminNavbar;