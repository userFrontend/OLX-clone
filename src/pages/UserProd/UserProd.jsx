import React, { useEffect, useState } from "react";
import "./UserProd.scss";
import { Link, NavLink } from "react-router-dom";
import { useInfoContext } from "../../context/infoContext";
import Loader from "../../components/Loader/Loader";
import { deleteProd } from "../../api/deleteRequest";
import { toast } from "react-toastify";
import {getProd } from "../../api/getRequest";

const UserProd = () => {
  const { cards, toggleReset, currentUser, exit, works, category, users} = useInfoContext();
  const [reset, setReset] = useState(false)
  const userArr = [...cards, ...works]

  const userProd = userArr.filter((prod) => prod.authorId === currentUser._id);


  const deleteProdact = async (prod) => {
    const confirmDel = window.confirm('Подвердети удалить...')
    if(confirmDel){
      const method = category.filter(cat => cat._id === prod.categoryId)[0]
      toast.loading('Please wiat...')
      let result = null
      console.log(method.name);
      try {
        if(method.name === 'Транспорт'){
          const res = await deleteProd(prod._id, 'car')
          result = res.data.message
        }else if (method.name === 'Мода и стиль'){
          const res = await deleteProd(prod._id, 'fashion')
          result = res.data.message
        } else if(method.name === 'Работа'){
          const res = await deleteProd(prod._id, 'work')
          result = res.data.message
        }
        toast.dismiss()
        setReset(!reset)
          toast.success(result)
          toggleReset()
      } catch (err) {
          setReset(!reset)
          toast.dismiss()
          toast.error(err.response.data.message)
          if(err.response.data.message === 'jwt expired'){
            exit()
          }
      }
    }
  }

  return (
    <div className="my">

      <div className="top-account">
            <div className="top-btn">
            <h2>Объявления</h2>
            <div className="btn">
                <p>Ваш счет: 0 сум <br />
                Для рекламы объявлений: 0 бонусов</p>
                <i className='fa-solid fa-info'></i>
                <button>Пополнить счет</button>
            </div>
            </div>
            <nav>
                <ul>
                    <li><NavLink to='/my'>Объявления</NavLink></li>
                    <li><NavLink to='/chat'>Сообщения</NavLink></li>
                    <li><NavLink to='/'>Платежи и счёт OLX</NavLink></li>
                    <li><NavLink to='/'>Профиль кандидата</NavLink></li>
                    <li><NavLink to='/account'>Настройки</NavLink></li>
                </ul>
            </nav>
        </div>
      <div className="filter">
        <div className="container">
        <div className="none">
          <Link to='/'><button className='media-btn'><i className='fa-solid fa-chevron-left'></i></button></Link>
        <h2>Объявления</h2>
          </div>
          <ul className="media">
            <li>Активные</li>
            <li>Ожидающие</li>
            <li>Неоплаченные</li>
            <li>Неактивные</li>
            <li>Отклоненные</li>
          </ul>
          <div className="btns media">
            <div className="filterR">
              <i className="fa-solid fa-sliders"></i>
              <span>Добавить фильтр</span>
            </div>
            <div className="searchInput">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input type="text" placeholder="Искать по заголовку..." />
            </div>
            <div className="category">
              <span>Любая категория</span>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
            <div className="sort">
              <span>Сортировать</span>
              <i className="fa-solid fa-chevron-down"></i>
            </div>
          </div>
          <div className="cardsS">
            {userProd.length > 0 ? (
              currentUser.role !== 'admin' ?
              userProd.map((res) => {
                return (
                  <div style={res.authorId === currentUser._id ? {backgroundColor: 'white'} : {backgroundColor: 'whitesmoke', border: '2px solid white', color: 'gray'}} key={res._id} className="card-user">
                    <div className="one">
                      <div className="card-info">
                        {res?.photos?.length > 0 && <img src={res.photos[0].url} alt="" />}
                        <div className="status-one">
                          <div id="res-content">
                            <b>{res.content}</b><br />
                          </div>
                          <i className="fa-solid fa-location-dot"></i> 
                          {res.location} <br />
                          <i className="fa-solid fa-calendar-days"></i>  
                          {new Date(
                            res.createdAt
                          ).toLocaleDateString()} <br />
                          {currentUser.role === 'admin' && res.authorId !== currentUser._id && <b style={{color: 'gray'}}>Это Объявления от (<span style={{backgroundColor: 'red', color: 'white', padding: "5px"}}>{res?.user?.firstname ? res.user.firstname : "Новый пользователь"}</span>)</b>}
                        </div>
                      </div>
                      <div className="card-status">
                        <div className="status-two">
                          <b>{res.price}</b>
                          <div className="iconss">
                            <span>
                              0 <i className="fa-regular fa-heart"></i>
                            </span>
                            <span>
                              0 <i className="fa-solid fa-phone"></i>
                            </span>
                            <span>
                              0 <i className="fa-solid fa-eye"></i>
                            </span>
                            <button>Просмотр статиску</button>
                            <button>
                              <i className="fa-regular fa-comment"></i> 0
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="usertwo">
                      <p>id:{res._id}</p>
                      <div>
                        <Link to={`/prod/${res._id}`}><button>Проверить</button></Link>
                        <span onClick={() => deleteProdact(res)} style={{cursor: 'pointer'}}>Удалить</span>
                      </div>
                    </div>
                  </div>
                );
              }) : 
              userArr.map((res) => {                
                return (
                  <div style={res.authorId === currentUser._id ? {backgroundColor: 'white'} : {backgroundColor: 'whitesmoke', border: '2px solid green', color: 'gray'}} key={res._id} className="card-user">
                    <div className="one">
                      <div className="card-info">
                        {res?.photos?.length > 0 && <img src={res.photos[0].url} alt="" />}
                        <div className="status-one">
                          <div id="res-content">
                            <b>{res.content}</b><br />
                          </div>
                          <i className="fa-solid fa-location-dot"></i> 
                          {res.location} <br />
                          <i className="fa-solid fa-calendar-days"></i>  
                          {new Date(
                            res.createdAt
                          ).toLocaleDateString()} <br />
                          {currentUser.role === 'admin' && res.authorId !== currentUser._id && users.map(user => {
                              if(user._id === res.authorId){
                                return <div key={user._id}>
                                    <b style={{color: 'gray'}}>Это Объявления от
                                      [ <span style={{backgroundColor: 'green', color: 'white', padding: "5px", borderRadius: '5px'}}>
                                        {user?.firstname ? user.firstname : "Новый пользователь"}
                                      </span> ]
                                    </b>
                                    <p>{user.email}</p>
                                </div>
                              }
                          })}
                        </div>
                      </div>
                      <div className="card-status">
                        <div className="status-two">
                          <b>{res.price}</b>
                          <div className="iconss">
                            <span>
                              0 <i className="fa-regular fa-heart"></i>
                            </span>
                            <span>
                              0 <i className="fa-solid fa-phone"></i>
                            </span>
                            <span>
                              0 <i className="fa-solid fa-eye"></i>
                            </span>
                            <button>Просмотр статиску</button>
                            <button>
                              <i className="fa-regular fa-comment"></i> 0
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="usertwo">
                      <p>id:{res._id}</p>
                      <div>
                        <Link to={`/prod/${res._id}`}><button>Проверить</button></Link>
                        <span onClick={() => deleteProdact(res)} style={{cursor: 'pointer'}}>Удалить</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <Loader/>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProd;