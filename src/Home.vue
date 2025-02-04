<template>
    <main>
      <header>
        <h1>Home</h1>
      </header>
      <button @click="logout">Logout</button>
      </main>
  </template>
<script setup>
import {useRouter} from 'vue-router';
const router = useRouter();
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