<template>
    <header>
      <h1 class="logo">Secret app</h1>
      <h1>Login</h1>
    </header>
    <main>
      <form @submit.prevent="">
        <label>
          <span>Enter your Email</span>
          <input type="email" v-model="email" placeholder="text@text.com"/>
        </label>
        <label>
          <span>Enter your Password</span>
          <input type="passwordd" v-model="email" placeholder="**********"/>
        </label>
        <input type="submit" value="Login"    />
      </form>
    </main>
    <footer>
      <p>Don't have an account? <router-link to="/register">Register</router-link></p>
    </footer>
     

</template>
<script setup>
import { ref } from 'vue'
const email = ref('')
const password = ref('')
</script>