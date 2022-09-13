<template>
  <div class="app-wrapper">
    <div class="top-header-wrapper">
      <div class="logo-wrapper"><img class="logo" src="./assets/logo.svg" alt="logo"></div>
      <div class="slogan-wrapper"><img class="slogan" src="./assets/slogan.svg" alt="slogan"></div>
    </div> 
    <nav class="nav-menu-wrapper">
      <div class="navigation"><!--navigation for other devices-->
          <font-awesome-icon  class="menu-opener" icon="fa-solid fa-bars" @click="openPhoneMenu()"/>
          <ul class="nav-menu-device nav-menu">
            <li class="link-wrapper"><router-link to="/" class="link">Pocetna</router-link></li>
            <li class="link-wrapper">
              <router-link to="/nutritious" class="link">Namirnice</router-link>
            </li>
            <li class="link-wrapper">
              <router-link to="/activities" class="link">Aktivnosti</router-link>
            </li>
            <li class="link-wrapper" v-if="userStatus"><router-link to="/profile" class="link">Profil</router-link></li>
            <li class="link-wrapper" v-if="userLevel===1"><router-link to="/admin" class="link">Admin</router-link></li>
          </ul>
          <div class="btn-wrapper">
            <button class="btn-open-form" @click="openLoginForm()" v-if="!userStatus">Prijava</button>
            <button class="btn-open-form" @click="logout()" v-if="userStatus">Odjava</button>
          </div>  
      </div>
      <transition name="menu"><!--navigation for mobile-->
        <div class="mobile-nav-blocker" v-if="menuStatus">
          <ul class="nav-menu-mobile nav-menu" v-if="menuStatus">
            <li><font-awesome-icon class="btn-exit" @click="closePhoneMenu()" icon="fa-solid fa-circle-xmark" /></li>
            <li class="link-wrapper"><router-link to="/" class="link" @click="closePhoneMenu()">Pocetna</router-link></li>
            <li class="link-wrapper">
              <router-link to="/nutritious" class="link" @click="closePhoneMenu()">Namirnice</router-link>
            </li>
            <li class="link-wrapper">
              <router-link to="/activities" class="link" @click="closePhoneMenu()">Aktivnosti</router-link>
            </li>
            <li class="link-wrapper" v-if="userStatus">
              <router-link to="/profile" class="link"  @click="closePhoneMenu()">Profil</router-link>
            </li>
            <li class="link-wrapper" v-if="userLevel===1"><router-link to="/admin" class="link" @click="closePhoneMenu()">Admin</router-link></li>
          </ul>
        </div>  
      </transition>  
    </nav>
    <div class="registration-wrapper" v-if="!userStatus"> 
      <RegistrationForm v-if="registrationStatus" @closeRegistrationForm="handleCloseRegistrationForm" @changeForm="handleChangeForm"></RegistrationForm>
      <LoginForm v-if="loginStatus" @closeLoginForm="handleCloseLoginForm" @changeForm="handleChangeForm"></LoginForm>
    </div>
    <router-view class="page" @openLoginForm="openLoginForm()"/>
    <footer>
      <div class="logo-negative-wrapper"><img class="logo" src="./assets/logo-negative.svg" alt="logo"></div>
      <p class="footer-text">COPYRIGHT &copy; <span class="producer"> <a href="https://www.linkedin.com/in/marko-seovac-758a75199">MARKO SEOVAC</a></span></p>
    </footer>
  </div>  
</template>

