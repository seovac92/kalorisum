<template>
  <div class="wrapper">
    <div class="user-bio-wrapper">
      <div class="bio-wrapper">
        <h1 class="title-h2">{{user.name}}</h1>
        <p class="info">Datum rodjenja: {{user.birthday}}</p>
        <p class="info">Visina: {{user.height}}cm</p>
        <div class="weight-wrapper">
          <p class="info">Tezina: {{user.weight}}kg</p>
          <font-awesome-icon class="weight-icon" icon="fa-solid fa-weight-scale" @click="openUpdateWeightWindow()"/>
        </div>  
        <p class="info">Pol: {{user.gender}}</p>
        <div class="result">
          <p class="sum">BMR: {{user.bmr}}Kcal</p>
        </div>   
      </div>  
      <ChartWeight class="chart" :updateChart="updateChart"></ChartWeight>
    </div>
    <div class="daycards-wrapper">
      <div :class="[week[0].status?'btn-on':'btn-off','daycard']" @click="toggleDayPlan(0)"><p>Pon</p><font-awesome-icon class="currentday-check" icon="fa-solid fa-circle-check" v-show="week[0].currentDay" /></div>
      <div :class="[week[1].status?'btn-on':'btn-off','daycard']" @click="toggleDayPlan(1)"><p>Uto</p><font-awesome-icon class="currentday-check" icon="fa-solid fa-circle-check" v-show="week[1].currentDay" /></div>
      <div :class="[week[2].status?'btn-on':'btn-off','daycard']" @click="toggleDayPlan(2)"><p>Sre</p><font-awesome-icon class="currentday-check" icon="fa-solid fa-circle-check" v-show="week[2].currentDay" /></div>
      <div :class="[week[3].status?'btn-on':'btn-off','daycard']" @click="toggleDayPlan(3)"><p>Cet</p><font-awesome-icon class="currentday-check" icon="fa-solid fa-circle-check" v-show="week[3].currentDay" /></div>
      <div :class="[week[4].status?'btn-on':'btn-off','daycard']" @click="toggleDayPlan(4)"><p>Pet</p><font-awesome-icon class="currentday-check" icon="fa-solid fa-circle-check" v-show="week[4].currentDay" /></div>
      <div :class="[week[5].status?'btn-on':'btn-off','daycard']" @click="toggleDayPlan(5)"><p>Sub</p><font-awesome-icon class="currentday-check" icon="fa-solid fa-circle-check" v-show="week[5].currentDay" /></div>
      <div :class="[week[6].status?'btn-on':'btn-off','daycard']" @click="toggleDayPlan(6)"><p>Ned</p><font-awesome-icon class="currentday-check" icon="fa-solid fa-circle-check" v-show="week[6].currentDay" /></div>
    </div>
    <div class="day-plan">
      <transition-group name="plan">
      <DayPlan class="day-plan" :plan="week[0]" :user="user" @deleteDish="handleDeleteDish" @deleteActivity="handleDeleteActivity" @getDishDetails="handleDishDetails" @getTrainingDetails="handleTrainingDetails" v-if="week[0].status"><h2 class="title-h2">Ponedeljak</h2></DayPlan>
      
      
      <DayPlan class="day-plan" :plan="week[1]" :user="user" @deleteDish="handleDeleteDish" @deleteActivity="handleDeleteActivity" @getDishDetails="handleDishDetails" @getTrainingDetails="handleTrainingDetails" v-if="week[1].status"><h2 class="title-h2">Utorak</h2></DayPlan>
      
      
      <DayPlan class="day-plan" :plan="week[2]" :user="user" @deleteDish="handleDeleteDish" @deleteActivity="handleDeleteActivity" @getDishDetails="handleDishDetails" @getTrainingDetails="handleTrainingDetails" v-if="week[2].status"><h2 class="title-h2">Sreda</h2></DayPlan>
      
      
      <DayPlan class="day-plan" :plan="week[3]" :user="user" @deleteDish="handleDeleteDish" @deleteActivity="handleDeleteActivity" @getDishDetails="handleDishDetails" @getTrainingDetails="handleTrainingDetails" v-if="week[3].status"><h2 class="title-h2">Cetvrtak</h2></DayPlan>
      
      
      <DayPlan class="day-plan" :plan="week[4]" :user="user" @deleteDish="handleDeleteDish" @deleteActivity="handleDeleteActivity" @getDishDetails="handleDishDetails" @getTrainingDetails="handleTrainingDetails" v-if="week[4].status"><h2 class="title-h2">Petak</h2></DayPlan>
      
      
      <DayPlan class="day-plan" :plan="week[5]" :user="user" @deleteDish="handleDeleteDish" @deleteActivity="handleDeleteActivity" @getDishDetails="handleDishDetails" @getTrainingDetails="handleTrainingDetails" v-if="week[5].status"><h2 class="title-h2">Subota</h2></DayPlan>
      
      
      <DayPlan class="day-plan" :plan="week[6]" :user="user" @deleteDish="handleDeleteDish" @deleteActivity="handleDeleteActivity" @getDishDetails="handleDishDetails" @getTrainingDetails="handleTrainingDetails" v-if="week[6].status"><h2 class="title-h2">Nedelja</h2></DayPlan>
      </transition-group>
    </div>
    <transition name="form">
    <DeletingWindow v-if="status[0].switch" @closeTheWindow="handleCloseTheWindow" @allowDeleting="handleAllowDeleting"><p class="title-h2">{{deletingItem.name}} | {{deletingItem.kcal}}kcal</p></DeletingWindow>
    </transition>
    <transition name="form">
    <DeletingWindow v-if="status[5].switch" @closeTheWindow="handleCloseTheWindow" @allowDeleting="handleAllowRemoving"><p class="title-h2">{{deletingItem.name}} | {{deletingItem.kcal}}kcal</p></DeletingWindow>
    </transition>
    <transition name="form">
    <AddingWindow class="adding-window" v-if="status[1].switch" :dishs="user.dishs" @closeAddForm="handleCloseTheAddForm" @sendItemToPlan="handleItemToPlan"><template #title><p class="title">Dodavanje obroka</p></template><template #msg><p class="msg-instruction">{{msg}}</p></template></AddingWindow>
    </transition>
    <transition name="form">
    <AddingWindow class="adding-window" v-if="status[2].switch" :trainings="user.trainings" @closeAddForm="handleCloseTheAddForm" @sendItemToPlan="handleItemToPlan"><template #title><p class="title">Dodavanje treninga</p></template><template #msg><p class="msg-instruction">{{msg}}</p></template></AddingWindow>
    </transition>
    <div class="adding-dish-opener-wrapper card-opener" @click="openAddDishForm()">
        <p class="opener-title">Dodaj</p>
        <p class="opener-title">Obrok</p>
    </div>
    <div class="adding-training-opener-wrapper card-opener" @click="openAddTrainingForm()">
        <p class="opener-title">Dodaj</p>
        <p class="opener-title">Trening</p>
    </div>
    <div class="sender-suggestion-wrapper card-opener" @click="openSuggestionWindow()" v-if="userLevel!==1">
        <font-awesome-icon class="card-icon" icon="fa-solid fa-paper-plane" />
    </div>
    <div class="statistic-opener-wrapper card-opener" @click="openOverallStatistic()">
        <font-awesome-icon class="card-icon" icon="fa-solid fa-chart-pie"/>
    </div>
    <transition name="form">
    <ItemDetailsWindow :dishDetails="dishDetails" :trainingDetails="trainingDetails" @closeDetailsWindow="handleCloseDetailsWindow" @removeUserDish="handleRemoveUserDish" @removeUserTraining="handleRemoveUserTraining" v-if="status[3].switch"></ItemDetailsWindow>
    </transition>
    <transition name="form">
    <UpdateWeightWindow v-if="status[4].switch" :msg="msg" @closeUpdateWeight="handleCloseUpdateWeight" @allowUpdateWeight="handleAllowUpdateWeight"></UpdateWeightWindow>
    </transition>
    <transition name="success">
      <SuccessWindow v-if="successStatus"></SuccessWindow>
    </transition>
    <transition name="form">
    <SuggestionWindow v-if="status[6].switch" @closeSuggestionWindow="handleCloseSuggestionWindow" @sendSuggestion="handleSendSuggestion"></SuggestionWindow>
    </transition>
    <transition name="form">
    <OverallStatistic :user="user" :plan="week" @closeOverallStatistic="handleCloseOverallStatistic" v-if="status[7].switch"></OverallStatistic>
    </transition>
  </div>
