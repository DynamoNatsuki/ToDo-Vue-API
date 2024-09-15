<template>
    <h1>Single task</h1>

    <!-- Input field for task title with form validation -->
    <input type="text" v-model="title" placeholder="Title"><br>
    <span v-if="!title && showError" style="color:red">Title is required</span><br>

    <!-- Input field for task date -->
    <input type="date" v-model="date" placeholder="Date"><br>

    <!-- Update and Delete buttons -->
    <button @click="updateTask">Update</button>
    <button @click="deleteTask">Delete</button>
</template>

<script>
export default {
    // Define reactive state for the component
    data() {
        return {
            title: "",       // Holds the task title
            date: "",        // Holds the task date
            showError: false // Tracks whether to show the validation error
        };
    },

    // Fetch the task data when the component is created
    created() {
        const id = this.$route.params.id;  // Get the task ID from the route parameters

        console.log("Todo ID:", id);  // Log the task ID for debugging

        // Fetch the task data from the API
        fetch('http://localhost:19384/api/Todo/' + id)
            .then(response => {
                console.log("API Response Status:", response.status);  // Log API response status
                if (!response.ok) {
                    throw new Error(`Failed to fetch task with status: ${response.status}`);
                }
                return response.json();
            })
            .then(todo => {
                console.log("Full API Response:", todo);  // Log the full API response
                
                // Assign task data to component's state, handling missing fields
                this.title = todo.title || "No Title Available";
                this.date = todo.date ? todo.date.split('T')[0] : "Date Not Available";
            })
            .catch(error => {
                // Handle any errors during the fetch process
                console.error("Error fetching todo:", error);
                alert("Failed to fetch the task. Please try again later.");
            });
    },

    methods: {
        // Method to update the task
        updateTask() {
            // Form validation: Ensure the title is not empty
            if (!this.title) {
                this.showError = true;  // Show validation error message
                return;
            }
            this.showError = false;  // Hide validation error if title is valid

            // Create the updated task object
            const todo = {
                title: this.title,  // Assign updated title
                Date: this.date ? new Date(this.date).toISOString() : null  // Convert date to ISO format
            };

            const id = this.$route.params.id;  // Get the task ID from the route

            // Send a PUT request to update the task on the server
            fetch('http://localhost:19384/api/Todo/' + id, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },  // Set request headers
                body: JSON.stringify(todo)  // Convert the updated task to JSON
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to update task with status: ${response.status}`);
                }
                this.$router.push('/todos');  // Redirect to the todos list after a successful update
            })
            .catch(error => {
                // Handle any errors during the update process
                console.error("Error updating task:", error);
                alert("Failed to update the task. Please try again later.");
            });
        },

        // Method to delete the task
        deleteTask() {
            const id = this.$route.params.id;  // Get the task ID from the route

            // Send a DELETE request to remove the task
            fetch('http://localhost:19384/api/Todo/' + id, {
                method: 'DELETE'
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to delete task with status: ${response.status}`);
                }
                this.$router.push('/todos');  // Redirect to the todos list after a successful deletion
            })
            .catch(error => {
                // Handle any errors during the deletion process
                console.error("Error deleting task:", error);
                alert("Failed to delete the task. Please try again later.");
            });
        }
    }
}
</script>
