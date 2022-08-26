<template>
  <div class="wrapper">
    <div class="user-bio-wrapper">
      <div class="bio-wrapper">
        <h1 class="title-h2">{{user.name}}</h1>
        <p>Datum rodjenja {{user.birthday}}</p>
        <p>Visina: {{user.height}}cm</p>
        <p>Tezina: {{user.weight}}kg</p>
        <p>Pol: {{user.gender}}</p>
        <div class="result">
          <p class="sum">BMR: {{user.bmr}}Kcal</p>
        </div>   
      </div>  
      <ChartWeight class="chart"></ChartWeight>
    </div>
    <div class="day-plan">
      <DayPlan class="day-plan" :plan="week[0]" :user="user" @deleteDish="handleDeleteDish" @deleteActivity="handleDeleteActivity"><h2 class="title-h2">Ponedeljak</h2></DayPlan>

      <DayPlan class="day-plan" :plan="week[1]" :user="user" @deleteDish="handleDeleteDish" @deleteActivity="handleDeleteActivity"><h2 class="title-h2">Utorak</h2></DayPlan>

      <DayPlan class="day-plan" :plan="week[2]" :user="user" @deleteDish="handleDeleteDish" @deleteActivity="handleDeleteActivity"><h2 class="title-h2">Sreda</h2></DayPlan>

      <DayPlan class="day-plan" :plan="week[3]" :user="user" @deleteDish="handleDeleteDish" @deleteActivity="handleDeleteActivity"><h2 class="title-h2">Cetvrtak</h2></DayPlan>

      <DayPlan class="day-plan" :plan="week[4]" :user="user" @deleteDish="handleDeleteDish" @deleteActivity="handleDeleteActivity"><h2 class="title-h2">Petak</h2></DayPlan>

      <DayPlan class="day-plan" :plan="week[5]" :user="user" @deleteDish="handleDeleteDish" @deleteActivity="handleDeleteActivity"><h2 class="title-h2">Subota</h2></DayPlan>

      <DayPlan class="day-plan" :plan="week[6]" :user="user" @deleteDish="handleDeleteDish" @deleteActivity="handleDeleteActivity"><h2 class="title-h2">Nedelja</h2></DayPlan>
    </div>
    <DeletingWindow v-if="deleteStatus" @closeTheWindow="handleCloseTheWindow" @allowDeleting="handleAllowDeleting"><p class="title-h2">{{deletingItem.name}} | {{deletingItem.kcal}}kcal</p></DeletingWindow>
    <AddingWindow class="adding-window" v-if="addDishStatus" :dishs="user.dishs" @closeAddForm="handleCloseTheAddForm" @sendItemToPlan="handleItemToPlan"><p class="title">Dodavanje obroka</p></AddingWindow>
    <AddingWindow class="adding-window" v-if="addTrainingStatus" :trainings="user.trainings" @closeAddForm="handleCloseTheAddForm" @sendItemToPlan="handleItemToPlan"><p class="title">Dodavanje treninga</p></AddingWindow>
    <div class="adding-dish-opener-wrapper" @click="openAddDishForm()">
        <p class="opener-title">Dodaj</p>
        <p class="opener-title">Obrok</p>
    </div>
    <div class="adding-training-opener-wrapper" @click="openAddTrainingForm()">
        <p class="opener-title">Dodaj</p>
        <p class="opener-title">Trening</p>
    </div>
  </div>
</template>

<script>
import ChartWeight from '../components/ChartWeight.vue'
import DayPlan from '../components/DayPlan.vue'
import DeletingWindow from '../components/DeletingWindow.vue'
import AddingWindow from '../components/AddingWindow.vue'
import checkSession from '../JS/checkSession.js'
import axios from 'axios'


