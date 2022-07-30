<template>
  <div class="app-wrapper">  
    <nav class="nav-menu-wrapper">
      <div class="navigation">
          <font-awesome-icon  class="menu-opener" icon="fa-solid fa-bars" @click="toggleMenu()" v-if="!registrationStatus && !loginStatus"/>
          <div class="img-wrapper"><h2>LOGO</h2></div>
          <ul class="nav-menu-device nav-menu">
            <li class="link-wrapper"><router-link to="/" class="link">Home</router-link></li>
            <li class="link-wrapper">
              <router-link to="/profile" class="link" v-if="userStatus">Profil</router-link>
              <router-link to="/nutritious" class="link" v-else>Tablica kalorija</router-link>
            </li>
            <li class="link-wrapper"><router-link to="/" class="link">Admin</router-link></li>
          </ul>
          <button class="btn-open-form" @click="openLoginForm()" v-if="!loginStatus && !userStatus && !registrationStatus">Prijavi se</button>
          <button class="btn-open-form" @click="logout()" v-if="userStatus">Odjavi se</button>
      </div>
      <transition name="menu">  
        <ul class="nav-menu-mobile nav-menu" v-if="menuStatus">
          <li><font-awesome-icon class="btn-exit" @click="closePhoneMenu()" icon="fa-solid fa-circle-xmark" /></li>
          <li class="link-wrapper"><router-link to="/" class="link">Home</router-link></li>
          <li class="link-wrapper">
            <router-link to="/profile" class="link" v-if="userStatus">Profil</router-link>
            <router-link to="/nutritious" class="link" v-else>Tablica kalorija</router-link>
          </li>
          <li class="link-wrapper"><router-link to="/" class="link">Admin</router-link></li>
        </ul>
      </transition>  
    </nav>
    <div class="registration-wrapper" v-if="!userStatus"> 
      <RegistrationForm v-if="registrationStatus" @closeRegistrationForm="handleCloseRegistrationForm" @changeForm="handleChangeForm"></RegistrationForm>
      <LoginForm v-if="loginStatus" @closeLoginForm="handleCloseLoginForm" @changeForm="handleChangeForm"></LoginForm>
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
      this.registrationStatus=true
      this.loginStatus=false
      this.menuStatus=false
    },
    openLoginForm(){
      this.loginStatus=true
      this.registrationStatus=false
      this.menuStatus=false
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
        this.registrationStatus=false
        this.loginStatus=false
        this.menuStatus=false
        localStorage.removeItem("sid")
      }  
    },
    toggleMenu(){
      this.menuStatus=!this.menuStatus
    },
    closePhoneMenu(){
      this.menuStatus=false
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
.btn-open-form{
  background-color: #5B5BE4;
  border: transparent;
  border-radius: 10px;
  color: whitesmoke;
  font-size: 20px;
  font-weight: 600;
  cursor: pointer;
}
.nav-menu-wrapper{
  margin-bottom: 20px;
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
.nav-menu-device{
  display: none;
}
.nav-menu{
  list-style: none;
  padding: 0;
  margin: 0 0;
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
  font-weight: 600;
  background-color: #5B5BE4;
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
@media screen and (min-width:768px) {
  .menu-opener{
    display: none;
  }
  .nav-menu-mobile{
    display: none;
  }
  .nav-menu-wrapper{
    border-bottom: 1px solid #5B5BE4;
  }
  .navigation{
    justify-content: space-between;
  }
  .nav-menu-device{
    display: flex;
    justify-content: flex-start;
    width: 60vw;
  }
  .link-wrapper{
    background-color: white;
    padding: 20px 30px;
  }
  .link-wrapper:hover{
    background-color: white;
  }
  .link{
    color: #5B5BE4;
  }
  .link:hover{
    text-decoration: underline;
  }
  .btn-open-form{
    margin-right: 5vw;
  }
  .img-wrapper{
    margin: 0 auto;
  }
}
@media screen and (min-width:1200px){
  router-view{
    width: 70vw;
  }
}
</style>
