import React, { useState } from 'react';
import { useAuth, UserRole } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { GraduationCap, Users, Shield, Briefcase } from 'lucide-react';
import heroImage from '@/assets/hero-education.jpg';

const Login: React.FC = () => {
  const [email, setEmail] = useState('a@gmail.com');
  const [password, setPassword] = useState('123456');
  const [selectedRole, setSelectedRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const roles = [
    { value: 'student' as UserRole, label: 'Student', icon: GraduationCap, description: 'Upload and manage your academic credentials' },
    { value: 'faculty' as UserRole, label: 'Faculty/Mentor', icon: Users, description: 'Review and approve student submissions' },
    { value: 'admin' as UserRole, label: 'Admin/Institution', icon: Shield, description: 'Institutional oversight and reporting' },
    { value: 'recruiter' as UserRole, label: 'Recruiter', icon: Briefcase, description: 'Access verified student portfolios' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const success = login(email, password, selectedRole);
      if (!success) {
        setError('Invalid credentials. Use a@gmail.com / 123456 for demo.');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Hero */}
      <div className="hidden lg:flex lg:flex-1 relative">
        <img 
          src={heroImage} 
          alt="Education Platform" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 hero-gradient opacity-90" />
        <div className="relative z-10 flex items-center justify-center p-12">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4 animate-fade-in">
              CredVault
            </h1>
            <p className="text-xl text-white/90 animate-slide-up">
              Secure, Verified, and Gamified Student Achievement System
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login */}
      <div className="flex-1 flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md card-soft">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome Back</CardTitle>
            <CardDescription>
              Choose your role and sign in to access your dashboard
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Role Selection */}
            <div>
              <Label className="text-sm font-medium">Select Your Role</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <Button
                      key={role.value}
                      variant={selectedRole === role.value ? role.value : 'outline'}
                      className="h-auto p-3 flex flex-col items-center space-y-2"
                      onClick={() => setSelectedRole(role.value)}
                    >
                      <Icon className="h-5 w-5" />
                      <span className="text-xs">{role.label}</span>
                    </Button>
                  );
                })}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {roles.find(r => r.value === selectedRole)?.description}
              </p>
            </div>

            {/* Login Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                type="submit"
                variant={selectedRole}
                className="w-full"
                disabled={loading}
              >
                {loading ? 'Signing in...' : `Sign in as ${roles.find(r => r.value === selectedRole)?.label}`}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground">
              <p>Demo credentials:</p>
              <p className="font-mono">a@gmail.com / 123456</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;