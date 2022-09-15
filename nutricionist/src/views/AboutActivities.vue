<template>
    <!--The classes are from ABOUT NUTRITIONS page because of css style-->
  <div class="wrapper">
    <main>
        <article class="introduction-wrapper first">
        <h2 class="title-h2">Aktivnosti</h2>
        <p>Aktivan nacin zivota daje nasem telu dobar izgled, kao sto pospesuje imuni sistem sto za rezultat ima celokupno psihicko i fizicko zdravlje organizma. <span class="key-words"> Aktivnosti</span>, same po sebi, mogu da budu od veoma slabih do preteskih, sto opet zavisi od nas samih. <span class="key-words">Birajte ih</span> prema svojim afinitetima, ili pak isprobajte nesto novo, na vama je.</p>
        <p>Ispod je tabela sa raznim <span class="key-words">aktivnostima</span> od kojih mozete praviti treninge, koje cete, pored obroka, koristiti u <span class="key-words">svom dnevnom planu</span>, a na osnovu toga cete dobijati dnevni bilans kalorija.</p>
        </article>
        <TableActivities @pickAActivity="handleAActivity"></TableActivities>
      <transition name="form">  
      <QuantityForm :activity="activity" :msg="msg" @closeTheWindow="handleCloseTheWindow" @sendToBasket="handleSendToBasket" v-if="activity"><template #activity><p class="title-h2">{{activity.name}} {{activity.kcal}}Kcal</p></template></QuantityForm>
      </transition>
      <div class="meal-opener-wrapper" @click="openTrainingForm()">
        <font-awesome-icon class="icon" icon="fa-solid fa-weight-hanging" />
        <div class="number-wrapper">
          <p class="number-nutrition">{{activities.length}}</p>
        </div>  
      </div>
      <transition name="form">
        <BasketForm :activities="activities" :msg="msg" @closeBasketForm="handleCloseBasketForm" @removeActivity="handleRemoveActivity" @makeUserItem="handleMakeUserItem" v-if="trainingFormStatus"></BasketForm>
      </transition>
      <transition name="success">
        <SuccessWindow v-if="successStatus"></SuccessWindow>
      </transition>
    </main>
     <aside>
      <article class="activity-hero-wrapper">
        <p class="special-msg">Za aktivnost uvek ima vremena!</p>
      </article>  
    </aside>    
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import TableActivities from '../components/TableActivities.vue'
import SuccessWindow from '../components/SuccessWindow.vue'
import QuantityForm from '../components/QuantityForm.vue'
import BasketForm from '../components/BasketForm.vue'
import axios from 'axios'
import checkSession from '../JS/checkSession.js'


class Activity{
  constructor(id,name,kcal,time){
    this.id=id
    this.name=name
    this.kcal=kcal
    this.time=time
    this.kcalSum=((Math.round((this.kcal/60*this.time)*100))/100)
  }
}
function checkId(obj,array){
  for(let i=0;i<array.length;i++){
    if(array[i].id===obj.id){
      return true
    }
  }
  return false
}

