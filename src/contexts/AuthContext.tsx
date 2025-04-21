import { createContext, useCallback, useEffect, useState } from "react";
import { localStorageKeys } from "../config/localstorageKeys";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userService } from "../services/userService";
import { PageLoader } from "../pages/PageLoader";
import AsyncStorage from "@react-native-async-storage/async-storage";

type AuthContextValue = {
  signin(accessToken: string): void;
  signOut(): void;
  signedIn: boolean;
};

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();

  const [signedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    async function checkSignInStatus() {
      try {
        const token = await AsyncStorage.getItem(localStorageKeys.ACCESS_TOKEN);
        setSignedIn(!!token);
      } catch (err) {
        console.log(err, "err");
      }
    }

    checkSignInStatus();
  }, []);

  const { isFetching, error, isError, isSuccess } = useQuery({
    queryKey: ["users", "me"],
    queryFn: () => userService.me(),
    enabled: signedIn,
    staleTime: Infinity,
  });

  const signin = useCallback(async (accessToken: string) => {
    await AsyncStorage.setItem(localStorageKeys.ACCESS_TOKEN, accessToken);
    setSignedIn(true);
  }, []);

  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem(localStorageKeys.ACCESS_TOKEN);
    queryClient.removeQueries({ queryKey: ["user", "me"] });
    setSignedIn(false);
  }, [queryClient]);

  useEffect(() => {
    if (isError && error) {
      signOut();
    }
  }, [isError, error]);

  if (isFetching) {
    return <PageLoader />;
  }

  return (
    <AuthContext.Provider value={{ signin, signOut, signedIn: isSuccess }}>
      {children}
    </AuthContext.Provider>
  );
}
