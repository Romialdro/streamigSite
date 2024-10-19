<template>  
  <router-view /> <!-- Aquí se renderizarán las vistas según la ruta -->
</template>

<script>
import NavBar from './components/NavBar.vue';
import Footer from './components/Footer.vue';
import WelcomeItem from './components/WelcomeItem.vue';
import Planes from './components/Planes.vue';
import Carrousel from './components/Carrousel.vue';
import Peliculas from './components/Peliculas.vue';
import SignUpForm from'./components/SignUpForm.vue';
import SigninForm from './components/SigninForm.vue';
import showMessage from './components/ShowMessage';

export default {
  components: {
    NavBar,
    Footer,
    WelcomeItem,
    Planes,
    Carrousel,
    Peliculas,
    SignUpForm,
    SigninForm,
    showMessage,
  },
};
</script>

<style scoped>
/* Estilos específicos de App.vue */
</style>


