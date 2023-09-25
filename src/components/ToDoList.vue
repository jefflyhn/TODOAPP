<template>
  <div class = "outer-container">
    <div class= "inner-container">
      <div class = "centered-box">
        <div id="app">
          <div class="header">
            <div class="left">
              <h1>TODO APP</h1>
            </div>
            <div class="right">
              <div class="task-buttons">
                <button class="notification-button" disabled>
                  Tasks
                  <span class="notification-badge blue-badge">{{ totalTasks }}</span>
                </button>
                <button class="notification-button" disabled>
                  Done Tasks
                  <span class="notification-badge green-badge">{{ completedTasks }}</span>
                </button>
                <button @click="deleteAllTasks" class="red-button">
                  <i class="fas fa-trash"></i> TASK
                </button>
              </div>
            </div>
          </div>
          <div class="card task-list-container">
            <div class="card-inner">
              <h2>Todo</h2>
              <ul class="list">
                <li class="list-item" :class="{ completed: item.completed }" v-for="item in reversedItems" :key="item.id">
                  <div class="list-item-toggle" @click="toggleCompleted(item)"></div><span>{{ item.name }}</span>
                  <div class="list-item-delete" @click="removeItem(item)">X</div>
                </li>
              </ul>
            </div>
          </div>
          <div class="card">
            <div class="flex">
              <input v-model="newItem" @keyup.enter="addItem" placeholder="New task" />
              <button @click="addItem" :disabled="newItem.length === 0" class="circle-button">
                <span class="plus-sign"></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";

export default {
  setup() {
    const newItem = ref("");
    const items = ref([
      {
        id: 1,
        name: "Clean the fridge",
        completed: false,
      },
      {
        id: 2,
        name: "Walk the dogs",
        completed: true,
      },
    ]);

    const totalTasks = computed(() => items.value.length);
    const completedTasks = computed(() => items.value.filter(item => item.completed).length);

    // Reverse the order of items to display from latest to oldest
    const reversedItems = computed(() => [...items.value].reverse());

    const addItem = () => {
      if (newItem.value.trim() !== "") {
        items.value.push({
          id: items.value.length + 1,
          name: newItem.value,
          completed: false,
        });
        newItem.value = "";
      }
    };

    const toggleCompleted = (item) => {
      item.completed = !item.completed;
    };

    const removeItem = (item) => {
      items.value = items.value.filter((i) => i.id !== item.id);
    };

    const deleteAllTasks = () => {
      items.value = [];
    };


    return {
      newItem,
      items,
      totalTasks,
      completedTasks,
      reversedItems,
      addItem,
      toggleCompleted,
      removeItem,
      deleteAllTasks,
    };
  },
};
</script>

<style scoped>
html,
body {
  margin: 0;
  padding: 0;
  background: #faffff;
  font-size: 16px;
}

* {
  box-sizing: border-box;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
        Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  color: #3d4855;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
}

.container {
  padding: 24px 0;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
}

.card {
  border-radius: 4px;
  box-shadow: 1px 1px 40px -10px #31505f30, 0px 1px 2px 0px #31505f30;
  background: white;
  margin-bottom: 24px;
}

.card-inner {
  padding: 16px 24px;
}

.flex {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

input {
  border-radius: 4px;
  background: transparent;
  border: none;
  width: 100%;
  padding: 14px;
  font-size: 16px;
  border: 1px solid transparent;
  height: 100%;
  display: block;
  outline: none;
}

button {
  background: #4fc08d;
  padding: 10px 22px;
  border: none;
  color: white;
  border-radius: 4px;
  margin: 8px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 1px 1px 15px -2px #212c4430;
  transition: 0.15s;
}

button:hover {
  background: #42aa7b;
}

button:disabled {
  background: #e8e8e8;
  color: #555;
  box-shadow: none;
}

.list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.list-item {
  padding: 12px 16px 12px 16px;
  border: 1px solid #e8e8e8;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 6px;
  border-radius: 4px;
}

.list-item:first-child {
  border-top: 1px solid #e8e8e8;
}

.list-item-toggle {
  border: 1px solid #e8e8e8;
  border-radius: 999px;
  height: 21px;
  width: 21px;
  margin-right: 16px;
}

.list-item-delete {
  margin-left: auto;
  color: tomato;
  margin-top: -2px;
  font-weight: bold;
  text-decoration: none !important;
}

.list-item.completed {
  border: 1px solid #4fc08d;
}

.list-item.completed span {
  text-decoration: line-through;
}

.list-item.completed .list-item-toggle {
  background: #4fc08d;
  border: #4fc08d;
}

.task-buttons {
  text-align: center;
  margin-top: 16px;
}

.notification-button {
  background-color: #42aa7b;
  color: white;
  padding: 10px 22px;
  border: none;
  border-radius: 4px;
  margin: 8px;
  font-size: 16px;
  cursor: pointer;
  box-shadow: 1px 1px 15px -2px #212c4430;
  transition: 0.15s;
  position: relative;
}

.notification-badge {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  font-size: 12px;
  border-radius: 50%;
  padding: 4px;
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.blue-badge {
  background-color: blue;
  color: white;
}

.green-badge {
  background-color: green;
  color: white;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left {
  display: flex;
  align-items: center;
}

.right {
  margin-left: auto;
}

.circle-button {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #4fc08d;
  color: white;
  font-size: 24px;
  border: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center; 
  position: relative; 
}

.circle-button:hover {
  background-color: #42aa7b;
}

.plus-sign::before {
  content: '+'; 
  font-size: 28px; 
  font-weight: bold; 
}

.app-container {
  background-color: #290a63;
  height: 100vh; 
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; 
}

.centered-box {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  padding: 24px;
  box-sizing: border-box;
}

.task-list-container {
  max-height: 400px; 
  overflow-y: auto; 
}

/* Style for the scrollbar */
.task-list-container::-webkit-scrollbar {
  width: 8px; 
}

.task-list-container::-webkit-scrollbar-thumb {
  background-color: #ccc; 
  border-radius: 4px; 
}

.task-list-container::-webkit-scrollbar-thumb:hover {
  background-color: #aaa; 
}
.outer-container {
  background-color: rgb(185, 215, 194);
  height: 100vh; 
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; 
}

.inner-container {
  background-color: white;
  max-width: 800px; 
  width: 100%;
  padding: 20px; 
  border-radius: 8px; 
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2); 
}

.red-button {
  background-color: red;
  color: white;
}

</style>
