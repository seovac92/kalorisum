<template>
  <div class="login-wrapper">
    <div class="blurred-wrapper">
        <div class="form-wrapper">
            <div class="btn-exit-wrapper">
                <font-awesome-icon class="btn-exit" @click="closeLoginForm()" icon="fa-solid fa-circle-xmark" />
            </div>
            <h2 class="title">Prijava</h2>
            <input class="input" type="text" v-model="email" placeholder="Korisnicki email">
            <input class="input" type="text" v-model="password" placeholder="Korisnicka sifra" @keydown.enter="sendLoginForm()">
            <div class="btn-registration-wrapper">
                <button @click="sendLoginForm()" class="btn-registration">Prijavi se</button>    
            </div>
            <div class="btn-change-form">
                <button class="btn-switch" @click="changeForm()">Registruj se</button>  
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
import {mapState,mapActions} from 'vuex'
export default {
    data:function(){
        return{
            email:"",
            password:"",
            msg:""
        }
    },
    methods:{
        ...mapActions(["setUserStatus","setUserLevel"]),
        async sendLoginForm(){
            this.msg=""
            if(!this.email.trim() || !this.password){
                this.msg="Sva polja moraju biti popunjena pri prijavi"
                return
            }
            try {
                let result= await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/user/login",{
                    "usr_email":this.email,
                    "usr_password":this.password
                })
                localStorage.setItem("sid",result.data.res.sid)
                this.setUserStatus(true)
                this.setUserLevel(result.data.res.level)
                this.closeLoginForm()
            } catch (error) {
                console.log(error)
            }
        },
        closeLoginForm(){
            this.$emit("closeLoginForm")
        },
        changeForm(){
            this.$emit("changeForm")
        }
    },
    computed:{
        ...mapState(["userStatus"])
    }
}
</script>

<style>

</style>