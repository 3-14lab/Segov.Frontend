import axios from 'axios';
import {store} from '../store';

// const api = axios.create({ baseURL: 'http://localhost:5000' });
// teste
const api = axios.create({ baseURL: 'https://segov.herokuapp.com/' });

export const inserirUsuario = async (nome, email, telefone, empresa, cpf, senha) => {
    try {
        const response = await api.post('usuarios', {
            nome, email, telefone, empresa, cpf, senha,
        });

        // console.log(response);
        return response.status;
    } catch (error) {
        // console.log(error.response);
        // console.log(error);
        return error.response.status;
    }
}

export const recuperarSenha = async (email) => {
    try {
        const response = await api.post('auth/recuperar-senha', {
            email
        });

        // console.log(response);
        return response.status;
    } catch (error) {
        // console.log(error.response);
        // console.log(error);
        return error.response.status;
    }
}

export const alterarSenha = async (email, token, senha) => {
    try {
        const response = await api.post('auth/alterar-senha', {
            email,
            token,
            senha
        });

        // console.log(response);
        return response.status;
    } catch (error) {
        // console.log(error.response);
        // console.log(error);
        return error.response.status;
    }
}

export const Login = async ( cpf, senha ) => {
    try {
        const response = await api.post('auth/login', {
            cpf, senha
        });

        if(response.status == 200 && response.data.auth){
            const token = response.data.token;
            localStorage.token = token;
        }

        // console.log(response);
        return response.status;
    } catch (error) {
        // console.log(error.response);
        // console.log(error);
        return error.response.status;
    }
}

export const Logout = async () => {
    localStorage.token = null;
}

export const checkToken = async () => {
    // console.log('trying');
    try{
        const token = localStorage.token;

        const response = await api.post('auth/refresh',{},{
            headers:{
                ['x-access-token'] : token
            }
        });

        if(response.data.auth){
            const token = response.data.token;
            localStorage.token = token;

            // console.log(response);
            store.commit('setUser', {cpf: response.data.cpf});
            
            return true;
        }
        else{
            // console.log(response);
            return false;
        }
    }catch(error){
        // console.log(error)
        return false;
    }
}

export const inserirRelatorio = async (cpf, estado, municipio, status, arquivo, erros) =>{
    try {
        const token = localStorage.token;
        await api.post('relatorios',{cpf, estado, municipio, status, arquivo, erros},{
            headers:{
                ['x-access-token'] : token
            }
        });
        // console.log(response);

    } catch (error) {
        // 
    }
}