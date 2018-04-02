<template>

  <div class="test-content">
    <!-- <div class="circle"></div> -->
    <div class="circle">
      <div class="sector-group">
        <div class="sector"></div>
        <div class="sector"></div>
        <div class="sector"></div>
        <div class="sector"></div>
        <div class="sector"></div>
        <div class="sector"></div>
        <div class="sector"></div>
        <div class="sector"></div>
        <div class="sector"></div>
        <div class="sector"></div>
        <div class="sector"></div>
        <div class="sector"></div>
      </div>
    </div>
    
    <div id="seconds" class="second">{{second}}</div>
    
  </div>

</template>

<script>
export default {
  data: () => ({
    second: 10
  }),
  created() {
    const self = this
    const timer = setInterval(function(){
      
      if(self.second > 0){
        self.second --
      } else {
        clearInterval(timer)
      }
    },1000)
  }
};
</script>
<style lang="stylus" scoped>
.test-content
  width 100vw
  height 100vh
  padding-left 300px
  padding-top 300px
  .circle
    width 300px
    height 300px
    border-radius 50%
    position relative
    overflow hidden
    mask radial-gradient(transparent 110px, #000 110px)
  .sector-group
    filter blur(15px)
    transform scale(1.2)
  .sector
    width 300px
    height 300px
    position absolute
    clip rect(0 300px 300px 150px)
    overflow hidden
  .sector::after
    content ''
    width 100%
    height 100%
    background currentColor
    position absolute
    clip rect(0 150px 300px 0)
    transform rotate(30deg)
    border-radius 50%
  .sector:nth-of-type(1)
    transform rotate(0)
    color #9ED110
  .sector:nth-of-type(2)
    transform rotate(30deg)
    color #50B517
  .sector:nth-of-type(3)
    transform rotate(60deg)
    color #179067
  .sector:nth-of-type(4)
    transform rotate(90deg)
    color #476EAF
  .sector:nth-of-type(5)
    transform rotate(120deg)
    color #9f49ac
  .sector:nth-of-type(6)
    transform rotate(150deg)
    color #CC42A2
  .sector:nth-of-type(7)
    transform rotate(180deg)
    color #FF3BA7
  .sector:nth-of-type(8)
    transform rotate(210deg)
    color #FF5800
  .sector:nth-of-type(9)
    transform rotate(240deg)
    color #FF8100
  .sector:nth-of-type(10)
    transform rotate(270deg)
    color #FEAC00
  .sector:nth-of-type(11)
    transform rotate(300deg)
    color #FFCC00
  .sector:nth-of-type(12)
    transform rotate(330deg)
    color #EDE604
  #seconds
    width 300px
    text-align center
    font-size 75px
    position absolute
    margin-top -195px
</style>