export default {
    components:{
        TableActivities,
        SuccessWindow,
        QuantityForm,
        BasketForm
    },
    data:function(){
        return{
          activity:null,
          activities:[],
          trainingFormStatus:false,
          msg:"",
          successStatus:false
        }
    },
    methods:{
      ...mapActions(["setUserStatus"]),
        handleAActivity(one){
            if(this.successStatus){
              this.successStatus=false
            }
            this.activity=one
            this.trainingFormStatus=false
        },
        handleCloseTheWindow(){
            this.time=null
            this.activity=null
            this.msg=""
        },
        handleSendToBasket(time){
            this.msg=""
            if(time<10 || time>180){
                return
            }
            let newActivity=new Activity(this.activity.id,this.activity.name,this.activity.kcal,time)
            if(this.activities.length===5){
              let result=checkId(this.activity,this.activities)
              if(!result){
              this.msg="Maksimalan broj aktivnosti u treningu je 5."
              return
              }
            }
            if(!this.activities){
              this.activities.push(newActivity)
              this.time=null
              this.handleCloseTheWindow()
              this.showSuccessWindow()
              return
            }
            for(let i=0;i<this.activities.length;i++){
              if(this.activities[i].id===newActivity.id){
              this.activities[i].time+=newActivity.time
              this.activities[i].kcalSum=Math.round(this.activities[i].kcal/100*this.activities[i].time)
              this.time=null
              this.handleCloseTheWindow()
              this.showSuccessWindow()
              return
              }
            }
            this.activities.push(newActivity)
            this.time=null
            this.handleCloseTheWindow()
            this.setStoredActivities()
            this.showSuccessWindow()
        },
        openTrainingForm(){
            this.trainingFormStatus=!this.trainingFormStatus
            this.activity=null
        },
        handleCloseBasketForm(){
            this.trainingName=""
            this.trainingFormStatus=false
        },
        handleRemoveActivity(activityIndex){
            this.activities.splice(activityIndex,1)
            this.setStoredActivities()
        },
        async handleMakeUserItem(trainingName,trainingSum){
            let user=await checkSession()
            if(!user){
              this.setUserStatus(false)
            }
            this.msg=""
            if(!this.userStatus){
                this.$emit("openLoginForm")
                return
            }
            if(!trainingName || trainingName.length>15){
                return
            }
            if(this.activities.length===0){
                this.msg="Morate dodati barem jednu aktivnost."
                return
            }
            try {
                await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/training/newTraining",{
                "user_id":user.data.res.id,
                "training_name":trainingName,
                "training_sum":trainingSum,
                "activities":this.activities
                })
                this.handleCloseBasketForm()
                this.activities=[]
                this.clearStoredActivities()
                this.showSuccessWindow()
            } catch (error) {
                this.msg=error.response.data.message
            }
        },
        getStoredActivities(){
        let storedActivities=sessionStorage.getItem("activities")
        if(storedActivities){
        this.activities=JSON.parse(storedActivities)
        }
        },
        setStoredActivities(){
        let storedActivities=sessionStorage.getItem("activities")
        if(!storedActivities){
        sessionStorage.setItem("activities",JSON.stringify(this.activities))
        return
        }
        sessionStorage.removeItem("activities")
        sessionStorage.setItem("activities",JSON.stringify(this.activities))
        },
        clearStoredActivities(){
        sessionStorage.removeItem("activities")
        },
      showSuccessWindow(){
        this.successStatus=true
        setTimeout(()=>{
          this.successStatus=false
        },1300)
      },
      goToTop(){
        window.scroll({
          top: 0
        })
      }
    },
    computed:{
        ...mapState(["userStatus"])
    },
    mounted(){
        this.getStoredActivities()
        this.goToTop()
    },
    watch:{
        userStatus(newStatus){
            if(!newStatus){
                this.activities=[]
            }
        }
    }
}
</script>

<style scoped>
.icon{
    font-size: 40px;
}
.activity-hero-wrapper{
  background: url("../assets/activity3.jpg");
  background-size: cover;
  width: 100%;
  height: 814px;
  background-repeat: no-repeat;
  background-position: center;
  position: relative;
  z-index: 0;
  border-top: 3px solid #ccc;
  margin-top: 20px;
}
.activity-hero-wrapper .special-msg{
  position: absolute;
  font-size: 3rem;
  opacity: 0.9;
  color: #ddd;
  font-style: italic;
  font-weight: 600;
  transition: 1s all ease;
}
.activity-hero-wrapper:hover .special-msg{
  color: #000;
}
@media screen and (min-width: 768px) {
  .activity-hero-wrapper .special-msg{
    top: 10%;
    left: 10%;
  }
}
@media screen and (min-width: 992px) {
  .activity-hero-wrapper .special-msg{
    left: 15%;
  }
}
</style>