<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="3">
        <v-card class="pa-4" color="" dark>
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-text>
            <v-form ref="loginForm" v-model="formValid">
              <v-text-field
                v-model="username"
                label="Username"
                :rules="[rules.required]"
                outlined
                required
              ></v-text-field>
              <v-text-field
                v-model="password"
                label="Password"
                :rules="[rules.required]"
                type="password"
                outlined
                required
              ></v-text-field>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-btn color="primary" @click="login" :disabled="!formValid" block>
              Login
            </v-btn>
          </v-card-actions>
          <SnackAlert
          :active="snackAlert.active"
          :status="snackAlert.status"
          :message="snackAlert.message"
          @close="snackAlert.active = false"
        />
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { useUserStore } from '@/store/userStore';

export default {
  data() {
    return {
      username: 'bright-natchanon',
      password: 'bright-natchanon',
      formValid: false,
      rules: {
        required: value => !!value || 'Required field.',
      },
      snackAlert: {
                active: false,
                status: true,
                message: '',
            },
    };
  },
  methods: {
    async login() {
      if (this.$refs.loginForm.validate()) {
          const rs = await useUserStore().login(this.username,this.password);
          if(rs) {
              this.activateSnackAlert(true, 'Login Success.');
              await this.delay(1000);
              this.$router.push('/todo');
            } else {
              this.activateSnackAlert(false, 'Username or password Incorrect.');
              console.log('fail');
          }
        }
      },
      delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      },
      activateSnackAlert(status, message) {
            this.snackAlert.active = true;
            this.snackAlert.status = status;
            this.snackAlert.message = message;
        }
  },
};
</script>

<style scoped>
.v-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
