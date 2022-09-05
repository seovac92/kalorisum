<template>
    <div class="plan-wrapper">
        <slot class="title-day"></slot>
        <div class="table-mathematic-wrapper" v-if="plan.dishs.length>0 || plan.training.length>0">
            <div class="tables-wrapper">
                <div class="meal-table" v-if="plan.dishs.length>0">
                    <table>
                        <tr><th class="title column-2" colspan="3">OBROCI</th></tr>
                        <tr class="row" v-for="dish in plan.dishs" :key="dish.id">
                            <td class="column-1" @click="getDishDetails(dish)" :key="dish.id">{{dish.name}}</td>
                            <td class="column-2" :key="dish.id">{{dish.kcal}}kcal</td>
                            <td :key="dish.id"><font-awesome-icon class="remove-icon" icon="fa-solid fa-trash" @click="sendDish(plan.day_id,dish)"/></td>
                        </tr>
                    </table>    
                </div>
                <div class="activity-table" v-if="plan.training.length>0">
                    <table>
                        <tr><th class="title column-2" colspan="3">AKTIVNOSTI</th></tr>
                        <tr class="row" v-for="activity in plan.training" :key="activity.id">
                            <td class="column-1" @click="getTrainingDetails(activity)">{{activity.name}}</td>
                            <td class="column-2">{{activity.kcal}}kcal</td>
                            <td><font-awesome-icon class="remove-icon" icon="fa-solid fa-trash" @click="sendActivity(plan.day_id,activity)"/></td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="mathematic" v-if="plan.dishs.length>0 || plan.training.length>0">
                <p>Obroci: {{sumDishs}}Kcal</p>
                <p>-TDEE: {{tdee}}Kcal</p>
                <p>-Aktivnosti: {{sumTraining}}Kcal</p>
                <p class="sum-kcal">Dnevni bilans: <span :class="[sumDay<=0 ?'deficit':'suficit']">{{sumDay}}kcal</span></p>
            </div> 
        </div>
        <div class="empty-day" v-else>
            <p>Dodajte jelo ili trening</p>    
        </div>    
    </div>   
</template>

<script>


export default {
    props:["plan","user"],
    methods:{
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
        sendDish(id,dish){
            dish.day_id=id
            dish.type="dishs"
            this.$emit("deleteDish",dish)
        },
        sendActivity(id,activity){
            activity.day_id=id
            activity.type="training"
            this.$emit("deleteActivity",activity)
        },
        getDishDetails(dish){
            this.$emit("getDishDetails",dish)
        },
        getTrainingDetails(training){
            this.$emit("getTrainingDetails",training)
        }
    },
    computed:{
        tdee(){
            let sumKcal=0
            for(let i=0;i<this.plan.training.length;i++){
                sumKcal+=this.plan.training[i].kcal
            }
            return Math.round(this.user.bmr*this.coefficientActivity(sumKcal))
        },
        sumDishs(){
            let sumKcal=0
            for(let i=0;i<this.plan.dishs.length;i++){
                sumKcal+=this.plan.dishs[i].kcal
            }
            
            return sumKcal
        },
        sumTraining(){
            let sumKcal=0
            for(let i=0;i<this.plan.training.length;i++){
                sumKcal+=this.plan.training[i].kcal
            }
            return sumKcal
        },
        sumDay(){
            return Math.round(this.sumDishs-this.tdee-this.sumTraining)
        }
    },
    watch:{
        plan(newPlan){
            console.log(newPlan.dishs)
        }
    }
}
</script>

<style>
.plan-wrapper{
    font-family: 'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
    display: flex;
    justify-content: space-between;
    width: 93%;
    min-height: 20vh;
    margin: 0 auto;
    padding: 20px 10px;
    box-shadow: 0 2px 4px rgb(0 0 0 / 10%), 0 8px 16px rgb(0 0 0 / 10%);
    border-radius: 0 0 10px 10px;
}
.table-mathematic-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    flex-basis: 100%;
}
.empty-day{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-basis: 100%;
    font-size: 2rem;
}
.tables-wrapper{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.meal-table,
.activity-table{
    margin-bottom: 30px;
    border-collapse: collapse;
}
.title{
    border-bottom: 1px solid black;
    font-style: italic;
}
.row{
    transition: 0.3s all ease;
}
.row:hover{
    background-color: #ddd;
}
.row:hover .remove-icon{
    color: #c50000;
}
.mathematic{
    width: fit-content;
    padding: 5px;
    font-size: 1.2rem;
}
.mathematic p{
    margin: 0 0 5px;
}
.sum-kcal{
    border-top: 1px solid black;
}
.deficit{
    color: green;
}
.suficit{
    color: red;
}
@media screen and (min-width: 768px) {
    .tables-wrapper{
        flex-direction: row;
    }
}
@media screen and (min-width: 1200px) {
    .plan-wrapper{
        width: 70%;
    }
}
</style>