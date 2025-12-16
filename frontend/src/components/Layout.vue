<template>
  <div class="dashboard-layout">
    <aside class="sidebar">
      <div class="logo">Productr</div>

      <div class="search">
        <input type="text" placeholder="Search" />
      </div>

      <nav class="menu">
        <router-link to="/app/home" class="item" active-class="active">Home</router-link>
        <router-link to="/app/products" class="item" active-class="active">Products</router-link>
      </nav>
    </aside>

    <div class="main">
      <header class="topbar">
        <div class="breadcrumbs">
          <span class="crumb">Products</span>
        </div>
        <div class="profile">
          <div class="avatar">P</div>
          <span class="name">Productr</span>
        </div>
      </header>
      <main class="content">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.dashboard-layout {
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
}

.sidebar {
  width: 260px;
  background: #0f172a;
  color: #cbd5e1;
  padding: 20px;
}

.logo {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 20px;
}

.search input {
  width: 100%;
  padding: 8px 10px;
  border-radius: 6px;
  border: none;
  margin-bottom: 20px;
  background: #1e293b;
  color: #e2e8f0;
}

.menu {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.item {
  padding: 10px;
  color: #cbd5e1;
  border-radius: 8px;
}

.item.active,
.item:hover {
  color: #fff;
  background: rgba(255, 255, 255, 0.08);
}

.main {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.topbar {
  height: 64px;
  background: linear-gradient(90deg, #fff7ed, #f0f9ff);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  border-bottom: 1px solid #e5e7eb;
}

.breadcrumbs {
  font-weight: 600;
  color: #0f172a;
}

.profile {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #334155;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #0f172a;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}

.content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

