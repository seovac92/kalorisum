<template>
  <div class="wrapper">
    <NewNutrition></NewNutrition>
    <NewActivity></NewActivity>
    <div class="mail-box-suggestion-wrapper card-opener" @click="openSuggestionWindow()">
        <font-awesome-icon icon="fa-solid fa-envelope" class="icon" />
        <div class="number-suggestions-wrapper">
          <p class="number-suggestions">{{suggestions.suggestionsNumber}}</p>
        </div> 
    </div>
    <transition name="form">
      <AdminMailBox v-if="suggestions.mailBoxStatus" :messages="suggestions.messages" :page="suggestions.currentPage" @closeMailBox="handleCloseMailBox" @changeCheckStatus="handleChangeCheckStatus" @selectAll="handleSelectAll" @deselectAll="handleDeselectAll" @nextTenSuggestions="handleNextTenSuggestions" @previousTenSuggestions="handlePreviousTenSuggestion" @solvedSuggestions="handleSolvedSuggestions"></AdminMailBox>
    </transition>
  </div>
</template>

<script>
import AdminMailBox from '../components/AdminMailBox.vue'
import NewNutrition from '../components/NewNutrition.vue'
import NewActivity from '../components/NewActivity.vue'
import axios from 'axios'

export default {
  components:{
    AdminMailBox,
    NewNutrition,
    NewActivity
  },
  data:function(){
    return{
      suggestions:{
        suggestionsNumber:null,
        mailBoxStatus:false,
        messages:[],
        currentPage:0
      }  
    }
  },
  methods:{
    async getNumberOfSuggestions(){
      try {
        let res=await axios.get("http://732u122.e2.mars-hosting.com/nutricionist/api/admin/getNumberOfSuggestions")
        this.suggestions.suggestionsNumber=res.data.res[0].number
      } catch (error) {
        console.log(error)
      }
    },
    openSuggestionWindow(){
      this.suggestions.mailBoxStatus=true
    },
    handleCloseMailBox(){
      this.suggestions.mailBoxStatus=false
    },
    async getTenSuggestions(){
      if(this.suggestions.suggestionsNumber===0){
        return
      }
      try {
          let result= await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/admin/getTenSuggestions",{
              "page":this.suggestions.currentPage
          })
          this.suggestions.currentPage=result.data.res.page
          this.suggestions.messages=result.data.res.suggestions
      } catch (error) {
          console.log(error)
      }
    },
    runThroughSuggestions(bit){
      for(let i=0;i<this.suggestions.messages.length;i++){
        this.suggestions.messages[i].sug_isSolved=bit
      }
    },
    handleChangeCheckStatus(sug_id){
      for(let i=0;i<this.suggestions.messages.length;i++){
        if(this.suggestions.messages[i].sug_id===sug_id){
          if(!this.suggestions.messages[i].sug_isSolved){
            this.suggestions.messages[i].sug_isSolved=1
            return
          }
          this.suggestions.messages[i].sug_isSolved=0
        }
      }
    },
    handleSelectAll(){
      this.runThroughSuggestions(1)
    },
    handleDeselectAll(){
      this.runThroughSuggestions(0)
    },
    async handleNextTenSuggestions(){
      this.suggestions.currentPage+=10
      this.getTenSuggestions()
    },
    async handlePreviousTenSuggestion(){
      this.suggestions.currentPage-=10
      this.getTenSuggestions()
    },
    async handleSolvedSuggestions(){
      let solvedSuggestions=[]
      for(let i=0;i<this.suggestions.messages.length;i++){
        if(this.suggestions.messages[i].sug_isSolved){
          solvedSuggestions.push(this.suggestions.messages[i].sug_id)
        }
      }
      if(solvedSuggestions.length>0){
        try {
          await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/admin/solvedSuggestions",{
            "solvedSuggestions":solvedSuggestions
          })
          this.getTenSuggestions()
          this.getNumberOfSuggestions()
        } catch (error) {
          console.log(error)
        }
      }
    },
    goToTop(){
        window.scroll({
          top: 0
        })
      }
  },
  mounted(){
    this.getNumberOfSuggestions()
    this.getTenSuggestions()
    this.goToTop()
  }
}
</script>

<style>
.mail-box-suggestion-wrapper{
  top: 30vh;
  right: 0;
  opacity: 1;
}
.number-suggestions-wrapper{
  text-align: center;
}
.number-suggestions{
  color: whitesmoke;
  margin: 0;
}
</style>