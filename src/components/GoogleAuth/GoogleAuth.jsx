import React from 'react'
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";
import { useGoogleLogin } from '@react-oauth/google';
import { useInfoContext } from '../../context/infoContext';
import { googleAuth } from '../../api/authRequest';


const GoogleAuth = () => {
    const { currentUser, setCurrentUser } = useInfoContext();
    const login = useGoogleLogin({
        onSuccess: (tokenResponse) => console.log(tokenResponse),
    });
    return (
        <button className="facebook google mb-3">
        <GoogleLogin width='330'
        onSuccess={async (credentialResponse) => {
            let data = jwtDecode(credentialResponse?.credential)
            let res;

            let newUser = {
                firstname: data.given_name,
                lastname: data.name,
                email: data.email,
                profilePicture: data.picture,
            };
            res = await googleAuth(newUser)

            delete res?.data?.findUser.password;

            localStorage.setItem("profile", JSON.stringify(res?.data.findUser));
            localStorage.setItem("token", JSON.stringify(res?.data.token));
            setCurrentUser(newUser)
        }}
        onError={() => {
          console.log('Login Failed');
        }}/>
        </button>
      
    )
}

export default GoogleAuth;