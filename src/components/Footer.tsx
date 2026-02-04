import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Instagram, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-12 md:py-16 border-t border-border bg-card/30">
      <div className="max-w-6xl mx-auto px-4">
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
              {t('footer.description')}
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
            <h3 className="font-semibold mb-4">{t('footer.navigation')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/artistas" className="hover:text-artist-primary transition-colors">{t('footer.artists')}</a></li>
              <li><a href="/portfolio" className="hover:text-artist-primary transition-colors">{t('footer.artworks')}</a></li>
              <li><a href="/explorar" className="hover:text-artist-primary transition-colors">{t('footer.printProducts')}</a></li>
              <li><a href="/eventos" className="hover:text-artist-primary transition-colors">{t('footer.events')}</a></li>
              <li><a href="/about" className="hover:text-artist-primary transition-colors">{t('footer.aboutUs')}</a></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.services')}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><a href="/pinturapersonalizada" className="hover:text-artist-primary transition-colors">{t('footer.customPainting')}</a></li>
              <li><a href="/consultoriadearte" className="hover:text-artist-primary transition-colors">{t('footer.artConsulting')}</a></li>
              <li><a href="/muraiscorporativos" className="hover:text-artist-primary transition-colors">{t('footer.corporateMurals')}</a></li>
              <li><a href="/curadoriadeeventos" className="hover:text-artist-primary transition-colors">{t('footer.eventCuration')}</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.contact')}</h3>
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
          <p>© 2026 ArtSpace. Todos os direitos reservados.</p>
          <div className="flex gap-6">
            <a href="/termosdeuso" className="hover:text-foreground transition-colors">{t('footer.termsOfUse')}</a>
            <a href="/privacidade" className="hover:text-foreground transition-colors">{t('footer.privacy')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