<script>
import RegistrationForm from './components/RegistrationForm.vue'
import LoginForm from './components/LoginForm.vue'
import {mapState,mapActions} from 'vuex'
import checkSession from './JS/checkSession.js'

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
    ...mapActions(["setUserStatus","setUserLevel"]),
    async checkUser(){
      let res=await checkSession()
      if(res){
        this.setUserStatus(true)
        this.setUserLevel(res.data.res.level)
        localStorage.setItem("sid",res.data.res.sid)
      }
      else{
        this.setUserStatus(false)
        this.setUserLevel(null)
        localStorage.removeItem("sid")
      }
    },
    openLoginForm(){
      this.loginStatus=true
    },
    handleCloseRegistrationForm(){
      this.registrationStatus=false
    },
    handleCloseLoginForm(){
      this.loginStatus=false
    },
    handleChangeForm(){
      this.loginStatus=!this.loginStatus
      this.registrationStatus=!this.registrationStatus
    },
    logout(){
      if(this.userStatus){
        this.setUserStatus(false)
        this.setUserLevel(null)
        this.registrationStatus=false
        this.loginStatus=false
        localStorage.removeItem("sid")
        sessionStorage.removeItem("nutritions")
        sessionStorage.removeItem("activities")
        this.$router.push({name:"home"})
      }  
    },
    openPhoneMenu(){
      this.menuStatus=true
    },
    closePhoneMenu(){
      this.menuStatus=false
    }
  },
  computed:{
    ...mapState(["userStatus","userLevel","userId"])
  },
  mounted(){
    this.checkUser()
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
.app-wrapper{
  position: absolute;
  width: 100%;
  background-color: #eee;
}
.top-header-wrapper{
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 15px;
  background-color: #fff;
}
.logo-wrapper{
  width: 60%;
}
.logo-negative-wrapper{
  width: 40%;
  margin: 0 auto;
}
.slogan-wrapper{
  width: 40%;
  opacity: 0.4;
}
.logo,
.slogan{
  vertical-align: bottom;
}
.btn-open-form{
  background-color: #5B5BE4;
  border: transparent;
  border-radius: 10px;
  color: whitesmoke;
  font-size: 1.3rem;
  font-weight: 600;
  cursor: pointer;
  padding: 5px 5px;
}
.nav-menu-wrapper{
  background-color: lightsteelblue;
  width: 100%;
  z-index: 1;
  position: relative;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  padding: 10px 0;
}
.navigation{
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.hero{
  height: 100px;
}
.menu-opener{
  font-size: 50px;
  cursor: pointer;
  transition: 0.5s all ease;
}
.menu-opener:hover{
  color: #5B5BE4;
  transform: rotate(90deg);
}
.nav-menu-device{
  display: none;
}
.mobile-nav-blocker{
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  background-color: rgba(255, 255, 255, 0.4);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(0);
  z-index: 2;
}
.nav-menu{
  width: 70vw;
  list-style: none;
  padding: 20px 30px 20px 0;
  margin: 0 0;
  position: fixed;
}
.btn-wrapper{
  display: flex;
  flex-basis: 15%;
  align-items: center;
  justify-content: center;
}
/*menu enter classes*/ 
.menu-enter-from{
  opacity: 0;
  transform: translateX(-100vw);
}
.menu-enter-to{
  opacity: 1;
  transform: translateX(0vh);
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
  opacity: 0;
  transform: translateX(200vw);
}
.menu-leave-active{
  transition: all 0.3s ease;
}
.link-wrapper{
  align-self: center;
  font-weight: 600;
  background-color: #5B5BE4;
  border-radius: 20px;
  margin: 20px 0;
  transition: 0.3s background-color ease;
}
.link{
  display: flex;
  justify-content: center;
  padding: 10px;
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
.page{
  border-bottom: 3px solid #ccc;
  min-height: 75vh;
  background-color: #fff;
}
footer{
  background-color: #212529;
  padding: 30px 0;
}
footer p{
  margin: 0;
  color: #fff;
  font-size: 1rem;
  font-weight: 600;
}
.producer a:link,
.producer a:visited{
  color: #fff;
}
.producer a:hover{
  color: #5B5BE4;
  text-decoration: underline;
  cursor: pointer;
}
.producer a:active{
  color: #5B5BE4;
}
@media screen and (min-width:768px){
  .nav-menu{
    width: 55vw;
  }
  .top-header-wrapper{
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 5vw;
  }
  .logo-wrapper,
  .slogan-wrapper{
    flex-basis: 240px;
  }
}
@media screen and (min-width:992px) {
  .menu-opener{
    display: none;
  }
  .nav-menu{
    position: unset;
    padding: 0;
  }
  .mobile-nav-blocker{
    display: none;
  }
  .nav-menu-wrapper{
    position: sticky;
    top: 0;
    padding: 0;
  }
  .navigation{
    justify-content: space-between;
    width: 90vw;
    margin: 0 auto;
  }
  .nav-menu-device{
    display: flex;
    justify-content: flex-start;
    flex-basis: 60%;
  }
  .link-wrapper{
    background-color: lightsteelblue;
    color: #fff;
    margin: 0;
    border-radius: 0;
    transition: 0.3s background-color ease;
  }
  .link-wrapper:hover{
    background-color: #5B5BE4;
  }
  .link-wrapper:hover .link{
    color: whitesmoke;
  }
  .link{
    display: block;
    color: #5B5BE4;
    padding: 30px 20px;
    text-decoration: none;
    transition: 0.5s all ease;
  }
  .link:hover{
    text-decoration: underline;
  }
  .img-wrapper{
    flex-basis: 15%;
  }
  .btn-open-form{
    padding: 5px;
    transition: 0.3s all ease;
  }
  .btn-open-form:hover{
    padding: 29px 5px;
  }
  .logo-negative-wrapper{
    width: 20%;
  }
}
@media screen and (min-width:1200px){
  .page{
    width: 80vw;
  }
  .navigation{
    width: 80vw;
    margin: 0 auto;
  }
  .top-header-wrapper{
    padding: 10px 10vw;
  }
}
</style>
