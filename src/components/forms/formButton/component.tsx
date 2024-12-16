"use client";

import { useFormStatus } from "react-dom";
import { Button } from "../button";
import { ReactNode } from "react";

type FormButtonProps = {
  text: string;
  disabled?: boolean;
};

export function FormButton({ text, disabled }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending || disabled}>
      <strong>{pending ? "Carregando..." : text}</strong>
    </Button>
  );
}
