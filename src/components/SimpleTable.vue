<template>
    <v-table>
        <thead>
            <tr>
                <th scope="simple-header" v-for="column in columns" :key="column.key" :class="{ hidden: column.hidden }">
                    {{ column.name }}
                </th>
                <th scope="simple-header-action">Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(row, rowIndex) in data" :key="rowIndex">
                <td v-for="(column, colIndex) in columns" :key="column.key" :class="{ hidden: column.hidden }">
                    {{ row[colIndex] }}
                </td>
                <td>
                    <slot name="actions" :row="row"></slot>
                </td>
            </tr>
        </tbody>
    </v-table>
</template>

<script lang="ts" setup>
interface Column {
    key: string;
    name: string;
}

const props = defineProps<{
    columns: Column;
    data: Record<string, any>[];
}>();
</script>

<style scoped>
/* Style to hide the data in hidden columns */
.hidden {
    display: none;
}
</style>