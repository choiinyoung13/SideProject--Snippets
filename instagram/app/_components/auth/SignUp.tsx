"use client";

import { Button } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { createBrowserSupabaseClient } from "app/_util/supabase/client";
import { useState } from "react";

export default function SignUp({ setMode }) {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });
  const [confirmationRequired, setConfirmationRequired] = useState(false);

  const supabase = createBrowserSupabaseClient();
  // signup mutation
  const signupMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signUp({
        email: info.email,
        password: info.password,
        options: {
          emailRedirectTo: "http://localhost:3000/signup/confirm",
        },
      });

      if (data) {
        setConfirmationRequired(true);
      }

      if (error) {
        alert(error.message);
      }
    },
  });

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center border border-gray-300 p-10 gap-4 rounded-sm bg-white">
        <img
          src="/images/logo.png"
          alt="instagram logo"
          className="w-[300px] h-auto mb-2"
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-sm"
          placeholder="email"
          type="text"
          onChange={(e) => {
            setInfo((prev) => ({ ...prev, email: e.target.value }));
          }}
        />
        <input
          className="w-full p-2 border border-gray-300 rounded-sm"
          placeholder="password"
          type="password"
          onChange={(e) => {
            setInfo((prev) => ({ ...prev, password: e.target.value }));
          }}
        />
        <Button
          onClick={() => {
            signupMutation.mutate();
          }}
          loading={signupMutation.isPending}
          disabled={confirmationRequired}
          color="light-blue"
          className="text-white w-full text-md"
        >
          {confirmationRequired ? "메일함을 확인해 주세요" : "가입하기"}
        </Button>
      </div>

      <div className="flex gap-2 font-bold mt-4">
        <span>이미 계정이 있으신가요?</span>
        <span
          onClick={() => {
            setMode("signIn");
          }}
          className="text-blue-500 cursor-pointer"
        >
          로그인하기
        </span>
      </div>
    </div>
  );
}
