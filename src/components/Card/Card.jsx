import React from 'react'
import './Card.scss'
import { Link } from 'react-router-dom';
import LikeBtn from '../LikeBtn/LikeBtn';

const Card = ({ prod }) => {
    const createdAt = new Date(prod?.createdAt);
    const today = new Date();

    const formattedDate = createdAt.toLocaleDateString();
    const todayDateString = today.toLocaleDateString();

    const isToday = formattedDate === todayDateString;
    return (
        <div className='card'>
            <Link className="card-img" to={`/prod/${prod?._id}`}>
                <img src={prod?.photos?.length > 0 ? prod?.photos[0]?.url : '/images/work.jpg'} alt="card_img" />
            </Link>     
            <div className="card-body">
                <Link to={`/prod/${prod?._id}`} className="card-content">
                    <div className="price-card">
                        <p className='content'>{prod?.name}</p>
                        <b>{prod?.price ? prod.price : prod?.salary}</b>
                    </div>
                    <div className="data">
                        {prod?.location} <br />
                        {isToday ? `сегодня в ${createdAt.toLocaleTimeString().slice(0, 5)}` : formattedDate}
                    </div>
                </Link>
                <div className="card-like">
                    <LikeBtn id={prod._id}/>
                </div>
            </div>
        </div>
    )
}

export default Card