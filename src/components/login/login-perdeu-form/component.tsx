"use client";

import { forgotPassword } from "@/actions";
import { Input } from "@/components/forms";
import { useFormState } from "react-dom";

import styles from "../login-form.module.css";
import { FormButton } from "@/components/forms/formButton";
import { ErrorMessage } from "@/components/helpers";
import { useEffect, useState } from "react";

export function LoginPerdeuForm() {
  const [state, action] = useFormState(forgotPassword, {
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
        label="Email / Usuário"
        InputAttributes={{ name: "login", type: "text" }}
      />

      <input type="hidden" name="url" value={url} />

      <ErrorMessage error={state.error} />

      {!state.ok && <FormButton text="Enviar email" />}

      {state.ok && (
        <p style={{ color: "#4c1", marginTop: "4px" }}>
          Email enviado com sucesso!
        </p>
      )}
    </form>
  );
}
