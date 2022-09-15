<template>
  <div class="meal-form-wrapper">
        <div class="btn-exit-wrapper">
            <font-awesome-icon class="btn-exit" icon="fa-solid fa-circle-xmark" @click="closeBasketForm()"/>
        </div>
        <div class="training-wrapper" v-if="activities">
            <ul class="meal-form">
                <li class="msg-instruction nutrition" v-if="activities.length===0"><p>Broj dozvoljenih aktivnosti je 5.</p></li>
                <li class="nutrition" v-for="(activity,index) in activities" :key="activity.id">
                    <p>{{activity.name}} | {{activity.time}}(min) | {{activity.kcalSum}}Kcal</p><font-awesome-icon class="remove-icon" icon="fa-solid fa-trash" @click="removeActivity(index)"/>
                </li>
            </ul>
            <ul class="meal-info">
                <li class="msg-instruction" v-if="activities.length>0"><p>Broj dozvoljenih aktivnosti {{5-activities.length}}</p></li>
                <li class="total"><p>{{trainingSum}}Kcal</p></li>
                <li class="meal-name">
                    <label for="name" class="msg-instruction" v-show="trainingName.length<1 || trainingName.length>15">Naziv mora imati izmedju 1 i 15 karaktera.</label>
                    <input id="name" class="input" type="text" placeholder="Naziv aktivnosti" v-model="trainingName" @keydown.enter="makeUserItem()">
                    <label for="name" class="msg-instruction">{{msg}}</label>
                </li>
            </ul>
        </div>
        <div class="dish-wrapper" v-if="nutritions">
            <ul class="meal-form">
          <li class="msg-instruction nutrition" v-if="nutritions.length===0"><p>Broj dozvoljenih namirnica je 10.</p></li>
          <li class="nutrition" v-for="(nutrition,index) in nutritions" :key="nutrition.id">
            <p>{{nutrition.name}} | {{nutrition.quantity}}g(ml) | {{nutrition.kcalSum}}Kcal</p><font-awesome-icon class="remove-icon" icon="fa-solid fa-trash" @click="removeNutrition(index)"/>
          </li>
        </ul>
        <ul class="meal-info">
          <li class="msg-instruction" v-if="nutritions.length>0"><p>Broj dozvoljenih namirnica {{10-nutritions.length}}</p></li>
          <li class="total"><p>{{mealSum}}Kcal</p></li>
          <li class="meal-name">
            <label for="name" class="msg-instruction" v-show="mealName.length<1 || mealName.length>15">Naziv mora imati izmedju 1 i 15 karaktera.</label>
            <input id="name" class="input" type="text" placeholder="Naziv obroka" v-model="mealName" @keydown.enter="makeUserItem()">
            <label for="name" class="msg-instruction">{{msg}}</label>
          </li>
        </ul>
        </div>
        <div class="btn-wrapper">
                <button class="btn-registration confirm" @click="makeUserItem()">Potvrdi</button>
                </div>
      </div>
</template>

<script>
export default {
    props:["activities","msg","nutritions"],
    data:function(){
        return{
            trainingName:"",
            mealName:""
        }
    },
    methods:{
        closeBasketForm(){
            this.$emit("closeBasketForm")
        },
        removeActivity(index){
            this.$emit("removeActivity",index)
        },
        removeNutrition(index){
            this.$emit("removeNutrition",index)
        },
        makeUserItem(){
            if(this.trainingName){
                this.$emit("makeUserItem",this.trainingName,this.trainingSum)
            }
            if(this.mealName){
                this.$emit("makeUserItem",this.mealName,this.mealSum)
            }
        } 
    },
    computed:{
        trainingSum(){
            let trainingKcal=0
            if(this.activities){
                for(let i=0;i<this.activities.length;i++){
                    trainingKcal+=this.activities[i].kcalSum
                }
            }
            return (Math.round(trainingKcal*100))/100
        },
        mealSum(){
            let mealKcal=0
            if(this.nutritions){
                for(let i=0;i<this.nutritions.length;i++){
                mealKcal+=this.nutritions[i].kcalSum
                }
            }
            return mealKcal
        }
    }
}
</script>

<style>

</style>