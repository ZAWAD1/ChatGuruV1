import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import { data } from 'react-router';
import toast from 'react-hot-toast';

export const useAuthStore = create((set) => ({
    //loading state
    authUser: null,
    isCheckingAuth: true,
    //Signup state
    isSigningUp: false,


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

            //toast
            toast.success("Signup successful!")
        } catch (error) {
            toast.error(error.response.data.message)

        } finally {
            set({ isSigningUp: false })
        }
    }
}))