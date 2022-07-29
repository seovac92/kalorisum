<template>
  <div class="app-wrapper">  
    <nav class="nav-menu-wrappper">
      <ul class="list-wrapper">
        <li class="menu-opener">
          <font-awesome-icon  icon="fa-solid fa-bars" />
          <ul class="nav-menu">
            <li class="link"><router-link to="/">Home</router-link></li>
            <li class="link"><router-link to="/">Nutrition plan</router-link></li>
            <li class="link"><router-link to="/">Profile</router-link></li>
          </ul>
        </li>
      </ul>  
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
    LoginForm//rad na padajucem meniju
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
body{
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
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
<style scoped>
.list-wrapper{
  margin: 0;
  list-style: none;
  padding: 0;
}
.menu-opener{
  font-size: 60px;
}
li ul{
  display: none;
}
li:active ul{
  display: block;
}

.link{
  padding: 10px 0;
  font-weight: 600;
  color: #212529;
}
</style>
