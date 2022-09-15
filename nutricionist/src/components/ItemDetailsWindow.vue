<template>
  <div class="item-details-wrapper window-position window-style">
      <div class="btn-exit-wrapper">
        <font-awesome-icon class="btn-exit" icon="fa-solid fa-circle-xmark" @click="closeDetailsWindow()"/>
      </div>
      <div class="item-details" v-if="dishDetails">
        <div class="first-row title-h2">
          <div class="first-row-name">{{dishDetails.name}}</div><div class="remove-icon-wrapper"><font-awesome-icon class="remove-icon" icon="fa-solid fa-trash" @click="deleteDish(dishDetails)"/></div>
        </div>
        <div class="row-details">
          <p class="title">Sastojak</p>
          <p class="title">Kolicina</p>
        </div>
        <div class="row-details" v-for="nutrition in dishDetails.details" :key="nutrition.ntr_id">
          <p>{{nutrition.ntr_name}}</p>
          <p>{{nutrition.ntr_quantity}}g</p>
        </div>
      </div>
      <div class="item-details" v-if="trainingDetails">
        <div class="first-row title-h2">
          <div class="first-row-name">{{trainingDetails.name}}</div><div class="remove-icon-wrapper"><font-awesome-icon class="remove-icon" icon="fa-solid fa-trash" @click="deleteTraining(trainingDetails)"/></div>
        </div>
        <div class="row-details">
          <p class="title">Aktivnost</p>
          <p class="title">Vreme</p>
        </div>
        <div class="row-details" v-for="activity in trainingDetails.details" :key="activity.act_id">
          <p>{{activity.act_name}}</p>
          <p>{{activity.tra_time}}min</p>
        </div>
      </div>
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
  width: 80vw;
  left: 10vw;
}
.item-details{
  width: 100%;
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
.row-details{
  display: flex;
  justify-content: space-between;
  font-size: 1.2rem;
  font-weight: 600;
  border-top: 1px solid #ddd;
  padding: 0 10px;
}
.row-details p{
  margin: 20px 0;
}
</style>