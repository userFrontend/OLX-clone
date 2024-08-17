import { Route, Routes, useLocation } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';
import Footer from './components/Footer/Footer';
import OneProd from './pages/OneProd/OneProd';
import AddProd from './pages/AddProd/AddProd';
import { useInfoContext } from './context/infoContext';
import Auth from './pages/Auth/Auth';
import { useEffect, useState } from 'react';
import Account from './pages/Account/Account';
import LikedProd from './pages/LikedProd/LikedProd';
import Chat from './pages/Chat/Chat';
import UserProd from './pages/UserProd/UserProd';

function App() {
  const {currentUser} = useInfoContext()
  const [isSignUp, setIsSignUp] = useState(false)
  const path = useLocation().pathname
  
  useEffect(() => {
    const rePath = () => {
      if(path === '/add' && !currentUser || path === '/account' && !currentUser || path === '/chat' && !currentUser || path === '/my' && !currentUser  || path === '/like' && !currentUser){
        setIsSignUp(true)
      } else {
        setIsSignUp(false)
      }
    }
    rePath()
  }, [path])

  return (
    <div className="App">
      {!isSignUp && <Header/>}
      <Routes>
        <Route index path='/' element={<Home/>}/>
        <Route path='/like' element={!currentUser ? <Auth reset={setIsSignUp}/> : <LikedProd/>}/>
        <Route path='/account' element={!currentUser ? <Auth reset={setIsSignUp}/> : <Account/>}/>
        <Route path='/add' element={!currentUser ? <Auth reset={setIsSignUp}/> : <AddProd/>}/>
        <Route path='/chat' element={!currentUser ? <Auth reset={setIsSignUp}/> : <Chat/>}/>
        <Route path='/my' element={!currentUser ? <Auth reset={setIsSignUp}/> : <UserProd/>}/>
        <Route path='/prod/:id' element={<OneProd/>}/>
      </Routes>
      {!isSignUp && path !== '/chat' && <Footer/>}
    </div>
  );
}

export default App;
