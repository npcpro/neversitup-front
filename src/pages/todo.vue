<template>
    <v-container max-width="700">
        <v-card>
            <v-card-title class="d-flex justify-space-between">
                <span>ToDo</span>
                <v-btn @click="openDetailDialog()" class="ml-auto">Add</v-btn>
            </v-card-title>
            <v-card-text>
                <SimpleTable :columns="columns" :data="data">
                    <template v-slot:actions="{ item, rowIndex }">
                        <v-btn density="compact" icon="mdi-pencil" @click="openDetailDialog(item)" class="mx-1"></v-btn>
                        <v-btn density="compact" icon="mdi-delete" @click="openDeleteDialog(item)" class="mx-1"></v-btn>
                    </template>
                </SimpleTable>
            </v-card-text>
        </v-card>
        <ToDoDetailDialog 
        :active="showDetailDialog" 
        :data="dataDialog"
        @add="addData" 
        @edit="editData" 
        @close="closeDialog"></ToDoDetailDialog>

        <ToDoDeleteDialog
            :active="showDeleteDialog"
            :data="dataDialog"
            @delete="deleteData"
            @close="closeDialog"
        />
        <SnackAlert
          :active="snackAlert.active"
          :status="snackAlert.status"
          :message="snackAlert.message"
          @close="snackAlert.active = false"
        />
    </v-container>
</template>

<script>
import { useTodoStore } from '@/store/todoStore';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            snackAlert: {
                active: false,
                status: true,
                message: '',
            },
            showDetailDialog: false,
            showDeleteDialog: false,
            dataDialog: {},
            errorMessage: '',
            columns: [
                {
                    "key": "id",
                    "name": "",
                    "hidden": true
                },
                {
                    "key": "no",
                    "name": "No."
                },
                {
                    "key": "title",
                    "name": "Title"
                },
                {
                    "key": "description",
                    "name": "Description"
                },
                {
                    "key": "created_at",
                    "name": "Created Date"
                }
            ],
            data: []
        };
    },
    created() {
        this.getData();
    },
    methods: {
        async getData() {
            try {
                const rs = await useTodoStore().get();
                const data = rs.data.map((item, key) => {
                    return {...item, created_at: dayjs(item.created_at).format('DD/MM/YYYY HH:mm:ss'), no: key + 1};
                });
                this.data = data;
            } catch (error) {
                console.log(error, 'error');
            }
        },
        openDetailDialog(data) {
            this.dataDialog = data;
            this.showDetailDialog = true;
        },
        openDeleteDialog(data) {
            this.dataDialog = data;
            this.showDeleteDialog = true;
        },
        async addData(data) {
            try {
                const rs = await useTodoStore().add(data);
                if(rs.isSuccess) {
                    this.activateSnackAlert(true, 'Add Success.');
                } else {
                    this.activateSnackAlert(false, 'Add Fail.');
                }
                await this.getData();
            } catch (error) {
                console.log(error, 'error');
                this.activateSnackAlert(false, 'Add Fail.');
            }
        },
        async editData(data) {
            try {
                const id = data.id;
                const editedData = {
                    title: data.title,
                    description: data.description
                }
                
                const rs = await useTodoStore().edit(id, editedData);
                if(rs.isSuccess) {
                    this.activateSnackAlert(true, 'Edit Success.');
                } else {
                this.activateSnackAlert(false, 'Edit Fail.');
                }
                await this.getData();
            } catch (error) {
                console.log(error, 'error');
                this.activateSnackAlert(false, 'Edit Fail.');
            }
        },
        async deleteData(data) {
            try {
                const id = data.id;
                const rs = await useTodoStore().delete(id);
                if(rs.isSuccess) {
                    this.activateSnackAlert(true, 'Delete Success.');
                } else {
                    this.activateSnackAlert(false, 'Delete Fail.');
                }
                await this.getData();
            } catch (error) {
                console.log(error, 'error');
                this.activateSnackAlert(false, 'Delete Fail.');
            }
        },
        closeDialog() {
            this.showDetailDialog = false;
            this.showDeleteDialog = false;
            this.dataDialog = {};
        },
        activateSnackAlert(status, message) {
            this.snackAlert.active = true;
            this.snackAlert.status = status;
            this.snackAlert.message = message;
        }
    }
};
</script>
