<style lang="less">
    .plan{
        height: 100%;
        text-align: center;
        padding: 0 15px;
        box-sizing: border-box;
        float: left;
        width: 100%;
        &-title{
            line-height: 40px;
            color: #333;
            font-size: 24px;
            font-weight: 400;
            padding: 20px 0;
        }
    }
</style>

<template>
    <div class="plan">
        <div class="plan-title">{{title}}</div>
        <div class="plan-body">
            <plan-list :timer="new Date()"></plan-list>
            <plan-list :timer="new Date()"></plan-list>
            <plan-list :timer="new Date()"></plan-list>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import PlanList from './planList.vue';

const GreetingProps = Vue.extend({
    props: {
        title: String
    }
});

@Component({
    components: {
        PlanList
    }
})
export default class Plan extends GreetingProps {
    get title2(): string {
        return this.title;
    }
}

</script>