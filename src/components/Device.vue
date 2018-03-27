<template>
  <div class="device-wrapper">
    <q-list>
      <div class="row justify-between" style="padding:0 20px;">
        <h5>设备信息</h5>
        <q-btn color="primary" v-if="edit" @click="edit = false">编辑</q-btn>
        <q-btn color="positive" v-else-if="!edit" @click="edit = true">完成</q-btn>
      </div>
      <q-item-separator />
      <div class="row">
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备名称：
            </div>
            <div class="right">
              <q-input class="input1" v-model="input" :disabled="edit" color="white" inverted />
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              SIM ID：
            </div>
            <div class="right">
              <div class="input1 row items-center">1234567</div>
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备ID：
            </div>
            <div class="right">
              <div class="input1 row items-center">1234567</div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备状态：
            </div>
            <div class="right">
              <q-radio v-model="radio" val="0" color="red" label="关闭" />
              <q-radio v-model="radio" val="1" color="secondary" label="开启" style="margin-left: 10px" />
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备位置：
            </div>
            <div class="right">
              <div class="input1 row items-center">1234567</div>
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              运行时长：
            </div>
            <div class="right">
              <div class="input1 row items-center">1234567</div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备备注：
            </div>
            <div class="right">
              <q-input class="input1" v-model="input" :disabled="edit" color="white" inverted />
            </div>
          </div>
        </div>
      </q-list>

      <q-list>
        <div class="row justify-between" style="padding:0 20px;">
          <h5>设备数据</h5>
          <h6>10:00 更新</h6>
        </div>
        <q-item-separator />
          <div class="row justify-around">
            <div class="col-xs-12 col-sm-4 col-md-1 col-lg-2">
              <q-card>
                <q-card-title>PM2.5</q-card-title>
                <q-card-main class="text-center">
                  123
                </q-card-main>
              </q-card>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-1 col-lg-2">
              <q-card>
                <q-card-title>PM2.5</q-card-title>
                <q-card-main class="text-center">
                  123
                </q-card-main>
              </q-card>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-2 col-lg-2">
              <q-card>
                <q-card-title>PM2.5</q-card-title>
                <q-card-main class="text-center">
                  123
                </q-card-main>
              </q-card>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-2 col-lg-2">
              <q-card>
                <q-card-title>PM2.5</q-card-title>
                <q-card-main class="text-center">
                  123
                </q-card-main>
              </q-card>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-2 col-lg-2">
              <q-card>
                <q-card-title>PM2.5</q-card-title>
                <q-card-main class="text-center">
                  123
                </q-card-main>
              </q-card>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-2 col-lg-1">
              <q-card>
                <q-card-title>PM2.5</q-card-title>
                <q-card-main class="text-center">
                  123
                </q-card-main>
              </q-card>
            </div>
            <div class="col-xs-12 col-sm-4 col-md-2 col-lg-1">
              <q-card>
                <q-card-title>PM2.5</q-card-title>
                <q-card-main class="text-center">
                  123
                </q-card-main>
              </q-card>
            </div>
          </div>
        </q-list>

      <q-list>
        <q-list-header>
          <h5>设备常用设置</h5>
        </q-list-header>
        <q-item-separator />
          <div class="row">
            <div class="col-xs-12 col-sm-4 col-md-4">
              
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4">
              
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4">
              
            </div>
          </div>
        </q-list>

      <q-list>
        <q-list-header>
          <h5>历史记录</h5>
        </q-list-header>
        <q-item-separator />
          <div class="row">
            <div class="col-xs-12 col-sm-4 col-md-4">
              
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4">
              
            </div>
            <div class="col-xs-12 col-sm-4 col-md-4">
              
            </div>
          </div>
        </q-list>
  </div>
</template>

<script>
export default {
  name: "devicePanel",
  data: () => ({
    edit: false,
    input: "hahaha",
    options: [
      {
        label: "Google",
        value: "goog"
      },
      {
        label: "Facebook",
        value: "fb"
      },
      {
        label: "Twitter",
        value: "twtr"
      },
      {
        label: "Apple Inc.",
        value: "appl"
      },
      {
        label: "Oracle",
        value: "ora"
      }
    ],
    select1: null,
    radio: 1
  })
};
</script>

<style lang="stylus">
.device-wrapper
  .row
    margin 5px 0
  .q-input-target
    color black
  .left
    width 30%
    text-align right
    font-size 1rem
  .right
    width 70%
    text-align left
    .input1
      width 87%
      height 40px
      font-size 18px
    .input2
      width 40%
      height 40px
</style>

