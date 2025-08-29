import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AuthSuccess = () => {
  const navigate = useNavigate();
  const { checkUserSession } = useUser();

  useEffect(() => {
    const handleOAuthSuccess = async () => {
      try {
        // Check if user session is now active
        await checkUserSession();
        
        // Redirect to home page after a short delay
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 2000);
      } catch (error) {
        console.error("OAuth success handling error:", error);
        navigate("/login", { replace: true });
      }
    };

    handleOAuthSuccess();
  }, [checkUserSession, navigate]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="font-serif text-2xl text-green-600">
                Login Successful!
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-4">
                You have been successfully logged in. Redirecting you to the home page...
              </p>
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage mx-auto"></div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AuthSuccess;