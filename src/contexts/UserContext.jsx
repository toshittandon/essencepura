import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, utils } from "@/services/appwrite";
import { toast } from "sonner";

const UserContext = createContext(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    checkUserSession();
  }, []);

  const checkUserSession = async () => {
    try {
      setIsLoading(true);
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          email: currentUser.email,
          emailVerification: currentUser.emailVerification,
          joinDate: new Date(currentUser.$createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
          }),
          isAdmin: utils.isAdmin(currentUser)
        });
      }
    } catch (error) {
      console.error('No active session:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email, password, name) => {
    try {
      setIsLoading(true);
      await authService.createAccount(email, password, name);
      
      // Get the newly created user
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          email: currentUser.email,
          emailVerification: currentUser.emailVerification,
          joinDate: new Date(currentUser.$createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
          }),
          isAdmin: utils.isAdmin(currentUser)
        });
        
        toast.success("Account created successfully!");
        return currentUser;
      }
    } catch (error) {
      console.error('Signup error:', error);
      toast.error(error.message || "Failed to create account");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      setIsLoading(true);
      await authService.login(email, password);
      
      // Get user details after successful login
      const currentUser = await authService.getCurrentUser();
      if (currentUser) {
        setUser({
          id: currentUser.$id,
          name: currentUser.name,
          email: currentUser.email,
          emailVerification: currentUser.emailVerification,
          joinDate: new Date(currentUser.$createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
          }),
          isAdmin: utils.isAdmin(currentUser)
        });
        
        toast.success("Logged in successfully!");
        return currentUser;
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(error.message || "Failed to log in");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      await authService.logout();
      setUser(null);
      toast.success("Logged out successfully!");
    } catch (error) {
      console.error('Logout error:', error);
      toast.error("Failed to log out");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (updates) => {
    try {
      setIsLoading(true);
      
      // Update name if provided
      if (updates.name && updates.name !== user.name) {
        await authService.updateProfile(updates.name);
      }
      
      // Update email if provided
      if (updates.email && updates.email !== user.email && updates.password) {
        await authService.updateEmail(updates.email, updates.password);
      }
      
      // Update password if provided
      if (updates.newPassword && updates.oldPassword) {
        await authService.updatePassword(updates.newPassword, updates.oldPassword);
      }
      
      // Refresh user data
      const updatedUser = await authService.getCurrentUser();
      if (updatedUser) {
        setUser({
          id: updatedUser.$id,
          name: updatedUser.name,
          email: updatedUser.email,
          emailVerification: updatedUser.emailVerification,
          joinDate: new Date(updatedUser.$createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
          }),
          isAdmin: utils.isAdmin(updatedUser)
        });
        
        toast.success("Profile updated successfully!");
        return updatedUser;
      }
    } catch (error) {
      console.error('Update profile error:', error);
      toast.error(error.message || "Failed to update profile");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const isAuthenticated = !!user;

  return (
    <UserContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated,
        signup,
        login,
        logout,
        updateProfile,
        checkUserSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};