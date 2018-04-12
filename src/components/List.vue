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

    <div v-if="status === 0">
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
        <template slot="col-adapterId" slot-scope="cell">
          <q-btn flat color="primary" @click="showDetail(cell.data,0)">详情</q-btn> |
          <q-btn flat color="primary" @click="showDetail(cell.data,1)">编辑</q-btn>
        </template>
      </q-data-table>

      <q-modal id="searchModal" ref="searchModal" :content-css="{minWidth: '90vw', minHeight: '50vh',padding: '20px'}">
        <div class="row">
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备名称：
            </div>
            <div class="right">
              <q-input class="input1" v-model="nameSearch" color="white" inverted />
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row justify-around items-center">
            <div class="left">
              设备位置：
            </div>
            <div class="right distpicker">
              <v-distpicker :placeholders="addressSearch"></v-distpicker>
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row items-center">
            <div class="left">
              PM10：
            </div>
            <div class="right row inline">
              <q-input class="input2" v-model="pm10Search.min" color="white" inverted />
              <p style="padding-top: 22px;">&nbsp;——&nbsp;</p>
              <q-input class="input2" v-model="pm10Search.max" color="white" inverted />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="item col-xs-12 col-sm-6 col-md-4 row items-center">
            <div class="left">
              PM2.5：
            </div>
            <div class="right row inline">
              <q-input class="input2" v-model="pm2d5Search.min" color="white" inverted />
              <p style="padding-top: 22px;">&nbsp;——&nbsp;</p>
              <q-input class="input2" v-model="pm2d5Search.max" color="white" inverted />
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row items-center">
            <div class="left">
              噪音：
            </div>
            <div class="right row inline">
              <q-input class="input2" v-model="dbSearch.min" color="white" inverted />
              <p style="padding-top: 22px;">&nbsp;——&nbsp;</p>
              <q-input class="input2" v-model="dbSearch.max" color="white" inverted />
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row items-center">
            <div class="left">
              湿度：
            </div>
            <div class="right row inline">
              <q-input class="input2" v-model="humSearch.min" color="white" inverted />
              <p style="padding-top: 22px;">&nbsp;——&nbsp;</p>
              <q-input class="input2" v-model="humSearch.max" color="white" inverted />
            </div>
          </div>
        </div>

        <div class="row">
          <div class="item col-xs-12 col-sm-6 col-md-4 row items-center">
            <div class="left">
              温度：
            </div>
            <div class="right row inline">
              <q-input class="input2" v-model="tempSearch.min" color="white" inverted />
              <p style="padding-top: 22px;">&nbsp;——&nbsp;</p>
              <q-input class="input2" v-model="tempSearch.max" color="white" inverted />
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row items-center">
            <div class="left">
              风速：
            </div>
            <div class="right">
              <q-input class="input1" v-model="windSpeedSearch" color="white" inverted />
            </div>
          </div>
          <div class="item col-xs-12 col-sm-6 col-md-4 row items-center">
            <div class="left">
              风向：
            </div>
            <div class="right row inline">
              <q-select v-model="windDirSearch" :options="options" />
            </div>
          </div>
        </div>
        <div class="row justify-center">
          <div class="row justify-around" style="width:500px;">
            <q-btn color="primary" style="width:200px;" @click="advancedSearch">查询</q-btn>
            <q-btn color="white" class="text-black" style="width:200px;" @click="clearSearch">重置</q-btn>
          </div>
        </div>
      </q-modal>
    </div>

    <div v-else-if="status === 1">
      <device-panel :state="state" :adapterId="currentId" :name="currentName"></device-panel>
    </div>
  </div>
</template>

