<template>
    <h2>Todos</h2>

    <p v-for="todo in todos" :key="todo.id">
        <router-link :to="'/todos/' + todo.id">{{ todo.title }}</router-link>
    </p>
</template>

<script>
export default {
    name: 'todosList',

    data(){
        return{
            todos: []
        }
    },

    created(){
        fetch('http://localhost:19384/api/Todo')
        .then(data => data.json())
        .then(todos => {
            this.todos = todos
        })
    }
}
</script>