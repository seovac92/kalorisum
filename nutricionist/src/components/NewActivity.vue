<template>
  <div class="new-nutrition">
      <h2 class="title-h2">Nova aktivnost</h2>
      <div class="new-item-wrapper">
        <div class="new-item-form">
          <label for="nameActivity" class="msg-instruction" v-show="newActivity.name.trim().length<3 || newActivity.name.trim().length>20">Naziv mora imati izmedju 3 i 20 karaktera.</label>
          <input id="nameActivity" class="calculator-input" type="text" v-model="newActivity.name" placeholder="Naziv aktivnosti" @keyup="searchForActivities()">
          <label for="kcalActivity" class="msg-instruction" v-show="newActivity.kcal<1 || newActivity.kcal>100">Kalorije moraju biti izmedju 1 i 100.</label>
          <input class="calculator-input" type="number" v-model="newActivity.kcal" placeholder="Kcal na 60min/1kg tezine" @keydown.enter="makeNewActivity()">
          <p class="msg-instruction" v-show="newActivity.msgAlert">{{newActivity.msgAlert}}</p>
          <div class="btn-registration-wrapper">
            <button @click="makeNewActivity()" class="btn-registration">Dodaj</button>    
          </div>
        </div>
        <div class="check-list-item-wrapper">
          <h3 class="title-h3">Postojece aktivnosti:</h3>
          <transition-group name="plan" tag="ul" class="check-list-item" v-if="newActivity.searchedActivities.length>0">
            <li class="check-item" v-for="activity in newActivity.searchedActivities" :key="activity.id"><p class="check-name">{{activity.name}}</p><p class="check-kcal">{{activity.kcal}}kcal</p><font-awesome-icon class="remove-icon" icon="fa-solid fa-trash" @click="removeCoreItem(activity,'activity')"/></li>
          </transition-group>  
          <p v-else>{{newActivity.msgSearched}}</p>
        </div>
      </div>
      <transition name="form">
      <DeletingWindow v-if="deletingItem" @closeTheWindow="handleCloseTheWindow" @allowDeleting="handleAllowDeleting"><p class="title-h2">{{deletingItem.name}} | {{deletingItem.kcal}}kcal</p></DeletingWindow>
      </transition>  
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


export default {
    components:{
        DeletingWindow,
        SuccessWindow
    },
    data:function(){
        return{
            newActivity:{
                name:"",
                kcal:null,
                searchedActivities:[],
                msgSearched:"",
                msgAlert:""
            },
            deletingItem:null,
            successStatus:false,
        }
    },
    methods:{
        ...mapActions(["setUserStatus","setUserLevel"]),
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
        this.newActivity.searchedActivities=[]
        this.showSuccessWindow()
      } catch (error) {
        console.log(error)
      }
    },
    removeCoreItem(item,type){
      this.checkAdmin()
      item.type=type
      this.deletingItem=item
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
    },
    }
}
</script>

<style>

</style>