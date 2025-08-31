import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useUser } from "@/contexts/UserContext";
import SEOHead from "@/components/SEOHead";
import { getSEOData } from "@/utils/seo";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Login = () => {
  const seoData = getSEOData('login');
  
  // Login form state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginSubscribeNewsletter, setLoginSubscribeNewsletter] = useState(true);
  
  // Signup form state
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signupSubscribeNewsletter, setSignupSubscribeNewsletter] = useState(true);
  
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("login");
  
  const { login, signup, isLoading, isAuthenticated } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Get the intended destination or default to home
  const from = location.state?.from?.pathname || "/";

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!loginEmail || !loginPassword) {
      setError("Please fill in all fields");
      return;
    }

    try {
      await login(loginEmail, loginPassword, loginSubscribeNewsletter);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Invalid email or password");
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!signupName || !signupEmail || !signupPassword || !confirmPassword) {
      setError("Please fill in all fields");
      return;
    }

    if (signupPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (signupPassword.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    try {
      await signup(signupEmail, signupPassword, signupName, signupSubscribeNewsletter);
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.message || "Failed to create account");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead {...seoData} />
      <Header />
      
      <main className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <CardTitle className="font-serif text-2xl">
                {activeTab === "login" ? "Welcome Back" : "Create Account"}
              </CardTitle>
              <p className="text-muted-foreground">
                {activeTab === "login" 
                  ? "Sign in to your Essence Pura account"
                  : "Join Essence Pura today"
                }
              </p>
            </CardHeader>
            <CardContent>
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
                
                <TabsContent value="login">

                  <form onSubmit={handleLogin} className="space-y-4">
                    {error && (
                      <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded">
                        {error}
                      </div>
                    )}
                    
                    <div>
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                    </div>

                    {/* Newsletter Subscription Checkbox */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="login-newsletter"
                        checked={loginSubscribeNewsletter}
                        onCheckedChange={setLoginSubscribeNewsletter}
                      />
                      <Label htmlFor="login-newsletter" className="text-sm">
                        Subscribe to our newsletter for beauty tips and exclusive offers
                      </Label>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-sage hover:bg-sage-dark"
                      disabled={isLoading}
                    >
                      {isLoading ? "Signing in..." : "Sign In"}
                    </Button>
                  </form>
                </TabsContent>
                
                <TabsContent value="signup">

                  <form onSubmit={handleSignup} className="space-y-4">
                    {error && (
                      <div className="text-red-600 text-sm text-center bg-red-50 p-3 rounded">
                        {error}
                      </div>
                    )}
                    
                    <div>
                      <Label htmlFor="signup-name">Full Name</Label>
                      <Input
                        id="signup-name"
                        type="text"
                        value={signupName}
                        onChange={(e) => setSignupName(e.target.value)}
                        placeholder="Your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        placeholder="Create a password (min. 8 characters)"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="confirm-password">Confirm Password</Label>
                      <Input
                        id="confirm-password"
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm your password"
                        required
                      />
                    </div>

                    {/* Newsletter Subscription Checkbox */}
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="signup-newsletter"
                        checked={signupSubscribeNewsletter}
                        onCheckedChange={setSignupSubscribeNewsletter}
                      />
                      <Label htmlFor="signup-newsletter" className="text-sm">
                        Subscribe to our newsletter for beauty tips and exclusive offers
                      </Label>
                    </div>
                    
                    <Button
                      type="submit"
                      className="w-full bg-sage hover:bg-sage-dark"
                      disabled={isLoading}
                    >
                      {isLoading ? "Creating account..." : "Create Account"}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Login;