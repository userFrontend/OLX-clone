import React, { useState } from 'react'
import './Home.scss'
import { useInfoContext } from '../../context/infoContext'
import Card from '../../components/Card/Card'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'

const Home = () => {
  const {cards, category, loader, restart, setRestart, search, handleSearch, handleLocation} = useInfoContext()
  return (
    <main>
      <div className="search-box">
        <div className="container">
          <form className="search">
            <label htmlFor="">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input onChange={handleSearch}  type="search" placeholder='Что ищете?' name='name'/>
            </label>
            <label htmlFor="" className='map'>
              <i className="fa-solid fa-location-dot"></i>
              <input onChange={handleLocation}  type="text" placeholder='Все страна' name='location'/>
            </label>
            <button>
              <span>Поиск</span>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
            <button className='media-btn'>
            <i className="fa-regular fa-bell"></i>
            </button>
          </form>
        </div>
      </div>
      <section className="categorys">
          <div className="container">
            <h2 className='title'>{restart ? <div className='search-title'><span>Search result</span> <button onClick={() => setRestart(false)}><i className="fa-solid fa-arrow-rotate-right"></i></button></div>  : 'Разделы на сервисе OLX'}</h2>
            <h2 className='title-media'>Категории <span>Смотреть все</span></h2>
            {!restart && <div className="items">
              <ul>
                <li className='active-item media-img'>
                  <div className="image" style={{display:"flex", alignItems: 'center', justifyContent: 'center', backgroundColor: '#002f34'}}>
                    <Link to="/add">
                      <img style={{ borderRadius: '50%', width: '50px', height: '50px'}} src="/images/logo.svg" alt="png" />
                    </Link>
                  </div>
                  <span>Объявление</span>
                </li>
                {category.length > 0 ? 
                  category.map(res => {
                    return (<li key={res._id} className="active-item">
                      <div className="image" style={{backgroundColor: res?.color}}>
                        <img src={res?.image?.url} alt="png" />
                      </div>
                      <span>{res?.name}</span>
                    </li>)
                  })
                : <Loader />} 
              </ul>
            </div>}
          </div>
      </section>
      <div className="prods">
        <div className="container">
          <div className="all-prods">
            {cards.length > 0 && !restart ? cards.map(card => {
              return <Card key={card._id} prod={card}/>
            }) : restart && search.length > 0 ? search.map(card => {
              return <Card key={card._id} prod={card}/>}) : <Loader/>}
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home