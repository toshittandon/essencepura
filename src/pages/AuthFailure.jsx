import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AuthFailure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Auto redirect to login after 5 seconds
    const timer = setTimeout(() => {
      navigate("/login", { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
                <AlertCircle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="font-serif text-2xl text-red-600">
                Login Failed
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-muted-foreground">
                We couldn't complete your login. This might be due to:
              </p>
              <ul className="text-sm text-muted-foreground text-left space-y-1">
                <li>• You cancelled the login process</li>
                <li>• There was a network issue</li>
                <li>• The authentication provider is temporarily unavailable</li>
              </ul>
              <div className="pt-4">
                <Button asChild className="w-full bg-sage hover:bg-sage-dark">
                  <Link to="/login">
                    Try Again
                  </Link>
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Redirecting to login page in 5 seconds...
              </p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthFailure;