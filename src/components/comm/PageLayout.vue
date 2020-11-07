<template>
    <section class='pages'>
        <page-navbar v-if='showHeader' :title='title' :left-arrow='false' :border='border'>
            <div slot='left' @click='clickLeft'>
                <slot name='left'>
                    <van-icon name='arrow-left' color='#999' v-if='leftArrow' />
                    {{leftText}}
                </slot>
            </div>

            <div slot='right' @click='clickRight'>
                <slot name='right'>{{rightText}}</slot>
            </div>
        </page-navbar>
        <div class='pages-content'>
            <slot></slot>
        </div>
        <div v-if='tabbar'>
            <van-tabbar route class='shadow'>
                <van-tabbar-item replace to='/'>
                 <template #icon="props">
                    <span class="f-icon f-iconricheng6 tab-icon" :class="{'f-translate-y': props.active}"></span>
                </template>        
                <div class="f-col-center">
                    日程
                </div>
                </van-tabbar-item>
                <van-tabbar-item replace to='/week'>
                    <template #icon="props">
                        <span class="f-icon f-iconrenwu6 tab-icon" :class="{'f-translate-y': props.active}"></span>
                    </template>
                    <div class="f-col-center">
                        周任务
                    </div>
                </van-tabbar-item>
                <van-tabbar-item>
                  <div class='tabber-center' @click='openPopup'>
                      <div class='tabber-center-button f-row-center'>
                          <span class="f-icon f-iconjia"></span>
                      </div>
                  </div>
                <div class='tabber-box'></div>
                </van-tabbar-item>
                <van-tabbar-item replace to='/month'>
                    <template #icon="props">
                        <span class="f-icon f-iconjihua1 tab-icon" :class="{'f-translate-y': props.active}"></span>
                    </template>
                    <div class="f-col-center">
                        月计划
                    </div>
                </van-tabbar-item>
                <van-tabbar-item replace to='/year'>
                    <template #icon="props">
                        <span class="f-icon f-iconmubiao2 tab-icon" :class="{'f-translate-y': props.active}"></span>
                    </template>
                    <div class="f-col-center">
                        年目标
                    </div>
                </van-tabbar-item>
            </van-tabbar>
        </div>

        <page-loading v-model="showLoading"></page-loading>
    </section>
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
import { Tabbar, TabbarItem } from 'vant';
import Vue from 'vue';
import Component from 'vue-class-component';

const PageLayoutProps = Vue.extend({
  props: {
    showHeader: {
        type: Boolean,
        default: true,
    },
    title: String,
    leftArrow: {
        type: Boolean,
        default: true,
    },
    border: {
        type: Boolean,
        default: true,
    },
    leftText: {
        type: String,
    },
    rightText: {
        type: String,
    },
    tabbar: {
        type: Boolean,
        default: true,
    },
    loading: Boolean
  }
});

@Component({
    name: 'PageLayout',
    components: {
        VanTabbar: Tabbar,
        VanTabbarItem: TabbarItem,
    }
})
export default class PageLayout extends PageLayoutProps {
    private isOpen: boolean = false;
    private clickLeft(): void {
      this.$emit('clickLeft');
    }
    private clickRight(): void {
      this.$emit('clickRight');
    }
    private openPopup(): void {
      this.isOpen = !this.isOpen;
    }
    get showLoading() {
        return this.loading;
    }
    set showLoading(val) {
        this.$emit(val ? 'loading' : 'loaded');
    }
}
</script>

<style lang='less' scoped>
.pages {
    height: 100%;
    display: flex;
    flex-direction: column;

    .tab-icon {
        padding-bottom: 5px;
        font-size: 16px;
        font-weight: bold;
        display: inline-block;
    }

    &-content {
        flex: 1;
        overflow: auto;
    }

    .tabber-box {
          background: #fafafa;
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          top: 100%;
          z-index: 99999;
          box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.16);
      }

    .tabber-center {
      position: relative;
      
      &-button {
        box-shadow: 0 -4px 15px rgba(0, 0, 0, 0.16);
        border-radius: 50%;
        width: 60px;
        height: 60px;
        font-size: 30px;
        position: absolute;
        top: -50px;
        left: 50%;
        margin-left: -30px;
        background: #ffffff;
        z-index: 999999;
        transform-origin: center center;
      }

      &-room {
        position: fixed;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        background: #ffffff;
        z-index: 9999;
      }
    }
    .shadow{
        position: static;
    }
}
</style>