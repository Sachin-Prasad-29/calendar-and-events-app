<template>
    <div class="todoPage">
        <NavBar currPage="Todo's"/>
        <v-container>
            <div class="todos">
                <v-row>
                    <v-col cols="12">
                        <v-card flat dense>
                            <v-card-actions>
                                <v-row align="center" justify="center"
                                    >

                                    <v-dialog v-model="dialog" width="500">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn  small text class="ml-4" v-bind="attrs" v-on="on">
                                                <h2 class="ct--text font-weight-medium text-capitalize" >Add new todo</h2>
                                                <v-icon class="ct--text">mdi-plus</v-icon>
                                            </v-btn>
                                        </template>

                                        <v-card>
                                            <v-card-title class="ct--text"> Add Todo </v-card-title>

                                            <v-card-text>
                                                <v-text-field
                                                    type="text"
                                                    v-model="name"
                                                    label="Title"
                                                    placeholder="Enter your todo"
                                                >
                                                </v-text-field>
                                                <v-btn
                                                    color="success"
                                                    elevation="0"
                                                    rounded
                                                    class="text-capitalize"
                                                    @click="add"
                                                >
                                                    <v-icon small left>mdi-plus</v-icon>
                                                    Add
                                                </v-btn>
                                            </v-card-text>
                                        </v-card>
                                    </v-dialog>
                                </v-row></v-card-actions
                            >
                        </v-card>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col cols="12" md="4" sm="6" xs="12" v-for="todo in allTodos" :key="todo._id">
                        <TodoItem :todo="todo" @loadTodos="loadTodos" />
                    </v-col>
                </v-row>
            </div>
        </v-container>
    </div>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import TodoItem from '@/components/TodoItem.vue';
import { getAllTodos, addTodo } from '@/services/todos.services';
import { mapMutations } from 'vuex';
export default {
    name: 'TodoPage',
    components: { NavBar, TodoItem },
    data() {
        return {
            allTodos: [],
            dialog: false,
            name: '',
        };
    },
    mounted() {
        this.loadTodos();
    },
    methods: {
        ...mapMutations(['setIsLoading']),
        async loadTodos() {
            this.setIsLoading(true)
            const response = await getAllTodos();
            this.allTodos = response.todos;
            this.setIsLoading(false)
        },
        async add() {
            const response = await addTodo({ name: this.name });
            if (response.success) {
                this.$toast.success('Item Added Successfully !');
            } else {
                this.$toast.error('Oops! Something error happended');
            }
            this.dialog = false;
            this.name = '';
            await this.loadTodos();
        },
    },
};
</script>