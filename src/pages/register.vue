<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="8" md="6" lg="3">
        <v-card class="pa-4" color="" dark>
          <v-card-title class="text-h5">Register</v-card-title>
          <v-card-text>
            <v-form ref="registerForm" v-model="formValid">
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
            <v-btn color="primary" @click="register" :disabled="!formValid" block>
              Register
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
    async register() {
      if (this.$refs.registerForm.validate()) {
            try {
                const rs = await useUserStore().register(this.username, this.password);
                this.activateSnackAlert(true, 'Register Success.');
                await this.delay(1000);
                this.$router.push('/login');
            } catch (error) {
                this.activateSnackAlert(false, error.message);
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
