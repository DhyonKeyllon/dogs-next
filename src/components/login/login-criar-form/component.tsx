"use client";

import { createUser } from "@/actions";
import { Input } from "@/components/forms";
import { ErrorMessage } from "@/components/helpers";
import { useFormState } from "react-dom";

import styles from "../login-form.module.css";
import { FormButton } from "@/components/forms/formButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LoginCriarForm() {
  const { push } = useRouter();

  const [state, action] = useFormState(createUser, {
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
        label="Usuário"
        InputAttributes={{ name: "username", type: "text" }}
      />
      <Input label="Email" InputAttributes={{ name: "email", type: "text" }} />
      <Input
        label="Senha"
        InputAttributes={{ name: "password", type: "password" }}
      />
      <ErrorMessage error={state.error} />
      <FormButton text="Cadastrar" />
    </form>
  );
}
