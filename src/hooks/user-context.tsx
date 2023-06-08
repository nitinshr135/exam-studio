import { account } from "@/appwrite/appwriteConfig";
import { AppwriteException, Models } from "appwrite";
import { useRouter } from "next/router";
import React, {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

export interface IUserState {
  user: any;
  loading: boolean;
  error: string | null;
  logout: () => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
}

const defaultState: IUserState = {
  user: null,
  loading: true,
  error: null,
  logout: async () => {},
  signup: async () => {},
  login: async () => {},
};

const UserContext = createContext<IUserState>(defaultState);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { push } = useRouter();

  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState("");

  const loadAccount = async () => {
    try {
      const loadedAccount = await account.get();
      setUser(loadedAccount);
    } catch (error) {
      console.error(error);
      push("/login");
      setError("failed to load user");
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      await account.createEmailSession(email, password);
      await loadAccount();
      push("/home");
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      const appwriteException = error as AppwriteException;
      console.error(appwriteException.message);
    }
  };

  const signup = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      const session = await account.create("unique()", email, password, name);
      setUser(session);
      await account.createEmailSession(email, password);
      push("/");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };

  const anonymousSignup = async () => {
    setLoading(true);
    const promise = account.createAnonymousSession();
    promise.then(
      function (response) {
        console.log(response);
      },
      function (error) {
        console.log(error);
      }
    );
    setLoading(false);
  };

  const logout = async () => {
    await account.deleteSession("current");
    setUser(null);
    push("/login");
  };

  useEffect(() => {
    loadAccount();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UserContext.Provider
      value={{ user, loading, error, logout, login, signup }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const UseUser = () => {
  const context = useContext<IUserState>(UserContext);
  return context;
};
