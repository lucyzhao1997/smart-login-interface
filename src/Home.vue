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
        <button class="logout" @click="logout">Logout</button>
      </footer>
     </main>
  </template>
  <style scoped>
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    height: 100vh;
    background: linear-gradient(120deg, #E11D48, #FF3366);
    color: #fff;
    padding: 2rem;
    text-align: center;
  }
  
  header {
    margin-bottom: 2rem;
  }
  
  header h1 {
    font-size: 2.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  header p {
    font-size: 1.25rem;
    font-weight: 400;
  }
  
  .buttons {
    display: flex;
    gap: 1rem;
    margin-top: 2rem;
  }
  
  .buttons button {
    background-color: #fff;
    color: #E11D48;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: background-color 0.3s, transform 0.2s;
  }
  
  .buttons button:hover {
    background-color: #FF3366;
    color: #fff;
    transform: translateY(-3px);
  }
  
  footer {
    margin-top: auto;
  }
  
  footer .logout {
    background-color: transparent;
    color: #fff;
    border: 2px solid #fff;
    padding: 0.75rem 1.5rem;
    border-radius: 0.5rem;
    font-size: 1rem;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.3s, color 0.3s;
  }
  
  footer .logout:hover {
    background-color: #fff;
    color: #E11D48;
  }
  </style>
<script setup>
import {useRouter} from 'vue-router';
const router = useRouter();

const navigateToProfile = () => {
  console.log("Navigating to Profile...");
};

const navigateToSettings = () => {
  console.log("Navigating to Settings...");
};
const logout = async() => {
  const token = localStorage.getItem('token'); // Get the token from localStorage
  console.log('Token retrieved from localStorage:', token);
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