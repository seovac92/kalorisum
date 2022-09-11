<template>
  <div class="item-details-wrapper window-position window-style">
      <div class="btn-exit-wrapper">
        <font-awesome-icon class="btn-exit" icon="fa-solid fa-circle-xmark" @click="closeDetailsWindow()"/>
      </div>
      <table class="item-details" v-if="dishDetails">
        <tr class="row-1"><th class="column-1" colspan="2"><div class="first-row"><div class="first-row-name">{{dishDetails.name}}</div><div class="remove-icon-wrapper"><font-awesome-icon class="remove-icon" icon="fa-solid fa-trash" @click="deleteDish(dishDetails)"/></div></div></th></tr>
        <tr class="row">
          <th class="column-2">
            Sastojak
          </th>
          <th class="column-2">
            Kolicina
          </th>
        </tr>
        <tr class="row" v-for="nutrition in dishDetails.details" :key="nutrition.ntr_id">
          <td class="column-2">{{nutrition.ntr_name}}</td>
          <td class="column-2">{{nutrition.ntr_quantity}}g</td>
        </tr>
      </table>
      <table class="item-details" v-if="trainingDetails">
        <tr class="row-1"><th class="column-1" colspan="2"><div class="first-row"><div class="first-row-name">{{trainingDetails.name}}</div><div class="remove-icon-wrapper"><font-awesome-icon class="remove-icon" icon="fa-solid fa-trash" @click="deleteTraining(trainingDetails)"/></div></div></th></tr>
        <tr class="row">
          <th class="column-2">
            Aktivnost
          </th>
          <th class="column-2">
            Vreme
          </th>
        </tr>
        <tr class="row" v-for="activity in trainingDetails.details" :key="activity.act_id">
          <td class="column-2">{{activity.act_name}}</td>
          <td class="column-2">{{activity.tra_time}}min</td>
        </tr>
      </table>
    </div>
</template>

<script>
export default {
    props:["dishDetails","trainingDetails"],
    methods:{
        closeDetailsWindow(){
            this.$emit("closeDetailsWindow")
        },
        deleteDish(dish){
          dish.type="dishs"
          this.$emit("removeUserDish",dish)
        },
        deleteTraining(training){
          training.type="training"
          this.$emit("removeUserTraining",training)
        }
    }
}
</script>

<style>
.item-details-wrapper{
    display: flex;
    flex-direction: column;
    align-items: center;
}
.item-details{
  border-collapse: collapse;
}
.first-row{
  display: flex;
  justify-content: center;
}
.first-row-name{
  margin-right: 5px;
}
.remove-icon-wrapper:hover{
  color: #c50000;
}
</style>