<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-dark text-light">
    <div class="container-fluid">
      <!-- Sidebar dentro del Navbar -->
      <div class="d-flex align-items-center">
        <div class="dropdown" @mouseleave="hidePlanes">
          <button
            class="btn btn-dark dropdown-toggle"
            type="button"
            id="dropdownMenuButton"
            @click="toggleMenu"
            aria-expanded="false"
            style="width: 100%; border: none; outline: none;"
          >
            Menu
          </button>
          <transition name="fade">
            <ul
              v-if="menuVisible"
              class="dropdown-menu dropdown-menu-dark show"
              aria-labelledby="dropdownMenuButton"
              @click.self="toggleMenu"
            >
              <li>
                <router-link to="/" class="dropdown-item" @click="toggleMenu">
                  <i class="fs-4 bi-house"></i>
                  <span class="ms-1">Inicio</span>
                </router-link>
              </li>
              <li>
                <router-link 
                  to="/peliculas" 
                  class="dropdown-item"
                  @click="toggleMenu"
                >
                  <i class="fs-4 bi-film"></i>
                  <span class="ms-1">Películas</span>
                </router-link>
              </li>
              <li @mouseover="showPlanesMenu" @mouseleave="hidePlanes">
                <a href="#" class="dropdown-item">
                  <i class="fs-4 bi-shield-lock"></i>
                  <span class="ms-1">Membresía</span>
                </a>
                <transition name="fade">
                  <ul>
                    <Planes v-if="showPlanes" />
                  </ul>
                </transition>
              </li>
              <li>
                <a href="#" class="dropdown-item">
                  <i class="fs-4 bi-star"></i>
                  <span class="ms-1">Favoritos</span>
                </a>
              </li>
            </ul>
          </transition>
        </div>
      </div>

      <!-- Logo centrado -->
      <div class="mx-auto">
        <a class="navbar-brand mt-2 mt-lg-0 d-flex align-items-center" href="#">
          <span
            class="iconify"
            data-icon="mdi:movie-open-outline"
            data-inline="false"
            style="font-size: 30px; color: #ffcc00; margin-right: 8px;"
          ></span>
          <span class="text-light fs-4 fw-bold">Cinefree</span>
        </a>
      </div>

      <!-- Menú SignIn, SignUp y Logout -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item" v-if="!isLoggedIn">
            <SigninForm @loginSuccess="handleLoginSuccess" />
          </li>
          <li class="nav-item" v-if="!isLoggedIn">
            <SignUpForm />
          </li>
          <li class="nav-item" v-if="isLoggedIn">
            <router-link
              to="/logout"
              class="nav-link"
              id="logout"
              @click="handleLogout"
            >
              <span
                class="iconify"
                data-icon="mdi:logout"
                data-inline="false"
              ></span>
              <span class="ms-1">Logout</span>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <LoginModal ref="loginModal" @loginSuccess="handleLoginSuccess" />
  </nav>
</template>

<script>
import SignUpForm from './SignUpForm.vue';
import Planes from './Planes.vue';
import SigninForm from './SigninForm.vue';

export default {
  components: {
    SignUpForm,
    SigninForm,
    Planes,
  },
  data() {
    return {
      isLoggedIn: false,
      menuVisible: false,
      showPlanes: false,
    };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    showPlanesMenu() {
      this.showPlanes = true;
    },
    hidePlanes() {
      this.showPlanes = false;
    },
    handleLoginSuccess() {
      localStorage.setItem('userLogged', 'true');
      this.isLoggedIn = true;
      this.updateNavigation();
    },
    handleLogout() {
      localStorage.removeItem('userLogged');
      this.isLoggedIn = false;
      this.updateNavigation();
    },
    checkLoginStatus() {
      this.isLoggedIn = localStorage.getItem('userLogged') === 'true';
      this.updateNavigation();
    },
    updateNavigation() {
      // Actualiza la navegación en función del estado de inicio de sesión
      this.isLoggedIn ? this.showLoggedInLinks() : this.showLoggedOutLinks();
    },
    showLoggedInLinks() {
      // Mostrar enlaces para usuarios logueados
      this.$nextTick(() => {
        document.querySelectorAll('.logged-in').forEach(link => link.style.display = 'block');
        document.querySelectorAll('.logged-out').forEach(link => link.style.display = 'none');
      });
    },
    showLoggedOutLinks() {
      // Mostrar enlaces para usuarios no logueados
      this.$nextTick(() => {
        document.querySelectorAll('.logged-out').forEach(link => link.style.display = 'block');
        document.querySelectorAll('.logged-in').forEach(link => link.style.display = 'none');
      });
    },
  },
  mounted() {
    this.checkLoginStatus();
  },
};
</script>

<style scoped>
.navbar {
  transition: background-color 0.3s ease;
}
.nav-link {
  transition: color 0.3s ease;
  color: white;
}
.nav-link:hover {
  color: #ffcc00;
}
.dropdown-menu {
  min-width: 250px;
}
</style>




