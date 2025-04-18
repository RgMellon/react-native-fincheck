import { AuthProvider } from "@/src/contexts/AuthContext";
import { DashBoardProvider } from "@/src/pages/Dashboard/DashboardContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";
import Toast from "react-native-toast-message";
import FlashMessage, { showMessage } from "react-native-flash-message";
export default function RootLayout() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
        refetchOnWindowFocus: false,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar style={Platform.OS === "ios" ? "light" : "auto"} />

      <AuthProvider>
        <DashBoardProvider>
          <FlashMessage position="top" />
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </DashBoardProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
