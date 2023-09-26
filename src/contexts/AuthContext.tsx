import  { createContext, useEffect, useState } from 'react';
import Cookie from 'js-cookie';
import axios from 'axios';



type AuthContextType = {
    token: string;
    user: any;
    setToken: (token: string) => void;
    setUser: (user: any) => void;
    saveLogin: (token: string, user: any) => void;
    logout: () => void;
    loading: boolean;
    getMe: ()=> void;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const AuthProvider = ({children} : any) => {
    const [token, setToken] = useState<string>(Cookie.get('token') || '');
    const [user, setUser] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);

    const saveLogin : any = (token : any, user : any) => {
        setToken(token);
        setUser(user);
        Cookie.set('token', token);

    }

    const logout  : any = () => {
        setToken('');
        setUser({});
        Cookie.remove('token');
    }

    const getMe  : any = async () => {
        
        try {
            const res = await axios.get(import.meta.env.VITE_API_URL+'users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setUser(res.data.user);
        } catch (error) {
            logout();
        } 
    }

    useEffect(() => {
        if (token) {
            getMe();
        }
        setLoading(false);
    }, [token]);

        

    return (
        <AuthContext.Provider value={{token,loading,getMe, setToken, user, setUser, saveLogin, logout}}>
            {children}
        </AuthContext.Provider>
    )
}

export { AuthContext, AuthProvider };