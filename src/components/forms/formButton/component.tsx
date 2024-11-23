"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../button";
import { ReactNode } from "react";

type FormButtonProps = {
  text: string;
};

export function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();

  return <Button disabled={pending}>{pending ? "Carregando..." : text}</Button>;
}
