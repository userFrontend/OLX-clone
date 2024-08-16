import React from 'react'
import './Footer.scss'

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <div className="about-box">
          <div className="content">
            <div className="content-list">
              <ul>
                <li><span>Мобильные приложения</span></li>
                <li><span>Помощь и Обратная связь</span></li>
                <li><span>Платные услуги</span></li>
                <li><span>Бизнес на OLX</span></li>
                <li><span>Условия использования</span></li>
                <li><span>Политика конфиденциальности</span></li>
              </ul>
              <ul>
                <li><span>Правила безопасности</span></li>
                <li><span>Карта сайта</span></li>
                <li><span>Карта регионов</span></li>
                <li><span>Популярные запросы</span></li>
                <li><span>Работа в OLX</span></li>
                <li><span>Как продавать и покупать?</span></li>
                <li><span>Контакт</span></li>
              </ul>
            </div>
            <div className="flags">
              <ul>
                <li>
                  <img src="/images/bg.svg" alt="flag" />
                  OLX.bg
                </li>
                <li>
                  <img src="/images/pl.svg" alt="flag" />
                  OLX.pl
                </li>
                <li>
                  <img src="/images/ro.png" alt="flag" />
                  OLX.ro
                </li>
                <li>
                  <img src="/images/ua.webp" alt="flag" />
                  OLX.ua
                </li>
                <li>
                  <img src="/images/pt.webp" alt="flag" />
                  OLX.pt
                </li>
              </ul>
            </div>
          </div>
          <div className="about">
            <div className="buttons">
              <img src="/images/googlePlay.png" alt="button" />
              <img src="/images/appleStore.png" alt="button" />
            </div>
            <span className="app">
              Бесплатное приложение для твоего телефона
            </span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer