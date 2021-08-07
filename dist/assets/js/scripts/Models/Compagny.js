import {ApiURL} from '../../CONFIG'
import {get_url} from '../utils.js'

class Compagny
{
    constructor()
    {
        const compagnyData = get_url(ApiURL.COMP_URL, "action=retrieveData")['data'];
        
        this.to = compagnyData[0][0]['total_to'];

        this.head_rate = compagnyData[1][0]['salary'];
        this.conf_emp_rate = compagnyData[1][0]['salary'];
        this.test_emp_rate = compagnyData[1][0]['salary'];
        this.intern_rate = compagnyData[1][0]['salary'];
    }
    update_display(document)
    {
        document.getElementById("comp_to").innerHTML = this.to;
    }
}

export default Compagny