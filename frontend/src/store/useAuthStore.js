import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { data } from 'react-router';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    //loading state
    authUser: null,
    isCheckingAuth: true,
    //Signup state variable
    isSigningUp: false,
    //login state variable
    isLoggingUp: false,


    //auth check
    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })

        } catch (error) {
            console.log("Error in authCheck: ", error)
            set({ authUser: null })

        } finally {
            set({ isCheckingAuth: false })
        }
    },

    //Signup state
    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });

            //toast success message.
            toast.success("Signup successful!")

        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            set({ isSigningUp: false })
        }
    },
    //Login state
    login: async (data) => {
        set({ isLoggingUp: true })
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });

            //toast success message
            toast.success("Login successful!")

        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            set({ isLoggingUp: false })
        }
    },
    //Logout state
    logout: async () => {
        try {
            await axiosInstance.post("/auth/logout");
            toast.success("Logout successful!")
            set({ authUser: null })
        } catch (error) {
            toast.error("Error occurred while logging out")
            console.log("Error in logout: ", error)
        }
    },

    //Update profile
    updateProfile: async (data) => {
        try {
            const res = await axiosInstance.put("/auth/update-profile", data);
            set({ authUser: res.data })

            toast.success("Profile updated successfully!")
        } catch (error) {
            console.log("Error in updateProfile: ", error)
            toast.error("Error occurred while updating profile")
        }
    }

}))