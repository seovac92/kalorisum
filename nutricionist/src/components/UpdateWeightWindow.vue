<template>
  <div class="update-weight-wrapper window-position window-style">
    <div class="btn-exit-wrapper">
        <font-awesome-icon class="btn-exit" @click="closeUpdateWeight()" icon="fa-solid fa-circle-xmark" />
    </div>
    <h2 class="title-h2">Promena tezine</h2>
    <div class="input-wrapper">
        <label for="weight" class="msg-instruction" v-show="weight<40 || weight>240">Unesite vrednost izmedju 40 i 240.</label>
        <input id="weight" class="calculator-input" type="number" v-model="weight" placeholder="Tezina (kg)">
        <label for="weight" class="msg-instruction">{{msg}}</label>
    </div>    
    <div class="btn-wrapper">
        <button class="btn-registration confirm" @click="allowUpdateWeight()">Potvrdi</button>
    </div>
  </div>
</template>

<script>
export default {
    props:["msg"],
    data:function(){
        return{
            weight:null
        }
    },
    methods:{
        closeUpdateWeight(){
            this.$emit("closeUpdateWeight")
        },
        allowUpdateWeight(){
            if(this.weight<40 || this.weight>240){
                return
            }
            this.$emit("allowUpdateWeight",this.weight)
        }
    }
}
</script>

<style>
.input-wrapper{
    margin-top: 10px;
}
</style>