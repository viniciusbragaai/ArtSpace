import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="py-12 md:py-16 border-t border-border bg-card/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Brand */}
          <div className="md:col-span-1">
            <motion.h2
              whileHover={{ scale: 1.02 }}
              className="text-2xl font-bold neon-text animate-pulse-neon text-artist-primary mb-4"
            >
              ArtSpace
            </motion.h2>
            <p className="text-muted-foreground text-sm mb-4">
              Galeria de arte moderna e street art em Santos. 
              Conectando artistas e colecionadores desde 2020.
            </p>
            <div className="flex gap-3">
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-artist-primary/20 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-muted hover:bg-artist-primary/20 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Navegação</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-artist-primary transition-colors">Artistas</a></li>
              <li><a href="#" className="hover:text-artist-primary transition-colors">Obras</a></li>
              <li><a href="#" className="hover:text-artist-primary transition-colors">Prints & Produtos</a></li>
              <li><a href="#" className="hover:text-artist-primary transition-colors">Eventos</a></li>
              <li><a href="#" className="hover:text-artist-primary transition-colors">Sobre Nós</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">Serviços</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-artist-primary transition-colors">Pintura Personalizada</a></li>
              <li><a href="#" className="hover:text-artist-primary transition-colors">Consultoria de Arte</a></li>
              <li><a href="#" className="hover:text-artist-primary transition-colors">Murais Corporativos</a></li>
              <li><a href="#" className="hover:text-artist-primary transition-colors">Curadoria de Eventos</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-artist-primary" />
                <span>Rua do Porto, 123<br />Centro - Santos/SP</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-artist-primary" />
                <span>(13) 3333-4444</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-artist-primary" />
                <span>contato@artspace.com.br</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© 2024 ArtSpace. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground transition-colors">Termos de Uso</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacidade</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
