<template>
  <div id="app">
    <!-- Include the TodoList component here -->
    <TodoList />
    <!-- The router-view for your routes (if applicable) -->
    <router-view />
  </div>
</template>

<script>
import TodoList from '@/components/TodoList.vue'; // Import the TodoList component

export default {
  components: {
    TodoList, // Register the TodoList component
  },
};
</script>

<style>
/* Add your global styles here */
</style>
