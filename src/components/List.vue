<template>
  <div class="layout-padding list">
    <div class="title row justify-between">
      <div>
        <q-icon name="fa-home" size="25px" color="blue" />&nbsp;当前位置:
        <q-btn flat @click="status = 0">设备列表</q-btn>
        <span v-show="status === 1">> <q-btn flat>设备详情</q-btn></span>
      </div>
      <div v-show="status === 1">
        <q-btn color="primary" @click="status = 0">返回</q-btn>
      </div>
    </div>

    <div class="row items-center justify-end" style="margin-bottom:30px;">
      <div class="col-xs-12 col-sm-6 col-md-3 offset-lg-4 offset-md-4 offset-sm-3">
        <q-search v-model="text"  placeholder="设备名称或ID" style="margin-right:20px;">
          <q-autocomplete @search="searchDevice" :max-results='99' :debounce='800' />
        </q-search>
      </div>
      <div>
        <q-btn color="primary" @click="$refs.searchModal.open()">高级搜索</q-btn>
      </div>
    </div>

    <q-data-table id="deviceTable" :data="tableData" :config="config" :columns="columns">
      <template slot="col-operateId" slot-scope="cell">
        <q-btn flat color="primary">详情</q-btn> |
        <q-btn flat color="primary">编辑</q-btn>
        <!-- <div v-if="cell.data === 'Audit'" class="my-label">
          <q-btn flat outline small @click="audit1(cell.data)">Audit</q-btn>
        </div>
        <div v-else class="my-label text-white bg-negative" @click="audit2(cell.data)">{{cell.data}}</div> -->
      </template>
    </q-data-table>

    <q-modal id="searchModal" ref="searchModal" :content-css="{minWidth: '90vw', minHeight: '50vh',padding: '20px'}">
      <div class="row">
        <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
          <div class="left">
            设备名称：
          </div>
          <div class="right">
            <q-input class="input1" v-model="text" color="white" inverted />
          </div>
        </div>
        <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
          <div class="left">
            设备位置：
          </div>
          <div class="right distpicker">
            <v-distpicker :placeholders="placeholders"></v-distpicker>
          </div>
        </div>
        <div class="item col-xs-12 col-sm-6 col-md-4 row items-center">
          <div class="left">
            PM10：
          </div>
          <div class="right row inline">
            <q-input class="input2" v-model="text" color="white" inverted />
            <p style="padding-top: 22px;">&nbsp;——&nbsp;</p>
            <q-input class="input2" v-model="text" color="white" inverted />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="item col-xs-12 col-sm-6 col-md-4 row items-center">
          <div class="left">
            PM2.5：
          </div>
          <div class="right row inline">
            <q-input class="input2" v-model="text" color="white" inverted />
            <p style="padding-top: 22px;">&nbsp;——&nbsp;</p>
            <q-input class="input2" v-model="text" color="white" inverted />
          </div>
        </div>
        <div class="item col-xs-12 col-sm-6 col-md-4 row items-center">
          <div class="left">
            噪音：
          </div>
          <div class="right row inline">
            <q-input class="input2" v-model="text" color="white" inverted />
            <p style="padding-top: 22px;">&nbsp;——&nbsp;</p>
            <q-input class="input2" v-model="text" color="white" inverted />
          </div>
        </div>
        <div class="item col-xs-12 col-sm-6 col-md-4 row items-center">
          <div class="left">
            湿度：
          </div>
          <div class="right row inline">
            <q-input class="input2" v-model="text" color="white" inverted />
            <p style="padding-top: 22px;">&nbsp;——&nbsp;</p>
            <q-input class="input2" v-model="text" color="white" inverted />
          </div>
        </div>
      </div>

      <div class="row">
        <div class="item col-xs-12 col-sm-6 col-md-4 row items-center">
          <div class="left">
            温度：
          </div>
          <div class="right row inline">
            <q-input class="input2" v-model="text" color="white" inverted />
            <p style="padding-top: 22px;">&nbsp;——&nbsp;</p>
            <q-input class="input2" v-model="text" color="white" inverted />
          </div>
        </div>
        <div class="item col-xs-12 col-sm-6 col-md-4 row items-center">
          <div class="left">
            风速：
          </div>
          <div class="right">
            <q-input class="input1" v-model="text" color="white" inverted />
          </div>
        </div>
        <div class="item col-xs-12 col-sm-6 col-md-4 row items-center">
          <div class="left">
            风向：
          </div>
          <div class="right row inline">
            <q-select v-model="select1" :options="options" />
          </div>
        </div>
      </div>
      <div class="row justify-center">
        <div class="row justify-around" style="width:500px;">
          <q-btn color="primary" style="width:200px;">查询</q-btn>
          <q-btn color="white" class="text-black" style="width:200px;">重置</q-btn>
        </div>
      </div>
    </q-modal>
  </div>
</template>

