"use client";

import Link from "next/link";

export default function NotFound() {
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
