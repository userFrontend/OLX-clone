import React, { useEffect, useRef, useState } from 'react'
import './Message.scss'
import { useInfoContext } from '../../context/infoContext'
import { addMessage, deleteMessage, getMessage, updateMessage } from '../../api/messageRequests'
import { toast } from 'react-toastify'
import { deleteChat } from '../../api/chatRequests'
import { getOneProd } from '../../api/getRequest'
import { deleteProd } from '../../api/deleteRequest'


const Message = ({asnwerMessage, setSendMessage, socketDel, setPage, setSocketDel, deleted, loading, setLoading}) => {
    const {onlineUsers, currentChat, setCurrentChat, currentUser, exit} = useInfoContext()
    const [userData, setUserData] = useState(null)
    const [messages, setMessages] = useState([])
    const [delChat, setDelChat] = useState(false)
    const [send, setSend] = useState(false)

    const scrollMessage = useRef()


    useEffect(() => {
        scrollMessage.current?.scrollIntoView({behavior: "smooth"})
    }, [messages])

    const userId = currentChat?.members?.find(id => id !== currentUser._id)


    useEffect(()=>{
        const getUsers = async () => {
            try {
                const res = await getOneProd(userId, 'user')
                setUserData(res.data.user);
            } catch (error) {
                if(error.response.data.message === 'jwt exprired'){
                    exit()
                }
            }
        }
        if(currentChat && userId){
            getUsers()
        }
    },[userId, delChat. currentChat])

    useEffect(()=>{
        const fetchMessage = async () => {
            try {
                const {data} = await getMessage(currentChat._id)
                setMessages(data.messages)
            } catch (error) {
                if(error.response.data.message === 'jwt exprired'){
                    exit()
                }
            }
        }
        if(currentChat){
            fetchMessage()
        }
    }, [currentChat, socketDel, asnwerMessage, delChat])
    
    useEffect(() => {
        if(currentChat && asnwerMessage !== null && asnwerMessage.chatId === currentChat._id){
            setMessages([...messages, asnwerMessage])
        }
    }, [asnwerMessage])


    const online = () => {
        const onlineUser = onlineUsers.find(user => user.userId === userId)
        return onlineUser ? true : false
    }

    const deleteUserChat = async () => {
        const confirmPass = window.confirm('Подвердите удалить...')
        if(confirmPass){
            setSocketDel(true)
        try {
            const res = await deleteChat(currentChat._id);
            setLoading(!loading)
            setCurrentChat(null)
            setPage(0)
        } catch (err) {
            toast.dismiss()
            toast.error(err.response.data.message)
            if(err.response.data.message === 'jwt exprired'){
                exit()
            }
        }
        }
    }


      const handleSend = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target)
            if(formData.get('text') === ""){
                return
            }

            formData.append('senderId', currentUser._id); 
            formData.append('chatId', currentChat._id); 

            const newMessage = {
                senderId: currentUser._id,
                chatId: currentChat._id,
                text: formData.get('text'),
                createdAt: new Date().getTime(),
            }

            setSend(true)
            setSendMessage({...newMessage, receivedId: userId})
        
            const {data} = await addMessage(formData);
            setMessages([...messages, data.messages])
            setSend(false)
            e.target.reset()
        } catch (error) {
            toast.dismiss()
            toast.error(error?.response?.data.message)
            if(error?.response?.data.message === 'jwt exprired'){
                exit()
            }
        }
      }

      const handleDel = async (id) => {
        try {
            await deleteProd(id, 'message')
            setSocketDel(true)
        } catch (error) {
            toast.dismiss()
            toast.error(error?.response?.data.message)
        }
      }

      const [swipedIndex, setSwipedIndex] = useState(null);

      const handleSwipeStart = (index) => {
        setSwipedIndex(index);
      };
    
      const handleSwipeEnd = () => {
        setSwipedIndex(null);
      };

      const today = new Date().toLocaleDateString();

  return (
    <div className="message-box">
        {currentChat ? <div className="message-list" key={currentChat._id}>
            <div className="profile-box">
                <div className='profile-content'>
                <i className='fa-solid fa-chevron-left exit' onClick={() => setPage(0)}></i>
                {userData?.profilePicture?.url ? <img src={userData.profilePicture.url} alt="" className='message-img'/>
                : <img src={userData?.profilePicture ? userData.profilePicture  : '/images/default_.jpg'} alt="" className='message-img'/>}
                <div className="user-name">
                    <h3>{userData?.firstname ? userData.firstname : 'Новый пользователь'}</h3>
                    <div style={online() ? {color: 'greenyellow'} : {color: 'gray'}}>{online() ? 'в сети' : 'был(а) недавно'}</div>
                </div>
                </div>
                <div className="profile-set">
                    <i className='fa-regular fa-bookmark'></i>
                    <i className="fa-solid fa-circle-minus"></i>
                    <i className='fa-regular fa-font-awesome'></i>
                    <i onClick={() => {setDelChat(true); deleteUserChat()}} className="fa-solid fa-trash-can"></i>
                </div>
            </div>
            <div className="send-message">
            <b style={{textAlign: 'center', fontSize: '12px'}}>начилос в {new Date(currentChat.createdAt).toLocaleDateString()}</b>
            {messages?.length > 0 ? messages.map((chat, index) => {
                return(<div key={chat._id}>
                    <div className={chat.senderId === currentUser._id ? "messages own" : "messages"}>
                    <div className="div-del">
                        <div className={index === swipedIndex ? 'swiped span-box' : 'span-box'} onTouchStart={() => handleSwipeStart(index)} onTouchEnd={handleSwipeEnd} onMouseDown={() => handleSwipeStart(index)} onMouseUp={handleSwipeEnd}>
                            <span>
                            {chat.file && <img style={{width: '100%'}} src={`${chat?.file?.url}`} alt='chat_img'/>}    
                            {chat.text} </span>
                            <div className="div-flex">
                            <strong className='message-time'>{new Date(chat.createdAt).toLocaleDateString() === today ? `${new Date(chat.createdAt).toLocaleTimeString().slice(0, 5)}` : new Date(chat.createdAt).toLocaleDateString()}</strong>{chat.senderId === currentUser._id && <img width={15} src="/images/double_check.png" alt="" />}
                            </div>
                        </div>
                        {index === swipedIndex && chat.senderId === currentUser._id && (
                            <button onClick={() => handleDel(chat._id)}><i className='fa-solid fa-trash'></i></button>
                            )}
                    </div>
                            <div ref={scrollMessage}></div>
                </div>
                </div>)}) : <h3>No correspondence yet !</h3>}
            </div>
            <div className="send-input-box">
                <form onSubmit={handleSend} className="input-form">
                    <label htmlFor="send-file">
                        <i className="fa-solid fa-paperclip"></i>
                        <input hidden id='send-file' type="file" name="image"/>
                    </label>
                    <input type="text" name='text' placeholder='Напишите сообщение...'/>
                    <button disabled={send} className='message-btn'><i className="fa-solid fa-square-caret-right"></i></button>
                </form>
            </div>
        </div> : <div className='not-acc'>
                    <img src="/images/sms.svg" alt="photo" />
                    <h4>Выберите сообщение, чтобы прочитать его</h4>
                </div>}
    </div>
  )
}

export default Message