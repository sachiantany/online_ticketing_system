import React from "react";
import * as FaIcon from "react-icons/fa";

export const AdminNavbarData = [
    {
        title: 'Home',
        path: '/home',
        icon: <FaIcon.FaHome />,
        cName: 'nav-text'
    },
    {
        title: 'Passengers',
        path: '/passengers',
        icon: <FaIcon.FaIdCard />,
        cName: 'nav-text'
    },{
        title: 'Timetable',
        path: '/timetable',
        icon: <FaIcon.FaTable />,
        cName: 'nav-text'
    },{
        title: 'Routes',
        path: '/routes',
        icon: <FaIcon.FaRoad />,
        cName: 'nav-text'
    },{
        title: 'Trips',
        path: '/buses',
        icon: <FaIcon.FaBus />,
        cName: 'nav-text'
    }

];