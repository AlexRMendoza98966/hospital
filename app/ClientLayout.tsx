"use client";
import { AuthProvider } from "../context/AuthContext";
import { FooterConditional } from "../components/footer/FooterConditional";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      {children}
      <FooterConditional />
    </AuthProvider>
  );
}