<script>
import table from "statics/data.json";
import VDistpicker from "./Distpicker";
import { deviceService } from "api/index";
export default {
  components: {
    VDistpicker
  },
  watch: {
    pagination(value) {
      if (!value) {
        this.oldPagination = clone(this.config.pagination);
        this.config.pagination = false;
        return;
      }
      this.config.pagination = this.oldPagination;
    },
    rowHeight(value) {
      this.config.rowHeight = value + "px";
    },
    bodyHeight(value) {
      let style = {};
      if (this.bodyHeightProp !== "auto") {
        style[this.bodyHeightProp] = value + "px";
      }
      this.config.bodyStyle = style;
    },
    bodyHeightProp(value) {
      let style = {};
      if (value !== "auto") {
        style[value] = this.bodyHeight + "px";
      }
      this.config.bodyStyle = style;
    }
  },
  data: () => ({
    status: 0,
    text: null,
    deviceIdList: [],
    dataList: [],
    tableData: [],
    table,
    config: {
      title: "设备列表",
      refresh: false,
      noHeader: false,
      columnPicker: false,
      leftStickyColumns: 0,
      rightStickyColumns: 0,
      bodyStyle: {
        maxHeight: "800px"
      },
      rowHeight: "60px",
      responsive: true,
      pagination: {
        rowsPerPage: 15,
        options: [10, 15, 30, 50, 100]
      }
    },
    columns: [
      {
        label: "序号",
        field: "index",
        width: "50px",
        sort: true,
        type: "number",
        style: { textAlign: "center" }
      },
      {
        label: "设备名称",
        field: "name",
        width: "130px",
        sort: true,
        type: "string"
        // style: {textAlign: 'center'}
      },
      {
        label: "设备ID",
        field: "id",
        width: "130px",
        sort: true,
        type: "string"
        // style: {textAlign: 'center'}
      },
      {
        label: "设备位置",
        field: "address",
        width: "180px",
        sort: true
        // style: {textAlign: 'center'}
      },
      {
        label: "PM2.5",
        field: "pm2d5",
        type: "number",
        sort: true,
        width: "80px"
        // style: {textAlign: 'center'}
      },
      {
        label: "PM10",
        field: "pm10",
        sort: true,
        type: "number",
        width: "80px"
        // style: {textAlign: 'center'}
      },
      {
        label: "噪音",
        field: "db",
        sort: true,
        type: "number",
        width: "80px"
        // style: {textAlign: 'center'}
      },
      {
        label: "温度",
        field: "temp",
        sort: true,
        type: "number",
        width: "80px"
        // style: {textAlign: 'center'}
      },
      {
        label: "湿度",
        field: "hum",
        sort: true,
        type: "number",
        width: "80px"
        // style: {textAlign: 'center'}
      },
      {
        label: "风速",
        field: "windSpeed",
        sort: true,
        type: "number",
        width: "80px"
        // style: {textAlign: 'center'}
      },
      {
        label: "风向",
        field: "windDir",
        sort: true,
        type: "string",
        width: "100px",
        // style: {textAlign: 'center'},
        format(value, row) {
          if (value < 20) {
            return "北风";
          } else if (value < 70) {
            return "东北风";
          } else if (value < 110) {
            return "东风";
          } else if (value < 160) {
            return "东南风";
          } else if (value < 200) {
            return "南风";
          } else if (value < 250) {
            return "西南风";
          } else if (value < 290) {
            return "西风";
          } else if (value < 340) {
            return "西北风";
          } else {
            return "北风";
          }
        }
      },
      {
        label: "操作",
        field: "operateId",
        type: "string",
        width: "120px"
      }
    ],
    pagination: true,
    rowHeight: 50,
    bodyHeightProp: "maxHeight",
    bodyHeight: 500,
    placeholders: {
      province: "------- 省 --------",
      city: "--- 市 ---",
      area: "--- 区 ---"
    },
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
    select1: null
  }),
  computed: {},
  methods: {
    getDeviceList() {
      deviceService
        .getAdapter()
        .then(r => {
          if (r.data) {
            for (let i = 0; i < r.data.length; i++) {
              if (
                r.data[i].linked.id.includes("Y1") &&
                (r.data[i].authorizations.indexOf("Operate") !== -1 ||
                  r.data[i].authorizations.indexOf("operate") !== -1)
              ) {
                this.deviceIdList.push(r.data[i].linked.id);
              }
            }

            this.getLastData(this.deviceIdList);
            this.tableData = this.dataList;
          }
        })
        .catch(e => {});
    },
    getLastData(list) {
      for (let i = 0; i < list.length; i++) {
        deviceService
          .getLastData(list[i])
          .then(r => {
            if (
              r.data &&
              r.data.data &&
              r.data.data[0] &&
              r.data.data[0].data
            ) {
              const res = r.data.data[0].data;
              this.dataList.push({
                index: this.dataList.length + 1,
                id: list[i],
                name: list[i].split('-')[0] + '-' + list[i].substr(-4),
                operateId: list[i],
                pm2d5: res.pm2d5,
                pm10: res.pm10,
                db: res.db,
                temp: res.temp,
                hum: res.hum,
                windSpeed: res.winSpeed,
                winDir: res.winDir
              });
            }
          })
          .catch(e => {});
      }
    },
    audit1(data) {
      console.log(data);
    },
    audit2(data) {
      console.log(data);
    },
    searchDevice(terms, done) {
      console.log(terms);
      let list = []
      for (let i = 0; i < this.dataList.length; i++) {
        if(this.dataList[i].id.includes(terms) || this.dataList[i].name.includes(terms)){
          list.push(this.dataList[i])
        }
      }
      this.tableData = list
      setTimeout(() => {
        done([]);
      }, 1000);
    }
  },
  created() {
    this.getDeviceList();
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  }
};
</script>

<style lang="stylus">
.title
  margin-bottom 20px
.my-label
  display inline-block
#deviceTable
  .q-data-table-toolbar.upper-toolbar
    display none
#searchModal
  .row
    margin 5px 0
  .q-input-target
    color black
  .left
    width 20%
    text-align right
  .right
    width 80%
    text-align left
    .input1
      width 87%
      height 40px
    .input2
      width 40%
      height 40px
.distpicker-address-wrapper
  width 80%
.q-select
  width 90%
</style>