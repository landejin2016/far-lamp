<style lang="less" scoped>
    .list{
        height: 200px;
        margin: 10px 0;
        box-shadow: 0px 3px 6px -2px rgba(0, 0, 0, .2);
        display: flex;
        justify-content: space-around;
        align-items: center;
        flex-direction: column;
        border-radius: 4px;
        &-title{
            font-size: 20px;
            color: #333;
        }
        &-body{
            font-size: 14px;
        }
        &-message{
            font-size: 12px;
            color: #e5e5e5;
        }
    }
</style>

<template>
    <div class="list">
        <header class="list-title">考过英语四级</header>
        <div class="list-body"></div>
        <div class="list-message">{{footer}}</div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';

const GreetingProps = Vue.extend({
    props: {
        timer: Date
    }
});

@Component({

})

export default class PlanList extends GreetingProps {
    get footer(): string {
       const time = this.$utils.formatDate(this.timer, 'YYYY/MM/DD');
       return time;
    }
}
</script>