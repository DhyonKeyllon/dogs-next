"use client";

import { resetPassword } from "@/actions/auth";
import { Input } from "@/components/forms";
import { useFormState } from "react-dom";

import styles from "../login-form.module.css";
import { FormButton } from "@/components/forms/formButton";
import { ErrorMessage } from "@/components/helpers";
import { useEffect, useState } from "react";

type LoginRedefinirFormProps = {
  keyToken: string;
  login: string;
};

export function LoginRedefinirForm({
  keyToken,
  login,
}: LoginRedefinirFormProps) {
  const [state, action] = useFormState(resetPassword, {
    ok: false,
    error: "",
    data: null,
  });

  return (
    <form action={action} className={styles.form}>
      <Input
        label="Nova senha"
        InputAttributes={{ name: "password", type: "password" }}
      />

      <input type="hidden" name="login" value={login} />
      <input type="hidden" name="key" value={keyToken} />

      <ErrorMessage error={state.error} />

      {!state.ok && <FormButton text="Redefinir senha" />}
    </form>
  );
}
