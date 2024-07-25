"use client";

import { useState } from "react";
import SignUp from "./SignUp";
import SignIn from "./SignIn";

export default function Auth() {
  const [mode, setMode] = useState("signUp");
  return (
    <main className="w-screen h-screen flex justify-center items-center bg-gradient-to-br from-purple-50 to-light-blue-50">
      {mode === "signUp" ? (
        <SignUp setMode={setMode} />
      ) : (
        <SignIn setMode={setMode} />
      )}
    </main>
  );
}
