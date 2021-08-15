<template>
  <div id="time-line">
    <TimeLineItem />
  </div>
</template>

<script>
import TimeLineItem from "./TimeLineItem";

export default {
  name: "TimeLine",
  components: {
    TimeLineItem,
  },
};
</script>

<style scoped>
.timeline-page {
  margin-top: 30px;
  text-align: center;
}
</style>