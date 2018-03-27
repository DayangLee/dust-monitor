<template>
  <div class="layout-padding list">
    <div class="title">
      <q-icon name="fa-home" size="25px" color="blue" />&nbsp;当前位置:
      <q-btn flat @click="status = 0">设备列表</q-btn>
      <span v-show="status === 1">> <q-btn flat>设备详情</q-btn></span>
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

    <q-data-table id="deviceTable" :data="table" :config="config" :columns="columns">
      <template slot="col-message" slot-scope="cell">
        <span class="light-paragraph">{{cell.data}}</span>
      </template>
      <template slot="col-source" slot-scope="cell">
        <div v-if="cell.data === 'Audit'" class="my-label">
          <q-btn flat outline small @click="audit1(cell.data)">Audit</q-btn>
        </div>
        <div v-else class="my-label text-white bg-negative" @click="audit2(cell.data)">{{cell.data}}</div>
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
import VDistpicker from './Distpicker'
export default {
  components:{
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
    table,
    config: {
      title: "Data Table",
      refresh: false,
      noHeader: false,
      columnPicker: false,
      leftStickyColumns: 0,
      rightStickyColumns: 2,
      bodyStyle: {
        maxHeight: "800px"
      },
      rowHeight: "50px",
      responsive: true,
      pagination: {
        rowsPerPage: 15,
        options: [10, 15, 30, 50, 100]
      }
    },
    columns: [
      {
        label: "Date",
        field: "isodate",
        width: "140px",
        filter: true,
        sort(a, b) {
          return new Date(a) - new Date(b);
        },
        format(value) {
          return new Date(value).toLocaleString();
        }
      },
      {
        label: "Service",
        field: "serviceable",
        format(value) {
          if (value === "Informational") {
            return '<i class="material-icons text-positive" style="font-size: 22px">info</i>';
          }
          return value;
        },
        width: "70px"
      },
      {
        label: "Time Range",
        field: "timerange",
        width: "80px",
        sort: true,
        type: "number"
      },
      {
        label: "Message",
        field: "message",
        filter: true,
        sort: true,
        type: "string",
        width: "500px"
      },
      {
        label: "Source",
        field: "source",
        filter: true,
        sort: true,
        type: "string",
        width: "120px"
      },
      {
        label: "Log Number",
        field: "log_number",
        sort: true,
        type: "string",
        width: "100px"
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
  methods: {
    audit1(data) {
      console.log(data);
    },
    audit2(data) {
      console.log(data);
    },
    searchDevice(terms, done) {
      console.log(terms);
      setTimeout(() => {
        done([]);
      }, 1000);
    }
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