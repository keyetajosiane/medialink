import { defineStore } from "pinia";
import router from '@/router'; // Import your router if you need to redirect
import axios from 'axios';

export const useDepartmentsStore = defineStore("departments", {
    state: () => ({
        departments: null
    }),
    getters: {
        getDepartments: (state) => state.departments,
        isDepartmentsLoaded: (state) => state.departments !== null
    },
    actions: {
        async initDepartments() {
            try {
                const departments = await fetchDepartments();
                this.setDepartments(departments);
            } catch (error) {
                console.error('Failed to fetch departments', error);
            }
        },
        setDepartments(departments) {
            this.departments = departments;
        }
    }
})

async function fetchDepartments() {
    try {
        const response = await axios.get('departement/departement/get');
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