<template>
  <q-layout ref="layout" view="LHr LpR lFf">
    <q-transition appear leave="fadeOut" duration="1000">
      <q-toolbar slot="header">
        <q-btn flat @click="$refs.layout.toggleLeft()">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title></q-toolbar-title>
        <q-btn flat @click="logout">
          <q-icon name="fa-sign-out" />
        </q-btn>
      </q-toolbar>
      <div slot="left">
        <q-toolbar class="row  bg-primary text-white">
          <div class="">
            <h6>{{nickname}}</h6>
          </div>
        </q-toolbar>
        <q-side-link replace item to="/main/map">
          <q-item-side icon="map" />
          <q-item-main label="地图显示" />
        </q-side-link>
        <!-- <q-item-separator /> -->
        <q-side-link replace item to="/main/list">
          <q-item-side icon="devices" />
          <q-item-main label="设备列表"/>
        </q-side-link>
        <q-side-link replace item to="/main/user">
          <q-item-side icon="mood" />
          <q-item-main label="个人中心"/>
        </q-side-link>
      </div>

      <router-view/>
      </q-transition>
    </q-layout>
</template>

<script type="text/ecmascript-6">
import { userService } from "api/index";
import { LocalStorage } from "quasar";
export default {
  data() {
    return {
      nickname: "汉王蓝天建筑工地扬尘监测系统"
    };
  },
  methods: {
    logout() {
      const self = this;
      userService.logout().then(r => {
        this.$router.replace("/login");
        LocalStorage.clear()
      });
    }
  },
  beforeMount() {
    userService
      .getUser()
      .then(r => {})
      .catch(e => {
        this.$router.replace("/login");
      });
  }
};
</script>

<style>

</style>
