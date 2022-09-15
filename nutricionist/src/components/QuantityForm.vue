<template>
  <div class="nutrition-quantity-wrapper">
        <div class="btn-exit-wrapper">
            <font-awesome-icon class="btn-exit" icon="fa-solid fa-circle-xmark" @click="closeTheWindow()"/>
        </div>
        <slot name="activity"></slot>
        <div class="input-wrapper" v-if="activity">
          <label for="quantity" class="msg-instruction" v-show="time<10 || time>240">Unesite vrednost izmedju 10 i 240.</label>
          <input id="quantity" class="calculator-input" type="number" v-model="time" placeholder="Vreme trajanja u min" @keydown.enter="sendToBasket()">
          <label for="quantity" class="msg-instruction">{{msg}}</label>
        </div>
        <slot name="nutrition"></slot>
        <div class="input-wrapper" v-if="nutrition">
          <label for="quantity" class="msg-instruction" v-show="quantity<5 || quantity>1000">Unesite vrednost izmedju 5 i 1000.</label>
          <input id="quantity" class="calculator-input" type="number" v-model="quantity" placeholder="Kolicina u g/ml" @keydown.enter="sendToBasket()">
          <label for="quantity" class="msg-instruction">{{msg}}</label>
        </div>
        <div class="btn-wrapper">
          <button class="btn-registration confirm" @click="sendToBasket()">Potvrdi</button>
        </div>  
      </div>
</template>

<script>
export default {
    props:["activity","nutrition","msg"],
    data:function(){
        return{
            time:null,
            quantity:null
        }
    },
    methods:{
        closeTheWindow(){
            this.$emit("closeTheWindow")
        },
        sendToBasket(){
            if(this.activity){
                this.$emit("sendToBasket",this.time)
                this.time=null
            }
            if(this.nutrition){
                this.$emit("sendToBasket",this.quantity)
                this.quantity=null
            }    
        }
    }
}
</script>

<style>

</style>