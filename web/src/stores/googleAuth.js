import { defineStore } from 'pinia';
import { ref } from 'vue';
import { useGoogleAuth } from 'vue3-google-login'; // Assuming composable exists

export const useGoogleAuthStore = defineStore('googleAuth', () => {
  const user = ref(null); // Store user data
  const isAuthenticated = ref(false); // Track login state

  const { signIn } = useGoogleAuth(); // Use composable

  const handleGoogleLogin = async () => {
    try {
      const response = await signIn(); // Trigger Google login
      const token = response.credential;

      // Send the token to backend for verification
      const res = await axios.post('http://localhost:5000/api/auth/google', { token });
      if (res.data.success) {
        user.value = res.data.user;
        isAuthenticated.value = true;
        console.log('Login successful:', res.data.user);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  return { handleGoogleLogin, user, isAuthenticated };
});
