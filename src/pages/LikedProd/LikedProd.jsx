import React, { useEffect, useState } from 'react'
import './LikedProd.scss'
import { useInfoContext } from '../../context/infoContext'
import Card from '../../components/Card/Card'
import { Link, NavLink } from 'react-router-dom'

const LikedProd = () => {
    const {currentUser, cards, works} = useInfoContext()
    const userArr = [...cards, ...works]

    const userProd = userArr.filter((prod) => prod.authorId === currentUser._id);
    const [filtered, setFiltered] = useState([])
    useEffect(() => {
        const filteredCards = cards.filter(obj1 =>
            currentUser?.likes?.some(obj2 => obj2 === obj1._id)
            );
        setFiltered(filteredCards)
    }, [cards, currentUser]);
  return (
    <div className='liked'>
        <div className="top-nav">
            <Link style={{textDecoration: 'none'}} to='/'>
                <i className='fa-solid fa-chevron-left arrow'></i>
            </Link>
            <h2>Избранные <span className='none'>объявления</span></h2>
            <nav>
                <ul>
                    <NavLink to='/like'><li>Избранные <span className='none'>объявления</span> ({filtered?.length}/150)</li></NavLink>
                    <NavLink to='/my'><li><span className='none'>Сохранeнные</span> Объявления  ({userProd?.length}/50)</li></NavLink>
                    <NavLink to='/' className='none'><li>Недавно просмотренные</li></NavLink>
                </ul>
                <button className='none'>Очистить избранные</button>
            </nav>
        </div>
        <div className="container">
            <div className="liked-prods">
                {filtered?.length > 0 ? 
                    filtered.map(obj => {
                        return <Card key={obj._id} prod={obj}/>
                    })
                : <div style={{textAlign: 'center', width: '100%'}}>
                    <h2>Сохраните интересные объявления</h2>
                    <p>Нажмите ♡ на объявлении, которое вас заинтересовало, и мы сохраним его здесь.    </p>
                </div>}
            </div>
        </div>
    </div>
  )
}

export default LikedProd