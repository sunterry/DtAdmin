<template>
  <Card title="欢迎登录" class="dt-login-form">
    <Form
      ref="loginForm"
      :model="loginSource"
      :rules="rules"
      @keydown.enter.native="handleSubmit('loginForm')"
    >
      <FormItem prop="userName">
        <i-input
          type="text"
          placeholder="请输入用户名"
          v-model="loginSource.userName"
        >
          <Icon type="ios-person-outline" slot="prepend"></Icon>
        </i-input>
      </FormItem>
      <FormItem prop="password">
        <i-input
          type="password"
          v-model="loginSource.password"
          placeholder="请输入密码"
        >
          <Icon type="ios-lock-outline" slot="prepend"></Icon>
        </i-input>
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          long
          @click="handleSubmit('loginForm')"
          :disabled="!loginSource.userName || !loginSource.password"
        >
          登 录
        </Button>
      </FormItem>
    </Form>
  </Card>
</template>

<script>
export default {
  name: 'dtLoginForm',
  data() {
    return {
      loginSource: {
        userName: '',
        password: '',
      },
    };
  },
  props: {
    userNameRules: {
      type: Array,
      default: () => [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'blur',
        },
      ],
    },
    passwordRules: {
      type: Array,
      default: () => [
        {
          required: true,
          message: '请输入密码',
          trigger: 'blur',
        },
      ],
    },
  },
  computed: {
    rules() {
      return {
        userName: this.userNameRules,
        password: this.passwordRules,
      };
    },
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const data = Object.assign({}, this.loginSource);
          this.$emit('on-success', data);
        }
      });
    },
  },
};
</script>

<style scoped>
  .dt-login-form{
    width: 300px;
  }
</style>
