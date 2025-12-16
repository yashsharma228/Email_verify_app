<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const activeTab = ref('published')

const logout = () => {
  router.push('/')
}
</script>

<template>
  <div class="dashboard-layout">
    <!-- SIDEBAR -->
    <aside class="sidebar">
      <div class="logo">Productr</div>

      <input class="search" placeholder="Search" />

      <nav class="menu">
        <router-link to="/app/home" class="item" active-class="active">Home</router-link>
        <router-link to="/app/products" class="item" active-class="active">Products</router-link>
      </nav>

    </aside>

    <!-- MAIN -->
    <div class="main">
      <!-- TOP BAR -->
      <header class="topbar">
        <div class="tabs">
          <span
            :class="['tab', activeTab === 'published' && 'active']"
            @click="activeTab = 'published'"
          >
            Published
          </span>
          <span
            :class="['tab', activeTab === 'unpublished' && 'active']"
            @click="activeTab = 'unpublished'"
          >
            Unpublished
          </span>
        </div>

        <div class="profile">
          <button @click="logout">Logout</button>
        </div>
      </header>

      <!-- CONTENT -->
      <main class="content">
        <div class="empty-state">
          <div class="icon">
            <div></div><div></div>
            <div></div><div class="plus">+</div>
          </div>

          <h3>No {{ activeTab }} Products</h3>
          <p>
            Your {{ activeTab }} products will appear here<br />
            Create your first product to publish
          </p>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* LAYOUT */
.dashboard-layout {
  display: flex;
  height: 100vh;
  
  background: #f8fafc;
}

/* SIDEBAR */
.sidebar {
  width: 260px;
  background: #0f172a;
  color: white;
  padding: 20px;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 20px;
}

.search {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: none;
  margin-bottom: 20px;
}

.menu .item {
  padding: 10px;
  color: #cbd5e1;
  cursor: pointer;
}

.menu .item.active {
  color: white;
}

/* MAIN */
.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

/* TOPBAR */
.topbar {
  height: 64px;
  background: linear-gradient(90deg, #fff7ed, #f0f9ff);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  border-bottom: 1px solid #e5e7eb;
}

.tabs {
  display: flex;
  gap: 20px;
}

.tab {
  font-size: 14px;
  cursor: pointer;
  padding-bottom: 8px;
  color: #64748b;
}

.tab.active {
  color: #2563eb;
  border-bottom: 2px solid #2563eb;
}

.profile button {
  background: none;
  border: none;
  cursor: pointer;
  color: #334155;
}

/* CONTENT */
.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}

/* EMPTY STATE */
.empty-state {
  text-align: center;
  color: #475569;
}

.icon {
  display: grid;
  grid-template-columns: repeat(2, 20px);
  gap: 8px;
  justify-content: center;
  margin-bottom: 16px;
}

.icon div {
  width: 20px;
  height: 20px;
  border: 2px solid #1e3a8a;
  border-radius: 4px;
}

.icon .plus {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.empty-state h3 {
  margin-bottom: 6px;
  color: #0f172a;
}
</style>