export default {
  components:{
    ChartWeight,
    DayPlan,
    DeletingWindow,
    AddingWindow
  },
  //ZA USERA!!!
  //napraviti izmenjivu tezinu(jednom u 7 dana minimum!),plan za svaki dan posebno,kartice za dodavanje jela u dan i treninge,proracuni za svaki dan...jela i treninzi su gotovi,samo bira u koji dan ih smesta...to su dva nova prozora koji se otvaraju preko kartica sa strane nan kojima bira jelo/trening i dan//API radi INSERT novog jela/treninga u taj dan za tog korisnika,radi brisanje jela/treninga i radi SELECT za tog korisnika za taj dan!!!
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
      week:[
        {"day_id":1,"dishs":[],"training":[]},
        {"day_id":2,"dishs":[],"training":[]},
        {"day_id":3,"dishs":[],"training":[]},
        {"day_id":4,"dishs":[],"training":[]},
        {"day_id":5,"dishs":[],"training":[]},
        {"day_id":6,"dishs":[],"training":[]},
        {"day_id":7,"dishs":[],"training":[]},
      ],  
      deleteStatus:false,
      deletingItem:null,
      addDishStatus:false,
      addTrainingStatus:false,
    }
  },
  methods:{
    async getUserBio(){
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
    repackArray(oldArray,newArray,key){
      for(let i=0;i<newArray.length;i++){
        for(let j=0;j<oldArray.length;j++){
          if(oldArray[j].day_id===newArray[i].day_id){
            newArray[i][key]=oldArray[j][key]
            break
          }
        }
      }
    },
    searchAndSplice(item,array){
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
    async getUserPlan(){
      let userDetail=await checkSession()
      if(userDetail){
        try {
          let userPlan=await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/plan/getPlan",{
              "usr_id":userDetail.data.res.id
          })
          console.log(userPlan.data)
          this.repackArray(userPlan.data.dishs,this.week,"dishs")
          this.repackArray(userPlan.data.trainings,this.week,"training")
          console.log(this.week)
        } catch (error) {
          console.log(error)
        }
      }
    },
    bmrSum(){
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
    handleDeleteDish(dish){
      this.deletingItem=dish
      this.deleteStatus=true
    },
    handleDeleteActivity(activity){
      this.deletingItem=activity
      this.deleteStatus=true
    },
    handleCloseTheWindow(){
      this.deleteStatus=false
    },
    async handleAllowDeleting(){
      console.log(this.deletingItem)
      console.log(this.user.id)
      try {
        await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/plan/deleteItem",{
          "usr_id":this.user.id,
          "day_id":this.deletingItem.day_id,
          "dsh_id":this.deletingItem.dsh_id,
          "trn_id":this.deletingItem.trn_id
        })
        this.getUserPlan()
        this.searchAndSplice(this.deletingItem,this.week)
        this.deleteStatus=false
      } catch (error) {
        console.log(error)
      }
    },
    async openAddDishForm(){
      this.addDishStatus=!this.addDishStatus
      if(this.addTrainingStatus){
        this.addTrainingStatus=false
      }
      if(this.addDishStatus){
        if(this.user.dishs.length===0){//povuci jela usera
          try {
            let dishs=await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/dish/getDishs",{
              "usr_id":this.user.id
            })
            this.user.dishs=dishs.data.dishs
          } catch (error) {
            console.log(error)
          }
        }  
      }
    },
    async openAddTrainingForm(){
      this.addTrainingStatus=!this.addTrainingStatus
      if(this.addDishStatus){
        this.addDishStatus=false
      }
      if(this.addTrainingStatus){
        if(this.user.trainings.length===0){//povuci treninge usera
          try {
            let trainings=await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/training/getTrainings",{
              "usr_id":this.user.id
            })
            this.user.trainings=trainings.data.trainings
          } catch (error) {
            console.log(error)
          }
        }  
      }
    },
    handleCloseTheAddForm(){
      this.addDishStatus=false
      this.addTrainingStatus=false
    },
    async handleItemToPlan(item,day,type){
      this.addDishStatus=false
      this.addTrainingStatus=false
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
    }
  },
  mounted(){
    this.getUserBio()
    this.getUserPlan()
  }
}
</script>

<style>
.user-bio-wrapper{
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  padding: 20px 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  border-radius: 0 0 10px 10px;
}
.bio-wrapper p{
  font-size: 1.3rem;
  margin: 0;
  padding: 10px;
}
.bio-wrapper p:hover{
  background-color: #eee;
}
.day-plan .title-h2{
  writing-mode: vertical-rl;
  text-orientation: upright;
}
.adding-dish-opener-wrapper{
  width: 55px;
  position: fixed;
  top: 30vh;
  right: 0;
  padding: 10px;
  background-color: #212529;
  border-radius: 10px 0 0 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  cursor: pointer;
  z-index: 0;
  font-weight: 600;
  opacity: 0.7;
}
.adding-dish-opener-wrapper:hover{
  opacity: 1;
}
.adding-training-opener-wrapper{
  width: 55px;
  position: fixed;
  top: 40vh;
  right: 0;
  padding: 10px;
  background-color: #212529;
  border-radius: 10px 0 0 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  cursor: pointer;
  z-index: 0;
  font-weight: 600;
  opacity: 0.7;
}
.adding-training-opener-wrapper:hover{
  opacity: 1;
}
.opener-title{
  color: whitesmoke;
  margin: 0;
}
.adding-window .title{
  font-size: 1.5rem;
  margin: 0;
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
}
</style>