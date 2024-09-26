<template>
    <v-container max-width="700">
        <v-card>
            <v-card-title class="d-flex justify-space-between">
                <span>ToDo</span>
                <v-btn @click="openDetailDialog(row)" class="ml-auto">Add</v-btn>
            </v-card-title>
            <v-card-text>
                <SimpleTable :columns="columns" :data="data">
                    <template v-slot:actions="{ item, rowIndex }">
                        <v-btn density="compact" icon="mdi-pencil" @click="editRow(item)" class="mx-1"></v-btn>
                        <v-btn density="compact" icon="mdi-delete" @click="deleteRow(item)" class="mx-1"></v-btn>
                    </template>
                </SimpleTable>
            </v-card-text>
        </v-card>
        <ToDoDetailDialog :active="showDetailDialog" @submit="addData" @update:close="showDetailDialog=false"></ToDoDetailDialog>
        {{ showDetailDialog }} ++
    </v-container>
</template>

<script>
import { useTodoStore } from '@/store/todoStore';
import dayjs from 'dayjs';

export default {
    data() {
        return {
            showDetailDialog: false,
            showDeleteDialog: false,
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
                    "key": "desc",
                    "name": "Description"
                },
                {
                    "key": "date",
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
            console.log("getData");
            try {
                const rs = await useTodoStore().getTodos();
                const data = rs.data.map((item, key) => {
                    return [item.id, key + 1, item.title, item.description, dayjs(item.created_at).format('YYYY-MM-DD HH:mm:ss')];
                });
                this.data = data;
                console.log(data);
            } catch (error) {
                console.log(error, 'error');
            }
        },
        openDetailDialog() {
            this.showDetailDialog = true;
        },
        addData(data) {
            console.log("Opening Dialog", data.title);
            console.log(data,'data');
            try {
                const rs = useTodoStore().getTodos();
                console.log(rs);
            } catch (error) {
                console.log(error, 'error');
            }
            
        },
        async editData(item) {
            const id = item[0];
            console.log("Editing Data", id);
            try {
                const rs = useTodoStore().getTodos();
                console.log(rs);
            } catch (error) {
                console.log(error, 'error');
            }
        },
        async deleteData(item) {
            const id = item[0];
            console.log("Deleting Data", id);
        },
        closeDialog() {
            // You can use this to close the dialog when needed
            this.showDetailDialog = false;
        },
    }
};
</script>
