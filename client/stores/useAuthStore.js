import { defineStore } from "pinia";


const userStorageKey = "user-info";
const tokenKey = "user-token";

export const useAuthStore = defineStore("auth", () => {
  const userInfo = ref({});
  const userToken = ref('');
  const tokenExpiration = ref(null);
  const userId = ref(null);

  const loggedIn = computed(() => {
    return userInfo.value?.access && userToken.value ? true : false;
  });

  function setNewUserInfo(newUserInfo, newUserToken) {
    localStorage.setItem(userStorageKey, JSON.stringify(newUserInfo));
    localStorage.setItem(tokenKey, newUserToken);

    userInfo.value = newUserInfo;
    userToken.value = newUserToken;
  }

  function initializeAuthState() {
    return new Promise((resolve) => {
      if (process.client) {
        const storedToken = localStorage.getItem(tokenKey);
        if (storedToken) {
          try {
            const decodedToken = JSON.parse(atob(storedToken.split(".")[1]));
            const expirationTime = decodedToken.exp * 1000;

            tokenExpiration.value = new Date(expirationTime);
            userId.value = decodedToken.userId || null; // Извлекаем userId из токена

            if (new Date() < tokenExpiration.value) {
              userToken.value = storedToken;
              userInfo.value = JSON.parse(localStorage.getItem(userStorageKey));
            } else {
              clearUserInfo(); // Если токен истек, очищаем данные
            }
          } catch (error) {
            console.error("Error during token decode:", error);
            clearUserInfo();
          }
        }
      }
      resolve();
    });
  }

  async function login(creds) {
    const config = useRuntimeConfig();
    const API_URL = config.public.API_URL;
    try {
      const { data: authorisedUser, error } = await useFetch(API_URL + "/" + "login", {
        method: "post",
        body: JSON.stringify(creds),
      });

      if (error.value) {
        console.error("Login error:", error.value);
        throw new Error("Authentication failed");
      }

      if (authorisedUser.value) {
        userToken.value = authorisedUser.value.token;
        userInfo.value = JSON.parse(atob(userToken.value.split(".")[1]));

        setNewUserInfo(userInfo.value, userToken.value);
        return { success: true };
      }
    } catch (err) {
      console.error("Error during login:", err);
      return { success: false, error: err.message };
    }
  }

  async function logout() {
    const config = useRuntimeConfig();
    const API_URL = config.public.API_URL;

    try {
      const { data, error } = await useFetch(API_URL + "/" + "logout", {
        method: "post",
        headers: {
          Authorization: `Bearer ${userToken.value}`,
        },
      });
    } catch (error) {
      if (error.response && ![401, 403].includes(error.response.status)) {
        alert("Logout failed!");
        throw error;
      }
      clearUserInfo();
    }

    clearUserInfo();
  }

  function clearUserInfo() {
    localStorage.removeItem(userStorageKey);
    localStorage.removeItem(tokenKey);
    userInfo.value = {};
    userToken.value = '';
    userId.value = null;
    tokenExpiration.value = null;
  }

  onMounted(() => {
    initializeAuthState();
  });

  return {
    login,
    logout,
    loggedIn,
    userInfo,
    userToken,
    userId,
    initializeAuthState
  };
});
