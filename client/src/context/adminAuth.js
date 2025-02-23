import React, { createContext, useContext, useState } from "react";

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  return useContext(AdminAuthContext);
};

export const AdminAuthProvider = ({ children }) => {
  const [adminAuth, setAdminAuth] = useState(
    JSON.parse(localStorage.getItem("adminAuth")) || { user: null, token: "" }
  );

  return (
    <AdminAuthContext.Provider value={[adminAuth, setAdminAuth]}>
      {children}
    </AdminAuthContext.Provider>
  );
};
