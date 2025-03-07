import {defineStore} from 'pinia';
import {ref} from 'vue';
import { createUser as apiCreateUser} from '../api/CreateUser.api';
import { loginUser as apiLoginUser } from '../api/LoginUser.api';


export const useCreateUserStore = defineStore('CreateUserStore', () => {
    const userCreated: any = ref(null);
    const userLoggedIn: any = ref(null);

    const createUser = async (data: any): Promise<any> => {
        const result = await apiCreateUser(data);
        userCreated.value = result;
        console.log(result);
        return result;
    };

    const loginUser = async (data: any): Promise<any> => {
        const result = await apiLoginUser(data);
        userLoggedIn.value = result;
        console.log(result);
        return result;
    };

    return { createUser, loginUser, userCreated, userLoggedIn };
});
