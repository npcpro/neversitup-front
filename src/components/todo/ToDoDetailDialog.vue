<template>
  <v-dialog v-model="isActive" max-width="500">
    <v-card>
      <v-card-title>
        {{ isEditMode ? 'Edit' : 'Add' }} ToDo
      </v-card-title>
      <v-card-text>
        <v-form ref="todoForm" v-model="formValid">
          <v-text-field v-model="todo.title" label="Title" :rules="[rules.required]" required></v-text-field>
          <v-text-field v-model="todo.description" label="Description" :rules="[rules.required]" required></v-text-field>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn @click="cancel">Cancel</v-btn>
        <v-btn color="primary" @click="submitForm">Submit</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    active: {
      type: Boolean,
      default: false
    },
    data: {
        id: String,
        title: String,
        description: String
    }
  },
  computed: {
    isEditMode() {
      return this.data.id && this.data.id.length > 0;
    }
  },
  data() {
    return {
      todo: {
        id: this.data.id,
        title: this.data.title,
        description: this.data.description
      },
      formValid: false,
      rules: {
        required: value => !!value || 'Required.'
      },
      isActive: this.active
    };
  },
  watch: {
    active(newVal) {
      this.isActive = newVal;
      if(this.data) {
            this.todo = {
                id: this.data.id,
                title: this.data.title,
                description: this.data.description
            };
        }
    }
  },
  methods: {
    submitForm() {
      const form = this.$refs.todoForm.validate();
      if (form) {
        console.log(this.todo, 'new to do');
        
        if(this.todo.id) {
            this.$emit('edit', this.todo);
        } else {
            this.$emit('add', this.todo);
        }
        this.closeDialog();
      }
    },
    cancel() {
      this.closeDialog();
    },
    closeDialog() {
      this.isActive = false;
      this.$emit('close', false);
      this.todo = {
        id: '',
        title: '',
        description: ''
      }
    }
  }
};
</script>
