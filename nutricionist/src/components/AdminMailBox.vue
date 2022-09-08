<template>
  <div class="mail-box-wrapper window-position window-style">
    <div class="btn-exit-wrapper">
        <font-awesome-icon class="btn-exit" @click="closeMailBox()" icon="fa-solid fa-circle-xmark" />
    </div>
    <div class="title-wrapper">
        <h3 class="title-h2">Poruke</h3>
    </div>
    <div class="list-of-messages" v-if="!selectedMessage">
        <div class="msg-table-wrapper">
            <table class="msg-table">
                <tr>
                    <td class="row-option" colspan="4">
                        <font-awesome-icon class="last-icon" icon="fa-solid fa-square" @click="deselectAll()"/>
                        <font-awesome-icon class="last-icon" icon="fa-solid fa-square-check" @click="selectAll()"/>
                    </td>
                </tr>
                <tr>
                    <td class="title">Korisnik</td>
                    <td class="title">Tema</td>
                    <td class="title">Datum</td>
                    <td></td>
                </tr>
                <tr class="one-row" v-for="message in messages" :key="message.sug_id">
                    <td class="one-row-column" @click="showTextMessage(message)">{{message.usr_name}}</td>
                    <td class="one-row-column" @click="showTextMessage(message)">{{message.sug_subject}}</td>
                    <td class="one-row-column" @click="showTextMessage(message)">{{message.sug_date}}</td>
                    <td class="one-row-column" v-show="!message.sug_isSolved"><font-awesome-icon icon="fa-solid fa-square" @click="changeCheckStatus(message.sug_id)"/></td>
                    <td class="one-row-column" v-show="message.sug_isSolved"><font-awesome-icon icon="fa-solid fa-square-check" @click="changeCheckStatus(message.sug_id)"/></td>
                </tr>
                <tr v-show="messages.length===0"><th colspan="4">Nemate nove poruke</th></tr>
                <tr class="row-option" v-show="messages.length>0">
                    <td colspan="4"><font-awesome-icon class="last-icon" icon="fa-solid fa-trash" @click="solvedSuggestions()"/></td>
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
    <div class="single-message-wrapper" v-if="selectedMessage">
        <div class="message-user-wrapper">
            <font-awesome-icon class="single-icon" icon="fa-solid fa-reply" @click="backToAllMessages()"/>
            <h3 class="user-single-message">Korisnik: {{selectedMessage.usr_name}}</h3>   
        </div>
        <div class="message-title-wrapper">
            <h4 class="title-single-message">Tema: {{selectedMessage.sug_subject}}</h4>
        </div>
        <div class="message-text-wrapper">
            <p>{{selectedMessage.sug_text}}</p>
        </div>
    </div>     
  </div>
</template>

<script>
export default {//uraditi stilizaciju liste poruka i uraditi pregled teksta poruke!!!
    props:["messages","page"],
    data:function(){
        return{
            selectedMessage:null
        }
    },
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
        },
        showTextMessage(message){
            this.selectedMessage=message
        },
        backToAllMessages(){
            this.selectedMessage=null
        }
    }
}
</script>

<style>
.mail-box-wrapper{
    padding-bottom: 10px;
    font-size: 1.1rem;
    min-height: 50vh;
}
.msg-table-wrapper{
    min-height: 40vh;
}
.msg-table{
    width: 100%;
    border-collapse: collapse;
}
.row-option{
    text-align: right;
    padding: 5px 0;
}
.last-icon{
    margin: 0 5px;
}
.one-row:hover{
    background-color: #ddd;
    cursor: pointer;
}
.one-row-column{
    padding: 5px 0;
}
.single-message-wrapper{
    padding: 10px;
}
.message-user-wrapper{
    display: flex;
    align-items: center;
}
.single-icon{
    padding: 3px;
    border-radius: 50%;
    cursor:pointer;
    transition: 0.3s all ease;
}
.single-icon:hover{
    background-color: lightsteelblue;
}
.user-single-message{
    flex-basis: 90%;
    margin: 0;
}
.message-title-wrapper{
    padding: 5px 0;
    border-bottom: 1px solid black;
}
.title-single-message{
    margin: 0;
}
.message-text-wrapper{
    word-break: break-word;
    text-align: left;
    font-style: italic;
}
</style>