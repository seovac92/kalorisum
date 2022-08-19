<template>
  <div class="registration-wrapper">
    <div class="blurred-wrapper">
        <div class="form-wrapper">
            <div class="btn-exit-wrapper">
                <font-awesome-icon class="btn-exit" @click="closeRegistrationForm()" icon="fa-solid fa-circle-xmark" />
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
            <div class="btn-change-form">
                <button class="btn-switch" @click="changeForm()">Prijavi se</button>    
            </div> 
            <div class="msg-wrapper">
                <p class="message">{{msg}}</p>
            </div>
        </div>
    </div>    
  </div>
</template>

<script>
import axios from 'axios'
import {mapActions} from 'vuex'
export default {
    data:function(){
        return{
            user:{
                name:"",
                email:"",
                password:"",
                repeatPassword:"",
                birthday:null,
                weight:null,
                height:null,
                gender:null
            },
            msg:""
        }
    },
    methods:{
        ...mapActions(["setUserStatus"]),
        async sendRegistrationForm(){
            this.msg=""
            if(!this.user.name.trim() || !this.user.email.trim() || !this.user.password || !this.user.repeatPassword
            || !this.user.birthday || !this.user.weight || !this.user.height
            || !this.user.gender){
                this.msg="Sva polja moraju biti popunjena pri registraciji"
                return
            }
            if(this.user.password!==this.user.repeatPassword){
                this.msg="Sifre se ne poklapaju"
                return
            }
            if(this.user.weight<40 || this.user.height<100){
                this.msg="Unesite realne vrednosti"
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
                "usr_gender":this.user.gender
                })
                this.user.name=""
                this.user.email=""
                this.user.password=""
                this.user.repeatPassword=""
                this.user.birthday=null
                this.user.weight=null
                this.user.height=null
                this.user.gender=null
                console.log(result)
                localStorage.setItem("sid",result.data.res.sid)
                this.setUserStatus(true)
                this.closeRegistrationForm()
                this.$router.push({name:"home"}) 
            } catch (error) {
                console.log(error)    
            }
            
        },
        closeRegistrationForm(){
            this.$emit("closeRegistrationForm")
        },
        changeForm(){
            this.$emit("changeForm")
        }
    }
}
</script>

<style>
.blurred-wrapper{
    width: 100%;
    height: 100%;
    position: fixed;
    background-color: rgba(255, 255, 255, 0.4);
    -webkit-backdrop-filter: blur(5px);
    backdrop-filter: blur(5px);
    top: 0;
    z-index: 2;
}
.form-wrapper{
    width: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px;
    margin: 0 auto;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    background-color: #eee;
}
.gender-wrapper{
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
    width: 80%;
    height: 30px;
    border-radius: 30px;
    margin: 10px 0 0;
    padding: 5px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    font-size: 1rem;
}
.btn-exit{
    display: inline;
    font-size: 25px;
    font-weight: 800;
    margin: 0;
    padding: 5px;
    cursor: pointer;
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
    cursor: pointer;
}
.btn-change-form{
    margin: 10px 0;
}
.btn-switch{
    height: 40px;
    border-radius: 10px;
    border: transparent;
    cursor: pointer;
}
.btn-switch:hover{
    background-color: #5B5BE4;
    color: whitesmoke;
    text-decoration: underline;
}
.birthday-wrapper{
    display: flex;
    flex-direction: column;
    padding: 10px;
}
.message{
    font-size: 20px;
    color: red;
}
@media screen and (min-width: 768px){
    .form-wrapper{
        width: 50%;
    }
}
@media screen and (min-width: 992px){
    .form-wrapper{
        width: 30%;
    }
}
@media screen and (min-width: 1200px){
    .form-wrapper{
        width: 25%;
    }
}
</style>