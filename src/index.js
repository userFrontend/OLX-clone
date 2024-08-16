import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { InfoProvider } from './context/infoContext';
import { BrowserRouter } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ToastContainer } from 'react-toastify';

const root = ReactDOM.createRoot(document.getElementById('root'));

//   window.fbAsyncInit = function() {
//     FB.init({
//       appId      : '{your-app-id}',
//       cookie     : true,
//       xfbml      : true,
//       version    : '{api-version}'
//     });
      
//     FB.AppEvents.logPageView();   
      
//   };
  
// FB.getLoginStatus(function(response) {
//   statusChangeCallback(response);
// });

//   (function(d, s, id){
//      var js, fjs = d.getElementsByTagName(s)[0];
//      if (d.getElementById(id)) {return;}
//      js = d.createElement(s); js.id = id;
//      js.src = "https://connect.facebook.net/en_US/sdk.js";
//      fjs.parentNode.insertBefore(js, fjs);
//    }(document, 'script', 'facebook-jssdk'));
root.render(
  <BrowserRouter>
    <GoogleOAuthProvider clientId="743022337677-m551blpcnsqo0nunq9rgo7d83isc2o07.apps.googleusercontent.com">
        <InfoProvider>
          <App />
        </InfoProvider>
        <ToastContainer/>
    </GoogleOAuthProvider> 
  </BrowserRouter>
);

