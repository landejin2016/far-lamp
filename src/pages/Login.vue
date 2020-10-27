<template>
  <div class="login f-flex f-col-between">
        <p class="f-page-title">登录</p>
        <div class="content card-shadow f-col-center">
            <van-image class="login-header" fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
            <div class="login-form">
                <van-field
                    v-model="form.number"
                    class="login-field"
                    placeholder="账号"
                    input-align="center"
                    :border="false"
                ></van-field>
                <van-field
                    v-model="form.password"
                    class="login-field"
                    placeholder="密码"
                    input-align="center"
                    :border="false"
                    type="password"
                ></van-field>
            </div>
            <van-button @click="login" round block class="login-button">登录</van-button>
        </div>
        <router-link class="f-info text-center" :to="{name: 'Register'}">新用户？立即注册</router-link>

        <page-loading v-model="loading"></page-loading>
    </div>
</template>

<script lang="ts">
import { Config } from '@/interface';
import Vue from 'vue';
import Component from 'vue-class-component';
import md5 from 'md5';

@Component
export default class Login extends Vue {
  private loading: boolean = false;
  private form: Config = {
    number: '',
    password: ''
  };
  private login(): void {
    if (!this.$verify.isEmail(this.form.number)) {
        this.$notify('邮箱格式不正确');
        return;
    }

    if (!this.form.password) {
        this.$notify('请输入密码');
        return;
    }

    this.loading = true;
    const params = this.$utils.deepClone(this.form);
    params.password = md5(params.password);
    this.$utils.api('login', params).then((res: Config): void => {
        this.loading = false;
        this.$utils.accessToken(res.token);
        this.$router.replace({ name: 'Home' });
    }).catch((err: Config): void => {
        console.log(err);
        this.loading = false;
        this.$notify(err.msg || '登录失败');
    });
  }
}
</script>

<style lang="less" scoped>
.login {
    height: 100vh;
    padding: 60px 0;
    box-sizing: border-box;

    .content {
        padding: 30px 50px;
        border-radius: 20px;
    }

    &-header {
        height: 100px;
        width: 100px;
    }

    &-form {
        margin: 30px 0;
    }

    &-field {
        border: 1px solid #707070;
        border-radius: 30px;
        margin: 15px 0;
    }

    &-button {
        background: #333333;
        color: #ffffff;
    }
}
</style>
