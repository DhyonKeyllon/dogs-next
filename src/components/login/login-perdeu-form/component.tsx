"use client";

import { resetPassword } from "@/actions/auth";
import { Input } from "@/components/forms";
import { useFormState } from "react-dom";

import styles from "../login-form.module.css";
import { FormButton } from "@/components/forms/formButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LoginPerdeuForm() {
  const { push } = useRouter();

  const [state, action] = useFormState(resetPassword, {
    ok: false,
    error: "",
    data: null,
  });

  useEffect(() => {
    if (state.ok) {
      push("/conta");
    }
  }, [state.ok, push]);

  return (
    <form action={action} className={styles.form}>
      <Input
        label="Email / Usuário"
        InputAttributes={{ name: "login", type: "text" }}
      />

      <FormButton text="Enviar email" />
    </form>
  );
}
