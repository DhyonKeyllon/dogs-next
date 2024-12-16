"use client";

import { login } from "@/actions/auth";
import { Input } from "@/components/forms";
import { ErrorMessage } from "@/components/helpers";
import Link from "next/link";
import { useFormState } from "react-dom";

import styles from "../login-form.module.css";
import { FormButton } from "@/components/forms/formButton";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [state, action] = useFormState(login, {
    ok: false,
    error: "",
    data: null,
  });

  const { push } = useRouter();

  useEffect(() => {
    if (state.ok) {
      push("/conta");
    }
  }, [state.ok, push]);

  return (
    <>
      <form action={action} className={styles.form}>
        <Input
          label="Usuário"
          InputAttributes={{ name: "username", type: "text" }}
        />
        <Input
          label="Senha"
          InputAttributes={{ name: "password", type: "password" }}
        />
        <ErrorMessage error={state.error} />
        <FormButton text="Entrar" />
      </form>

      <Link href="/login/perdeu" className={styles.perdeu}>
        Perdeu a senha?
      </Link>

      <div className={styles.cadastro}>
        <h2 className={styles.subtitle}>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link href="/login/criar" className="button">
          Cadastro
        </Link>
      </div>
    </>
  );
}
