import { Toaster } from "@/components/ui/sonner";
import { InstrumentationProvider } from "@/instrumentation.tsx";
import { ConvexAuthProvider } from "@convex-dev/auth/react";
import { ConvexReactClient } from "convex/react";
import { StrictMode, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes, useLocation } from "react-router";
import "./index.css";
import "./types/global.d.ts";

// Lazy load route components for better code splitting
const Landing = lazy(() => import("./pages/Landing.tsx"));
const Programa = lazy(() => import("./pages/Programa.tsx"));
const LinguaPortuguesa = lazy(() => import("./pages/LinguaPortuguesa.tsx"));
const Legislacoes = lazy(() => import("./pages/Legislacoes.tsx"));
const LegislacaoMunicipal = lazy(() => import("./pages/LegislacaoMunicipal.tsx"));
const AuthPage = lazy(() => import("./pages/Auth.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

// Simple loading fallback for route transitions
function RouteLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="animate-pulse text-muted-foreground">Loading...</div>
    </div>
  );
}

const convexUrl = import.meta.env.VITE_CONVEX_URL as string;
let convex: ConvexReactClient | null = null;
if (convexUrl) {
  convex = new ConvexReactClient(convexUrl);
}

function MissingEnvFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-2xl font-bold text-red-500 mb-4">Erro de Configuração</h1>
      <p className="text-muted-foreground max-w-md">
        A variável de ambiente <code>VITE_CONVEX_URL</code> não foi encontrada.
        Para rodar o projeto localmente ou na Vercel, você precisa configurar as variáveis do banco de dados (Convex).
      </p>
      <p className="mt-4 text-sm">
        Crie um arquivo <code>.env</code> na raiz do projeto com o valor fornecido pelo Lovable ou pelo seu banco Convex.
      </p>
    </div>
  );
}



if (!convex) {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <MissingEnvFallback />
    </StrictMode>
  );
} else {
  createRoot(document.getElementById("root")!).render(
    <StrictMode>
      <InstrumentationProvider>
        <ConvexAuthProvider client={convex}>
          <BrowserRouter>
            <Suspense fallback={<RouteLoading />}>
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/programa" element={<Programa />} />
                <Route path="/legislacoes" element={<Legislacoes />} />
                <Route path="/legislacao-municipal" element={<LegislacaoMunicipal />} />
                <Route path="/lingua-portuguesa" element={<LinguaPortuguesa />} />
                <Route path="/auth" element={<AuthPage redirectAfterAuth="/" />} /> {/* TODO: change redirect after auth to correct page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
          <Toaster />
        </ConvexAuthProvider>
      </InstrumentationProvider>
    </StrictMode>,
  );
}
