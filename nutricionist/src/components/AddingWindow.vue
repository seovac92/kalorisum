<template>
  <div class="adding-wrapper window-position window-style">
    <div class="btn-exit-wrapper">
        <font-awesome-icon class="btn-exit" icon="fa-solid fa-circle-xmark" @click="closeTheWindow()"/>
    </div>
    <slot name="title"></slot>
    <div class="select-dish" v-if="dishs">
        <select class="input" v-model="dish">
            <option value=null selected disabled>Izaberi obrok</option>
            <option v-for="dish in dishs" :key="dish.dsh_id" :value="dish.dsh_id">{{dish.dsh_name}}({{dish.dsh_sum_kcal}}kcal)</option>
        </select>
    </div>
    <div class="select-training" v-if="trainings">
        <select class="input" v-model="training">
            <option value=null selected disabled>Izaberi trening</option>
            <option v-for="training in trainings" :key="training.trn_id" :value="training.trn_id">{{training.trn_name}}({{training.trn_sum_kcal}}kcal)</option>
        </select>
    </div>
    <select class="input" v-model="day">
        <option value=null selected disabled>Izaberi dan</option>
        <option value=1>Ponedeljak</option>
        <option value=2>Utorak</option>
        <option value=3>Sreda</option>
        <option value=4>Cetvrtak</option>
        <option value=5>Petak</option>
        <option value=6>Subota</option>
        <option value=7>Nedelja</option>
    </select>
    <p class="msg-instruction">{{msg}}</p>
    <slot name="msg"></slot>
    <div class="btn-wrapper">
        <button class="btn-registration confirm" @click="sendItemToPlan()">Potvrdi</button>
    </div>
  </div>
</template>

<script>
export default {
    props:["dishs","trainings"],
    data:function(){
        return{
            dish:null,
            training:null,
            day:null,
            msg:""
        }
    },
    methods:{
        closeTheWindow(){
            this.$emit("closeAddForm")
        },
        sendItemToPlan(){
            this.msg=""
            if(!this.dish || !this.day){
                this.msg="Morate izabrati obrok i dan."
            }
            if(!this.training || !this.day){
                this.msg="Morate izabrati trening i dan."
            }
            if(this.dish && this.day){
                this.$emit("sendItemToPlan",this.dish,this.day,"dish")
            }
            if(this.training && this.day){
                this.$emit("sendItemToPlan",this.training,this.day,"training")
            }
        }
    }
}
</script>

<style>
.window-position{
    width: 70vw;
    position: fixed;
    top: 10vh;
    left: 15vw;
    z-index: 1;
}
.window-style{
    background-color: #eee;
    border-radius: 20px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
}
@media screen and (min-width: 768px) {
    .window-position{
        width: 50vw;
        left: 25vw;
    }
}
@media screen and (min-width: 992px) {
    .window-position{
        width: 40vw;
        left: 30vw;
    }
}
@media screen and (min-width: 1200px) {
    .window-position{
        width: 30vw;
        left: 35vw;
    }
}
@media screen and (min-width: 1920px) {
    .window-position{
        width: 20vw;
        left: 40vw;
    }
}
</style>