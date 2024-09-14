<template>
    <h1>To do list</h1>

    <TodoList :key="todoKey"/>

    <p>
        <input type="text" placeholder="Title" v-model="title"><br>
        <input type="date" placeholder="Date" v-model="date"><br>
        <button @click="saveTodo">Save task</button>
    </p>
</template>

<script>
import TodoList from '@/components/TodoList.vue';

export default {
    components: {
        TodoList
    },

    data(){
        return{
            title:"",
            date: "",
            todoKey: 0,
        }
    },

    methods:{
        saveTodo(){
            const todo = {
                Title: this.title,
                Date: this.date ? new Date(this.date).toISOString() : null
            }

            fetch('http://localhost:19384/api/Todo', {
                method: 'POST',
                body: JSON.stringify(todo),
                headers: { 'Content-Type' : 'application/json'}
            })
            .then(response =>{
                if(!response.ok) {
                    return response.json().then(error => { throw error});
                }
                this.todoKey++;
            })
            .catch(error => {
                console.error('Error from server:', error);
            });
        }
    }
}
</script>