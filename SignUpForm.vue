<template>
  <div>
    <button
      v-if="!user"
      type="button"
      class="btn mb-3"
      data-bs-toggle="modal"
      data-bs-target="#registerModal"
      style="background-color: transparent; color: white; transition: color 0.3s;"
      @mouseover="hover = true"
      @mouseleave="hover = false"
    >
      <span class="iconify" data-icon="mdi:account-plus"></span>
      <span class="ms-1" :style="{ color: hover ? 'yellow' : 'white' }">Register</span>
    </button>

    <button
      v-else
      class="btn btn-danger"
      @click="handleLogout"
    >
      <span class="iconify" data-icon="mdi:logout"></span> Logout
    </button>

    <!-- Modal de Registro -->
    <div
      class="modal fade"
      id="registerModal"
      tabindex="-1"
      aria-labelledby="registerModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content bg-dark text-light" style="opacity: 0.9;">
          <div class="modal-header">
            <h5 class="modal-title" id="registerModalLabel">Register</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="handleRegister">
              <div class="form-outline mb-4">
                <input type="text" v-model="username" class="form-control" required />
                <label class="form-label">Username</label>
              </div>
              <div class="form-outline mb-4">
                <input type="email" v-model="registerEmail" class="form-control" required />
                <label class="form-label">Email</label>
              </div>
              <div class="form-outline mb-4">
                <input type="password" v-model="registerPassword" class="form-control" required />
                <label class="form-label">Password</label>
              </div>
              <button type="submit" class="btn btn-primary w-100">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  createUserWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { auth } from "../firebase";
import { showMessage } from "./showMessage.js";

export default {
  data() {
    return {
      user: null,
      username: "",
      registerEmail: "",
      registerPassword: "",
      hover: false,
    };
  },
  created() {
    // Escuchar cambios en la autenticación del usuario
    onAuthStateChanged(auth, (user) => {
      this.user = user;
    });
  },
  methods: {
    async handleRegister() {
      try {
        const userCredentials = await createUserWithEmailAndPassword(
          auth,
          this.registerEmail,
          this.registerPassword
        );
        showMessage(`Welcome, ${userCredentials.user.email}`);
        this.closeModal();
      } catch (error) {
        this.handleError(error);
      }
    },
    async handleLogout() {
      try {
        await signOut(auth);
        showMessage("You have successfully logged out.");
      } catch (error) {
        console.error("Error signing out:", error);
        showMessage("Error signing out. Please try again.", "error");
      }
    },
    handleError(error) {
      let message = "An error occurred. Please try again.";
      if (error.code === "auth/email-already-in-use") {
        message = "Email is already in use.";
      } else if (error.code === "auth/invalid-email") {
        message = "Invalid email address.";
      } else if (error.code === "auth/weak-password") {
        message = "Password must be at least 6 characters.";
      }
      showMessage(message, "error");
    },
    closeModal() {
      const modal = bootstrap.Modal.getInstance(document.getElementById("registerModal"));
      modal.hide();
    },
  },
};
</script>

<style scoped>
.modal-content {
  background-color: #1a1a1a;
  color: white;
}
</style>


  
  
  