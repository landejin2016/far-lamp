<template>
    <div class="f-flex f-full f-flex-col">
        <van-image :src="logo" class="animate__animated f-opacity-in delay-1s"></van-image>
        <h1 class="f-page-title f-opacity-in delay-2s">远灯</h1>
        <p class="f-info app-intro f-opacity-in delay-2s">路再长，一直走，终能到达</p>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Components from 'vue-class-component';

@Components
export default class Welcome extends Vue {
    private logo: string = require('../assets/image/logo.svg');
    private mounted() {
        // setTimeout(() => {
        //     return this.$router.replace({ name: 'Home'});
        // }, 4000);
    }
}
</script>

<style scoped>
.app-intro {
    padding: 15px 0;
}
</style>