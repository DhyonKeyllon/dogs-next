"use client";

import { resetPassword } from "@/actions/auth";
import { Input } from "@/components/forms";
import { useFormState } from "react-dom";

import styles from "../login-form.module.css";
import { FormButton } from "@/components/forms/formButton";
import { ErrorMessage } from "@/components/helpers";
import { useEffect, useState } from "react";

export function LoginRedefinirForm() {
  const [state, action] = useFormState(resetPassword, {
    ok: false,
    error: "",
    data: null,
  });

  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href.replace("perdeu", "redefinir"));
  }, []);

  return (
    <form action={action} className={styles.form}>
      <Input
        label="Nova senha"
        InputAttributes={{ name: "password", type: "password" }}
      />

      <ErrorMessage error={state.error} />

      {!state.ok && <FormButton text="Redefinir senha" />}
    </form>
  );
}
