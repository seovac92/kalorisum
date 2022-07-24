<template>
  <div class="app-wrapper">  
    <nav>
      <router-link class="link" to="/">Home</router-link>
    </nav>
    <div class="registration-wrapper" v-if="!userStatus">
      <div class="btns-wrapper">
        <button class="btn-open-form" @click="openRegistrationForm()" v-if="!registrationStatus">Registruj se</button>
        <button class="btn-open-form" @click="openLoginForm()" v-if="!loginStatus">Prijavi se</button>
      </div>    
      <RegistrationForm v-if="registrationStatus" @closeRegistrationForm="handleCloseRegistrationForm"></RegistrationForm>
      <LoginForm v-if="loginStatus" @closeLoginForm="handleCloseLoginForm"></LoginForm>
    </div>
    <div class="btn-logout-wrapper" v-if="userStatus">
      <button class="btn-open-form" @click="logout()">Odjavi se</button>
    </div>
    <router-view/>  
  </div>  
</template>

<script>
import RegistrationForm from './components/RegistrationForm.vue'
import LoginForm from './components/LoginForm.vue'
import {mapState,mapActions} from 'vuex'

export default{
  components:{
    RegistrationForm,
    LoginForm
  },
  data:function(){
    return{
      registrationStatus:false,
      loginStatus:false
    }
  },
  methods:{
    ...mapActions(["setUserStatus"]),
    openRegistrationForm(){
      if(!this.registrationStatus){
        this.registrationStatus=true
        this.loginStatus=false
      }
    },
    openLoginForm(){
      if(!this.loginStatus){
        this.loginStatus=true
        this.registrationStatus=false
      }
    },
    handleCloseRegistrationForm(){
      this.registrationStatus=false
    },
    handleCloseLoginForm(){
      this.loginStatus=false
    },
    logout(){
      if(this.userStatus){
        this.setUserStatus(false)
        this.registrationStatus=false
        this.loginStatus=false
        localStorage.removeItem("sid")
      }  
    }
  },
  computed:{
    ...mapState(["userStatus"])
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
.title{
  color: #5B5BE4;
}
.btns-wrapper{
  display: flex;
  justify-content: space-around;
}
.btn-open-form{
  background-color: #5B5BE4;
  height: 55px;
  border: transparent;
  border-radius: 10px;
  color: whitesmoke;
  font-size: 20px;
  font-weight: 600;
}
</style>
