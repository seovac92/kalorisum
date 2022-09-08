<template>
  <div class="statistic-wrapper window-position window-style">
    <div class="btn-exit-wrapper">
        <font-awesome-icon class="btn-exit" icon="fa-solid fa-circle-xmark" @click="closeOverallStatistic()"/>
    </div>
    <Bar :chart-options="chartOptions"
    :chart-data="chartData"
    :chart-id="chartId"
    :dataset-id-key="datasetIdKey"
    :plugins="plugins"
    :css-classes="cssClasses"
    :styles="styles"
    :width="width"
    :height="height"></Bar>
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
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {
    components:{ Bar },
    props: {
        user:{
            type: Object
        },
        plan:{
            type: Array
        },
        chartId: {
        type: String,
        default: 'bar-chart'
        },
        datasetIdKey: {
        type: String,
        default: 'label'
        },
        width: {
        type: Number,
        default: 400
        },
        height: {
        type: Number,
        default: 400
        },
        cssClasses: {
        default: '',
        type: String
        },
        styles: {
        type: Object,
        default: () => {}
        },
        plugins: {
        type: Object,
        default: () => {}
        }
    },
    data:function(){
        return{
            tdeeStatus:true,
            calorieIncomeStatus:false,
            calorieConsumptionStatus:false,
            chartData: {
                labels: [ 'Ponedeljak', 'Utorak', 'Sreda', 'Cetvrtak', 'Petak', 'Subota', 'Nedelja' ],
                datasets: [ { 
                    data: [],
                    label:"",
                    backgroundColor:"",
                    borderColor:"",
                    borderWidth: 1
                    } ]
            },
            chartOptions: {
                responsive: true
            }
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
            this.chartData.datasets[0].data=tdeePerDay
            this.chartData.datasets[0].label='TDEE po danima'
            this.chartData.datasets[0].backgroundColor='rgba(54, 162, 235, 0.2)'
            this.chartData.datasets[0].borderColor='rgb(54, 162, 235)'
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
            this.chartData.datasets[0].data=calorieIncomePerDay
            this.chartData.datasets[0].label='Unos po danima'
            this.chartData.datasets[0].backgroundColor='rgba(224, 163, 74, 0.2)'
            this.chartData.datasets[0].borderColor='rgb(224,163,74)'
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
            this.chartData.datasets[0].data=calorieConsumptionPerDay
            this.chartData.datasets[0].label='Potrosnja po danima'
            this.chartData.datasets[0].backgroundColor='rgba(116, 224, 63, 0.2)'
            this.chartData.datasets[0].borderColor='rgb(116,224,63)'
            this.tdeeStatus=false
            this.calorieIncomeStatus=false
            this.calorieConsumptionStatus=true
        },
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
.btn-enter-active{
    transition: all 0.5s ease;
}
.btn-move,
.btn-leave-active{
    transition: all 0.2s ease;
}
.btn-leave-to,
.btn-enter-from{
    opacity: 0;
    transform: scale(0.6);
}
.btn-enter-active,
.btn-leave-active {
  position: relative;
} 
</style>