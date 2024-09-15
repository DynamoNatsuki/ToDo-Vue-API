<template>
    <h2>Todos</h2>

    <!-- Loop through each todo and display it -->
    <!-- We use the :key to ensure efficient rendering by Vue when the list changes -->
    <div v-for="todo in todos" :key="todo.id" class="todo-item">
        <!-- The task title is clickable and toggles a strikethrough when clicked -->
        <!-- :class applies the 'strikethrough' class if the task is marked as completed (i.e., its ID is in completedTasks) -->
        <p @click="toggleStrike(todo.id)" 
           :class="{ 'strikethrough': completedTasks.includes(todo.id) }" 
           class="todo-title">
            {{ todo.title }}  <!-- Display the task title -->
        </p>

        <!-- A button that links to the task's details page using the task's ID -->
        <!-- router-link is used to navigate to the detail view of the task -->
        <router-link :to="'/todos/' + todo.id">
            <button>Details</button>
        </router-link>
    </div>
</template>

<script>
export default {
    name: 'TodoList',  // Component name

    data() {
        return {
            todos: [],                // Array to store the list of tasks fetched from the API
            completedTasks: []         // Array to track tasks that have been toggled with strikethrough
        };
    },

    created() {
        // The created lifecycle hook is called after the component is initialized
        // Here we fetch the list of todos from the API when the component is created
        fetch('http://localhost:19384/api/Todo')
            .then(data => data.json())  // Convert the response data to JSON format
            .then(todos => {
                this.todos = todos;     // Set the fetched todos to the local 'todos' array
            })
            .catch(error => {
                console.error('Error fetching todos:', error);  // Handle any errors during the fetch
            });
    },

    methods: {
        // This method toggles the strikethrough for a task when the title is clicked
        toggleStrike(id) {
            // Check if the task's ID is already in the 'completedTasks' array
            if (this.completedTasks.includes(id)) {
                // If the task is already marked as completed (i.e., strikethrough is applied), remove its ID
                this.completedTasks = this.completedTasks.filter(taskId => taskId !== id);
            } else {
                // If the task is not marked as completed, add its ID to the 'completedTasks' array
                this.completedTasks.push(id);
            }
        }
    }
};
</script>

<style>
/* Style for the strikethrough class */
.strikethrough {
    text-decoration: line-through;  /* Apply strikethrough to the text when the class is added */
}

/* Style for each todo item */
.todo-item {
    display: flex;                  /* Flexbox to align title and button side-by-side */
    justify-content: center;    /* Space out the title and the details button */
    align-items: center;            /* Vertically align the items in the center */
    gap: 10px;
    margin-bottom: 10px;            /* Add some margin below each task for spacing */
}

button{
    margin-left: auto;
    width: 100px;
}

/* Style for the task title */
.todo-title {
    cursor: pointer;                /* Make the title cursor appear as a pointer to indicate it's clickable */
}
</style>
