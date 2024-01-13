// src/store/user.js
import { defineStore } from 'pinia';
import router from '@/router'; // Import your router if you need to redirect
import axios from 'axios';


export const useUserStore = defineStore('user', {
  state: () => ({
    // Initial user state
    userInfo: null,
    usersList: null,
    permissions: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.userInfo, // Boolean indicating if the user is logged in
    isAdmin: (state) => state.userInfo?.is_admin, // Boolean indicating if the user is an admin
  },
  actions: {
    setUserInfo(info) {
      this.userInfo = info;
    },
    setUsersList(list) {
      this.usersList = list;
    },
    setPermissions(permissions) {
      this.permissions = permissions;
    },
    clearUserInfo() {
      this.userInfo = null;
    },
    // Action to refresh userInfo
    async refreshUserInfo() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const userInfo = await fetchUserInfo(token);
          this.setUserInfo(userInfo);
        } catch (error) {
          // Check if error has a response property with a status code
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            // Handle expired or invalid token
            console.error(`Token error: ${error.message}`, error);
            this.clearUserInfo();
            localStorage.removeItem('token'); // Clear the token from storage

            // Redirect to login page
            router.push('/guess');

            // Optionally, display an error message to the user
            // this.errorMessage = "Your session has expired, please log in again.";
          } else {
            // Handle other types of errors
            console.error('Failed to fetch user info', error);
          }
        }
      }
    },
    async loadUsersList() {
      try {
        const usersList = await fetchUsers();
        this.setUsersList(usersList);
      } catch (error) {
        console.error('Failed to fetch users list', error);
      }
    },
    async loadPermissions() {
      try {
        const permissions = await fetchPermissions();
        this.setPermissions(permissions);
      } catch (error) {
        console.error('Failed to fetch permissions', error);
      }
    }
  },
});


// Utility function (replace with your actual API call)import axios from 'axios';

async function fetchUserInfo(token) {
  try {
    const response = await axios.get('user/user/refresh', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json',
      }
    });
    // Axios automatically throws an error for non-2xx status codes,
    // so you don't need to explicitly check `response.ok` like in the fetch API.
    return response.data;
  } catch (error) {
    // Axios wraps the native Error object, including the response property.
    if (!error.response) {
      throw new Error('Network error or no response received');
    }
    // You can still customize the error message if needed.
    const customError = new Error(`Fetch failed: ${error.response.status} ${error.response.statusText}`);
    customError.response = error.response;
    throw customError;
  }
}

// utility function to load users from backend
async function fetchUsers() {
  try {
    const response = await axios.get('user/user');
    return response.data;
  } catch (error) {
    // Axios wraps the native Error object, including the response property.
    if (!error.response) {
      throw new Error('Network error or no response received');
    }
    // You can still customize the error message if needed.
    const customError = new Error(`Fetch failed: ${error.response.status} ${error.response.statusText}`);
    customError.response = error.response;
    throw customError;
  }
}

// utility function to load permissions from backend
async function fetchPermissions() {
  try {
    
    const response = await axios.get('permissions/permission');
    const permissionsData = response.data.map((permission) => ({
      ...permission,
      group: permission.nom.split('_')[0]
    }));
    return permissionsData;
  } catch (error) {
    // Axios wraps the native Error object, including the response property.
    if (!error.response) {
      throw new Error('Network error or no response received');
    }
    // You can still customize the error message if needed.
    const customError = new Error(`Fetch failed: ${error.response.status} ${error.response.statusText}`);
    customError.response = error.response;
    throw customError;
  }
}