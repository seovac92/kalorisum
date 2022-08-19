<template>
  <div class="tdee-wrapper">
    <h2 class="title-h2">TDEE kalkulator</h2>
    <div class="tdee-result-wrapper">
        <div class="inputs-wrapper">
            
            <select v-model="activityLevel" class="calculator-input">
                <option value=null selected disabled>Nivo aktivnosti</option>
                <option value=1.2>Neaktivan</option>
                <option value=1.375>Malo aktivan</option>
                <option value=1.55>Umereno aktivan</option>
                <option value=1.725>Veoma aktivan</option>
                <option value=1.9>Ekstremno aktivan</option>
            </select>
            <label for="kcal-result" class="msg-instruction" v-show="bmrKcal<922 || bmrKcal>4474">Unesite vrednost izmedju 923 i 4473.</label>
            <input id="kcal-result" class="calculator-input" type="number" v-model="bmrKcal">
        </div>
        <div class="result">
            <p class="sum">{{tdeeSum}}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    data:function(){
        return{
            bmrKcal:null,
            activityLevel:null
        }
    },
    computed:{
        tdeeSum(){
            let tdeeResult
            if(this.bmrKcal && this.activityLevel){
                if(this.bmrKcal>922 && this.bmrKcal<4474){
                    tdeeResult=this.bmrKcal*this.activityLevel
                    return Math.round(tdeeResult)+"Kcal"
                }
            }
            return tdeeResult
        }
    }
}
</script>

<style>
.tdee-wrapper{
    text-align: left;
}
.tdee-result-wrapper{
    width: 80vw;
    min-height: 16vh;
    margin: 10px auto;
    display: flex;
    flex-direction: column;
}
.tdee-result-wrapper .inputs-wrapper{
    min-height: 10vh;
}
@media screen and (min-width: 768px){
    .tdee-result-wrapper{
        flex-direction: row;
        min-height: fit-content;
    }
}
</style>