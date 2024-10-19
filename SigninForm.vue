<template>
  <div>
    <!-- Botón para activar el modal con icono -->
    <button
      type="button"
      class="btn mb-3"
      data-bs-toggle="modal"
      data-bs-target="#signinModal"
      style="background-color: transparent; color: white; transition: color 0.3s;"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <span class="iconify" data-icon="mdi:account-circle-outline" data-inline="false"></span>
      <span class="ms-1" :style="{ color: hover ? 'yellow' : 'white' }">SignIn</span>
    </button>

    <div
      class="modal fade"
      id="signinModal"
      tabindex="-1"
      aria-labelledby="signinModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-dark">
          <div class="modal-header">
            <h1 class="modal-title fs-5" id="signinModalLabel">SignIn</h1>
            <button
              type="button"
              class="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>

          <div class="modal-body">
            <form @submit.prevent="handleSignIn">
              <input
                type="email"
                v-model="email"
                class="form-control mb-3"
                placeholder="Email"
                required
              />
              <input
                type="password"
                v-model="password"
                class="form-control mb-3"
                placeholder="******"
                required
              />
              <button class="btn btn-primary w-100 mb-4" type="submit">
                SignIn
              </button>
            </form>

            <div class="container text-center">
              <button
                type="button"
                class="btn btn-info m-2 p-3 google-btn"
                @click="socialLogin('google')"
              >
                <i class="bi bi-google"></i>Google
              </button>

              <button
                type="button"
                class="btn btn-primary m-2 p-3"
                @click="socialLogin('facebook')"
              >
                <i class="bi bi-facebook"></i>Facebook
              </button>

              <button
                type="button"
                class="btn btn-secondary m-2 p-3"
                @click="socialLogin('github')"
              >
                <i class="bi bi-github"></i>Github
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth } from "../firebase"; // Asegúrate de que la ruta a tu archivo firebase.js sea correcta
import { showMessage } from "./ShowMessage"; // Asegúrate de que la ruta a ShowMessage.js sea correcta

export default {
  name: 'SigninForm',
  data() {
    return {
      email: "",
      password: "",
      hover: false, // Inicializar hover para el botón
    };
  },
  methods: {
    async handleSignIn() {
      console.log("Attempting to sign in with:", this.email, this.password);
      try {
        const userCredentials = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );

        console.log("Sign in successful:", userCredentials);
        showMessage(`Welcome back ${userCredentials.user.email}`);

        // Cerrar el modal al iniciar sesión correctamente
        const modal = bootstrap.Modal.getInstance(
          document.getElementById("signinModal")
        );
        modal.hide();
      } catch (error) {
        let errorMessage = "Ocurrió un error al intentar iniciar sesión.";
        console.error("Sign in error:", error);
        switch (error.code) {
          case "auth/user-not-found":
            errorMessage = "No se encontró un usuario con ese correo.";
            break;
          case "auth/wrong-password":
            errorMessage = "Contraseña incorrecta.";
            break;
          case "auth/invalid-email":
            errorMessage = "El correo no es válido.";
            break;
          default:
            errorMessage = `Error: ${error.message}`;
        }
        showMessage(errorMessage, "error");
      }
    },
    socialLogin(provider) {
      showMessage(`Login con ${provider} no implementado aún.`, "info");
    },
  },
};
</script>

<style scoped>
.google-btn {
  background-color: #db4437;
  color: white;
}
.modal-content {
  border-radius: 10px;
}
</style>

