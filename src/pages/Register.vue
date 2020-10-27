<template>
  <div class="register f-flex f-col-between">
    <p class="f-page-title">注册</p>
    <van-swipe class="register-swipe" :loop="false" :touchable="false" :show-indicators="false" ref="swipe" @change="swipeChange">
      <van-swipe-item class="f-col-center">
        <div class="content card-shadow f-col-center">
          <van-field input-align="center" class="register-field" placeholder="邮箱" v-model="form.number"></van-field>
          <van-field input-align="center" class="register-field" placeholder="密码" type="password" v-model="form.password"></van-field>
          <van-button round block class="register-button" @click="getCode">获取验证码</van-button>
        </div>
      </van-swipe-item>

      <van-swipe-item class="f-col-center">
        <div class="content card-shadow f-col-center">
          <van-field input-align="center" class="register-field" placeholder="验证码" v-model="form.code"></van-field>
          <van-button round block class="register-button" @click="register">下一步</van-button>
        </div>
      </van-swipe-item>

      <van-swipe-item class="f-col-center">
        恭喜注册完成
      </van-swipe-item>
    </van-swipe>

    <router-link :to="{ name: 'Login' }" class="f-info">
      已有帐号？立即登录
    </router-link>
    <div class="register-steps">
      <van-steps :active="current" @click-step="changeStep">
        <van-step>填写账号密码</van-step>
        <van-step>填写验证码</van-step>
        <van-step>注册完成</van-step>
      </van-steps>
    </div>

    <page-loading v-model="loading"></page-loading>
  </div>
</template>

<script lang="ts">
import { Swipe } from 'vant';
import Vue from 'vue';
import Component from 'vue-class-component';
import md5 from 'md5';
import { Config } from '@/interface';

@Component
export default class Regiter extends Vue {
  private current = 0;
  private form = {
    number: '',
    password: '',
    code: ''
  };
  private loading = false;
  private next(): void {
    (this.$refs.swipe as Swipe).next();
  }
  private swipeChange(index: number): void {
    this.current = index;
  }
  private changeStep(index: number): void {
    if (index < this.current) {
      this.current = index;
      (this.$refs.swipe as Swipe).swipeTo(index);
    }
  }
  private getCode() {
    if (!this.$verify.isEmail(this.form.number)) {
        this.$notify('邮箱格式错误');
        return ;
    }
    if (!this.form.password) {
        this.$notify('请先输入密码');
        return ;
    }

    this.loading = true;
    this.$utils.api('getEmailCode', {
      number: this.form.number
    }).then((res: Config) => {
      this.loading = false;
      this.next();
    }).catch((err: Config) => {
      console.log(err);
      this.loading = false;
      this.$notify(err.msg || '获取验证码失败');
    });
  }
  private register(): void {
    if (!this.form.code) {
      this.$notify('请填写验证码');
      return ;
    }

    this.loading = true;
    const params = this.$utils.deepClone(this.form);
    params.password = md5(params.password);
    this.$utils.api('register', params).then((res: Config) => {
      this.loading = false;
      this.next();
      this.$utils.accessToken(res);
      this.$router.replace({ name: 'Home' });
    }).catch((err: Config) => {
      console.log(err);
      this.loading = false;
      this.$notify(err.msg || '注册失败');
    });
  }
}
</script>

<style lang="less" scoped>
.register {
  height: 100vh;
  padding: 60px 0;
  box-sizing: border-box;

  .content {
    padding: 30px 50px;
    border-radius: 20px;
  }

  &-button {
    background: #333333;
    color: #ffffff;
    margin-top: 15px;
  }

  &-field {
    border: 1px solid #707070;
    border-radius: 30px;
    margin: 15px 0;
  }

  &-swipe {
    width: 100%;
    flex: 1;
  }

  &-steps {
    position: fixed;
    bottom: 15px;
    left: 0;
    right: 0;
    padding: 0 30px;
  }
}
</style>