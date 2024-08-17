import React, {useState } from "react";
import "./AddProd.scss";
import { useInfoContext } from "../../context/infoContext";
import { toast } from "react-toastify";
import { addProd } from "../../api/addRequest";
import Loader from "../../components/Loader/Loader";

const AddProd = () => {
  const {category, type, sub, currentUser, toggleReset, exit} = useInfoContext()
  const [getId, setGetId] = useState(null)
  const [subId, setSubId] = useState(null)
  const [typeId, setTypeId] = useState(null)
  const [modal, setModal] = useState(false)
  const [send, setSend] = useState(false)
  const [list, setList] = useState(0)
  const [showModal, setShowModal] = useState(false)
  const [images, setImages] = useState(Array(8).fill(null));

  const toggle = () => setModal(!modal)
  const toggleShow = () => setShowModal(!showModal)

  const handleAdd = async (e) => {
    e.preventDefault();
    setSend(true)
    try {
        const formData = new FormData(e.target);
        formData.append('authorId', currentUser._id);
        formData.append('email', currentUser.email);

        let entityType = '';
        if (filterCat?.name === 'Транспорт') entityType = 'car';
        else if (filterCat?.name === 'Мода и стиль') entityType = 'fashion';
        else if (filterCat?.name === 'Работа') entityType = 'work';

        if (typeId) formData.append('typeId', typeId);
        if (subId) formData.append('subId', subId);
        if (getId) formData.append('categoryId', getId);

        const res = await addProd(formData, entityType);
        const result = res?.data;
        
        toast.dismiss();
        toast.success(result?.message);
        toggleReset();
        setImages(Array(8).fill(null))
        setGetId(null)
        setSubId(null)
        setTypeId(null)
        setSend(false)
        e.target.reset();
        window.location.replace('/')
    } catch (err) {
        setSend(false)
        toast.dismiss();
        toast.error(err?.response?.data?.message);
        console.log(err);
        if (err?.response?.data?.message === 'jwt expired') {
            exit();
        }
    }
};

  const filterId = type.filter(res => res._id === typeId)[0]
  const filterCat = category.filter(res => res._id === getId)[0]
  const filterSub = sub.filter(res => res._id === subId)[0]


const handleImageChange = (index, e) => {
  if(e.target){
    const newImages = [...images];
      newImages[index] = URL.createObjectURL(e.target.files[0]);
      setImages(newImages);
    }
};

const handleRemoveImage = (index) => {
    const newImages = [...images];
    newImages[index] = null;
    setImages(newImages);
};
  

  return (
      <div className="bg">
        <div className="container">
          <div className="Prod">
            <form onSubmit={handleAdd} action="">
              <div className="prod_title">
                <h2 style={{padding: '0 25px'}}>Создать объявление</h2>
              </div>

              <section className="select">
                <h4>Опишите в подробностях</h4>

                <label htmlFor="">Укажите название*</label>
                <input
                  type="text"
                  placeholder="Например, Iphone 11 с гарантий"
                  name="name"
                  maxLength={70} 
                  minLength={16}
                  required
                />

                <div className="limit">
                  <p>Введите не менее 16 символов</p>
                  <p>0/70</p>
                </div>

                <label className="rukn">Категория*</label>

                <button type="button"  className="add__btn" onClick={() => {toggle(); subId && setTypeId(null); setSubId(null)}} >
                  {filterCat && <img style={{height: '60px', width: '60px', borderRadius: '50%', backgroundColor: filterCat.color}} src={filterCat.image.url} alt="photo"/>}
                  <div style={{textAlign: 'start'}}>
                    {!typeId ? <p> Выберите категорию</p> : <b>{filterId.name}</b>}
                    {filterCat && <p>{filterCat?.name} / {filterSub?.name}</p>}
                  </div>
                  {subId &&  <p className="help">
                    <div>
                      Изменить
                      <span></span>
                    </div>
                  </p>}
                </button>

                {modal && <div className="modal">
                      <div className="modal-content">    
                        <div className="modal-body">
                          <h2 className="modal-title" style={{fontSize: '25px'}}>
                            Выберите категорию
                          </h2>
                          <div className="btn-close"><span onClick={() => {toggle(); setList(0); setGetId(null); setSubId(null); setTypeId(null)}}>X</span></div>
                          <div className="add_search">
                            <i className="fa-solid fa-magnifying-glass"></i>
                            <input type="text" placeholder="Поиск..." />
                          </div>
                          <div className="modal-categorys">
                            {category.length > 0 && category.map(cat => {
                                return(
                                <div key={cat._id} className="category" onClick={() => {toggleShow(); toggle(); setGetId(cat._id)}}>
                                  <img style={{backgroundColor: cat.color}} src={cat.image.url} alt="photo" />
                                  <p className="none">{cat.name}</p>
                                </div>
                                )
                              })}
                          </div>
                        </div>
                      </div>
                </div>}
                {showModal && <div className="modal">
                    <div className="modal-content">
                      <div className="modal-body">
                        <div className="btn-close"><span onClick={() => {toggleShow(); setList(0); setGetId(null); setSubId(null); setTypeId(null)}}>X</span></div>
                        <h1 className="modal-title" id="staticBackdropLabel">
                          Выберите категорию
                        </h1>
                        <div className="ctg-select">
                          <ul className={list === 0 ? "modal_list" : "modal_list none-list"}>
                            {category.length > 0 && category.map(cat => {
                             return (
                               <li style={cat._id === getId ? {backgroundColor: 'rgba(64, 99, 103, 0.200)'} : {}} key={cat._id} className="change-menu" onClick={() => {setGetId(cat._id); setSubId(null); setList(1)}}>
                                {cat.name} <i className="fa-solid fa-angle-right"></i>
                              </li>
                             )
                            })
                          }
                          </ul>
                          <ul className={list === 1 ? "modal_list" : "modal_list none-list"}>
                            {sub.length > 0 &&
                              sub.map(item => {
                                if(item.categoryId === getId){
                                  return <li style={item._id === subId ? {backgroundColor: 'rgba(64, 99, 103, 0.200)'} : {}}  key={item._id} className="change-menu" onClick={() => {setSubId(item?._id); setList(2); !type.find(res => res.subId === item._id) && toggleShow(); setList(2)}}>{item.name} <i className="fa-solid fa-angle-right"></i></li>
                                }
                              })
                            }
                           
                          </ul>
                          <ul className={list === 2 ? "modal_list" : "modal_list none-list"}> 
                          {type.map(item => {
                                if(item.subId === subId){
                                  return <li key={item._id} onClick={() => {setTypeId(item._id); toggleShow(); setList(0)}} className="change-menu">{item.name} </li>
                                }
                          })}
                          </ul>
                        </div>
                      </div>
                    </div>
                 
                </div>}
              </section>

              {filterCat?.name !== 'Работа' && <section className="img_sec">
                <div className="images-info">
                  <h4>Фото</h4>
                  <p>Первое фото будет на обложке объявления. Перетащите, чтобы изменить порядок.</p>
                </div>

                <div className="img-boxes">
                  {images.map((image, index) => (
                      <div key={index}>
                          <div style={{height: '20px', textAlign: 'end', padding: '0 10px'}}>{image && <button style={{border: 'none', backgroundColor: 'red', padding: '5px 15px', color: 'white'}} type="button" onClick={() => handleRemoveImage(index)}>x</button>}</div>
                          <label htmlFor={`inp-${index + 1}`}>
                                  <div className="input-add">
                                    {image ? <div className="prev-img">
                                      <img src={image} height={100} width={100} style={{ objectFit: 'cover' }} alt="photo" />
                                  </div> : 
                                      <div>
                                        {index === 0 ? <p className="help">
                                        Добавить фото
                                      </p> : <i className="fa-solid fa-camera"></i>}
                                      </div>
                                    }
                                      <br />
                                      <input className={index === 0 ? 'block-inp' : 'none-input'}
                                          hidden={index !== 0}
                                          required={index === 0}
                                          onChange={(e) => handleImageChange(index, e)}
                                          id={`inp-${index + 1}`}
                                          type="file"
                                          name="image"
                                      />
                                  </div>
                          </label>
                      </div>
                  ))}
                </div>
              </section>}

              <section className="comment_sec">
                <div className="comment_info">
                  <h4>Описание*</h4>
                  <textarea required maxLength={9000} minLength={40} name="content" placeholder="Подумайте, какие подробности вы хотели бы узнать из объявления. И добавьте их в описание">
                  </textarea>
                </div>
                {filterCat?.name !== 'Работа' && <div className="limit">
                  <p>Введите не менее 40 символов</p>
                  <p>0/9000</p>
                </div>}
                {filterCat?.name === 'Работа' && <div className="input_info">
                  <p>Ссылка на форму подачи резюме</p>
                  <input required style={{width: '70%'}} type="text" name="link"/>
                </div>}
              </section>
              {filterCat?.name !== 'Работа' && <section className="price">
                <div className="input_info">
                  <div className="buttons">
                    <button>Цена</button>
                    {filterCat?.name === 'Мода и стиль' && <button>Бесплатно</button>}
                    <button>Обмен</button>
                  </div>
                    <label htmlFor="">
                      <p>Цена*</p>
                      <input
                        type="text"
                        name="price"
                        required
                      />
                    </label>
                  </div>
              </section>}
              {filterCat?.name === 'Транспорт' && <section className="input-box">
                <h2>Дополнительная информация</h2>
                <div className="input_info private">
                  <p>Частный или бизнес*</p>
                  <label htmlFor="">
                    <button type="button">Частное лицо </button>
                    <button type="button">бизнес</button>
                  </label>
                </div>
                <div className="input_info">
                  <p>Тип кузова*</p>
                  <select required>
                    <option selected disabled>Выбрать</option>
                    <option value="Кабриолет">Кабриолет</option>
                    <option value="Универсал">Универсал</option>
                    <option value="Седан">Седан</option>
                    <option value="Другая">Другая</option>
                  </select>
                </div>
                <div className="input_info">
                  <p>Год выпуска*</p>
                  <input
                    type="text"
                    placeholder="Yilini kiriting"
                    name="year"
                    required
                  />
                </div>
                <div className="input_info">
                  <p>Пробег</p>
                  <input
                    type="text"
                    placeholder="Yurgan probeg"
                    name="run"
                  />
                </div>
                <div className="input_info">
                  <p>Коробка передач*</p>
                  <select name="transmission" required>
                    <option selected disabled>Выбрать</option>
                    <option value="Механическая">Механическая</option>
                    <option value="Автоматическая">Автоматическая</option>
                    <option value="Другая">Другая</option>
                  </select>
                </div>
                <div className="input_info">
                  <p>Цвет*</p>
                  <select name="color" required>
                    <option selected disabled>Выбрать</option>
                    <option value="Белый">Белый</option>
                    <option value="Черный">Черный</option>
                    <option value="Серый">Серый</option>
                    <option value="Красный">Красный</option>
                    <option value="Хамелеон">Хамелеон</option>
                  </select>
                </div>
                <div className="input_info">
                  <p>Объем двигателя*</p>
                  <input
                    type="text"
                    placeholder="СМ3"
                    name="capacity"
                    required
                  />
                </div>
                <div className="input_info">
                  <p>Вид топлива*</p>
                  <select name="type_of_fuel" required>
                    <option selected disabled>Выбрать</option>
                    <option value="Бензин">Бензин</option>
                    <option value="Дизель">Дизель</option>
                    <option value="Гибрид">Гибрид</option>
                    <option value="Газ/Бензин">Газ/Бензин</option>
                    <option value="Электро">Электро</option>
                    <option value="Другой">Другой</option>
                  </select>
                </div>
                <div className="input_info">
                  <p>Состояние машины*</p>
                  <select name="state" required>
                    <option selected disabled>Выбрать</option>
                    <option value="Отличное">Отличное</option>
                    <option value="Хорошее">Хорошее</option>
                    <option value="Среднее">Среднее</option>
                    <option value="Требует ремонта">Требует ремонта</option>
                  </select>
                </div>
                <div className="input_info">
                  <p>Количество хозяев*</p>
                  <select name="number_of_hosts" required>
                    <option selected disabled>Выбрать</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4+">4+</option>
                  </select>
                </div>
                <div className="input_info">
                  <p>Доп. опции</p>
                </div>
              </section>}
              {filterCat?.name === 'Мода и стиль' && <section className="input-box">
                <h2>Дополнительная информация</h2>
                <div className="input_info private">
                  <p>Частный или бизнес*</p>
                  <label htmlFor="">
                    <button type="button">Частное лицо </button>
                    <button type="button">бизнес</button>
                  </label>
                </div>
                <div className="input_info private">
                  <p>Состояние*</p>
                  <select name="state" required>
                    <option selected disabled>Выбрать</option>
                    <option value="Б/у">Б/у</option>
                    <option value="Новый">Новый</option>
                  </select>
                </div>
                <div className="input_info">
                  <p>Размер</p>
                  <input
                    type="text"
                    name="size"
                  />
                </div>
                <div className="input_info">
                  <p>Доп. опции</p>
                </div>
              </section>}
              {filterCat?.name === 'Работа' && <section className="input-box">
              <div className="input_info" style={{marginBottom: '40px'}}>
                    <label htmlFor="">
                      <p>Зарплата*</p>
                      <input
                        type="text"
                        name="salary"
                        required
                      />
                    </label>
                  </div>
                <h2>Дополнительная информация</h2>
                <div className="input_info private">
                  <p>Тип работы*</p>
                  <select name="kinOfWork" required>
                    <option selected disabled>Выбрать</option>
                    <option value="Постоянная работа">Постоянная работа</option>
                    <option value="Временная работа">Временная работа</option>
                  </select>
                </div>
                <div className="input_info private">
                  <p>Тип занятости*</p>
                  <select name="employmentType" required>
                    <option selected disabled>Выбрать</option>
                    <option value="Работа на полную ставку">Работа на полную ставку</option>
                    <option value="Временная работа">Неполная занятость</option>
                  </select>
                </div>
                <div className="input_info">
                  <p>Доп. опции</p>
                </div>
              </section>}
              <section>
              <div className="input_info">
                  <p>Местоположение*</p>
                  <input
                    type="text"
                    placeholder="Название города или индекс"
                    name="location"
                    required
                  />
                </div>
              </section>
              <section className="avto_exs">
                <div className="avto_body">
                  <span>
                    <svg
                      className="svg"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path d="M349.4 44.6c5.9-13.7 1.5-29.7-10.6-38.5s-28.6-8-39.9 1.8l-256 224c-10 8.8-13.6 22.9-8.9 35.3S50.7 288 64 288H175.5L98.6 467.4c-5.9 13.7-1.5 29.7 10.6 38.5s28.6 8 39.9-1.8l256-224c10-8.8 13.6-22.9 8.9-35.3s-16.6-20.7-30-20.7H272.5L349.4 44.6z" />
                    </svg>
                    <h5>Автопродление</h5>
                  </span>
                  <p>Автопродление</p>
                </div>
              </section>
              <section className="inf_section">
                <h2>Контактная информация</h2>
                <div className="inf_label"></div>
                <p>Контактное лицо*</p>
                <input type="text" placeholder="" defaultValue={currentUser?.firstname} name="author" required/>
                <p>Email-адрес</p>
                <input className="th-l" disabled={true} defaultValue={currentUser?.email} type="email" name="email" placeholder="@gmail.com" />
                <p>Номер телефона</p>
                <input type="tel" placeholder="" name="phone" required/>
              </section>
              <section className="last_section">
                <div className="rights">
                  <p className="help">
                    <div>
                    Предпросмотр
                      <span></span>
                    </div>
                  </p>
                  {send ? <Loader/> : <button>Опубликовать</button>}
                </div>
              </section>
            </form>
          </div>
        </div>
      </div>
  );
};

export default AddProd;
