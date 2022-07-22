<template>
  <div class="wrapper">
    <div class="form-wrapper">
        <div class="btn-exit-wrapper">
            <p class="btn-exit" @click="closeRegistrationForm()">X</p>
        </div>
        <h2 class="title">Registracija</h2>  
        <input class="input" type="text" v-model="user.name" placeholder="Korisnicko ime">
        <input class="input" type="text" v-model="user.email" placeholder="Korisnicki email">
        <input class="input" type="text" v-model="user.password" placeholder="Korisnicka sifra">
        <input class="input" type="text" v-model="user.repeatPassword" placeholder="Ponovite sifru">
        <input class="input" type="number" v-model="user.weight" placeholder="Tezina(kg)">
        <input class="input" type="number" v-model="user.height" placeholder="Visina(cm)">
        <div class="birthday-wrapper">
            <label for="date">Unesite datum rodjenja</label>
            <input id="date" type="date" v-model="user.birthday">
        </div>
        <div class="activity-wrapper">
            <label for="activity">Izaberite nivo aktivnosti</label>   
            <select id="activity" class="input" v-model="user.activityLevel">
                <option value="1">Minimalna aktivnost</option>
                <option value="2">Slaba aktivnost</option>
                <option value="3">Srednja aktivnost</option>
                <option value="4">Visoka aktivnost</option>
                <option value="5">Ekstra-visoka aktivnost</option>
            </select>
        </div>
        <div class="gender-wrapper">
            <label for="gender">Izaberite pol</label>  
            <select id="gender" class="input" v-model="user.gender">
                <option value="male">Muski</option>
                <option value="female">Zenski</option>
            </select>
        </div>  
        <div class="btn-registration-wrapper">
            <button @click="sendRegistrationForm()" class="btn-registration">Registruj se</button>    
        </div> 
        <div class="msg-wrapper">
            <p class="message">{{msg}}</p>
        </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
    data:function(){
        return{
            user:{
                name:"",
                email:"",
                password:"",
                repeatPassword:"",
                birthday:null,
                activityLevel:null,
                weight:null,
                height:null,
                gender:null
            },
            msg:""
        }
    },
    methods:{
        async sendRegistrationForm(){
            this.msg=""
            if(!this.user.name.trim() || !this.user.email.trim() || !this.user.password || !this.user.repeatPassword
            || !this.user.birthday || !this.user.activityLevel || !this.user.weight.trim() || !this.user.height.trim()
            || !this.user.gender){
                this.msg="Sva polja moraju biti popunjena pri registraciji"
                return
            }
            if(this.user.password!==this.user.repeatPassword){
                this.msg="Sifre se ne poklapaju"
                return
            }
            try {
                let result= await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/user/registration",{
                "usr_name":this.user.name,
                "usr_email":this.user.email,
                "usr_password":this.user.password,
                "usr_birthday":this.user.birthday,
                "usr_current_weight":this.user.weight,
                "usr_height":this.user.height,
                "usr_gender":this.user.gender,
                "acl_id":this.user.activityLevel
                })
                this.user.name=""
                this.user.email=""
                this.user.password=""
                this.user.repeatPassword=""
                this.user.birthday=null
                this.user.activityLevel=null
                this.user.weight=null
                this.user.height=null
                this.user.gender=null
                console.log(result)    
            } catch (error) {
                console.log(error)    
            }
            
        },
        closeRegistrationForm(){
            this.$emit("closeRegistrationForm")
        }
    }
}
</script>

<style>
.form-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}
.activity-wrapper,.gender-wrapper{
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
}
.btn-exit-wrapper{
    width: 100%;
    text-align: end;
}
.input{
    width: 30%;
    height: 30px;
    border-radius: 30px;
    margin: 10px 0 0;
    padding: 5px;
}
.btn-exit{
    display: inline;
    font-size: 15px;
    font-weight: 800;
    margin: 0;
    padding: 5px;
    border: 1px solid black;
}
.btn-registration-wrapper{
    padding: 5px;
}
.btn-registration{
    height: 50px;
    border: transparent;
    border-radius: 10px;
    background-color: #5B5BE4;
    color: whitesmoke;
    font-size: 20px;
    font-weight: 600;
}
.birthday-wrapper{
    display: flex;
    flex-direction: column;
    padding: 10px;
}
.message{
    font-size: 20px;
}
</style>