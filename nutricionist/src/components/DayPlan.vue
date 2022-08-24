<template>
    <div class="wrapper">
        <h2 class="title-h2">Ponedeljak</h2>
        <div class="tables-wrapper">
            <div class="meal-table">
                <table>
                    <tr><th colspan="2">OBROCI</th></tr>
                    <tr><th>Naziv</th><th>Kcal</th></tr>
                    <!--tr v-for listanje jela-->
                    <tr><th colspan="2">UKUPNO KCAL</th></tr>
                </table>
            </div>
            <div class="activity-table">
                <table>
                    <tr><th colspan="2">AKTIVNOSTI</th></tr>
                    <tr><th>Naziv</th><th>Kcal</th></tr>
                    <!--tr v-for listanje aktivnosti-->
                    <tr><th colspan="2">UKUPNO KCAL</th></tr>
                </table>
            </div>
        </div>
    </div>   
</template>

<script>
export default {
    data:function(){
        return{
            plan:{
                dishs:[],
                trainings:[]//nastavljam kad zavrsim novu stranu za renderovanje aktivnosti kao i namirnica i pravljenje treninga od tih aktivnosti
            }
        }
    }
}
</script>

<style>

</style>