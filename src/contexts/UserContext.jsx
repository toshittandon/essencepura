import React, { createContext, useContext, useState, useEffect } from "react";
import { authService, utils, newsletterService } from "@/services/appwrite";
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
      // Silently handle no active session - this is expected for guest users
      if (error.code !== 401) {
        console.error('Session check error:', error);
      }
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email, password, name, subscribeToNewsletter = false) => {
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

        // Subscribe to newsletter if requested
        if (subscribeToNewsletter) {
          try {
            await newsletterService.subscribe(email, name, 'signup');
          } catch (newsletterError) {
            console.error('Newsletter subscription error:', newsletterError);
            // Don't fail the signup if newsletter subscription fails
          }
        }
        
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

  const login = async (email, password, subscribeToNewsletter = false) => {
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

        // Subscribe to newsletter if requested
        if (subscribeToNewsletter) {
          try {
            await newsletterService.subscribe(currentUser.email, currentUser.name, 'login');
          } catch (newsletterError) {
            console.error('Newsletter subscription error:', newsletterError);
            // Don't fail the login if newsletter subscription fails
          }
        }
        
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

  const loginWithGoogle = async () => {
    try {
      setIsLoading(true);
      await authService.loginWithGoogle();
      // OAuth will redirect, so we don't need to handle the response here
    } catch (error) {
      console.error('Google login error:', error);
      toast.error("Failed to login with Google");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginWithApple = async () => {
    try {
      setIsLoading(true);
      await authService.loginWithApple();
      // OAuth will redirect, so we don't need to handle the response here
    } catch (error) {
      console.error('Apple login error:', error);
      toast.error("Failed to login with Apple");
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
        loginWithGoogle,
        loginWithApple,
        logout,
        updateProfile,
        checkUserSession,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};