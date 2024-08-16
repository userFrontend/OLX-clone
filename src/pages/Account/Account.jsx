import React, { useState } from 'react'
import './Account.scss'
import { updateProd } from '../../api/updateRequest'
import { useInfoContext } from '../../context/infoContext'
import { toast } from 'react-toastify'
import { deleteProd, deleteUser } from '../../api/deleteRequest'
import { Link, NavLink } from 'react-router-dom'
import { addProd } from '../../api/addRequest'

const Account = () => {
    const {currentUser, setCurrentUser, exit, category, sub, toggleReset, type} = useInfoContext() 
    const [page, setPage] = useState(0)
    const updateUser = async (e) => {
        e.preventDefault()
        try {
            toast.loading('Please wiat...')
            const formData = new FormData(e.target)
            const res = await updateProd(currentUser._id, formData, 'user')
            toast.dismiss()
            toast.success(res?.data?.message)
            localStorage.setItem("profile", JSON.stringify(res?.data?.user))
            setCurrentUser(res?.data?.user); 
            e.target.reset()
        } catch (error) {
            toast.dismiss()
            toast.error(error?.response?.data?.message)
            if(error.response.data.message === 'jwt expired'){
                    exit()
                }
        }
    }

    const handleAction = async (e, type, action) => {
        e.preventDefault();
        const actionText = action === 'add' ? 'Добавить' : 'Удалить';
        const confirmAction = window.confirm(`${actionText} подтвердите...`);
        if (confirmAction) {
            try {
                const formData = new FormData(e.target);
                formData.append('authorId', currentUser._id);
                const res = action === 'add' ? await addProd(formData, type) : await deleteProd(formData.get('delId'), type);
                toast.dismiss();
                toast.success(res?.data?.message);
                toggleReset();
                if (action === 'add') {
                    e.target.reset();
                }
            } catch (error) {
                if (error.response.data.message === 'jwt expired') {
                    exit();
                }
            }
        }
    };
    
    const handleAdd = (e, type) => handleAction(e, type, 'add');
    const handleDelete = (e, type) => handleAction(e, type, 'delete');
    

    const deleteAcc = async () => {
        const confirmAcc = window.confirm('Подтвердите удалить...')
        if(confirmAcc){
            try {
                toast.loading('Please wiat...')
                const res = await deleteUser(currentUser._id)
                toast.dismiss()
                toast.success(res?.data?.message)
                toggleReset()
            } catch (error) {
                toast.dismiss()
                toast.error(error?.response?.data?.message)
                if(error.response.data.message === 'jwt expired'){
                    exit()
                }
            }
        }
    }

  return (
    <div className="update">
        <div className="top-account">
            <div className="top-btn">
            <Link className='none' style={{fontSize:'20px'}} to='/'><i className='fa-solid fa-chevron-left'></i></Link>
            <h2>Настройки</h2>
            <div className="btn">
                <p>Ваш счет: 0 сум <br />
                Для рекламы объявлений: 0 бонусов</p>
                <i className='fa-solid fa-circle-info'></i>
                <button>Пополнить счет</button>
            </div>
            </div>
            <nav>
                <ul>
                    <li><NavLink to='/my'>Объявления</NavLink></li>
                    <li><NavLink to='/chat'>Сообщения</NavLink></li>
                    <li><NavLink to='/'>Платежи и счёт OLX</NavLink></li>
                    <li><NavLink to='/'>Полученные оценки</NavLink></li>
                    <li><NavLink to='/'>Профиль кандидата</NavLink></li>
                    <li><NavLink to='/account'>Настройки</NavLink></li>
                </ul>
            </nav>
        </div>
        <div className='container'>
            <div className="profile-box none">
                <img style={{width: '100px', height: '100px', borderRadius: '50%', objectFit: 'cover'}} src={currentUser?.profilePicture ? currentUser.profilePicture.url : '/images/default_.jpg'} alt="" />
                <div className="box-info">
                    <h3>{currentUser?.firstname ? `Привет: ${currentUser.firstname}` : 'Новый пользователь'}</h3>
                    <hr />  
                    <p>ID: {currentUser._id}</p>
                    <span style={{color: 'gray'}}>Ваш аккаунт создань в {new Date(currentUser.createdAt).toLocaleDateString()}</span>
                </div>
            </div>
            <div className="accordion-body">
                <div className="accordion">
                    <div className={page === 1 ? 'drop-container active' : 'drop-container'}>
                    <div className="label" onClick={() => setPage(1)}>Изменить контактные данные</div>
                    <form onSubmit={updateUser} className="content">
                        <label htmlFor="">
                            <div>Выбрать город</div>
                            <input type="text" name='location'/>
                        </label>
                        <label htmlFor="">
                            <div>Контактное лицо</div>
                            <input type="text" name='firstname'/>
                        </label>
                        <label htmlFor="">  
                            <div>Номер телефона</div>
                            <input type="tel" name='phoneNumber'/>
                        </label>
                        <button>Сохранить</button>
                    </form>
                    </div>
                    {!currentUser.lastname && <div className={page === 2 ? 'drop-container active' : 'drop-container'}>
                    <div className="label" onClick={() => setPage(2)}>Изменить пароль</div>
                    <form onSubmit={updateUser} className="content">
                        <label htmlFor="">
                            <div>Текущий пароль <span>*</span></div>
                            <input type="password" name='password' required/>
                        </label>
                        <label htmlFor="">
                            <div>Новый пароль <span>*</span></div>
                            <input type="password" name='confirm' required/>
                        </label>
                        <button>Изменить пароль</button>
                    </form>
                    </div>}
                    <div className={page === 3 ? 'drop-container active' : 'drop-container'}>
                    <div className="label" onClick={() => setPage(3)}>Изменить email-адрес</div>
                    <form onSubmit={updateUser} className="content">
                        <label htmlFor="">
                            <div>Ваш текущий пароль от OLX</div>
                            <input type="password" name='password' required/>
                        </label>
                        <label htmlFor="">
                            <div>Новый email</div>
                            <input type="email" name='email' required/>
                        </label>
                        <button>Изменить пароль</button>
                    </form>
                    </div>
                    <div className={page === 4 ? 'drop-container active' : 'drop-container'}>
                    <div className="label" onClick={() => setPage(4)}>Уведомления</div>
                    <div className="content check-box">
                        <label htmlFor="" className='checkbox'>  
                            <div className="text">
                                <b>Советы от OLX.</b>
                                <p>Полезные советы, интересные предложения, <br /> рекомендации и новинки на OLX</p>
                            </div>
                            <div className="checkbox-input">
                                <div className='top-text'>
                                    Email
                                    <i className='fa-solid fa-check'></i>
                                </div>
                                <div className='top-text'>
                                    телефон
                                    <i className='fa-solid fa-check set'></i>
                                </div>
                            </div>
                        </label>
                        <label htmlFor="" className='checkbox'>
                            <div className="text">
                                <b>Акции.</b>
                                <p>Персональные скидки и специальные предложения</p>
                            </div>
                            <div className="checkbox-input">
                                <i className='fa-solid fa-check'></i>
                                <i className='fa-solid fa-check'></i>
                            </div>
                        </label>
                        <label htmlFor="" className='checkbox'>
                            <div className="text">
                                <b>Сообщения.</b>
                                <p>Новые ответы на объявления</p>
                            </div>
                            <div className='checkbox-input'>
                                <i className='fa-solid fa-check'></i>
                                <i className='fa-solid fa-check'></i>
                            </div>
                        </label>
                        <label htmlFor="" className='checkbox'>
                            <div className="text">
                                <b>Новые объявления.</b>
                                <p>Новые предложения в Избранных поисках</p>
                            </div>
                            <div className="checkbox-input">
                                <i className='fa-solid fa-check'></i>
                                <i className='fa-solid fa-check'></i>
                            </div>
                        </label>
                        <label htmlFor="" className='checkbox'>
                            <div className="text">
                                <b>Скидка на товар.</b>
                                <p>Снижение цены на объявление, добавленное в <br /> Избранные</p>
                            </div>
                            <div className="checkbox-input">
                                <i className='fa-solid fa-check'></i>
                            </div>
                        </label>
                        <button>Сохранить</button>
                    </div>
                    </div>
                    <div className={page === 5 ? 'drop-container active' : 'drop-container'}>
                    <div className="label" onClick={() => setPage(5)}>Логотип и баннер</div>
                    <form onSubmit={updateUser} className="content">
                        <label htmlFor="">
                            <div>Профиль фото</div>
                            <input type="file" name='image'/>
                        </label>
                        <button>Изменить фото</button>
                    </form>
                    </div>
                    <div className={page === 6 ? 'drop-container active' : 'drop-container'}>
                    <div className="label" onClick={() => setPage(6)}>{currentUser?.role === 'admin' ? 'Создать категорию' : 'Мое резюме'}</div>
                    <div  className="content">
                        {currentUser?.role === 'admin' ? 
                            <div>
                                <form onSubmit={(e) => handleAdd(e, 'category')} action="">
                                    <label htmlFor="">
                                        <p>Категории</p>
                                        <input type="text" name="name" placeholder='Название категории' required/>
                                        <input type="file" name="name" placeholder='file' required/>
                                    </label><br />
                                    <button>Создать категорию</button>
                                </form>
                                <form onSubmit={(e) => handleAdd(e, 'sub')} action="">
                                <label htmlFor="">
                                    <p>Подкатегории</p>
                                    <select name="categoryId" required>
                                        {category.length > 0 && category.map(res => {
                                            return <option key={res._id} value={res._id}>{res.name}</option>
                                        })}
                                    </select>
                                    <input type="text" name="name" placeholder='Название подкатегории' required/>
                                </label> <br />
                                <button>Создать категорию</button>
                                </form>
                                <form onSubmit={(e) => handleAdd(e, 'type')} action="">
                                    <label htmlFor="">
                                        <p>Тип категории</p>
                                        <select name="subId" required>
                                            {sub.length > 0 && sub.map(res => {
                                                return <option key={res._id} value={res._id}>{res.name}</option>
                                            })}
                                        </select>
                                        <input type="text" name='name' placeholder='Название тип категории' required/>
                                    </label> <br />
                                    <button>Создать категорию</button>
                                </form>
                            </div>
                        
                        : 'PHP is a server-side and general-purpose scripting language that is especially suited for web development. PHP originally stood for Personal Home Page. However, now, it stands for Hypertext Preprocessor. It’s a recursive acronym because the first word itself is also an acronym.'}
                    </div>
                    </div>
                    <div className={page === 7 ? 'drop-container active' : 'drop-container'}>
                    <div className="label" onClick={() => setPage(7)}>Удалить учетную запись</div>
                    <div className="content" style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center',}}>
                    <button style={{padding: '10px 20px', width: '40%',}} onClick={deleteAcc}>Удалить учетную запись</button>
                    <button style={{width: '60%'}}>
                        <Link style={{textDecoration: 'none', color: 'white', padding: '10px 100px'}} to='/' onClick={exit}>
                                Выйти
                        </Link>
                    </button>
                    </div>
                    </div>
                    {currentUser?.role === 'admin' &&
                    <div className={page === 8 ? 'drop-container active' : 'drop-container'}>
                    <div className="label" onClick={() => setPage(8)}>Удалить категорию</div>
                    <div className='content'>
                        <form onSubmit={(e) => handleDelete(e, 'category')} action="">
                            <label htmlFor="">
                                <p>Category</p>
                                <select name="delId" required>
                                {category.length > 0 && category.map(res => {
                                    return <option key={res._id} value={res._id}>{res.name}</option>
                                })}
                            </select>
                            </label><br />
                            <button style={{backgroundColor: 'red'}}>Удалить категорию</button>
                        </form>
                        <form onSubmit={(e) => handleDelete(e, 'sub')} action="">
                        <label htmlFor="">
                            <p>Sub Category</p>
                            <select name="delId" required>
                                {sub.length > 0 && sub.map(res => {
                                    return <option key={res._id} value={res._id}>{res.name}</option>
                                })}
                            </select>
                        </label> <br />
                        <button style={{backgroundColor: 'red'}}>Удалить категорию</button>
                        </form>
                        <form onSubmit={(e) => handleDelete(e, 'type')} action="">
                            <label htmlFor="">
                                <p>Type Category</p>
                                <select name="delId" required>
                                    {type.length > 0 && type.map(res => {
                                        return <option key={res._id} value={res._id}>{res.name}</option>
                                    })}
                                </select>
                            </label> <br />
                            <button style={{backgroundColor: 'red'}}>Удалить категорию</button>
                        </form>
                    </div>
                    </div>   
                    }
                </div>
                <Link style={{textDecoration: 'none'}} to='/' className="help exit" onClick={exit}>
                    <div>
                      Выйти
                      <span></span>
                    </div>
                </Link>
            </div>
        </div>
    </div>
  )
}

export default Account