"use client";

import React, { useEffect } from "react";
import FeedIcon from "@/icons/feed-icon";
import EstatisticasIcon from "@/icons/estatisticas-icon";
import AdicionarIcon from "@/icons/adicionar-icon";
import SairIcon from "@/icons/sair-icon";
import styles from "./account-header.module.css";
import { useMedia } from "@/hooks/media";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { logout } from "@/actions";
import { useUser } from "@/contexts/user";

function getTitle(pathname: string) {
  switch (pathname) {
    case "/conta/postar":
      return "Poste Sua Foto";
    case "/conta/estatisticas":
      return "Estatísticas";
    default:
      return "Minha Conta";
  }
}

export function ContaHeader() {
  const { setUser } = useUser();

  const mobile = useMedia("(max-width: 40rem)");
  const [mobileMenu, setMobileMenu] = React.useState(false);

  const pathname = usePathname();
  useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  async function handleLogout() {
    await logout();
    setUser(null);
  }

  return (
    <header className={styles.header}>
      <h1 className="title">{getTitle(pathname)}</h1>
      {mobile && (
        <button
          aria-label="Menu"
          className={`${styles.mobileButton} ${
            mobileMenu && styles.mobileButtonActive
          }`}
          onClick={() => setMobileMenu(!mobileMenu)}
        ></button>
      )}

      <nav
        className={`${mobile ? styles.navMobile : styles.nav} ${
          mobileMenu && styles.navMobileActive
        }`}
      >
        <Link href="/conta" className={pathname === "/conta" ? "active" : ""}>
          <FeedIcon />
          {mobile && "Minhas Fotos"}
        </Link>
        <Link
          href="/conta/estatisticas"
          className={pathname === "/conta/estatisticas" ? "active" : ""}
        >
          <EstatisticasIcon />
          {mobile && "Estatísticas"}
        </Link>
        <Link
          href="/conta/postar"
          className={pathname === "/conta/postar" ? "active" : ""}
        >
          <AdicionarIcon />
          {mobile && "Adicionar Foto"}
        </Link>
        <button
          onClick={handleLogout}
          aria-label="Logout"
          type="button"
          className={styles.logoutButton}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleLogout();
            }
          }}
        >
          <SairIcon />
          {mobile && "Sair"}
        </button>
      </nav>
    </header>
  );
}
