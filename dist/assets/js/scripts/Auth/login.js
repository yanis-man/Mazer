import {ApiURL} from '../../CONFIG.js'
import {get_url} from '../utils.js'

$(function(){
    console.log("ok")
    $( "#form-login" ).on( "submit", function( event ) {
        event.preventDefault();
        const data = $( this ).serializeArray();
        console.log(data)
        let userLogin = data[0]['value']
        let userPass = data[1]['value']

        //First authentification retrieving the token
        const authResponse = get_url(ApiURL.AUTH_URL, 'userId='+userLogin+'&userPassword='+userPass+'&action=user_auth')
        if(authResponse['status'] == "ok")
        {
            localStorage.setItem('authToken', authResponse['token'])

            document.location.href='./'
        }
      });

  });