import { selector } from "recoil";
import { userState } from "../atoms/user";

export const userIdState = selector({
    key: 'userIdState',
    get: ({get})=>{
        const state = get(userState);
        return state.userId;
    }
})

