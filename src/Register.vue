<template>
  <main>
    <header>
      <h1 class="logo">Secret app</h1>
      <h1>Register</h1>
      <p>Register or log in with email and password</p>
    </header>
    
      <form @submit.prevent="Register">
        <label>
          <span>Enter your Email</span>
          <input type="email" v-model="email" placeholder="text@text.com"/>
        </label>
        <label>
          <span>Enter your Password</span>
          <input type="password" v-model="password" placeholder="**********"/>
        </label>
        <label>
          <span>Confirm your Password</span>
          <input type="password" v-model="confirm_password" placeholder="**********"/>
        </label>
        <input type="submit" value="Register"    /> 
      </form>
    </main>
    <footer>
      <p>Already have an account? <router-link to="/login">Login</router-link></p>
    </footer>
     

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const email = ref('')
const password = ref('')
const confirm_password = ref('')

const Register = async() => {
  if (!email.value || !password.value || !confirm_password.value) {
    return alert('Please fill in all fields')
  }
  if (password.value !== confirm_password.value) {
    return alert('Passwords do not match')
  }

  const res = await fetch('http://localhost:3333/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: email.value,
      password: password.value
    })
  }).then(res => res.json())

  if (res.success) {
    localStorage.setItem('token', res.token);
    router.push('/home');
  } else {
    alert(res.message);
  }
}
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #E11D48;
  color: #fff;
}
header{
  padding: 1.5rem;
}
footer{
  background-color: #fff;
  width:100%;
  color: #111827;
  text-align: center;
  padding: 1.5rem;
  padding-bottom: 3rem;
}
h2 {
  font-size: 2.1rem
}
form {
  flex: 1 1 0%;
  display: block;
  border-radius: 1.5rem 1.5rem 0 0;
  background-color: white;
  box-shadow: 0px -4px 12 px 4px rgba(0,0,0,0.1);
  color: #111827;
  padding: 4rem 1.5rem;
  width: 100%;
}
label {
  display: block;
  margin-bottom: 1.5rem;
}
label span {
  display: block;
  color: #9CA3AF;
  font-size: 1.5rem;
  font-weight:500;
  margin-bottom: 0.5rem;
}
input:not([type="submit"]){
  display: block;
  width:100%;
  border:1px solid #9CA3AF;
  border-radius:0.5rem;
  padding:1.5rem 1rem;
  font-size:1rem;
  font-weight:500;
  color:var(--dark);
  margin-bottom:1.5rem;
}
input:not([type="submit"])::placeholder{
  color: var(--gray);
  font-style:italic;
}
input[type="submit"]{
  display:block;
  width:fit-content;
  margin:0 auto;
  font-size: 1.5rem;
  font-weight:700;
  color:white;
  background-color: #E11D48;
  padding:1rem;
  border-radius:0.5rem;
  cursor:pointer;
  transition:0.2s ease;
}
input[type="submit"]:hover{
  background-color: #ff3366;
}
</style>