</template>

<script>
import ChartWeight from '../components/ChartWeight.vue'
import DayPlan from '../components/DayPlan.vue'
import DeletingWindow from '../components/DeletingWindow.vue'
import AddingWindow from '../components/AddingWindow.vue'
import ItemDetailsWindow from '../components/ItemDetailsWindow.vue'
import UpdateWeightWindow from '../components/UpdateWeightWindow.vue'
import SuccessWindow from '../components/SuccessWindow.vue'
import SuggestionWindow from '../components/SuggestionWindow.vue'
import OverallStatistic from '../components/OverallStatistic.vue'
import checkSession from '../JS/checkSession.js'
import { mapState,mapActions } from 'vuex'
import axios from 'axios'


export default {//uradjena ispravka na prikazu kalorija za brisanje treninga iz baze(math.round)...mozda prepraviti grafikon za prikazivanje tezina!!! ISPISATI GRESKE PRI LOGOVANJU I REGISTORVANJU!!!
  components:{
    ChartWeight,
    DayPlan,
    DeletingWindow,
    AddingWindow,
    ItemDetailsWindow,
    UpdateWeightWindow,
    SuccessWindow,
    SuggestionWindow,
    OverallStatistic
  },
  data:function(){
    return{
      user:{
        id:null,
        name:"",
        birthday:"",
        height:null,
        weight:null,
        gender:"",
        ages:null,
        bmr:null,
        dishs:[],
        trainings:[]
      },
      week:[//prima sve planove i rasporedjuje ih na 7 DAYPLAN komponenti
        {"day_id":1,"dishs":[],"training":[],"status":true},
        {"day_id":2,"dishs":[],"training":[],"status":true},
        {"day_id":3,"dishs":[],"training":[],"status":true},
        {"day_id":4,"dishs":[],"training":[],"status":true},
        {"day_id":5,"dishs":[],"training":[],"status":true},
        {"day_id":6,"dishs":[],"training":[],"status":true},
        {"day_id":7,"dishs":[],"training":[],"status":true},
      ],
      deletingItem:null,//trenutni Item(obrok/trening) za brisanje iz odredjenog plana ili cele baze
      dishDetails:null,//detaljan prikaz obroka u ITEM DETAILS komponenti
      trainingDetails:null,//detaljan prikaz treninga u ITEM DETAILS komponenti
      status:[//statusi svih importovanih komponenti
        {switch:false,name:"deleteStatus"},
        {switch:false,name:"addDishStatus"},
        {switch:false,name:"addTrainingStatus"},
        {switch:false,name:"itemDetailsStatus"},
        {switch:false,name:"updateWeightStatus"},
        {switch:false,name:"removeStatus"},
        {switch:false,name:"suggestionStatus"},
        {swithc:false,name:"overallStatisticStatus"}
      ],
      updateChart:false,//informacija grafikonu da izvrsi refresh(moglo je i prostije!)
      msg:"",//prima errore
      successStatus:false//SUCCESS WINDOW komponenta
    }
  },
  methods:{
    ...mapActions(["setUserStatus","setUserLevel"]),
    async getUserBio(){//dobija osnovne podatke o useru--------MOUNTED
      this.user.birthday=""
      let userDetail=await checkSession()
      if(userDetail){
        this.user.name=userDetail.data.res.username
        this.user.id=userDetail.data.res.id
        try {
          let userBio= await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/user/bio",{
            "usr_id":userDetail.data.res.id
          })
          let birthday=new Date(userBio.data.userBio.usr_birthday) 
          this.user.weight=userBio.data.userBio.usr_current_weight
          this.user.height=userBio.data.userBio.usr_height
          if(userBio.data.userBio.usr_gender==="male"){
            this.user.gender="muski"
          }
          if(userBio.data.userBio.usr_gender==="female"){
            this.user.gender="zenski"
          }
          if(birthday.getDate()-9<=0){
            this.user.birthday+="0"+birthday.getDate()+"."
          }
          else{
            this.user.birthday+=birthday.getDate()+"."
          }
          this.user.birthday+=birthday.getMonth()+1+"."
          this.user.birthday+=birthday.getFullYear()
          let nowDate=new Date()
          if(nowDate.getMonth()>=birthday.getMonth()){
            this.user.ages=nowDate.getFullYear()-birthday.getFullYear()
          }
          else{
            this.user.ages=nowDate.getFullYear()-birthday.getFullYear()-1
          }
          this.user.bmr=this.bmrSum()
        } catch (error) {
          console.log(error)
        }
      }
    },
    repackArray(oldArray,newArray,key){//prepakuje plan u WEEK
      for(let i=0;i<newArray.length;i++){
        for(let j=0;j<oldArray.length;j++){
          if(oldArray[j].day_id===newArray[i].day_id){
            newArray[i][key]=oldArray[j][key]
            break
          }
        }
      }
    },
    searchAndSpliceInDay(item,array){//poslednji ITEM u WEEKu se ne azurira nakon brisanja!!!rucno se splajsuje WEEK---pri brisanju iz plana
      for(let i=0;i<array.length;i++){
        if(array[i].day_id===item.day_id){
          for(let j=0;j<array[i][item.type].length;j++){
            if(array[i][item.type][j].name===item.name){
              array[i][item.type].splice(j,1)
              return
            }
          }
        }
      }
    },
    searchAndSpliceItemInWholePlan(item,array){//poslednji ITEM u WEEKu se ne azurira nakon brisanja!!!rucno se splajsuje WEEK---pri brisanju iz baze usera
      for(let i=0;i<array.length;i++){
        for(let j=0;j<array[i][item.type].length;j++){
          if(array[i][item.type][j].name===item.name){
            array[i][item.type].splice(j,1)
            j--
          }
        }
      }
    },
    async getUserPlan(){//prima ceo userov plan i prepakuje u WEEK----MOUNTED
      let userDetail=await checkSession()
      if(userDetail){
        try {
          let userPlan=await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/plan/getPlan",{
              "usr_id":userDetail.data.res.id
          })
          this.repackArray(userPlan.data.dishs,this.week,"dishs")
          this.repackArray(userPlan.data.trainings,this.week,"training")
        } catch (error) {
          console.log(error)
        }
      }
    },
    bmrSum(){//kalkulacija bmra...nije moglo preko computed-a!!!
      let bmrResult
      if(this.user.gender==="muski"){
        bmrResult=66.47+(13.75*this.user.weight)+(5.003*this.user.height)-(6.755*this.user.ages)
        return Math.round(bmrResult)
      }
      if(this.user.gender==="zenski"){
      bmrResult=655.1+(9.563*this.weight)+(1.85*this.height)-(4.676*this.ages)
      return Math.round(bmrResult)
      }
      return Math.round(bmrResult) 
    },
    handleDeleteDish(dish){//poziva DELETING komponentu za brisanje obroka SAMO iz plana!!!
      this.deletingItem=dish
      this.setStatusSwitchOn("deleteStatus")
    },
    handleDeleteActivity(activity){//poziva DELETING komponentu za brisanje treninga SAMO iz plana!!!
      this.deletingItem=activity
      this.setStatusSwitchOn("deleteStatus")
    },
    handleCloseTheWindow(){//gasi DELETING komponentu
      this.setStatusSwitchOff("deleteStatus")
      this.setStatusSwitchOff("removeStatus")
    },
    async handleAllowDeleting(){//brisanje Itema iz PLANA i azuriranje WEEK-a
      this.checkUser()
      try {
        await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/plan/deleteItem",{
          "usr_id":this.user.id,
          "day_id":this.deletingItem.day_id,
          "dsh_id":this.deletingItem.dsh_id,
          "trn_id":this.deletingItem.trn_id
        })
        this.getUserPlan()
        this.searchAndSpliceInDay(this.deletingItem,this.week)
        this.setStatusSwitchOff("deleteStatus")
        this.showSuccessWindow()
      } catch (error) {
        console.log(error)
      }
    },
    async handleAllowRemoving(){//brisanje Itema iz BAZE i azuriranje 
      this.checkUser()
      try {
        await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/user/deleteItem",{
          "usr_id":this.user.id,
          "dsh_id":this.deletingItem.dsh_id,
          "trn_id":this.deletingItem.trn_id
        })
        this.getUserPlan()
        this.searchAndSpliceItemInWholePlan(this.deletingItem,this.week)
        this.user.dishs=[]
        this.user.trainings=[]
        this.setStatusSwitchOff("removeStatus")
        this.showSuccessWindow()
      } catch (error) {
        console.log(error)
      }
    },
    async openAddDishForm(){//poziva ADDING komponentu i prima userove obroke
      this.checkUser()
      this.msg=""
      this.setStatusSwitchOn("addDishStatus")
      if(this.status[1].switch){
        if(this.user.dishs.length===0){
          try {
            let dishs=await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/dish/getDishs",{
              "usr_id":this.user.id
            })
            this.user.dishs=dishs.data.dishs
          } catch (error) {
            this.msg=error.response.data.message
          }
        }  
      }
    },
    async openAddTrainingForm(){//poziva ADDING komponentu i prima userove treninge
      this.checkUser()
      this.msg=""
      this.setStatusSwitchOn("addTrainingStatus")
      if(this.status[2].switch){
        if(this.user.trainings.length===0){
          try {
            let trainings=await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/training/getTrainings",{
              "usr_id":this.user.id
            })
            this.user.trainings=trainings.data.trainings
          } catch (error) {
            this.msg=error.response.data.message
          }
        }  
      }
    },
    handleCloseTheAddForm(){//zatvara ADDING komponentu
      this.checkUser()
      this.setStatusSwitchOff("addDishStatus")
      this.setStatusSwitchOff("addTrainingStatus")
    },
    async handleItemToPlan(item,day,type){//salje izabran Item u plan i azurira WEEk(u ovom slucaju radi dobro!!!)
      this.setStatusSwitchOff("addDishStatus")
      this.setStatusSwitchOff("addTrainingStatus")
      try {
        await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/plan/setItem",{
          "usr_id":this.user.id,
          "day_id":day,
          "item_id":item,
          "item_type":type
        })
        this.getUserPlan()
      } catch (error) {
        console.log(error)
      }
    },
    async handleDishDetails(dish){//otvara ITEM DETAILS komponentu i prima detalje za obrok
      this.checkUser()
      if(this.trainingDetails){
        this.trainingDetails=null
      }
      try {
        let res=await axios.get("http://732u122.e2.mars-hosting.com/nutricionist/api/dish/:dsh_id",{
          params:{
            "dsh_id":dish.dsh_id
          }
        })
        this.dishDetails=res.data.details[0]
        this.setStatusSwitchOn("itemDetailsStatus")
      } catch (error) {
        console.log(error)
      }
    },
    handleRemoveUserDish(dish){//otvara drugu DELETING komponentu za brisanje Itema iz BAZE
      this.deletingItem=dish
      this.setStatusSwitchOn("removeStatus")
    },
    async handleTrainingDetails(training){//otvara ITEM DETAILS komponentu i prima detalje za trening
      this.checkUser()
      if(this.dishDetails){
        this.dishDetails=null
      }
      try {
        let res=await axios.get("http://732u122.e2.mars-hosting.com/nutricionist/api/training/:trn_id",{
          params:{
            "trn_id":training.trn_id
          }
        })
        this.trainingDetails=res.data.details[0]
        this.setStatusSwitchOn("itemDetailsStatus")
      } catch (error) {
        console.log(error)
      }
    },
    handleRemoveUserTraining(training){//otvara drugu DELETING komponentu za brisanje Itema iz BAZE
      training.kcal=Math.round(training.kcal)
      this.deletingItem=training
      this.setStatusSwitchOn("removeStatus")
    },
    handleCloseDetailsWindow(){//zatvara DETAILS komponentu
      this.checkUser()
      this.setStatusSwitchOff("itemDetailsStatus")
    },
    openUpdateWeightWindow(){//otvara UPDATE WEIGHT komponentu
      this.checkUser()
      this.setStatusSwitchOn("updateWeightStatus")
    },
    handleCloseUpdateWeight(){//zatvara UPDATE WEIGHT komponentu
      this.checkUser()
      this.setStatusSwitchOff("updateWeightStatus")
      this.msg=""
    },
    async handleAllowUpdateWeight(weight){//salje novu tezinu u bazu,menja updateChart koji pokrece refresh(moglo je i odmah!!!)
      this.checkUser()
      this.msg=""
      try {
        await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/user/newWeight",{
          "usr_id":this.user.id,
          "usr_new_weight":weight
        })
        this.setStatusSwitchOff("updateWeightStatus")
        this.getUserBio()
        this.updateChart=!this.updateChart
        this.showSuccessWindow()
      } catch (error) {
        this.msg=error.response.data.message
      }
    },
    setStatusSwitchOn(name){//gasi sve prozore osim prosledjenog
      for(let i=0;i<this.status.length;i++){
        if(this.status[i].name===name){
          this.status[i].switch=true
        }
        else{
          this.status[i].switch=false
        }
      }
    },
    setStatusSwitchOff(name){//gasi prosledjen prozor
      for(let i=0;i<this.status.length;i++){
        if(this.status[i].name===name){
          this.status[i].switch=false
        }
      }
    },
    showSuccessWindow(){//pali i gasi SUCCESS komponentu
      this.successStatus=true
      setTimeout(()=>{
        this.successStatus=false
      },1300)
    },
    async checkUser(){//proverava da li je istekla sesija i u tom slucaju vraca na HOME
      const res=await checkSession()
      if(!res){
        this.setUserStatus(false)
        this.setUserLevel(null)
        this.$router.push({name:"home"})
      }
      else{
        if(res.response){
          this.setUserStatus(false)
          this.setUserLevel(null)
          this.router.push({name:"home"})
        }
      }
    },
    toggleDayPlan(number){//prekidac za pojedinacne dane
      this.week[number].status=!this.week[number].status
    },
    handleCloseSuggestionWindow(){
      this.checkUser()
      this.setStatusSwitchOff("suggestionStatus")
    },
    openSuggestionWindow(){
      this.checkUser()
      this.setStatusSwitchOn("suggestionStatus")
    },
    async handleSendSuggestion(suggestion){//slanje sugestija adminu
      this.checkUser()
      try {
        await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/user/newSuggestion",{
          "usr_id":this.user.id,
          "sug_subject":suggestion.subject,
          "sug_text":suggestion.text
        })
        this.setStatusSwitchOff("suggestionStatus")
        this.showSuccessWindow()
      } catch (error) {
        console.log(error)
      }
    },
    openOverallStatistic(){
      this.checkUser()
      this.setStatusSwitchOn("overallStatisticStatus")
    },
    handleCloseOverallStatistic(){
      this.checkUser()
      this.setStatusSwitchOff("overallStatisticStatus")
    },
    goToTop(){
        window.scroll({
          top: 0
        })
    },
    currentDayOfTheWeek(){
      let currentDay=new Date().getDay()
      switch(currentDay){
        case 1: this.week[0].currentDay=true;
        break;
        case 2: this.week[1].currentDay=true;
        break;
        case 3: this.week[2].currentDay=true;
        break;
        case 4: this.week[3].currentDay=true;
        break;
        case 5: this.week[4].currentDay=true;
        break;
        case 6: this.week[5].currentDay=true;
        break;
        case 0: this.week[6].currentDay=true;
        break;
      }
    }
  },
  mounted(){
    this.getUserBio()
    this.getUserPlan()
    this.goToTop()
    this.currentDayOfTheWeek()
  },
  computed:{
    ...mapState(["userLevel"])
  }
}
</script>

