<template>
  <div class="statistic-wrapper window-position window-style">
    <div class="btn-exit-wrapper">
        <font-awesome-icon class="btn-exit" icon="fa-solid fa-circle-xmark" @click="closeOverallStatistic()"/>
    </div>
    <div class="bar-chart" v-if="!totalStatus">
        <transition name="btn">
            <button class="btn-on btn-chart" @click="makePieChart()">Nedeljni pregled</button>
        </transition>
        <Bar :chart-options="barChart.chartOptions"
        :chart-data="barChart.chartData"
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
                    <button :class="[calorieIncomeStatus?'btn-on':'btn-off','btn-chart']" @click="calorieIncomePerDayChart">Obroci</button>
                </transition>
            </div>
            <div class="btn-wrapper">
                <transition name="btn">
                    <button :class="[tdeeStatus?'btn-on':'btn-off','btn-chart']" @click="tdeePerDayChart">Tdee</button>
                </transition>
            </div>
            <div class="btn-wrapper">
                <transition name="btn">
                    <button :class="[calorieConsumptionStatus?'btn-on':'btn-off','btn-chart']" @click="calorieConsumptionPerDayChart">Aktivnosti</button>
                </transition>
            </div>
        </div>
    </div>
    <div class="pie-chart" v-if="totalStatus">
        <div class="btn-wrapper">
            <transition name="btn">
                <button class="btn-on btn-chart" @click="makeBarChart()">Dnevni pregled</button>
            </transition>
        </div>
        <Pie :chart-options="pieChart.chartOptions"
        :chart-data="pieChart.chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"></Pie>
        
    </div>
    <div class="bilans-wrapper">
        <p class="title-h2">Sedmicni bilans: <span :class="[weekTotalKcal>=0?'suficit':'deficit']">{{weekTotalKcal}}g</span></p>
        <p class="title">Vasa tezina je <span v-show="weekTotalKcal>0" class="suficit">u porastu.</span><span v-show="weekTotalKcal<0" class="deficit">u padu.</span><span v-show="weekTotalKcal===0" class="neutral">nepromenjena.</span></p>
    </div>  
  </div>
</template>
<script>
import { Bar } from 'vue-chartjs'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)

