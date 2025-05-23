import { useAuth } from "@/src/hooks/useAuth";
import "../global.css";

import { Redirect } from "expo-router";

export default function Index() {
  const { signedIn } = useAuth();

  console.log("sign", signedIn);

  if (signedIn) {
    return <Redirect href="/dashboard" />;
  }

  return <Redirect href="/auth/sign-in" />;
}
