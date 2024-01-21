import {defineStore} from 'pinia';
import type {IUser} from "~/types";


interface AuthStore {
    user?: IUser;
}

export const useAuthStore = defineStore('auth-store', {
    state: (): AuthStore => ({
        user: undefined,
    }),
    getters: {},
    actions: {
        getCurrency() {
            const {data} = useFetch('/api/currency');
            if (data.value) {
                this.user = data.value;
            }
        },
        updateCurrency(currency: string) {
            return new Promise((resolve, reject) => {
                useFetch('/api/currency', {
                    method: 'POST',
                    body: {
                        currency
                    }
                }).then((res) => {
                    if (res.data) {
                        this.user = res.data
                    }
                    resolve(res)
                }).catch((err) => {
                    reject(err)
                })
            })
        }
    },
    persist: true,
});