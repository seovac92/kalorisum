<template>
  <div class="chart-wrapper">
    <canvas id="myChart" width="400" height="400"></canvas>
    <label class="msg-instruction" for="myChart">Tezinu unesite jednom u 15 dana, da biste dobili sto tacnije podatke.</label>
  </div>
</template>

<script>
import checkSession from '../JS/checkSession.js'
import axios from 'axios'
import Chart from 'chart.js/auto'

export default {
    methods:{
        async getUserWeights(){
            let userDetail=await checkSession()
            if(userDetail){
                try {
                    let userWeights=await axios.post("http://732u122.e2.mars-hosting.com/nutricionist/api/user/weights",{
                    "usr_id":userDetail.data.res.id
                })
                this.makeAChart(this.extractArray(userWeights.data.date,"number"),this.extractArray(userWeights.data.weights,"number"))
                } catch (error) {
                    console.log(error)
                }
            }
        },
        extractArray(oldArray,key){
            let array=[]
            for(let i=0;i<oldArray.length;i++){
                array.push(oldArray[i][key])
            }
            return array
        },
        makeAChart(date,weight){
            const ctx = document.getElementById('myChart');
            const labels = date;
            const data = {
                labels: labels,
                datasets: [{
                label: 'Tezina',
                data: weight,
                fill: true,
                borderColor: 'lightsteelblue',
                tension: 0.4
                }]
            };
            const myChart = new Chart(ctx, {
                type:"line",
                data:data
            });
            myChart
        }
    },
    mounted(){
        this.getUserWeights()
    }
}    
</script>

<style>
.chart-wrapper{
    width: 90%;
}
@media screen and (min-width:768px){
    .chart-wrapper{
        width: 60%;
    }
}
</style>