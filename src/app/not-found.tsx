"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NotFound() {
  const pathname = usePathname();

  console.log({ pathname });

  return (
    <section className="container">
      <h1 className="title">Pagina não encontrada</h1>

      <Link
        href={"/"}
        className="button"
        style={{
          display: "inline-block",
          marginTop: "1rem",
        }}
      >
        Volte para a pagina inicial.
      </Link>
    </section>
  );
}
