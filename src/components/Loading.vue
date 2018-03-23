<template>
  <div>
    <q-transition appear v-ripple enter="fadeIn" leave="fadeOut" duration="500">
      <q-scroll-area class="bkg" color="green">
      </q-scroll-area>
    </q-transition>
  </div>
</template>

<script>
// import "quasar-extras/animate";
export default {
  methods: {},
  beforeCreate() {
    console.log("Loading before create");
    this.$http
      .get("/user")
      .then(r => {
        console.log("Auto login successed.");
        this.$router.replace("/main/map");
      })
      .catch(e => {
        this.$router.replace("/login");
      });
  }
};
</script>

<style lang="stylus" scoped>
@import '~variables';

.bkg {
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: $blue-3;
}
</style>
