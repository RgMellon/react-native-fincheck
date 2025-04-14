import { AuthProvider } from "@/src/contexts/AuthContext";
import { DashBoardProvider } from "@/src/pages/Dashboard/DashboardContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform } from "react-native";

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
