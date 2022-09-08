<template>
  <div class="statistic-wrapper window-position window-style">
    <div class="btn-exit-wrapper">
        <font-awesome-icon class="btn-exit" icon="fa-solid fa-circle-xmark" @click="closeOverallStatistic()"/>
    </div>
    <div class="tdee-per-day-wrapper">
        <canvas id="bar-chart" width="400" height="400"></canvas>
    </div>
    <div class="btn-list">
     <div class="btn-wrapper">   
    <transition name="btn">
        <button class="btn-change-chart" @click="getCalorieIncomePerDay" v-if="!calorieIncomeStatus">Unos</button>
    </transition>
    </div>
    <div class="btn-wrapper">
    <transition name="btn">
        <button class="btn-change-chart" @click="getTdeePerDay" v-if="!tdeeStatus">Tdee</button>
    </transition>
    </div>
    <div class="btn-wrapper">
    <transition name="btn">
        <button class="btn-change-chart" @click="getCalorieConsumptionPerDay" v-if="!calorieConsumptionStatus">Potrosnja</button>
    </transition>
    </div>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
    props:["user","plan"],
    data:function(){
        return{
            myChart:null,
            tdeeStatus:true,
            calorieIncomeStatus:false,
            calorieConsumptionStatus:false
        }
    },
    methods:{
        closeOverallStatistic(){
            this.$emit("closeOverallStatistic")
        },
        coefficientActivity(kcal){
            if(kcal<=350){
                return 1.2
            }
            if(kcal>350 && kcal<=650){
                return 1.375
            }
            if(kcal>650 && kcal<=950){
                return 1.55
            }
            if(kcal>950 && kcal<=1250){
                return 1.725
            }
            if(kcal>1250){
                return 1.9
            }
        },
        getTdeePerDay(){
            let tdeePerDay=[]
            for(let i=0;i<this.plan.length;i++){
                let kcalSum=0
                for(let j=0;j<this.plan[i].training.length;j++){
                    kcalSum+=this.plan[i].training[j].kcal
                }
                tdeePerDay.push(Math.round(this.coefficientActivity(kcalSum)*this.user.bmr))
            }
            this.destroyChart(this.myChart)
            this.makeAChart(tdeePerDay,'TDEE po danima','rgba(54, 162, 235, 0.2)','rgb(54, 162, 235)')
            this.tdeeStatus=true
            this.calorieIncomeStatus=false
            this.calorieConsumptionStatus=false
        },
        getCalorieIncomePerDay(){
            let calorieIncomePerDay=[]
            for(let i=0;i<this.plan.length;i++){
                let kcalSum=0
                for(let j=0;j<this.plan[i].dishs.length;j++){
                    kcalSum+=this.plan[i].dishs[j].kcal
                }
                calorieIncomePerDay.push(kcalSum)
            }
            this.destroyChart(this.myChart)
            this.makeAChart(calorieIncomePerDay,'Unos po danima','rgba(224, 163, 74, 0.2)','rgb(224,163,74)')
            this.tdeeStatus=false
            this.calorieConsumptionStatus=false
            this.calorieIncomeStatus=true
        },
        getCalorieConsumptionPerDay(){
            let calorieConsumptionPerDay=[]
            for(let i=0;i<this.plan.length;i++){
                let kcalSum=0
                for(let j=0;j<this.plan[i].training.length;j++){
                    kcalSum+=this.plan[i].training[j].kcal
                }
                calorieConsumptionPerDay.push(kcalSum)
            }
            this.destroyChart(this.myChart)
            this.makeAChart(calorieConsumptionPerDay,'Potrosnja po danima','rgba(116, 224, 63, 0.2)','rgb(116,224,63)')
            this.tdeeStatus=false
            this.calorieIncomeStatus=false
            this.calorieConsumptionStatus=true
        },
        makeAChart(array,label,color,border){
            const ctx = document.getElementById('bar-chart');
            const labels = ["Ponedeljak","Utorak","Sreda","Cetvrtak","Petak","Subota","Nedelja",];
            const data = {
                labels: labels,
                datasets: [{
                    label: label,
                    data: array,
                    backgroundColor: [
                    color,
                    color,
                    color,
                    color,
                    color,
                    color,
                    color
                    ],
                    borderColor: [
                    border,
                    border,
                    border,
                    border,
                    border,
                    border,
                    border
                    ],
                    borderWidth: 1
                }]
            }
            this.myChart = new Chart(ctx, {
                type:"bar",
                data:data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    },
                    animation:{
                        duration:100
                    }
                }
            })
        },
        destroyChart(chart){
            if(chart){
                chart.destroy()
            }
        }
    },
    mounted(){
        this.getTdeePerDay()
    }
}    
</script>

<style>
.tdee-per-day-wrapper{
    padding: 10px;
}
.btn-change-chart{
    margin-left: 5px;
    border: transparent;
    padding: 5px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    font-size: 1.3rem;
    cursor: pointer;
}
.btn-change-chart:hover{
    background-color: lightsteelblue;
}
.btn-list{
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: center;
    margin-bottom: 10px;
}
.btn-wrapper{
    flex-basis: 25%;
}
.btn-move,
.btn-enter-active,
.btn-leave-active{
    transition: all 0.5s ease;
}
.btn-enter-from{
    opacity: 0;
    transform: scale(0.6);
}
.btn-leave-to{
    opacity: 0;
    transform: scale(0.6);
}
.btn-enter-active,
.btn-leave-active {
  position: relative;
} 
</style>