<template>
    <v-dialog v-model="isActive" max-width="500">
        <v-card>
            <v-card-title>Add/Edit ToDo {{ isActive }}</v-card-title>
            <v-card-text>
                <v-form v-model="formValid">
                    <v-text-field v-model="todo.title" label="Title" :rules="[rules.required]" required></v-text-field>
                    <v-text-field v-model="todo.description" label="Description"
                        required></v-text-field>
                </v-form>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="cancel">Cancel</v-btn>
                <v-btn color="primary" @click="submitForm">Submit</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script lang="ts">
export default {
    props: {
        active: {
            type: Boolean,
            required: true,
            default: false
        },
    },
    data() {
        return {
            todo: {
                title: '',
                description: '',
            },
            formValid: false,
            rules: {
                required: (value: string) => !!value || 'Required.',
            },
            isActive: this.active
        };
    },
    watch: {
        active(newVal) {
            this.isActive = newVal;
        }
    },
    methods: {
        submitForm() {
            if (this.formValid) {
                this.$emit('submit', this.todo);
                this.closeDialog();
            }
        },
        cancel() {
            this.closeDialog();
        },
        closeDialog() {
            this.isActive = false; // ปิด dialog
            this.$emit('update:close', false);
        },
    },
};
</script>
