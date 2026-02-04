import { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Lock, ShieldCheck, Trash2, Plus, Minus } from 'lucide-react';
import { PageLayout } from '@/components/layout/PageLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCart } from '@/contexts/CartContext';
import { useCurrency } from '@/contexts/CurrencyContext';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Carrinho() {
  const { items, totalPriceUSD, updateQuantity, removeItem, clearCart } = useCart();
  const { convertToBRL } = useCurrency();
  const { isAuthenticated, setIsAuthModalOpen } = useAuth();
  const navigate = useNavigate();

  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  // Redirect if not authenticated
  if (!isAuthenticated) {
    return (
      <PageLayout title="Carrinho" subtitle="Finalize sua compra">
        <div className="py-16 text-center">
          <Lock className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
          <h2 className="text-xl font-bold mb-2">Faça login para continuar</h2>
          <p className="text-muted-foreground mb-6">
            Você precisa estar logado para finalizar sua compra.
          </p>
          <Button
            onClick={() => setIsAuthModalOpen(true)}
            className="bg-artist-primary hover:bg-artist-primary/90"
          >
            Entrar ou Cadastrar
          </Button>
        </div>
      </PageLayout>
    );
  }

  if (items.length === 0) {
    return (
      <PageLayout title="Carrinho" subtitle="Seu carrinho está vazio">
        <div className="py-16 text-center">
          <p className="text-muted-foreground mb-6">
            Adicione obras incríveis à sua coleção!
          </p>
          <Button onClick={() => navigate('/')} variant="outline">
            Explorar Obras
          </Button>
        </div>
      </PageLayout>
    );
  }

  const formatCardNumber = (value: string) => {
    return value.replace(/\s/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
  };

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    if (cleaned.length >= 2) {
      return `${cleaned.slice(0, 2)}/${cleaned.slice(2, 4)}`;
    }
    return cleaned;
  };

  return (
    <PageLayout title="Checkout" subtitle="Finalize sua compra com segurança">
      <div className="py-8 grid lg:grid-cols-2 gap-8">
        {/* Cart Items */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold mb-4">Itens do Carrinho</h2>
          {items.map((item) => (
            <motion.div
              key={item.id}
              layout
              className="flex gap-4 p-4 rounded-xl bg-card border border-border"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-24 h-24 object-cover rounded-lg"
              />
              <div className="flex-1">
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.artist}</p>
                <p className="text-xs text-muted-foreground/70 uppercase">{item.sku}</p>
                <div className="flex items-center gap-3 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    <Minus className="w-3 h-3" />
                  </Button>
                  <span className="w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="w-8 h-8"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="w-8 h-8 text-destructive ml-auto"
                    onClick={() => removeItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              <div className="text-right">
                <p className="font-bold text-artist-primary">
                  R$ {convertToBRL(item.priceUSD * item.quantity).toFixed(0)}
                </p>
                <p className="text-xs text-muted-foreground">
                  US$ {(item.priceUSD * item.quantity).toFixed(0)}
                </p>
              </div>
            </motion.div>
          ))}

          <div className="flex items-center justify-between pt-4 border-t border-border">
            <span className="text-lg font-semibold">Total:</span>
            <div className="text-right">
              <p className="text-2xl font-bold text-artist-primary">
                R$ {convertToBRL(totalPriceUSD).toFixed(0)}
              </p>
              <p className="text-sm text-muted-foreground">
                US$ {totalPriceUSD.toFixed(0)}
              </p>
            </div>
          </div>
        </div>

        {/* Payment Form */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span>Pagamento 100% seguro</span>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border">
            <div className="flex items-center gap-2 mb-6">
              <CreditCard className="w-5 h-5 text-artist-primary" />
              <h3 className="font-bold">Cartão de Crédito</h3>
            </div>

            <form className="space-y-4">
              <div>
                <Label htmlFor="cardNumber">Número do Cartão</Label>
                <Input
                  id="cardNumber"
                  placeholder="0000 0000 0000 0000"
                  value={cardData.number}
                  onChange={(e) => setCardData(prev => ({
                    ...prev,
                    number: formatCardNumber(e.target.value)
                  }))}
                  maxLength={19}
                  className="font-mono"
                />
              </div>

              <div>
                <Label htmlFor="cardName">Nome no Cartão</Label>
                <Input
                  id="cardName"
                  placeholder="NOME COMPLETO"
                  value={cardData.name}
                  onChange={(e) => setCardData(prev => ({
                    ...prev,
                    name: e.target.value.toUpperCase()
                  }))}
                  className="uppercase"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="expiry">Validade</Label>
                  <Input
                    id="expiry"
                    placeholder="MM/AA"
                    value={cardData.expiry}
                    onChange={(e) => setCardData(prev => ({
                      ...prev,
                      expiry: formatExpiry(e.target.value)
                    }))}
                    maxLength={5}
                    className="font-mono"
                  />
                </div>
                <div>
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    type="password"
                    placeholder="•••"
                    value={cardData.cvv}
                    onChange={(e) => setCardData(prev => ({
                      ...prev,
                      cvv: e.target.value.replace(/\D/g, '').slice(0, 4)
                    }))}
                    maxLength={4}
                    className="font-mono"
                  />
                </div>
              </div>

              <Button
                type="button"
                className="w-full h-12 mt-6 bg-artist-primary hover:bg-artist-primary/90"
                onClick={() => {
                  alert('Pagamento processado com sucesso! (Simulação)');
                  clearCart();
                  navigate('/');
                }}
              >
                <Lock className="w-4 h-4 mr-2" />
                Pagar R$ {convertToBRL(totalPriceUSD).toFixed(0)}
              </Button>
            </form>
          </div>

          <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground">
            <img src="https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.0.0/flags/4x3/br.svg" alt="BR" className="w-6 h-4" />
            <span>Processado no Brasil</span>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