<script>
import VDistpicker from "./Distpicker";
import { deviceService } from "api/index";
import devicePanel from "./Device";
import { LocalStorage } from "quasar";
export default {
  components: {
    VDistpicker,
    devicePanel
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
    },
    text(value) {
      if (!value) {
        this.tableData = this.dataList;
      }
    }
  },
  data: () => ({
    status: 0,
    state: 0,
    currentId: null,
    currentName: null,
    text: null,
    deviceList: [],
    dataList: [],
    tableData: [],
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
      },
      {
        label: "设备ID",
        field: "id",
        width: "130px",
        sort: true,
        type: "string"
      },
      {
        label: "设备位置",
        field: "address",
        width: "180px",
        sort: true
      },
      {
        label: "PM2.5",
        field: "pm2d5",
        type: "number",
        sort: true,
        width: "80px",
        format(value, row) {
          if (value || value === 0) {
            return value + "ug/m³";
          } else {
            return value;
          }
        }
      },
      {
        label: "PM10",
        field: "pm10",
        sort: true,
        type: "number",
        width: "80px",
        format(value, row) {
          if (value || value === 0) {
            return value + "ug/m³";
          } else {
            return value;
          }
        }
      },
      {
        label: "温度",
        field: "temp",
        sort: true,
        type: "number",
        width: "80px",
        format(value, row) {
          if (value || value === 0) {
            return (value/100).toFixed(0) + "℃";
          } else {
            return value;
          }
        }
      },
      {
        label: "湿度",
        field: "hum",
        sort: true,
        type: "number",
        width: "80px",
        format(value, row) {
          if (value || value === 0) {
            return (value/100).toFixed(0) + "%";
          } else {
            return value;
          }
        }
      },
      {
        label: "风速",
        field: "windSpeed",
        sort: true,
        type: "number",
        width: "80px",
        format(value, row) {
          if (value) {
            return (value/10).toFixed(1) + "m/s";
          } else if(value === 0){
            return value + 'm/s';
          } else {
            return value
          }
        }
      },
      {
        label: "风向",
        field: "windDir",
        sort: true,
        // type: "string",
        width: "100px",
        format(value, row) {
          value = row.winDir;
          if (value <= 20) {
            return "北风";
          } else if (value > 20 && value <= 70) {
            return "东北风";
          } else if (value > 70 && value <= 110) {
            return "东风";
          } else if (value > 110 && value <= 160) {
            return "东南风";
          } else if (value > 160 && value <= 200) {
            return "南风";
          } else if (value > 200 && value <= 250) {
            return "西南风";
          } else if (value > 250 && value <= 290) {
            return "西风";
          } else if (value > 290 && value <= 340) {
            return "西北风";
          } else if (value > 340 && value <= 360) {
            return "北风";
          } else {
            return "";
          }
        }
      },
      {
        label: "噪音",
        field: "db",
        sort: true,
        type: "number",
        width: "80px",
        format(value, row) {
          if (value || value === 0) {
            return value + "db";
          } else {
            return value;
          }
        }
      },
      {
        label: "操作",
        field: "adapterId",
        type: "string",
        width: "120px",
        style: { paddingLeft: "-0px" }
      }
    ],
    pagination: true,
    rowHeight: 50,
    bodyHeightProp: "maxHeight",
    bodyHeight: 500,
    options: [
      {
        label: "北风",
        value: 20
      },
      {
        label: "东北风",
        value: 70
      },
      {
        label: "东风",
        value: 110
      },
      {
        label: "东南风",
        value: 160
      },
      {
        label: "南风",
        value: 200
      },
      {
        label: "西南风",
        value: 250
      },
      {
        label: "西风",
        value: 290
      },
      {
        label: "西北风",
        value: 340
      }
    ],
    nameSearch: null,
    addressSearch: {
      province: "--- 省 ---",
      city: "--- 市 ---",
      area: "--- 区 ---"
    },
    pm10Search: {
      min: null,
      max: null
    },
    pm2d5Search: {
      min: null,
      max: null
    },
    dbSearch: {
      min: null,
      max: null
    },
    humSearch: {
      min: null,
      max: null
    },
    tempSearch: {
      min: null,
      max: null
    },
    windSpeedSearch: null,
    windDirSearch: null
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
                let adapterId = r.data[i].id;
                let deviceId = r.data[i].linked.id;
                let name =
                  r.data[i].customize.name ||
                  id.split("-")[0] + "-" + id.substr(-4);
                this.deviceList.push({
                  adapterId: adapterId,
                  deviceId: deviceId,
                  name: name
                });
              }
            }

            this.getLastData(this.deviceList);
            this.tableData = this.dataList;
          }
        })
        .catch(e => {});
    },
    getLastData(list) {
      for (let i = 0; i < list.length; i++) {
        deviceService
          .getLastData(list[i].deviceId)
          .then(r => {
            if (
              r.data &&
              r.data.data &&
              r.data.data[0] &&
              r.data.data[0].data
            ) {
              const res = r.data.data[0].data;
              const addressText = LocalStorage.get.item(list[i].deviceId);
              console.log(addressText);
              this.dataList.push({
                index: this.dataList.length + 1,
                id: list[i].deviceId,
                name: list[i].name,
                adapterId: list[i].adapterId,
                address: addressText,
                pm2d5: res.pm2d5,
                pm10: res.pm10,
                db: res.db,
                temp: res.temperature,
                hum: res.humidity,
                windSpeed: res.windSpeed,
                winDir: res.windDirection
              });
            }
            console.log(this.dataList);
          })
          .catch(e => {});
      }
    },
    searchDevice(terms, done) {
      if (terms) {
        let list = [];
        for (let i = 0; i < this.dataList.length; i++) {
          if (
            this.dataList[i].deviceId.includes(terms) ||
            this.dataList[i].name.includes(terms)
          ) {
            list.push(this.dataList[i]);
          }
        }
        this.tableData = list;
      }

      setTimeout(() => {
        done([]);
      }, 1000);
    },
    advancedSearch() {
      let form = {};
      form.name = this.nameSearch;
      form.address = this.addressSearch;
      form.pm10 = {
        min: this.pm10Search.min,
        max: this.pm10Search.max
      };
      form.pm2d5 = {
        min: this.pm2d5Search.min,
        max: this.pm2d5Search.max
      };
      form.db = {
        min: this.dbSearch.min,
        max: this.dbSearch.max
      };
      form.hum = {
        min: this.humSearch.min,
        max: this.humSearch.max
      };
      form.temp = {
        min: this.tempSearch.min,
        max: this.tempSearch.max
      };
      form.windSpeed = this.windSpeedSearch;
      form.winDir = this.windDirSearch;
      console.log(form);
      this.$refs.searchModal.close();
      let list = [];
      for (let i = 0; i < this.dataList.length; i++) {
        let cursor = true;
        if (form.name && cursor) {
          if (
            !this.dataList[i].name ||
            !this.dataList[i].name.includes(form.name)
          ) {
            cursor = false;
          }
        }
        if (form.address && cursor) {
          if (form.address.area !== "--- 区 ---") {
            if (!this.dataList[i].address.includes(form.address.area)) {
              cursor = false;
            }
          }
          if (form.address.city !== "--- 市 ---") {
            if (!this.dataList[i].address.includes(form.address.city)) {
              cursor = false;
            }
          }

          if (form.address.province !== "--- 省 ---") {
            if (!this.dataList[i].address.includes(form.address.province)) {
              cursor = false;
            }
          }
        }

        if (form.pm10.min && cursor) {
          if (!this.dataList[i].pm10 || this.dataList[i].pm10 < form.pm10.min) {
            cursor = false;
          }
        }
        if (form.pm10.max && cursor) {
          if (!this.dataList[i].pm10 || this.dataList[i].pm10 > form.pm10.max) {
            cursor = false;
          }
        }
        if (form.pm2d5.min && cursor) {
          if (
            !this.dataList[i].pm2d5 ||
            this.dataList[i].pm2d5 < form.pm2d5.min
          ) {
            cursor = false;
          }
        }
        if (form.pm2d5.max && cursor) {
          if (
            !this.dataList[i].pm2d5 ||
            this.dataList[i].pm2d5 > form.pm2d5.max
          ) {
            cursor = false;
          }
        }
        if (form.db.min && cursor) {
          if (!this.dataList[i].db || this.dataList[i].db < form.db.min) {
            cursor = false;
          }
        }
        if (form.db.max && cursor) {
          if (!this.dataList[i].db || this.dataList[i].db > form.db.max) {
            cursor = false;
          }
        }
        if (form.hum.min && cursor) {
          if (!this.dataList[i].hum || this.dataList[i].hum < form.hum.min) {
            cursor = false;
          }
        }
        if (form.hum.max && cursor) {
          if (!this.dataList[i].hum || this.dataList[i].hum > form.hum.max) {
            cursor = false;
          }
        }
        if (form.temp.min && cursor) {
          if (!this.dataList[i].temp || this.dataList[i].temp < form.temp.min) {
            cursor = false;
          }
        }
        if (form.temp.max && cursor) {
          if (!this.dataList[i].temp || this.dataList[i].temp > form.temp.max) {
            cursor = false;
          }
        }
        if (form.windSpeed && cursor) {
          if (
            !this.dataList[i].windSpeed ||
            this.dataList[i].windSpeed !== form.windSpeed
          ) {
            cursor = false;
          }
        }
        if (form.winDir && cursor) {
          if (
            !this.dataList[i].winDir ||
            this.dataList[i].winDir !== form.winDir
          ) {
            cursor = false;
          }
        }

        if (cursor) {
          list.push(this.dataList[i]);
        }
      }

      this.tableData = list;
    },
    clearSearch() {
      this.nameSearch = null;
      this.addressSearch = {
        province: "--- 省 ---",
        city: "--- 市 ---",
        area: "--- 区 ---"
      };
      this.pm10Search.min = null;
      this.pm10Search.max = null;
      this.pm2d5Search.min = null;
      this.pm2d5Search.max = null;
      this.dbSearch.min = null;
      this.dbSearch.max = null;
      this.humSearch.min = null;
      this.humSearch.max = null;
      this.tempSearch.min = null;
      this.tempSearch.max = null;
      this.windSpeedSearch = null;
      this.windDirSearch = null;
    },
    showDetail(adapterId, state) {
      this.state = state;
      this.currentId = adapterId;
      for (let i = 0; i < this.tableData.length; i++) {
        if (this.tableData[i].adapterId === adapterId) {
          this.currentName = this.tableData[i].name;
        }
      }
      this.status = 1;
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