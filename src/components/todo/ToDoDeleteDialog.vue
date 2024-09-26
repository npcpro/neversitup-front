<template>
  <v-dialog v-model="isActive" max-width="500">
    <v-card>
      <v-card-title>
          Please confirm to delete
      </v-card-title>
      <v-card-text>
          {{ data.id }}
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn color="primary" @click="confirm">OK</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean 
    }, 
    data: {
        id: String
    }
  },
  data() {
    return {
      isActive: this.active
    };
  },
  watch: {
    active(newVal) {
      this.isActive = newVal;
    },
  },
  methods: {
    confirm() {
        this.$emit('delete', this.data);
        this.closeDialog();
      
    },
    cancel() {
      this.closeDialog();
    },
    closeDialog() {
      this.isActive = false;
      this.$emit('close', false);
    }
  }
};
</script>