export default {//
    components:{ Bar,Pie },
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
            tdeeStatus:false,
            calorieIncomeStatus:false,
            calorieConsumptionStatus:false,
            barChart:{
                chartData: {
                    labels: [ 'Ponedeljak', 'Utorak', 'Sreda', 'Cetvrtak', 'Petak', 'Subota', 'Nedelja' ],
                    datasets: []
                },
                chartOptions: {
                    responsive: true
                }
            },
            pieChart:{
                chartData: {
                    labels: ['TDEE','Uneto','Potroseno'],
                    datasets: [{
                        data: [],
                        backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(224, 163, 74, 0.2)',
                        'rgba(116, 224, 63, 0.2)'
                        ],
                        hoverOffset: 2
                    }]
                },
                chartOptions: {
                    responsive: true
                }
            },
            totalStatus:true
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
        tdeePerDayChart(){
            if(!this.tdeeStatus){
                this.setSingleDataToChartData(this.tdeePerDay,'TDEE','rgba(54, 162, 235, 0.2)','rgb(54, 162, 235)',"tdee")
                this.tdeeStatus=true
                return
            }
            this.removeSingleDataFromChartData("tdee")
            this.tdeeStatus=false
        },
        calorieIncomePerDayChart(){
            if(!this.calorieIncomeStatus){
                this.setSingleDataToChartData(this.calorieIncomePerDay,'Obroci','rgba(224, 163, 74, 0.2)','rgb(224,163,74)',"income")
                this.calorieIncomeStatus=true
                return
            }
            this.removeSingleDataFromChartData("income")
            this.calorieIncomeStatus=false
        },
        calorieConsumptionPerDayChart(){
            if(!this.calorieConsumptionStatus){
                this.setSingleDataToChartData(this.calorieConsumptionPerDay,'Aktivnost','rgba(116, 224, 63, 0.2)','rgb(116,224,63)',"consuption")
                this.calorieConsumptionStatus=true
                return
            }
            this.removeSingleDataFromChartData("consuption")
            this.calorieConsumptionStatus=false
        },

        setSingleDataToChartData(data,label,backgroundColor,borderColor,name){
            let datasetObj={}
            datasetObj.data=data
            datasetObj.label=label
            datasetObj.backgroundColor=backgroundColor
            datasetObj.borderColor=borderColor
            datasetObj.borderWidth=1
            datasetObj.name=name
            this.barChart.chartData.datasets.push(datasetObj)
        },
        removeSingleDataFromChartData(name){
            for(let i=0;i<this.barChart.chartData.datasets.length;i++){
                if(this.barChart.chartData.datasets[i].name===name){
                    this.barChart.chartData.datasets.splice(i,1)
                    return
                }
            }
        },
        sumTotalkcal(array){
            let totalKcal=0
            for(let i=0;i<array.length;i++){
                totalKcal+=array[i]
            }
            return totalKcal
        },
        setPieData(value1,value2,value3){
            let array=[]
            array.push(value1)
            array.push(value2)
            array.push(value3)
            this.pieChart.chartData.datasets[0].data=array
        },
        makeBarChart(){
            if(this.totalStatus){
                this.totalStatus=false
            }
        },
        makePieChart(){
            if(!this.totalStatus){
                this.totalStatus=true
            }
        }
    },
    mounted(){
        this.tdeePerDayChart()
        this.setPieData(this.tdeeTotal,this.incomeTotal,this.consumptionTotal)
    },
    computed:{
        tdeePerDay(){
            let tdeePerDay=[]
            for(let i=0;i<this.plan.length;i++){
                let kcalSum=0
                for(let j=0;j<this.plan[i].training.length;j++){
                    kcalSum+=this.plan[i].training[j].kcal
                }
                tdeePerDay.push(Math.round(this.coefficientActivity(kcalSum)*this.user.bmr))
            }
            return tdeePerDay
        },
        calorieIncomePerDay(){
            let calorieIncomePerDay=[]
            for(let i=0;i<this.plan.length;i++){
                let kcalSum=0
                for(let j=0;j<this.plan[i].dishs.length;j++){
                    kcalSum+=this.plan[i].dishs[j].kcal
                }
                calorieIncomePerDay.push(kcalSum)
            }
            return calorieIncomePerDay
        },
        calorieConsumptionPerDay(){
            let calorieConsumptionPerDay=[]
            for(let i=0;i<this.plan.length;i++){
                let kcalSum=0
                for(let j=0;j<this.plan[i].training.length;j++){
                    kcalSum+=this.plan[i].training[j].kcal
                }
                calorieConsumptionPerDay.push(kcalSum)
            }
            return calorieConsumptionPerDay
        },
        tdeeTotal(){
            return this.sumTotalkcal(this.tdeePerDay)
        },
        incomeTotal(){
            return this.sumTotalkcal(this.calorieIncomePerDay)
        },
        consumptionTotal(){
            return this.sumTotalkcal(this.calorieConsumptionPerDay)
        },
        weekTotalKcal(){
            return Math.round((this.incomeTotal-(this.tdeeTotal+this.consumptionTotal))/7.7)
        }
    }
}    
</script>

<style>
.bar-chart{
    padding: 0 10px;
}
.tdee-per-day-wrapper{
    padding: 10px;
}
.btn-chart{
    margin-left: 5px;
    border: transparent;
    padding: 5px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    font-size: 1.3rem;
    cursor: pointer;
    opacity: 0.8;
    transition: 0.3s all ease;
}
.btn-chart:hover{
    opacity: 1;
}
.btn-disabled-chart{
    margin-left: 5px;
    border: transparent;
    padding: 5px;
    border-radius: 10px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    font-size: 1.3rem;
    cursor: pointer;
}
.btn-enabled-chart{
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
    flex-basis: 30%;
    min-height: 35px;
}
.bilans-wrapper{
    margin: 20px 0 0;
}
.bilans-wrapper .title{
    font-size: 1.3rem;
    font-weight: 600;
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