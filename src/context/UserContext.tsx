import React, { createContext, useState, useEffect } from "react";

interface IUser {
  name: string;
  email: string;
}

interface UserContextProps {
  user: IUser | null;
  isLoading: boolean;
}

// Create the context
export const UserContext = createContext<UserContextProps>({
  user: null,
  isLoading: true,
});

// Create a provider component
export const UserProvider = ({ children }: any) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Simulating an asynchronous API call to fetch user data
  useEffect(() => {
    // Simulate the API call delay
    const delay = setTimeout(() => {
      // Simulate successful API response
      setUser({
        name: "John Doe",
        email: "johndoe@example.com",
      });

      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(delay);
  }, []);

  // Define the context value
  const contextValue: UserContextProps = {
    user,
    isLoading,
  };

  // Provide the context value to the children
  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
