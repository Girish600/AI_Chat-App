// src/AuthContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../FirebaseConfig"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setCurrentUser(user);
            setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
    }, []);

    const value = {
        currentUser,
    };

    return (
        <AuthContext.Provider value={value}>
        {!loading && children}
        </AuthContext.Provider>
    );
};