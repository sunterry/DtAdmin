<template>
  <div class="dt-login">
    <Row
      type="flex"
      justify="center"
      align="middle"
      class="dt-login__row"
    >
      <i-col>
        <login-from
          @on-success="login"
        />
      </i-col>
    </Row>
  </div>
</template>

<script>
import loginFrom from '_c/dt-login-form';
import { mapActions } from 'vuex';

export default {
  name: 'login',
  components: {
    loginFrom,
  },
  methods: {
    ...mapActions('user', ['sendLogin', 'gaveUserInfo']),
    login(val) {
      const { userName, password } = val;
      const data = Object.assign({}, { user_name: userName, password });
      this.sendLogin(data).then((token) => {
        this.gaveUserInfo({ token }).then(() => {
          this.$router.push({
            name: 'home',
          });
        });
      }).catch((err) => {
        this.$Message.error(err.message);
      });
    },
  },
};
</script>

<style scoped lang="less">
  .dt-login {
    background: url("./../../assets/image/login-bg.jpg");
    background-size: cover;
    width: 100%;
    height: 100%;
    &__row {
      height: 100%;
    }
  }
</style>
