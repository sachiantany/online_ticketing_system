import React from 'react';
import Navbar from "../components/Navbar";
import '../components/MyAccount.css';
import Demo from './demo';


function Myjourney() {

    return (

        <div className='container'>
            <Navbar/>

            <div className="topic_and_button">
                <h2>My Trips</h2>
            </div>
            <Demo/>
        </div>

    );

}



export default Myjourney;