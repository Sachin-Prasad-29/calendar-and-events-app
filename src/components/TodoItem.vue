<template>
    <div class="todoItem">
        <v-card class="mx-auto" max-width="350" elevation="1" outlined >
            <v-card-actions>
                <v-row
                    align="center"
                    justify="center"
                    class="ma-1"
                    :class="{ 'text-decoration-line-through': todo.completed }"
                >
                    {{ todo.name }}
                </v-row>
            </v-card-actions>

            <v-card-actions>
                <v-row align="center" justify="center">
                    <v-tooltip bottom color="error">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                fab
                                x-small
                                text
                                color="error"
                                class="mx-2 mb-2"
                                @click="onDelete"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon> mdi-delete-outline </v-icon>
                            </v-btn>
                        </template>
                        <span>Delete</span> </v-tooltip
                    ><v-tooltip bottom color="success">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                fab
                                x-small
                                text
                                color="success"
                                class="mx-2 mb-2"
                                @click="complete"
                                :disabled="todo.completed === true"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon> mdi-check-outline </v-icon>
                            </v-btn>
                        </template>
                        <span>Mark as Complete</span> </v-tooltip
                    ><v-tooltip bottom color="orange">
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                                fab
                                x-small
                                text
                                color="orange"
                                class="mx-2 mb-2"
                                @click="unComplete"
                                :disabled="todo.completed === false"
                                v-bind="attrs"
                                v-on="on"
                            >
                                <v-icon> mdi-close </v-icon>
                            </v-btn>
                        </template>
                        <span>Mark as Uncomplete</span>
                    </v-tooltip>
                </v-row>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
import { deleteTodo, editTodo } from '@/services/todos.services.js';
export default {
    name: 'TodoItem',
    props: ['todo'],
    data() {
        return {
            id: this.todo._id,
        };
    },
    methods: {
        async onDelete() {
            this.spinner = this.$loading.show(this.$spinner);
            const response = await deleteTodo(this.id);
            if (response.success) {
                this.$toast.success('Item Deleted Successfully !');
            } else {
                this.$toast.error('Oops! Something error happended');
            }
            this.$emit('loadTodos');
            this.spinner.hide();
        },
        async complete() {
            this.spinner = this.$loading.show(this.$spinner);
            const data = { completed: true };
            const response = await editTodo(this.id, data);
            if (response.success) {
                this.$toast.success('Item marked completed !');
            } else {
                this.$toast.error('Oops! Something error happended');
            }
            this.$emit('loadTodos');
            this.spinner.hide();
        },
        async unComplete() {
            this.spinner = this.$loading.show(this.$spinner);
            const data = { completed: false };
            const response = await editTodo(this.id, data);
            if (response.success) {
                this.$toast.success('Item marked Uncompleted !');
            } else {
                this.$toast.error('Oops! Something error happended');
            }
            this.$emit('loadTodos');
            this.spinner.hide();
        },
    },
};
</script>

<style></style>
