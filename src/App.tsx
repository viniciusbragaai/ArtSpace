import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ArtistThemeProvider } from "@/contexts/ArtistThemeContext";
import { CurrencyProvider } from "@/contexts/CurrencyContext";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { AuthModal } from "@/components/AuthModal";
import { FloatingCart } from "@/components/FloatingCart";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Artistas from "./pages/Artistas";
import Portfolio from "./pages/Portfolio";
import Eventos from "./pages/Eventos";
import About from "./pages/About";
import PinturaPersonalizada from "./pages/PinturaPersonalizada";
import ConsultoriaDeArte from "./pages/ConsultoriaDeArte";
import MuraisCorporativos from "./pages/MuraisCorporativos";
import CuradoriaDeEventos from "./pages/CuradoriaDeEventos";
import TermosDeUso from "./pages/TermosDeUso";
import Privacidade from "./pages/Privacidade";
import Explorar from "./pages/Explorar";
import Carrinho from "./pages/Carrinho";
import Perfil from "./pages/Perfil";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <LanguageProvider>
        <ArtistThemeProvider>
          <CurrencyProvider>
            <AuthProvider>
              <CartProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/artistas" element={<Artistas />} />
                    <Route path="/portfolio" element={<Portfolio />} />
                    <Route path="/eventos" element={<Eventos />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/pinturapersonalizada" element={<PinturaPersonalizada />} />
                    <Route path="/consultoriadearte" element={<ConsultoriaDeArte />} />
                    <Route path="/muraiscorporativos" element={<MuraisCorporativos />} />
                    <Route path="/curadoriadeeventos" element={<CuradoriaDeEventos />} />
                    <Route path="/termosdeuso" element={<TermosDeUso />} />
                    <Route path="/privacidade" element={<Privacidade />} />
                    <Route path="/explorar" element={<Explorar />} />
                    <Route path="/carrinho" element={<Carrinho />} />
                    <Route path="/perfil" element={<Perfil />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                  <AuthModal />
                  <FloatingCart />
                </BrowserRouter>
              </CartProvider>
            </AuthProvider>
          </CurrencyProvider>
        </ArtistThemeProvider>
      </LanguageProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
