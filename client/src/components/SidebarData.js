import React from 'react';

import * as FaIcons from 'react-icons/fa';

import * as MdIcons from 'react-icons/md';

import * as SiIcons from 'react-icons/si';



export const SidebarData = [
    

    {

        title: 'My Account',

        path: '/my_profile',

        icon: <SiIcons.SiCashapp/>,

        cName: 'nav-text'

    },

    {

        title: 'Payment History',

        path: '/my_profile/payment_history',

        icon: <MdIcons.MdPayment />,

        cName: 'nav-text'

    },

    {

        title: 'My Routes',

        path: '/my_profile/my_journey',

        icon: <FaIcons.FaRoute />,

        cName: 'nav-text'

    }

    //{

        //title: 'Team',

        //path: '/team',

        //icon: <IoIcons.IoMdPeople />,

        //cName: 'nav-text'

    //},

   // {

        //title: 'Messages',

        //path: '/messages',

       // icon: <FaIcons.FaEnvelopeOpenText />,

        //cName: 'nav-text'

    //},

   // {

      //  title: 'Support',

     //   path: '/support',

     //   icon: <IoIcons.IoMdHelpCircle />,

     //   cName: 'nav-text'

    //}

];