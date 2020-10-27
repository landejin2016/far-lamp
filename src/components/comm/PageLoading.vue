<template>
    <van-popup
        v-model="loading"
        close-on-popstate
        :close-on-click-overlay="false"
        class="loading-content"
    >
        <div class="f-full f-col-center">
            <p class="f-icon f-iconloading_ico icon-loading f-rotate"></p>
            <p class="f-info loading-title">{{title}}</p>
        </div>
    </van-popup>
</template>

<script lang='ts'>
/*
 * @prop: showHeader 导航栏标题
 * @prop: title 导航栏标题
 * @prop: leftArrow 是否显示左侧箭头
 * @prop: leftText 导航左侧文字
 * @prop: rightText 导航右侧文字
 * @prop: border 是否显示导航底部边框
 * @prop: tabbar 是否显示tabbar
 *
 * @event clickLeft 点击导航左侧触发
 * @event clickRight 点击导航右侧触发
 */

import Vue from 'vue';
import Component from 'vue-class-component';

const PageLoadingProps = Vue.extend({
    props: {
        value: {
            type: Boolean
        },
        title: {
            type: String,
            default: '加载中'
        }
    },
});

@Component({
    name: 'PageLoading'
})
export default class PageLoading extends PageLoadingProps {
    get loading() {
        return this.value;
    }
    set loading(val) {
        this.$emit('input', val);
    }
}
</script>

<style lang='less' scoped>
.loading-content {
    height: 100px;
    width: 40%;
    border-radius: 10px;
}

.loading-title {
    margin-top: 5px;
}

.icon-loading {
    font-size: 40px;
    color: #e50838;
}
</style>