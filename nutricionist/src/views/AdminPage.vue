<template>
  <div class="wrapper">
    <div class="new-nutrition">
      <h2 class="title-h2">Nova namirnica</h2>
      <div class="new-item-wrapper">
        <div class="new-item-form">
          <label for="nameNutrition" class="msg-instruction" v-show="newNutrition.name.trim().length<3 || newNutrition.name.trim().length>20">Naziv mora imati izmedju 3 i 20 karaktera.</label>
          <input id="nameNutrition" class="calculator-input" type="text" v-model="newNutrition.name" placeholder="Naziv namirnice" @keyup="searchForNutritions()">
          <label for="kcalNutrition" class="msg-instruction" v-show="newNutrition.kcal<10 || newNutrition.kcal>1000">Kalorije moraju biti izmedju 10 i 1000.</label>
          <input id="kcalNutrition" class="calculator-input" type="number" v-model="newNutrition.kcal" placeholder="Kcal na 100g">
          <label for="typeNutrition" class="msg-instruction" v-show="!newNutrition.type">Tip namirnice mora biti izabran.</label>
          <select id="typeNutrition" class="calculator-input" v-model="newNutrition.type">
            <option value=null selected disabled>Izaberite tip namirnice</option>
            <option :value="type.ntt_id" v-for="type in nutritiousTypes" :key="type.ntt_id">{{type.ntt_name}}</option>
          </select>
          <p class="msg-instruction" v-show="newNutrition.msgAlert">{{newNutrition.msgAlert}}</p>
          <div class="btn-registration-wrapper">
            <button @click="makeNewNutrition()" class="btn-registration">Dodaj</button>    
          </div>
        </div>
        <div class="check-list-item-wrapper">
          <h3 class="title-h3">Postojece namirnice:</h3>
            <transition-group name="list" tag="ul" class="check-list-item" v-if="newNutrition.searchedNutritions.length>0">
            <li class="check-item" v-for="nutrition in newNutrition.searchedNutritions" :key="nutrition.id"><p class="check-name">{{nutrition.name}}</p><p class="check-kcal">{{nutrition.kcal}}kcal</p><font-awesome-icon class="remove-icon" icon="fa-solid fa-trash" @click="removeCoreItem(nutrition,'nutrition')"/></li>
            </transition-group>
          <p v-else>{{newNutrition.msgSearched}}</p>
        </div>
      </div>
    </div>  
    <div class="new-nutrition">
      <h2 class="title-h2">Nova aktivnost</h2>
      <div class="new-item-wrapper">
        <div class="new-item-form">
          <label for="nameActivity" class="msg-instruction" v-show="newActivity.name.trim().length<3 || newActivity.name.trim().length>20">Naziv mora imati izmedju 3 i 20 karaktera.</label>
          <input id="nameActivity" class="calculator-input" type="text" v-model="newActivity.name" placeholder="Naziv aktivnosti" @keyup="searchForActivities()">
          <label for="kcalActivity" class="msg-instruction" v-show="newActivity.kcal<1 || newActivity.kcal>100">Kalorije moraju biti izmedju 10 i 100.</label>
          <input class="calculator-input" type="number" v-model="newActivity.kcal" placeholder="Kcal na 60min/1kg tezine">
          <p class="msg-instruction" v-show="newActivity.msgAlert">{{newActivity.msgAlert}}</p>
          <div class="btn-registration-wrapper">
            <button @click="makeNewActivity()" class="btn-registration">Dodaj</button>    
          </div>
        </div>
        <div class="check-list-item-wrapper">
          <h3 class="title-h3">Postojece aktivnosti:</h3>
          <transition-group name="list" tag="ul" class="check-list-item" v-if="newActivity.searchedActivities.length>0">
            <li class="check-item" v-for="activity in newActivity.searchedActivities" :key="activity.id"><p class="check-name">{{activity.name}}</p><p class="check-kcal">{{activity.kcal}}kcal</p><font-awesome-icon class="remove-icon" icon="fa-solid fa-trash" @click="removeCoreItem(activity,'activity')"/></li>
          </transition-group>  
          <p v-else>{{newActivity.msgSearched}}</p>
        </div>
      </div>
    </div>
    <DeletingWindow v-if="deletingItem" @closeTheWindow="handleCloseTheWindow" @allowDeleting="handleAllowDeleting"><p class="title-h2">{{deletingItem.name}} | {{deletingItem.kcal}}kcal</p></DeletingWindow>  
    <transition name="success">
      <SuccessWindow v-if="successStatus"></SuccessWindow>
    </transition>
  </div>
