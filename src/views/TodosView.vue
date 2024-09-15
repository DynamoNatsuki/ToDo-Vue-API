<template>
    <!-- Main heading for the To-do list view -->
    <h1>To do list</h1>

    <!-- TodoList component is included here with a dynamic key for reactivity -->
    <!-- The key ensures that the TodoList component is re-rendered whenever todoKey changes -->
    <TodoList :key="todoKey"/>

    <p>
        <!-- Input field for the title of the new todo item -->
        <!-- v-model is used for two-way data binding with the 'title' property in the component's data -->
        <input type="text" placeholder="Title" v-model="title"><br>

        <!-- Input field for the date of the new todo item -->
        <!-- v-model is used for two-way data binding with the 'date' property in the component's data -->
        <input type="date" placeholder="Date" v-model="date"><br>

        <!-- Button to trigger the saveTodo method when clicked -->
        <!-- @click directive binds the button click event to the saveTodo method -->
        <button @click="saveTodo">Save task</button>
    </p>
</template>

<script>
// Import the TodoList component from the specified path
import TodoList from '@/components/TodoList.vue';

export default {
    // Register the TodoList component to be used within this view
    components: {
        TodoList
    },

    // Define the reactive state of the component
    data(){
        return {
            // 'title' holds the title of the new todo item
            title: "",
            // 'date' holds the date of the new todo item
            date: "",
            // 'todoKey' is used to force re-rendering of the TodoList component when it changes
            todoKey: 0
        }
    },

    // Define methods for the component
    methods: {
        // Method to save a new todo item
        saveTodo() {
            // Create a new todo object with title and date
            // Convert the date to ISO format if it is not empty, otherwise set it to null
            const todo = {
                Title: this.title,
                Date: this.date ? new Date(this.date).toISOString() : null
            }

            // Make a POST request to the backend API to save the new todo item
            fetch('http://localhost:19384/api/Todo', {
                method: 'POST',
                body: JSON.stringify(todo), // Convert the todo object to a JSON string
                headers: { 'Content-Type': 'application/json' } // Specify the content type as JSON
            })
            .then(response => {
                // Check if the response was successful
                if (!response.ok) {
                    // If not successful, parse and throw an error
                    return response.json().then(error => { throw error });
                }
                // If successful, increment the todoKey to force re-rendering of TodoList component
                this.todoKey++;
            })
            .catch(error => {
                // Log any errors that occur during the fetch or response processing
                console.error('Error from server:', error);
            });
        }
    }
}
</script>