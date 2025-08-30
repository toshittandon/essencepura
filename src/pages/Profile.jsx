import { useState, useEffect } from "react";
import { User, Package, LogOut, Edit, Mail, Calendar, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUser } from "@/contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { toast } from "sonner";

const Profile = () => {
  const { user, logout, updateProfile, isLoading } = useUser();
  const navigate = useNavigate();
  
  // Edit profile state
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  // Real order history - fetched from backend
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  // Fetch user's real orders
  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.id) {
        setOrdersLoading(false);
        return;
      }

      try {
        // TODO: Replace with your actual API endpoint for fetching user orders
        // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/orders/${user.id}`);
        // const userOrders = await response.json();
        // setOrders(userOrders);
        
        // For now, show empty orders until real API is implemented
        setOrders([]);
      } catch (error) {
        console.error('Error fetching orders:', error);
        setOrders([]);
      } finally {
        setOrdersLoading(false);
      }
    };

    fetchOrders();
  }, [user?.id]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleEditProfile = async (e) => {
    e.preventDefault();
    
    try {
      const updates = {};
      
      // Check if name changed
      if (editForm.name !== user.name) {
        updates.name = editForm.name;
      }
      
      // Check if email changed
      if (editForm.email !== user.email && editForm.currentPassword) {
        updates.email = editForm.email;
        updates.password = editForm.currentPassword;
      }
      
      // Check if password is being updated
      if (editForm.newPassword && editForm.currentPassword) {
        if (editForm.newPassword !== editForm.confirmPassword) {
          toast.error("New passwords do not match");
          return;
        }
        if (editForm.newPassword.length < 8) {
          toast.error("New password must be at least 8 characters long");
          return;
        }
        updates.newPassword = editForm.newPassword;
        updates.oldPassword = editForm.currentPassword;
      }
      
      if (Object.keys(updates).length === 0) {
        toast.error("No changes to save");
        return;
      }
      
      await updateProfile(updates);
      setIsEditDialogOpen(false);
      
      // Reset form
      setEditForm({
        name: user?.name || "",
        email: user?.email || "",
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      
    } catch (error) {
      console.error("Update profile error:", error);
    }
  };

  // Reset form when dialog opens
  const handleEditDialogOpen = () => {
    setEditForm({
      name: user?.name || "",
      email: user?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setIsEditDialogOpen(true);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered": return "bg-green-100 text-green-800";
      case "Processing": return "bg-blue-100 text-blue-800";
      case "Shipped": return "bg-purple-100 text-purple-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Profile Header */}
          <div className="mb-8">
            <h1 className="font-serif text-4xl font-bold text-foreground mb-2">
              My Profile
            </h1>
            <p className="text-muted-foreground">
              Manage your account and view your order history
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* User Info Card */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Account Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="text-lg">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-lg">{user?.name}</h3>
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Mail className="h-4 w-4" />
                    <span>{user?.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>Member since {user?.joinDate}</span>
                  </div>
                  {user?.isAdmin && (
                    <div className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-blue-600" />
                      <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                        Admin
                      </Badge>
                    </div>
                  )}
                  {!user?.emailVerification && (
                    <Badge variant="outline" className="mt-2 text-orange-600 border-orange-600">
                      Email not verified
                    </Badge>
                  )}
                </div>
                
                <div className="space-y-3">
                  <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full" onClick={handleEditDialogOpen}>
                        <Edit className="h-4 w-4 mr-2" />
                        Edit Profile
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit Profile</DialogTitle>
                      </DialogHeader>
                      <form onSubmit={handleEditProfile} className="space-y-4">
                        <div>
                          <Label htmlFor="edit-name">Full Name</Label>
                          <Input
                            id="edit-name"
                            value={editForm.name}
                            onChange={(e) => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="edit-email">Email</Label>
                          <Input
                            id="edit-email"
                            type="email"
                            value={editForm.email}
                            onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="current-password">Current Password</Label>
                          <Input
                            id="current-password"
                            type="password"
                            value={editForm.currentPassword}
                            onChange={(e) => setEditForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                            placeholder="Required for email/password changes"
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="new-password">New Password (optional)</Label>
                          <Input
                            id="new-password"
                            type="password"
                            value={editForm.newPassword}
                            onChange={(e) => setEditForm(prev => ({ ...prev, newPassword: e.target.value }))}
                            placeholder="Leave blank to keep current password"
                          />
                        </div>
                        
                        {editForm.newPassword && (
                          <div>
                            <Label htmlFor="confirm-password">Confirm New Password</Label>
                            <Input
                              id="confirm-password"
                              type="password"
                              value={editForm.confirmPassword}
                              onChange={(e) => setEditForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              placeholder="Confirm your new password"
                            />
                          </div>
                        )}
                        
                        <div className="flex justify-end gap-2 pt-4">
                          <Button type="button" variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                            Cancel
                          </Button>
                          <Button type="submit" disabled={isLoading}>
                            {isLoading ? "Saving..." : "Save Changes"}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                  
                  {user?.isAdmin && (
                    <Button 
                      variant="outline" 
                      className="w-full"
                      onClick={() => navigate("/admin")}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      Admin Dashboard
                    </Button>
                  )}
                  
                  <Button 
                    variant="outline" 
                    className="w-full text-red-600 hover:text-red-700"
                    onClick={handleLogout}
                    disabled={isLoading}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {isLoading ? "Logging out..." : "Logout"}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Order History */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  Order History
                </CardTitle>
              </CardHeader>
              <CardContent>
                {ordersLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sage"></div>
                    <span className="ml-2 text-muted-foreground">Loading orders...</span>
                  </div>
                ) : orders.length === 0 ? (
                  <div className="text-center py-8">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold text-lg mb-2">No orders yet</h3>
                    <p className="text-muted-foreground mb-4">
                      You haven't placed any orders yet. Start shopping to see your order history here.
                    </p>
                    <Button 
                      onClick={() => navigate("/products")}
                      className="bg-sage hover:bg-sage-dark"
                    >
                      Browse Products
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {orders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h4 className="font-semibold">Order {order.id}</h4>
                            <p className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                            <p className="font-semibold mt-1">
                              ${order.total.toFixed(2)}
                            </p>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex justify-between text-sm">
                              <span>{item.name} × {item.quantity}</span>
                              <span>${item.price.toFixed(2)}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;