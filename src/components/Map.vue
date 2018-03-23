<template>
<q-transition appear enter="fadeIn" leave="fadeOut" duration="500">
  <div class="layout-padding" v-ripple>
    <div class="title">
      <q-icon name="fa-home" size="25px" color="blue" />&nbsp;当前位置:
      <q-btn flat>地图显示</q-btn>
    </div>
    <q-list>
  <q-list-header>Movies</q-list-header>
  <q-item>
    <q-item-side image="/statics/mountains.jpg" />
    <q-item-main label="Mountains Documentary" />
    <q-item-side right icon="movie" />
  </q-item>
  <q-item>
    <q-item-side image="/statics/mountains.jpg" />
    <q-item-main>
      <q-item-tile label>Mountains Documentary</q-item-tile>
      <q-item-tile sublabel>For passionates only</q-item-tile>
    </q-item-main>
    <q-item-side right icon="movie" />
  </q-item>
  <q-item>
    <q-item-side image="/statics/mountains.jpg" />
    <q-item-main>
      <q-item-tile label>Mountains Documentary</q-item-tile>
      <q-item-tile sublabel lines="3">
        For passionates only For passionates only For passionates only For passionates only For passionates only
      </q-item-tile>
    </q-item-main>
    <q-item-side right icon="movie" />
  </q-item>
</q-list>
  </div>
</q-transition>
</template>

<script>
export default {
  data: () => ({
    admin: {
      name: "dayang"
    },
    a: {
      customize: {
        name: "hwlt"
      },
      inviteBy: "aaa",
      id: 123
    }
  })
};
</script>

<style>

</style>
