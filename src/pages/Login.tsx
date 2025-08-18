import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { login, signup } from '@/lib/api';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    try {
      const res = mode === 'login' ? await login(email, password) : await signup(email, password);
      // Store token simple for demo
      localStorage.setItem('token', res.token);
      navigate('/');
    } catch (e: any) {
      setError(e?.message || 'Failed');
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header onSearch={() => {}} wishlistCount={0} cartCount={0} onShowWishlist={() => {}} onShowCart={() => {}} />
      <div className="container mx-auto px-4 py-16 max-w-md">
        <Card>
          <CardContent className="p-6 space-y-4">
            <h2 className="text-xl font-semibold">{mode === 'login' ? 'Login' : 'Create account'}</h2>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <Input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <Input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <Button type="submit" className="w-full">{mode === 'login' ? 'Login' : 'Sign up'}</Button>
            </form>
            <Button variant="ghost" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')} className="w-full">
              {mode === 'login' ? "Don't have an account? Sign up" : 'Already have an account? Login'}
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

