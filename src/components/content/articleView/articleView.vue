<template>
  <div id="articleView">
    <div class="content" v-html="this.htmlString"></div>
  </div>
</template>

<script>
import store from "../../../store/index";
export default {
  name: "articleView",
  data() {
    return {
      htmlString: store.state.htmlString,
    };
  },
};
</script>

<style scoped>
@media only screen and (min-width: 1550px) and (max-width: 1921px) {
  .content {
    width: 55%;
    margin: 0 auto;
    margin-top: 50px;
    padding: 30px;
    background-color: white;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }
}
@media only screen and (min-width: 1000px) and (max-width: 1550px) {
  .content {
    width: 70%;
    margin: 0 auto;
    margin-top: 50px;
    padding: 25px;
    background-color: white;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }
}
@media screen and (max-width: 1000px) {
  .content {
    width: 100%;
    margin-top: 50px;
    padding: 20px;
    background-color: white;
    font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
      "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  }
}
</style>
