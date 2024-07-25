"use client";

import { Button } from "@material-tailwind/react";
import { useMutation } from "@tanstack/react-query";
import { createBrowserSupabaseClient } from "app/_util/supabase/client";
import { useState } from "react";

export default function SignIn({ setMode }) {
  const [info, setInfo] = useState({
    email: "",
    password: "",
  });

  const supabase = createBrowserSupabaseClient();
  // signin mutation
  const signinMutation = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: info.email,
        password: info.password,
      });

      if (data) {
        console.log("success signin");
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
          loading={signinMutation.isPending}
          disabled={signinMutation.isPending}
          onClick={() => {
            signinMutation.mutate();
          }}
          color="light-blue"
          className="text-white w-full text-md"
        >
          로그인
        </Button>
      </div>

      <div className="flex gap-2 font-bold mt-4">
        <span>아직 회원이 아니신가요?</span>
        <span
          onClick={() => {
            setMode("signUp");
          }}
          className="text-blue-500 cursor-pointer"
        >
          회원가입하기
        </span>
      </div>
    </div>
  );
}
