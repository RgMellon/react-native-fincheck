import "../global.css";

import { Redirect } from "expo-router";

export default function Index() {
  const isAuth = true;

  if (isAuth) {
    return <Redirect href="/auth/sign-in" />;
  }

  //   return <Redirect href="//sign-in" />;
}
