import { atom } from "recoil";

export const userState = atom({
    key: 'userState',
    default: {
        isLoading: false,
        userEmail: null,
        userId: null
    },
});