<template>
  <div class="mail-box-wrapper window-position window-style">
    <div class="btn-exit-wrapper">
        <font-awesome-icon class="btn-exit" @click="closeMailBox()" icon="fa-solid fa-circle-xmark" />
    </div>
    <div class="title-wrapper">
        <h3 class="title-h2">Poruke</h3>
    </div>
    <div class="msg-table-wrapper">
        <table class="msg-table">
            <tr>
                <td colspan="4">
                    <font-awesome-icon icon="fa-solid fa-square" @click="deselectAll()"/>
                    <font-awesome-icon icon="fa-solid fa-square-check" @click="selectAll()"/>
                </td>
            </tr>
            <tr v-for="message in messages" :key="message.sug_id">
                <td>{{message.usr_name}}</td>
                <td>{{message.sug_subject}}</td>
                <td>{{message.sug_date}}</td>
                <td v-show="!message.sug_isSolved"><font-awesome-icon icon="fa-solid fa-square" @click="changeCheckStatus(message.sug_id)"/></td>
                <td v-show="message.sug_isSolved"><font-awesome-icon icon="fa-solid fa-square-check" @click="changeCheckStatus(message.sug_id)"/></td>
            </tr>
            <tr v-show="messages.length===0"><th colspan="4">Nemate nove poruke</th></tr>
            <tr>
                <td colspan="4"><font-awesome-icon icon="fa-solid fa-trash" @click="solvedSuggestions()"/></td>
            </tr>
        </table>
    </div>
    <div class="navigate-wrapper">
      <div class="btn-back-wrapper" @click="previousTenSuggestions()">
        <font-awesome-icon class="btn-back" icon="fa-solid fa-angle-left" />  
      </div>
      <div class="btn-next-wrapper" @click="nextTenSuggestions()">
        <font-awesome-icon class="btn-next" icon="fa-solid fa-angle-right" />
      </div>  
    </div> 
  </div>
</template>

<script>
export default {//uraditi stilizaciju liste poruka i uraditi pregled teksta poruke!!!
    props:["messages","page"],
    methods:{
        closeMailBox(){
            this.$emit("closeMailBox")
        },
        changeCheckStatus(sug_id){
            this.$emit("changeCheckStatus",sug_id)
        },
        selectAll(){
            this.$emit("selectAll")
        },
        deselectAll(){
            this.$emit("deselectAll")
        },
        nextTenSuggestions(){
            if(this.messages.length===10){
                this.$emit("nextTenSuggestions")
            }    
        },
        previousTenSuggestions(){
            if(this.page>0){
                this.$emit("previousTenSuggestions")
            }    
        },
        solvedSuggestions(){
            this.$emit("solvedSuggestions")
        }
    }
}
</script>

<style>
.mail-box-wrapper{
    padding-bottom: 10px;
    font-size: 1.1rem;
}
.msg-table-wrapper{
    min-height: 35vh;
}
.msg-table{
    width: 100%;
}
</style>