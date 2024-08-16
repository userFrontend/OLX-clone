import React, { useState } from 'react'
import { signUp, login } from "../../api/authRequest";
import { useInfoContext } from "../../context/infoContext"
import './Auth.scss'
import GoogleAuth from '../../components/GoogleAuth/GoogleAuth';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';


const Auth = ({reset}) => {

    const [isSignup, setIsSignup] = useState(true);
    const [code, setCode] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setCurrentUser } = useInfoContext();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target)
        toast.loading('Please wait...')
        setLoading(true)
        try {
            let res;
            if (!isSignup) {
                const password = formData.get('password')
                // signUp
                if (password) {
                    res = await signUp(formData)
                }
            } else {
                // login
                res = await login(formData)
            }
            toast.dismiss()
            toast.success(res?.data?.message)
            localStorage.setItem("profile", JSON.stringify(res?.data?.user))
            localStorage.setItem("token", JSON.stringify(res?.data?.token))
            setCurrentUser(res?.data?.user); 
            reset(false)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            toast.dismiss()
            toast.error(error?.response?.data.message)
            console.error(error?.response?.data.message)
        }

        
    }
    
    return (
        <div className='signup'>
            <div className="curcle"></div>
            <div className="signup-page">
                <form onSubmit={handleSubmit} action="" className="auth-form">
                    <div className="auth-type">
                        <button className="facebook mb-3">
                        <i class="fa-brands fa-facebook"></i>
                        <span>Продолжить через Facebook</span>
                        </button>
                        <button className="facebook apple mb-3">
                        <i class="fa-brands fa-apple"></i>
                        <span>Продолжить через Apple</span>
                        </button>
                        <GoogleAuth />
                    </div>
                    <div className='input'>
                        <div className="span">
                            <span className='border'></span>
                            <span>или</span>
                            <span className='border'></span>
                        </div>
                        <div className='typeAuth'>
                            <h5 style={isSignup ? { cursor: "pointer", borderBottom: '3px solid #002F34', padding: '10px'} : {cursor: "pointer"}} onClick={() => setIsSignup(true)}>Войти</h5>
                            <h5 style={!isSignup ? { cursor: "pointer", borderBottom: '3px solid #002F34', padding: '10px'} : {cursor: "pointer"}} onClick={() => setIsSignup(false)}>Зарегистрироваться</h5>
                        </div>
                        <label htmlFor="" className='label'>
                            Электронная почта или телефон
                            <input type="email" name='email' className="info-input" required/>
                        </label>
                        <label htmlFor="" className='password'>
                            Пароль <br />
                            <input type={!code ? "password" : 'text'} name='password' className="info-input" required />
                            <span onClick={() => setCode(!code)}>{!code ? <i class="fa-regular fa-eye"></i> : <i class="fa-regular fa-eye-slash"></i>}</span>
                        </label>
                    </div>
                    <Link to="/add" className='forget'>{isSignup ? "Забыли пароль?" : ""}</Link>
                    <p>{isSignup ? "" : `Я соглашаюсь с Условия использования а также с передачей и обработкой моих данных в OLX. Я подтверждаю своe совершеннолетие и ответственность за размещение объявления`}</p>
                    <br />
                    <Link to="/add">{isSignup ? "" : <input className='forget-ckeck' type="checkbox" />}</Link>
                    <Link to="/add" className='zabil'>{isSignup ? "" : "Да, я хочу получать информацию о новостях и акциях на OLX."}</Link>
                    <button disabled={loading} className='btn'>{isSignup ? "Войти" : "Зарегистрироваться"}</button>
                    <p>{isSignup ? "При входе вы соглашаетесь с нашими" : ""} <Link to="/add" className='a-p'>{isSignup ?"Условия использования." : ""}</Link></p>
                </form>
            </div>
        </div>
    )
}

export default Auth;