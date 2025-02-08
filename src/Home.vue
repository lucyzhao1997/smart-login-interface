<template>
    <main>
      <header>
      <h1>Welcome Home</h1>
      <p>Your journey starts here. Explore, engage, and enjoy!</p>
      </header>
      <section class="buttons">
        <button @click="navigateToProfile">Profile</button>
        <button @click="navigateToSettings">Settings</button>
      </section>
      <footer> 
        <button @click="logout">Logout</button>
      </footer>
     </main>
  </template>
<script setup>
import {useRouter} from 'vue-router';
const router = useRouter();

const navigateToProfile = () => {
  // Add your routing logic here
  console.log("Navigating to Profile...");
};

const navigateToSettings = () => {
  // Add your routing logic here
  console.log("Navigating to Settings...");
};
const logout = async() => {
  const res = await fetch('http://localhost:3333/logout', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      token: localStorage.getItem('token')
    })
  }).then(res => res.json())
  if (res.success) {
    localStorage.removeItem('token');
    router.push('/login');
  } else {
    alert(res.message);
  }
}
</script>