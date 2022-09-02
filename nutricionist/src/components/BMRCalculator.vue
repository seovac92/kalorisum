<template>
  <div class="bmr-wrapper">
    <h2 class="title-h2">BMR kalkulator</h2>
    <div class="bmr-result-wrapper">
        <div class="inputs-wrapper">
            <select v-model="gender" class="calculator-input">
                <option value="" selected disabled>Izaberite pol</option>
                <option value="man">muski</option>
                <option value="woman">zenski</option>
            </select>
            <label for="ages" class="msg-instruction" v-show="ages<14 || ages>80">Unesite vrednost izmedju 14 i 80.</label>
            <input id="ages" class="calculator-input" type="number" v-model="ages" placeholder="Godine starosti">
            <label for="height" class="msg-instruction" v-show="height<140 || height>240">Unesite vrednost izmedju 140 i 240.</label>
            <input id="height" class="calculator-input" type="number" v-model="height" placeholder="Visina (cm)">
            <label for="weight" class="msg-instruction" v-show="weight<40 || weight>240">Unesite vrednost izmedju 40 i 240.</label>
            <input id="weight" class="calculator-input" type="number" v-model="weight" placeholder="Tezina (kg)">
        </div>
        <div class="result">
            <p class="sum">{{bmrSum}}</p>
        </div>    
    </div>   
  </div>
</template>

<script>
export default {
    data:function(){
        return{
            gender:"",
            ages:null,
            height:null,
            weight:null
        }
    },
    computed:{
        bmrSum(){
            let bmrResult
            if(this.gender && this.ages && this.height && this.weight){
                if(this.ages>13 && this.ages<81){
                    if(this.height>139 && this.height<241){
                        if(this.weight>39 && this.weight<241){
                            if(this.gender==="man"){
                                bmrResult=66.47+(13.75*this.weight)+(5.003*this.height)-(6.755*this.ages)
                                return Math.round(bmrResult)+"Kcal"
                            }
                            if(this.gender==="woman"){
                                bmrResult=655.1+(9.563*this.weight)+(1.85*this.height)-(4.676*this.ages)
                                return Math.round(bmrResult)+"Kcal"
                            }
                        }
                    }
                }
            }
            return bmrResult
        }
    }
}
</script>

<style>
    .bmr-wrapper{
        text-align: left;
    }
    .bmr-result-wrapper{
        width: 80vw;
        min-height: 30vh;
        margin: 10px auto;
        display: flex;
        flex-direction: column;
    }
    .inputs-wrapper{
        display: flex;
        flex-direction: column;
        flex-basis: 50%;
        justify-content: space-between;
        min-height: 22vh;
    }
    .calculator-input{
        margin-bottom: 5px;
        font-size: 1rem;
        padding: 5px;

    }
    .result{
        display: flex;
        justify-content: center;
        align-items: center;
        flex-basis: 50%;
    }
    .sum{
        margin: 0;
        font-size: 3rem;
        font-weight: 600;
        box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
        background-color: #eee;
    }
    .msg-instruction{
        color: #c50000;
        font-size: 1rem;
    }
    @media screen and (min-width: 768px){
        .bmr-result-wrapper{
            flex-direction: row;
            min-height: fit-content;
        }
    }
    @media screen and (min-width: 1200px){
        .inputs-wrapper{
            flex-basis: 30%;
        }
        .bmr-result-wrapper{
            padding-left: 10px;
        }
    }
</style>