<template>
    <h1>Single task</h1>

    <input type="text" v-model="title" placeholder="Title"><br>
    <input type="date" v-model="date" placeholder="Date"><br>
    <button @click="updateTask">Update</button>
    <button @click="deleteTask">Delete</button>
</template>

<script>
export default{
    data(){
        return{
            title: "",
            date: "",
        };
    },

    created(){
        const id = this.$route.params.id;

        console.log("Todo ID:", id);  // Log the ID being passed

        fetch('http://localhost:19384/api/Todo/' + id)
            .then(response => {
            console.log("API Response Status:", response.status);  // Log status
            return response.json();
        })
        .then(todo => {
            console.log("Full API Response:", todo);  // Log full API response
        
            this.title = todo.title || "No Title Available";  // Fallback if undefined
            this.date = todo.date ? todo.date.split('T')[0] : "Date Not Available";

            console.log("Assigned Title:", this.title);  // Log assigned data
            console.log("Assigned Content:", this.content);
            console.log("Assigned Date:", this.date);
        })
        .catch(error => {
            console.error("Error fetching todo:", error);
        });
    },

    methods: {
        updateTask(){
            const todo = {
                title: this.title,
                Date: this.date ? new Date(this.date).toISOString() : null,
            };

            const id = this.$route.params.id;
            
                fetch('http://localhost:19384/api/Todo/' + id, {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json'},
                    body: JSON.stringify(todo)
                })
                .then(() => {
                    this.$router.push('/todos')
                });           
            },

        deleteTask() {
            const id = this.$route.params.id;

            fetch('http://localhost:19384/api/Todo/' + id, {
                method: 'DELETE',
            })
            .then(() => {
                this.$router.push('/todos');
            });
        }
        
    }
}
</script>