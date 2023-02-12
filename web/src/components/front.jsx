import './front.css'
import img from './img/silayni.png'
import { Routes, Route, Link, Navigate } from "react-router-dom";

function front() {

    return (
        <div>

            <div className='mainImg'>
                <img src={img} alt="" />
            </div>
            

            <div className="Mainhead">
                <h1>SAYLANI WELFARE</h1>
                <h4>ONLINE DISCOUNT STORE</h4>
            </div>
            <Link to={`/login`}><button className="startButton" type="submit">Get started</button></Link>

            






        </div>
    )
}

export default front;