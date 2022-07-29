<template>
  <div class="app-wrapper">  
    <nav class="nav-menu-wrapper">
      <div class="navigation">
          <button class="btn-open-form" @click="openRegistrationForm()" v-if="!registrationStatus && !userStatus">Registruj se</button>
          <font-awesome-icon  class="menu-opener" icon="fa-solid fa-bars" @click="toggleMenu()"/>
          <button class="btn-open-form" @click="openLoginForm()" v-if="!loginStatus && !userStatus">Prijavi se</button>
          <button class="btn-open-form" @click="logout()" v-if="userStatus">Odjavi se</button>
      </div>
      <transition name="menu">  
        <ul class="nav-menu-opened" v-if="menuStatus">
          <li class="link-wrapper"><router-link to="/" class="link">Home</router-link></li>
          <li class="link-wrapper"><router-link to="/" class="link">Nutrition plan</router-link></li>
          <li class="link-wrapper"><router-link to="/" class="link">Profile</router-link></li>
        </ul>
      </transition>  
    </nav>
    <div class="registration-wrapper" v-if="!userStatus"> 
      <RegistrationForm v-if="registrationStatus" @closeRegistrationForm="handleCloseRegistrationForm"></RegistrationForm>
      <LoginForm v-if="loginStatus" @closeLoginForm="handleCloseLoginForm"></LoginForm>
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
      loginStatus:false,
      menuStatus:false
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
    },
    toggleMenu(){
      this.menuStatus=!this.menuStatus
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

</style>
<style scoped>
.btns-wrapper{
  display: flex;
  justify-content: space-between;
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
.navigation{
  display: flex;
  justify-content: space-around;
}
.hero{
  height: 100px;
}
.menu-opener{
  font-size: 60px;
}
.nav-menu-opened{
  list-style: none;
  padding: 0;
  margin: 0 0 20px;
}
/*menu enter classes*/ 
.menu-enter-from{
  opacity: 1;
  transform: translateX(-3000px);
}
.menu-enter-to{
  opacity: 1;
  transform: translateX(0);
}
.menu-enter-active{
  transition: all 0.3s ease;
}
/*menu leave classes */
.menu-leave-from{
  opacity: 1;
  transform: translateX(0);
}
.menu-leave-to{
  opacity: 1;
  transform: translateX(1500px);
}
.menu-leave-active{
  transition: all 0.3s ease;
}
.link-wrapper{
  padding: 20px 0;
  font-weight: 600;
  background-color: #5B5BE4;
}
.link{
  color:whitesmoke;
  text-decoration: none;
  font-size: 20px;
}
.link-wrapper:link,
.link-wrapper:visited{
  color: whitesmoke;
}
.link-wrapper:hover{
  background-color: darkblue;
}
.lin-wrapper:active{
  background-color: darkblue;
}
@media screen and(min-width:768px) {
  
}
</style>
