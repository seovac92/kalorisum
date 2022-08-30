<template>
  <div class="table-wrapper">
     <div class="search-box-wrapper">
      <input class="input" type="text" v-model="activityString" @keyup="filterByString()" placeholder="Pretraga">
    </div>
    <table class="table-nutritious">
      <thead>
        <tr class="row-1">
          <th class="column-1" colspan="2">
            Aktivnost(60min)
          </th>
          <th class="column-2" colspan="2">
            kCal(1kg tezine)
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="row" v-for="one in activities" :key="one.id">
          <td class="column-1" colspan="2" @click="pickAActivity(one)">{{one.name}}</td>
          <td class="column-2" colspan="2">{{one.kcal}}</td>
        </tr>
        <tr v-if="activities.length===0">
          <td class="message-table" colspan="6">{{msg}}</td>
        </tr>
      </tbody>
    </table>
    <div class="navigate-wrapper">
      <div class="btn-back-wrapper" @click="getPreviousTen()" v-if="currentPage">
        <font-awesome-icon class="btn-back" icon="fa-solid fa-angle-left" />  
      </div>
      <div class="btn-next-wrapper" @click="getNextTen()" v-if="activities.length===10">
        <font-awesome-icon class="btn-next" icon="fa-solid fa-angle-right" />
      </div>  
    </div> 
  </div>
</template>

<script>
import checkDifferenceBetweenArrays from '../JS/checkDifferenceBetweenArrays.js'
import axios from 'axios'

export default {
    data:function(){
        return{
          activities:[],
          currentPage:null,
          activityString:"",
          msg:""
        }
    },
    methods:{
        async getTenActivities(){
          try {
              let result= await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/activities/getTenActivities",{
                "page":0
              })
              this.activities=result.data.res.activities
              this.currentPage=result.data.res.page
          } catch (error) {
              console.log(error)
          }
        },
        async getNextTen(){
          try {
            let result= await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/activities/getTenActivities",{
              "page":this.currentPage+10
            })
            this.activities=result.data.res.activities
            this.currentPage=result.data.res.page
          } catch (error) {
            console.log(error)
          }
        },
        async getPreviousTen(){
          try {
            let result= await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/activities/getTenActivities",{
              "page":this.currentPage-10
            })
            this.activities=result.data.res.activities
            this.currentPage=result.data.res.page
          } catch (error) {
            console.log(error)
          }
        },
        async filterByString(){
          if(this.activityString.length===2){
            this.activities=[]
          }
          if(this.activityString.length>1){
            try {
              let result=await axios.get("http://732u122.e2.mars-hosting.com/nutricionist/api/activities/search",{
                params:{
                  "string":this.activityString
                }
              })
              checkDifferenceBetweenArrays(this.activities,result.data.res)
            } catch (error) {
              this.activities=[]
              if(this.msg.length===0){
                this.msg=error.response.data.message
              }  
            }
          }
          if(this.activityString.length<=1){
            this.getTenActivities()
            this.msg=""
          }   
        },
        pickAActivity(one){
          this.$emit("pickAActivity",one)
        }
    },
    mounted(){
        this.getTenActivities()
    }
}
</script>

<style>

</style>