import axios from 'axios'
export default function(){
    let sid=localStorage.getItem("sid")
    if(sid){
        try {
            let result= axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/user/checkSession",{
                "sid":sid
            })
            return result
        } catch (error) {
            console.log(error)
        }
    }
}