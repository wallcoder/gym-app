import { defineStore } from "pinia";
import { ref } from "vue";
import axios from "axios";

export const useNotifStore = defineStore('notif', () => {
    const notif = ref([])


    const getNotif = async (userId) => {
        console.log("from getNotif", userId)
        try {

            const response = await axios.get(`/user/notif/${userId}`)
            notif.value = response.data
            console.log(notif.value)
        } catch (err) {
            console.log(err)
        }
    }

    const delNotif = async (userId, notifId) => {
        console.log("fromn delNotif: ", userId, notifId)
        try {
            const response = await axios.delete('/user/notif', { userId, notifId })
            console.log("successfully deleted")
        } catch (err) {
            console.log(err)
        }
    }

    const createNotif = async (userId, title, message, link = '', linkContent) => {
        try {
            

            const response = await axios.post('/notif/add', { userId, title, message, link, linkContent })
        } catch (err) {
            console.log(err)
        }
    }

    return { notif, getNotif, delNotif, createNotif }
})