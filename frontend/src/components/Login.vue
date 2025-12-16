<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import heroImg from '../assets/image.png'

const router = useRouter()
const email = ref('')
const otp = ref('')
const showOtp = ref(false)
const message = ref('')

const sendOtp = async () => {
  showOtp.value = true
  message.value = 'OTP sent to your email'
}

const verifyOtp = async () => {
  // Simulate successful login
  router.push('/app/home')
}
</script>

<template>
  <div class="auth-wrapper">
    <!-- LEFT PANEL -->
    <div class="left-panel">
      <div class="brand">
        <span class="logo">Productr</span>
      </div>

      <div class="image-card">
        <img :src="heroImg" alt="banner" />
        <p>Uplist your product to market</p>
      </div>
    </div>

    <!-- RIGHT PANEL -->
    <div class="right-panel">
      <h2>Login to your Productr Account</h2>

      <form v-if="!showOtp" @submit.prevent="sendOtp">
        <label>Email or Phone number</label>
        <input
          type="email"
          placeholder="Enter email or phone number"
          v-model="email"
          required
        />
        <button>Login</button>
      </form>

      <form v-else @submit.prevent="verifyOtp">
        <label>Enter OTP</label>
        <input
          type="text"
          placeholder="Enter OTP"
          v-model="otp"
          required
        />
        <button>Verify OTP</button>
      </form>

      <p class="msg" v-if="message">{{ message }}</p>

      <div class="signup-box">
        Don’t have a Productr Account?
        <a href="#">SignUp Here</a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.auth-wrapper {
  display: flex;
  min-height: 100vh;
  background: #f6f7fb;
}

/* LEFT */
.left-panel {
  flex: 1;
  background: linear-gradient(135deg, #ecebff, #fde2d9);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px;
}

.brand {
  width: 100%;
  font-size: 22px;
  font-weight: 700;
  color: #0a1b6f;
}

.image-card {
  margin-top: 80px;
  background: #fff;
  border-radius: 24px;
  padding: 20px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0,0,0,0.15);
}

.image-card img {
  width: 220px;
  border-radius: 20px;
}

.image-card p {
  margin-top: 12px;
  font-weight: 600;
}

/* RIGHT */
.right-panel {
  flex: 1;
  background: #fff;
  padding: 100px 80px;
}

.right-panel h2 {
  margin-bottom: 30px;
  color: #0a1b6f;
}

label {
  display: block;
  font-size: 14px;
  margin-bottom: 6px;
}

input {
  width: 100%;
  padding: 12px;
  margin-bottom: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
}

button {
  width: 100%;
  background: #0a1b6f;
  color: #fff;
  padding: 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
}

button:hover {
  background: #132fa4;
}

.signup-box {
  margin-top: 40px;
  border: 1px dashed #ccc;
  padding: 16px;
  text-align: center;
  border-radius: 10px;
  font-size: 14px;
}

.signup-box a {
  color: #0a1b6f;
  font-weight: 600;
  margin-left: 4px;
}

.msg {
  margin-top: 20px;
  color: green;
}
</style>