</template>

<script>
import DeletingWindow from '../components/DeletingWindow.vue'
import SuccessWindow from '../components/SuccessWindow.vue'
import chechSession from '../JS/checkSession.js'
import checkDifferenceBetweenArrays from '../JS/checkDifferenceBetweenArrays.js'
import { mapActions } from 'vuex'
import axios from 'axios'

export default {//napraviti mail box za pregled poslatih sugestija
  components:{
    DeletingWindow,
    SuccessWindow
  },
  data:function(){
    return{
      nutritiousTypes:null,
      newNutrition:{
        name:"",
        kcal:null,
        type:null,
        searchedNutritions:[],
        msgSearched:"",
        msgAlert:""
      },
      newActivity:{
        name:"",
        kcal:null,
        searchedActivities:[],
        msgSearched:"",
        msgAlert:""
      },
      deletingItem:null,
      successStatus:false
    }
  },
  methods:{
    ...mapActions(["setUserStatus","setUserLevel"]),
    async getNutritiousTypes(){
      try {
        let res=await axios.get("http://732u122.e2.mars-hosting.com/nutricionist/api/nutritious/getTypes")
        this.nutritiousTypes=res.data.res
      } catch (error) {
        console.log(error)
      }
    },
    async searchForNutritions(){
      this.checkAdmin()
      if(this.newNutrition.name.trim().length>2){
        try {
          let result=await axios.get("http://732u122.e2.mars-hosting.com/nutricionist/api/nutritious/search",{
            params:{
              "string":this.newNutrition.name.toLowerCase().trim()
            }
          })
          checkDifferenceBetweenArrays(this.newNutrition.searchedNutritions,result.data.res)
        } catch (error) {
          this.newNutrition.searchedNutritions=[]
          if(this.newNutrition.msgSearched.length===0){
            this.newNutrition.msgSearched=error.response.data.message
            return
          }
        }
      }
      else{
        this.newNutrition.searchedNutritions=[]
        this.newNutrition.msgSearched=""
      }
    },
    async makeNewNutrition(){
      this.checkAdmin()
      this.newNutrition.msgAlert=""
      if(this.newNutrition.name.trim().length<3 || this.newNutrition.name.trim().length>20){
        return
      }
      if(this.newNutrition.kcal<10 || this.newNutrition.kcal>1000){
        return
      }
      if(!this.newNutrition.type){
        return
      }
      if(this.newNutrition.searchedNutritions.length>0){
        let checkResult=this.checkItemUniqueness(this.newNutrition,this.newNutrition.searchedNutritions)
        if(!checkResult){
          this.newNutrition.msgAlert="Namirnica vec postoji"
          return
        }  
      }
      try {
        await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/nutritious/newNutrition",{
          "ntr_name":this.newNutrition.name.toLowerCase().trim(),
          "ntr_kcal":this.newNutrition.kcal,
          "ntt_id":this.newNutrition.type
        })
        this.newNutrition.name=""
        this.newNutrition.kcal=null
        this.newNutrition.type=null
        this.showSuccessWindow()
      } catch (error) {
        console.log(error)
      }
    },
    checkItemUniqueness(item,array){
      for(let i=0;i<array.length;i++){
        if(array[i].name.toLowerCase()===item.name.toLowerCase()){
          return false
        }
      }
      return true
    },
    async searchForActivities(){
      this.checkAdmin()
      if(this.newActivity.name.trim().length>2){
        try {
          let result=await axios.get("http://732u122.e2.mars-hosting.com/nutricionist/api/activities/search",{
            params:{
              "string":this.newActivity.name.toLowerCase().trim()
            }
          })
          checkDifferenceBetweenArrays(this.newActivity.searchedActivities,result.data.res)
        } catch (error) {
          this.newActivity.searchedActivities=[]
          if(this.newActivity.msgSearched.length===0){
            this.newActivity.msgSearched=error.response.data.message
            return
          }
        }
      }
      else{
        this.newActivity.searchedActivities=[]
        this.newActivity.msgSearched=""
      }
    },
    async makeNewActivity(){
      this.checkAdmin()
      this.newActivity.msgAlert=""
      if(this.newActivity.name.trim().length<3 || this.newActivity.name.trim().length>20){
        return
      }
      if(this.newActivity.kcal<1 || this.newActivity.kcal>100){
        return
      }
      if(this.newActivity.searchedActivities.length>0){
        let checkResult=this.checkItemUniqueness(this.newActivity,this.newActivity.searchedActivities)
        if(!checkResult){
          this.newActivity.msgAlert="Aktivnost vec postoji"
          return
        }  
      }
      try {
        await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/activities/newActivity",{
          "act_name":this.newActivity.name.toLowerCase().trim(),
          "act_kcal":this.newActivity.kcal
        })
        this.newActivity.name=""
        this.newActivity.kcal=null
        this.showSuccessWindow()
      } catch (error) {
        console.log(error)
      }
    },
    removeCoreItem(item,type){
      this.checkAdmin()
      item.type=type
      this.deletingItem=item
      console.log(this.deletingItem)
    },
    handleCloseTheWindow(){
      this.deletingItem=null
    },
    async handleAllowDeleting(){
      if(this.deletingItem.type==="nutrition"){
        this.newNutrition.msgAlert=""
        try {
          let res=await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/nutritious/deleteNutrition",{
            "ntr_id":this.deletingItem.id
          })
          this.newNutrition.msgAlert=res.data.message
          this.handleCloseTheWindow()
          this.searchForNutritions()
          this.showSuccessWindow()
        } catch (error) {
          console.log(error)
        }
        return
      }
      if(this.deletingItem.type==="activity"){
        try {
          this.newActivity.msgAlert=""
          let res=await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/activities/deleteActivity",{
            "act_id":this.deletingItem.id
          })
          this.newActivity.msgAlert=res.data.message
          this.handleCloseTheWindow()
          this.searchForActivities()
          this.showSuccessWindow()
        } catch (error) {
          console.log(error)
        }
        return
      }
    },
    showSuccessWindow(){
      this.successStatus=true
      setTimeout(()=>{
        this.successStatus=false
      },1300)
    },
    async checkAdmin(){
      const res=await chechSession()
      if(!res){
        this.setUserStatus(false)
        this.setUserLevel(null)
        this.$router.push({name:"home"})
      }
      else{
        if(res.response || res.data.res.level===2){
          this.setUserStatus(false)
          this.setUserLevel(null)
          this.router.push({name:"home"})
        }
      }
    }
  },
  mounted(){
    this.getNutritiousTypes()
  }
}
</script>

<style>
.new-item-wrapper{
  display: flex;
  flex-direction: column;
  padding: 20px 0;
}
.new-item-form{
  width: 60%;
  margin: 0 auto;
  min-height: 27vh;
  display: flex;
  flex-direction: column;
}
.check-list-item-wrapper{
  width: 60%;
  min-height: 20vh;
  margin: 0 auto;
  padding: 0 10px 10px;
  box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
  border-radius: 0 0 10px 10px;
}
.check-list-item{
  list-style: none;
  margin: 0 auto;
  padding: 0;
  text-align: left;
  width: 70%;
}
.check-item{
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
  padding: 0 3px;
}
.check-item:hover{
  background-color: #eee;
}
.check-item:hover .remove-icon{
  color: #c50000;
}
.list-move,
.list-enter-active,
.list-leave-active{
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-leave-active {
  position: absolute;
}
@media screen and (min-width: 768px){
  .new-item-wrapper{
    flex-direction: row;
  }
  .new-item-form{
    width: 40%;
  }
  .check-list-item-wrapper{
    width: 50%;
  }
}
@media screen and (min-width: 1200px){
  .new-item-form{
    width: 30%;
  }
  .check-list-item-wrapper{
    width: 40%;
  }
}
</style>