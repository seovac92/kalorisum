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
        <div class="nutrition-quantity-wrapper" v-if="activity">
        <div class="btn-exit-wrapper">
            <font-awesome-icon class="btn-exit" icon="fa-solid fa-circle-xmark" @click="closeTheWindow()"/>
        </div>
        <p class="title-h2">{{activity.name}} {{activity.kcal}}Kcal</p>
        <div class="input-wrapper">
          <label for="quantity" class="msg-instruction" v-show="time<10 || time>240">Unesite vrednost izmedju 10 i 240.</label>
          <input id="quantity" class="calculator-input" type="number" v-model="time" placeholder="Vreme trajanja u min" @keydown.enter="pushIntoPlan()">
          <label for="quantity" class="msg-instruction">{{msg}}</label>
        </div>
        <div class="btn-wrapper">
          <button class="btn-registration confirm" @click="pushIntoPlan()">Potvrdi</button>
        </div>  
      </div>
      <div class="meal-opener-wrapper" @click="openTrainingForm()">
        <font-awesome-icon class="icon" icon="fa-solid fa-weight-hanging" />
        <div class="number-wrapper">
          <p class="number-nutrition">{{activities.length}}</p>
        </div>  
      </div>
      <transition name="form">
      <div class="meal-form-wrapper" v-if="trainingFormStatus">
        <div class="btn-exit-wrapper">
            <font-awesome-icon class="btn-exit" icon="fa-solid fa-circle-xmark" @click="closeTrainingForm()"/>
        </div>
        <ul class="meal-form">
          <li class="msg-instruction nutrition" v-if="activities.length===0"><p>Broj dozvoljenih aktivnosti je 5.</p></li>
          <li class="nutrition" v-for="(activity,index) in activities" :key="activity.id">
            <p>{{activity.name}} | {{activity.time}}(min) | {{activity.kcalSum}}Kcal</p><font-awesome-icon class="remove-icon" icon="fa-solid fa-trash" @click="removeActivity(index)"/>
          </li>
          <li class="msg-instruction" v-if="activities.length>0"><p>Broj dozvoljenih aktivnosti {{5-activities.length}}</p></li>
          <li class="total"><p>{{trainingSum}}Kcal</p></li>
          <li class="meal-name">
            <label for="name" class="msg-instruction" v-show="trainingName.length<1 || trainingName.length>15">Naziv mora imati izmedju 1 i 15 karaktera.</label>
            <input id="name" class="input" type="text" placeholder="Naziv aktivnosti" v-model="trainingName" @keydown.enter="makeATraining()">
            <label for="name" class="msg-instruction">{{msg}}</label>
          </li>
          <li>
            <div class="btn-wrapper">
              <button class="btn-registration confirm" @click="makeATraining()">Potvrdi</button>
            </div>
          </li>
        </ul>
      </div>
      </transition>
      <transition name="success">
        <SuccessWindow v-if="successStatus"></SuccessWindow>
      </transition>
    </main>
     <aside>
      <article class="food-wrapper">
        <img class="img-article" src="../assets/aktivnost2.jpg" alt="food">
        <p class="special-msg">Za aktivnost uvek ima vremena!</p>
      </article>  
    </aside>    
  </div>
</template>

<script>
import { mapState,mapActions } from 'vuex'
import TableActivities from '../components/TableActivities.vue'
import SuccessWindow from '../components/SuccessWindow.vue'
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
    if(array[i].id===obj.act_id){
      return true
    }
  }
  return false
}

export default {
    components:{
        TableActivities,
        SuccessWindow
    },
    data:function(){
        return{
          activity:null,
          time:null,
          activities:[],
          trainingFormStatus:false,
          trainingName:"",
          msg:"",
          successStatus:false
        }
    },
    methods:{
      ...mapActions(["setUserStatus"]),
        handleAActivity(one){
            this.activity=one
            this.trainingFormStatus=false
        },
        closeTheWindow(){
            this.time=null
            this.activity=null
            this.msg=""
        },
        pushIntoPlan(){
            this.msg=""
            if(this.time<10 || this.time>180){
                return
            }
            let newActivity=new Activity(this.activity.id,this.activity.name,this.activity.kcal,this.time)
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
                this.closeTheWindow()
                return
            }
            for(let i=0;i<this.activities.length;i++){
                if(this.activities[i].id===newActivity.id){
                this.activities[i].time+=newActivity.time
                this.activities[i].kcalSum=Math.round(this.activities[i].kcal/100*this.activities[i].time)
                this.time=null
                this.closeTheWindow()
                return
                }
            }
            this.activities.push(newActivity)
            this.time=null
            this.closeTheWindow()
            this.setStoredActivities()
        },
        openTrainingForm(){
            this.trainingFormStatus=!this.trainingFormStatus
            this.activity=null
        },
        closeTrainingForm(){
            this.trainingName=""
            this.trainingFormStatus=false
        },
        removeActivity(activityIndex){
            this.activities.splice(activityIndex,1)
            this.setStoredActivities()
        },
        async makeATraining(){
            let user=await checkSession()
            if(!user){
              this.setUserStatus(false)
            }
            this.msg=""
            if(!this.userStatus){
                this.$emit("openLoginForm")
                return
            }
            if(!this.trainingName || this.trainingName.length>15){
                return
            }
            if(this.activities.length===0){
                this.msg="Morate dodati barem jednu aktivnost."
                return
            }
            try {
                let res=await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/training/newTraining",{
                "user_id":user.data.res.id,
                "training_name":this.trainingName,
                "training_sum":this.trainingSum,
                "activities":this.activities
                })
                this.closeTrainingForm()
                this.activities=[]
                this.clearStoredActivities()
                this.showSuccessWindow()
                console.log(res)
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
        ...mapState(["userStatus"]),
        trainingSum(){
            let trainingKcal=0
            if(this.activities){
                for(let i=0;i<this.activities.length;i++){
                    trainingKcal+=this.activities[i].kcalSum
                }
            }
            return (Math.round(trainingKcal*100))/100
        }
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

</style>