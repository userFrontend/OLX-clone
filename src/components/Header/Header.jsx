import React, { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import './Header.scss'
import { useInfoContext } from '../../context/infoContext'

const Header = () => {
    const {exit, currentUser, cards, works} = useInfoContext()
    const path = useLocation().pathname
    const userArr = [...cards, ...works]
    
    const [filtered, setFiltered] = useState([])
    useEffect(() => {
        const filteredCards = userArr.filter(obj1 =>
            currentUser?.likes?.some(obj2 => obj2 === obj1._id)
            );
        setFiltered(filteredCards)
    }, [cards, currentUser]);

  return (
    <header className={path === '/chat' ? 'header-none' : {}}>
        <div className="container">
            <div className="navbar">
                <div className="logo">
                    <Link to="/">
                        <img src="/images/logo.svg" alt="logo_site" />
                    </Link>
                </div>
                <nav>
                    <ul className="nav-list">
                        <li className="nav-item">
                            <NavLink style={{textDecoration: 'none'}} to="/chat" className="nav-link">
                                <i className="fa-regular fa-comment"></i>
                                Сообщения
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={{textDecoration: 'none'}} to="/" className="nav-link">
                                O'z
                                <span>|  Рус</span>
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink style={{textDecoration: 'none'}} to="/like" className="nav-link">
                                <i className="fa-regular fa-heart"></i>
                            </NavLink>
                        </li>
                        <li className={currentUser ? "nav-item profile" : "nav-item"}>
                            <NavLink style={{textDecoration: 'none'}} to='/my' className="nav-link">
                                <i className="fa-regular fa-user"></i>
                                Ваш профиль
                                <i className="fa-solid fa-chevron-down"></i>
                            </NavLink>
                            <div className="hover-nav">
                            <div className="profile-box none">
                                {currentUser?.profilePicture?.url ? <img src={currentUser.profilePicture.url} alt="" />
                                : <img src={currentUser?.profilePicture ? currentUser.profilePicture  : '/images/default_.jpg'} alt="" />}
                                <div className="box-info">
                                    <h3>{currentUser?.firstname ? currentUser.firstname : 'Новый пользователь'}</h3>
                                    <p>ID: {currentUser?._id}</p>
                                </div>
                            </div>
                            <div className="links">
                                <b>Ваш профиль</b>
                                <ul>
                                <NavLink style={{textDecoration: 'none'}} to='/my'><li>Объявления </li></NavLink>
                                <NavLink style={{textDecoration: 'none'}} to='/chat'><li>Сообщения</li></NavLink>
                                <NavLink style={{textDecoration: 'none'}} to='/'><li>Платежи и счёт OLX</li></NavLink>
                                <NavLink style={{textDecoration: 'none'}} to='/'><li>Ищу работу</li></NavLink>
                                <NavLink style={{textDecoration: 'none'}} to='/account'><li>Настройки</li></NavLink>
                                </ul>
                            </div>
                            <div className="links">
                                <b>Избранные:</b>
                                <ul>
                                    <NavLink style={{textDecoration: 'none'}} to='/like'><li>Объявления {filtered.length}</li></NavLink>
                                    <NavLink style={{textDecoration: 'none'}} to='/'><li>Поиски 0</li></NavLink>
                                    <li className='exit' onClick={exit}>Выйти</li>
                                </ul>
                            </div>
                            </div>
                        </li>
                        <li className="nav-item">
                            <NavLink style={{textDecoration: 'none'}} to="/add" className="nav-link">
                                <button className='header-btn'>
                                    Подать объявление
                                </button>
                            </NavLink>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
        <div className="media-navbar">
            <ul className="media-list">
                <li className="media-item">
                    <NavLink style={{textDecoration: 'none'}} to="/" className="media-link">
                        <i className="fa-solid fa-house-chimney"></i>
                        Главная
                    </NavLink>
                </li>
                <li className="media-item">
                    <NavLink style={{textDecoration: 'none'}} to="/like" className="media-link">
                        <i className="fa-solid fa-heart"></i>
                        Избранное
                    </NavLink>
                </li>
                <li className="media-item">
                    <NavLink style={{textDecoration: 'none'}} to="/add" className="media-link">
                        <i className="fa-solid fa-circle-plus"></i>
                        Создать
                    </NavLink>
                </li>
                <li className="media-item">
                    <NavLink style={{textDecoration: 'none'}} to="/chat" className="media-link">
                        <i className="fa-solid fa-comment"></i>
                        Сообщения
                    </NavLink>
                </li>
                <li className="media-item">
                    <NavLink style={{textDecoration: 'none'}} to="/account" className="media-link">
                        <i className="fa-solid fa-user"></i>
                        Профиль
                    </NavLink>
                </li>
            </ul>
        </div>
    </header>
  )
}

export default Header