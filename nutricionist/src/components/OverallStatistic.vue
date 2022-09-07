<template>
  <div class="statistic-wrapper window-position window-style">
    <div class="btn-exit-wrapper">
        <font-awesome-icon class="btn-exit" icon="fa-solid fa-circle-xmark" @click="closeOverallStatistic()"/>
    </div>
    <div class="tdee-per-day-wrapper">
        <canvas id="tdee-chart" width="400" height="400"></canvas>
    </div>
  </div>
</template>

<script>
import Chart from 'chart.js/auto'

export default {
    props:["user","plan"],
    data:function(){
        return{
            tdeePerDay:[]
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
        getSumKcalPerDay(){
            let tdeePerDay=[]
            for(let i=0;i<this.plan.length;i++){
                let kcalSum=0
                for(let j=0;j<this.plan[i].training.length;j++){
                    kcalSum+=this.plan[i].training[j].kcal
                }
                tdeePerDay.push(Math.round(this.coefficientActivity(kcalSum)*this.user.bmr))
            }
            this.makeAChart(tdeePerDay)
        },
        makeAChart(tdee){
            const ctx = document.getElementById('tdee-chart');
            const labels = ["Ponedeljak","Utorak","Sreda","Cetvrtak","Petak","Subota","Nedelja",];
            const data = {
                labels: labels,
                datasets: [{
                    label: 'Ukupne kalorijske potrebe(TDEE) po danima',
                    data: tdee,
                    backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(255, 205, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                    ],
                    borderColor: [
                    'rgb(255, 99, 132)',
                    'rgb(255, 159, 64)',
                    'rgb(255, 205, 86)',
                    'rgb(75, 192, 192)',
                    'rgb(54, 162, 235)',
                    'rgb(153, 102, 255)',
                    'rgb(201, 203, 207)'
                    ],
                    borderWidth: 1
                }]
            }
            const myChart = new Chart(ctx, {
                type:"bar",
                data:data,
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
            myChart
        }
    },
    mounted(){
        this.getSumKcalPerDay()
    }
}    
</script>

<style>
.tdee-per-day-wrapper{
    padding: 10px;
}
</style>