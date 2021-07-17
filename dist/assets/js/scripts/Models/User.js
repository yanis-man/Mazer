import {ApiURL} from '../../CONFIG'
import {get_url} from '../utils.js'

class User
{
    constructor(userData)
    {
        userData = userData['data'];

        this.id = Number(userData['id']);
        this.login = userData['login'];
        this.display_name = userData['display_name'];
        
        this.compagny_id = Number(userData['compagny_id']);
        this.compagny_name = userData['compagny_name_dsp']
        this.compagny_role = userData['compagny_role'];
        this.compagny_role_disp = userData['compagny_role_dsp']

        this.global_role = Number(userData['global_role']);
        this.global_role_dsp = userData['global_role_dsp']; 
        
    }

    update_display(document)
    {
        document.getElementById("user-name").innerHTML = this.display_name
        document.getElementById('user-compagny').innerHTML = this.compagny_name
    }

    say_hi()
    {
        console.log("hyy i am"+this.display_name)
    }
}

export default User;