<template>
  <v-snackbar v-model="isActive" :bottom="true" multi-line tile>
    <div>
      <v-icon v-if="status" size="40" color="green">mdi-check</v-icon>
      <v-icon v-else size="40" color="red" >mdi-close</v-icon>
      &nbsp;&nbsp;&nbsp;
      <span class="subtitle-1 text-uppercase">
        <strong>{{ message }}</strong>
      </span>
    </div>
    <div class="text-center mt-4">
      <v-btn color="pink" @click="close" tile small block>
        Close
      </v-btn>
    </div>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    active: { type: Boolean, default: false },
    status: { type: Boolean, default: true },
    message: { type: String, default: 'Operation Completed' }
  },
  data() {
    return {};
  },
  computed: {
    isActive: {
      get() {
        return this.active;
      },
      set(val) {
        this.$emit('update:active', val);
      }
    }
  },
  watch: {
    active(newVal) {
      if (newVal) {
        this.snack();
      }
    }
  },
  methods: {
    snack() {
      const call = this;
      const $this = this;
      setTimeout(function () {
        call.isActive = false;
        console.log('start close');
        
        $this.close()
      }, 4000);
    },
    close() {
      console.log('start close');
      
      this.$emit('close');
    }
  }
};
</script>
