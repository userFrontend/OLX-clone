import React from 'react'
import './LikeBtn.scss'
import { likeProd } from '../../api/updateRequest'
import { useInfoContext } from '../../context/infoContext'
import { toast } from 'react-toastify'

const LikeBtn = ({id}) => {
    const {currentUser, setCurrentUser} = useInfoContext()
        const liked = async (prodId) => {
            const formData = new FormData()
            formData.append('prodId', prodId)
            const res = await likeProd(currentUser._id, formData)
            if(res?.data?.message === 'Like added'){
              toast.dismiss()
              toast.success('Хороший выбор! Добавлено в Избранное.')
            }
            localStorage.setItem("profile", JSON.stringify(res?.data?.user))
            setCurrentUser(res?.data?.user); 
        }
  return (
    <div className='like-btn' onClick={() => {currentUser && liked(id)}}>
        {currentUser?.likes?.includes(id) ? <i className='fa-solid fa-heart' style={{color: 'orangered', backgroundColor: 'white'}}></i> : <i className='fa-regular fa-heart'></i>}
    </div>
  )
}

export default LikeBtn