import React, { useEffect, useState } from 'react'
import './Contact.scss'
import { useInfoContext } from '../../context/infoContext'
import { getOneProd } from '../../api/getRequest'

const Contact = ({chat, loading, setLoading}) => {
    const {exit, currentUser, onlineUsers} = useInfoContext()
    const [user, setUser] = useState(null);

    const userId = chat?.members.find(id => id !== currentUser._id)

    const online = () => {
        const onlineUser = onlineUsers.find(user => user.userId === userId)
        return onlineUser ? true : false
    }

    useEffect(()=>{
        const getUsers = async () => {
            try {
                const res = await getOneProd(userId, 'user')
                setUser(res.data.user);
            } catch (error) {
                if(error.response.data.message === 'jwt expired'){
                    exit()
                }
            }
        }
        getUsers()
    },[userId, loading])


  return (
            <div className='box-profile' onClick={() => setLoading(!loading)}>
                <div className="profile-image">
                {user?.profilePicture?.url ? <img src={user.profilePicture.url} alt="" className='profile-img'/>
                : <img src={user?.profilePicture ? user.profilePicture  : '/images/default_.jpg'} alt="" className='profile-img'/>}
                    <div>
                        <h3>{user?.firstname ? user.firstname : 'Новый пользователь'}</h3>
                        <span style={{fontSize: '13px', fontWeight: 'bold', color: 'grey'}}>{user?.location}</span> 
                        <div style={online() ? {color: 'greenyellow', fontSize: '12px'} : {color: 'gray', fontSize: '12px'}}>{online() ? 'в сети' : 'был(а) недавно'}</div>
                    </div>
                </div>
                <div className="description">
                    <span>^^</span><br />
                    <i className='fa-regular fa-bookmark'></i>
                </div>
                
            </div>
  )
}

export default Contact