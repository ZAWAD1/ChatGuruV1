import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';
import { useAuthStore } from './useAuthStore';

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
            toast.error(error?.response?.data?.messages);

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
            set({ messages: res.data });

        } catch (error) {
            toast.error(error?.response?.data?.messages || error.message);
        } finally {
            set({ isMessagesLoading: false });
        }
    },

    //Send message function
    sendMessage: async (messageData) => {
        const { selectedUser, messages } = get();
        const { authUser } = useAuthStore.getState();

        const tempId = `temp-${Date.now()}`
        const optimisticMessage = {
            _id: tempId,
            senderId: authUser._id,
            reciverId: selectedUser._id,
            text: messageData.text,
            image: messageData.image,
            createdAt: new Date().toISOString(),
            isOptimistic: true,
        }
        set({ messages: [...messages, optimisticMessage] })

        try {
            const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData)
            set({ messages: messages.concat(res.data) });
        } catch (error) {
            set({ messages: messages })
            toast.error(error?.response?.data?.messages || "Something went wrong");

        }
    }
}));
