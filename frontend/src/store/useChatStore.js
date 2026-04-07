import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useChatStore = create((set, get) => ({
    allContacts: [],
    chats: [],
    messages: [],
    activeTab: "chats",
    selectedUser: null,
    isUsersLoading: false,
    isMessagesLoading: false,
    isSoundEnabled: JSON.parse(localStorage.getItem('isSoundEnabled') === 'true'),

    //toggle sound function
    toggleSound: () => {
        localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
        set({ isSoundEnabled: !get().isSoundEnabled });
    },

    //Selected tabs
    setActiveTab: (tab) => set({ activeTab: tab }),
    setSelectedUser: (selectedUser) => set({ selectedUser: selectedUser }),

    //get all contacts
    getAllContacts: async () => {
        //initial userlodaing - true
        set({ isUsersLoading: true });

        try {
            const res = await axiosInstance.get("/messages/contacts");
            set({ allContacts: res.data });

        } catch (error) {
            toast.error(error.response.data.messages);

        } finally {
            set({ isUsersLoading: false })
        }
    },

    //get all chat partners
    getAllChatPartners: async () => {
        //initial userlodaing - true
        set({ isUsersLoading: true });

        try {
            const res = await axiosInstance.get("/messages/chats");
            set({ chats: res.data })

        } catch (error) {
            toast.error(error.response.data.messages);

        } finally {
            set({ isUsersLoading: false })
        }
    },

    //get messages of users
    getMessagesByUserId: async (userId) => {
        set({ isMessagesLoading: true });

        try {
            const res = await axiosInstance.get(`/messages/${userId}`);
            console.log("API response: ", res.data);
            set({ messages: res.data || res.data.messages });

        } catch (error) {
            toast.error(error?.response?.data?.messages || error.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    }
}));