<style>
.user-bio-wrapper{
  font-family: 'Franklin Gothic', 'Arial Narrow', Arial, sans-serif;
  display: flex;
  flex-direction: column;
  width: 93%;
  margin: 0 auto;
  padding: 20px 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  border-radius: 0 0 10px 10px;
}
.bio-wrapper p{
  font-size: 1.3rem;
  margin: 0;
  padding: 10px;
  transition: 0.3s all ease;
}
.bio-wrapper p:hover{
  background-color: #eee;
}
.info{
  text-align: left;
}
.weight-wrapper{
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 1.3rem;
}
.weight-icon{
  flex-basis: 20%;
  cursor: pointer;
  transition: 0.3s all ease;
}
.weight-wrapper:hover{
  background-color: #eee;
}
.weight-wrapper:hover .weight-icon{
  color: #c50000;
}
.day-plan .title-h2{
  writing-mode: vertical-rl;
  text-orientation: upright;
}
.card-opener{
  width: 55px;
  overflow: hidden;
  position: fixed;
  padding: 10px;
  background-color: #212529;
  border-radius: 10px 0 0 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  cursor: pointer;
  z-index: 0;
  font-weight: 600;
  opacity: 0.7;
  transition: 0.5s all ease;
}
.card-opener:hover{
  background-color: #75B1FF;
  opacity: 1;
}
.card-icon{
  transition: 1s all ease;
}
.card-opener:hover .card-icon{
  transform: rotate(180deg);
}
.adding-dish-opener-wrapper{
  top: 30vh;
  right: 0;
}
.adding-training-opener-wrapper{
  top: 40vh;
  right: 0;
}
.sender-suggestion-wrapper{
  top:60vh;
  right: 0;
  font-size: 1.7rem;
  color: whitesmoke;
}
.statistic-opener-wrapper{
  top: 50vh;
  right: 0;
  font-size: 1.7rem;
  color: whitesmoke;
}
.opener-title{
  color: whitesmoke;
  margin: 0;
}
.adding-window .title{
  font-size: 1.5rem;
  margin: 0;
}
.daycards-wrapper{
  width: 93%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  padding: 20px 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  border-radius: 0 0 10px 10px;
}
.daycard{
  position: relative;
  padding: 5px;
  opacity: 0.7;
  font-weight: 600;
  cursor: pointer;
  transition: 0.3s all ease;
  border-radius: 10px;
  flex-basis: 12%;
}
.currentday-check{
  position: absolute;
  bottom: 3px;
  right: 3px;
}
.btn-on{
  background-color: #75B1FF;
}
.btn-off{
  background-color: #FCC45B;
}
.daycard:hover{
  opacity: 1;
}
.plan-move,
.plan-enter-active,
.plan-leave-active{
  transition: 0.3s all ease;
}
.plan-enter-from,
.plan-leave-to{
  opacity: 0;
  transform: scale(0.2);
}
.plan-leave-active{
  position: absolute;
}
@media screen and (min-width: 768px) {
  .user-bio-wrapper{
    flex-direction: row;
    justify-content: space-around;
  }
  .bio-wrapper{
    flex-basis: 30%;
  }
}
@media screen and (min-width: 1200px) {
  .user-bio-wrapper{
    width: 70%;
  }
  .daycards-wrapper{
    width: 70%;
  }
}
</style>