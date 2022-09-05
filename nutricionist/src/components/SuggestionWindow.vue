<template>
  <div class="suggestion-window-wrapper window-position window-style">
    <div class="btn-exit-wrapper">
        <font-awesome-icon class="btn-exit" @click="closeSuggestionWindow()" icon="fa-solid fa-circle-xmark" />
    </div>
    <div class="title-wrapper">
        <h3 class="title-h2">Vase sugestije</h3>
    </div>
    <div class="text-wrapper">
        <label class="msg-instruction" for="subject" v-show="!suggestion.subject">Unesite naziv teme.</label>
        <input id="subject" class="calculator-input" type="text" v-model="suggestion.subject" placeholder="tema">
        <label class="msg-instruction" for="suggestion" v-show="!suggestion.text">Unesite poruku za admina.</label>
        <textarea id="suggestion" class="calculator-input" v-model="suggestion.text" maxlength="500" cols="50" rows="5" placeholder="Posaljite poruku..." @keydown.enter="sendSuggestion()"></textarea>
    </div>
    <div class="btn-wrapper">
        <button class="btn-registration confirm" @click="sendSuggestion()">Posalji</button>
    </div>
  </div>
</template>

<script>
export default {
    data:function(){
        return{
            suggestion:{
                subject:"",
                text:""
            }
        }
    },
    methods:{
        closeSuggestionWindow(){
            this.$emit("closeSuggestionWindow")
            this.suggestion.subject=""
            this.suggestion.text=""
        },
        sendSuggestion(){
            if(this.suggestion.subject.length===0){
                return
            }
            if(this.suggestion.text.length===0){
                return
            }
            this.$emit("sendSuggestion",this.suggestion)
            this.suggestion.subject=""
            this.suggestion.text=""
        }
    }
}
</script>

<style>
.suggestion-window-wrapper{
    display: flex;
    flex-direction: column;
}
.text-wrapper{
    display: flex;
    flex-direction: column;
    padding: 10px;
}
</style>