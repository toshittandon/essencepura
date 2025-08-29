import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useProducts } from "@/contexts/ProductContext";
import { utils } from "@/services/appwrite";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Plus, Edit, Trash2, Upload, Loader2 } from "lucide-react";
import { toast } from "sonner";

const Admin = () => {
  const {
    products,
    isLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    uploadProductImage,
    fetchProducts
  } = useProducts();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    originalPrice: "",
    description: "",
    category: "",
    stock: "",
    ingredients: "",
    benefits: "",
    isBestseller: false,
    isNew: false
  });

  const categories = [
    "Cleansers",
    "Serums", 
    "Moisturizers",
    "Eye Care",
    "Masks",
    "Toners"
  ];

  useEffect(() => {
    fetchProducts();
  }, []);

  const resetForm = () => {
    setFormData({
      name: "",
      price: "",
      originalPrice: "",
      description: "",
      category: "",
      stock: "",
      ingredients: "",
      benefits: "",
      isBestseller: false,
      isNew: false
    });
    setImageFile(null);
    setImagePreview("");
    setEditingProduct(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name || "",
      price: product.price?.toString() || "",
      originalPrice: product.originalPrice?.toString() || "",
      description: product.description || "",
      category: product.category || "",
      stock: product.stock?.toString() || "",
      ingredients: Array.isArray(product.ingredients) ? product.ingredients.join(", ") : "",
      benefits: Array.isArray(product.benefits) ? product.benefits.join(", ") : "",
      isBestseller: product.isBestseller || false,
      isNew: product.isNew || false
    });
    setImagePreview(product.image || "");
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate form data
      utils.validateProductData({
        name: formData.name,
        price: parseFloat(formData.price),
        description: formData.description,
        category: formData.category,
        stock: parseInt(formData.stock) || 0
      });

      let imageUrl = editingProduct?.image || "";
      let imageFileId = editingProduct?.imageFileId || "";

      // Upload new image if provided
      if (imageFile) {
        const uploadResult = await uploadProductImage(imageFile);
        imageUrl = uploadResult.imageUrl;
        imageFileId = uploadResult.fileId;
      }

      // Prepare product data
      const productData = {
        name: formData.name,
        price: parseFloat(formData.price),
        originalPrice: formData.originalPrice ? parseFloat(formData.originalPrice) : null,
        description: formData.description,
        category: formData.category,
        stock: parseInt(formData.stock) || 0,
        image: imageUrl,
        imageFileId: imageFileId,
        ingredients: formData.ingredients.split(",").map(item => item.trim()).filter(Boolean),
        benefits: formData.benefits.split(",").map(item => item.trim()).filter(Boolean),
        isBestseller: formData.isBestseller,
        isNew: formData.isNew
      };

      if (editingProduct) {
        await updateProduct(editingProduct.$id, productData);
      } else {
        await createProduct(productData);
      }

      setIsDialogOpen(false);
      resetForm();
    } catch (error) {
      console.error('Error saving product:', error);
      toast.error(error.message || "Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(productId);
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
              <p className="text-muted-foreground">Manage your products and inventory</p>
            </div>
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button 
                  className="bg-sage hover:bg-sage-dark"
                  onClick={() => {
                    resetForm();
                    setIsDialogOpen(true);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              </DialogTrigger>
              
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>
                    {editingProduct ? "Edit Product" : "Add New Product"}
                  </DialogTitle>
                </DialogHeader>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Product Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => handleInputChange("category", value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map(category => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="price">Price ($) *</Label>
                      <Input
                        id="price"
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => handleInputChange("price", e.target.value)}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="originalPrice">Original Price ($)</Label>
                      <Input
                        id="originalPrice"
                        type="number"
                        step="0.01"
                        value={formData.originalPrice}
                        onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        type="number"
                        value={formData.stock}
                        onChange={(e) => handleInputChange("stock", e.target.value)}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      rows={3}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="ingredients">Ingredients (comma-separated)</Label>
                    <Textarea
                      id="ingredients"
                      value={formData.ingredients}
                      onChange={(e) => handleInputChange("ingredients", e.target.value)}
                      placeholder="Jojoba Oil, Rosehip Oil, Chamomile Extract"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="benefits">Benefits (comma-separated)</Label>
                    <Textarea
                      id="benefits"
                      value={formData.benefits}
                      onChange={(e) => handleInputChange("benefits", e.target.value)}
                      placeholder="Deep cleansing, Hydrating, Anti-inflammatory"
                      rows={2}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="image">Product Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {imagePreview && (
                      <div className="mt-2">
                        <img 
                          src={imagePreview} 
                          alt="Preview" 
                          className="w-32 h-32 object-cover rounded"
                        />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.isBestseller}
                        onChange={(e) => handleInputChange("isBestseller", e.target.checked)}
                      />
                      <span>Bestseller</span>
                    </label>
                    
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={formData.isNew}
                        onChange={(e) => handleInputChange("isNew", e.target.checked)}
                      />
                      <span>New Product</span>
                    </label>
                  </div>
                  
                  <div className="flex justify-end gap-2 pt-4">
                    <Button 
                      type="button" 
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      className="bg-sage hover:bg-sage-dark"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Saving...
                        </>
                      ) : (
                        editingProduct ? "Update Product" : "Create Product"
                      )}
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <Tabs defaultValue="products" className="space-y-6">
            <TabsList>
              <TabsTrigger value="products">Products ({products.length})</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>
            
            <TabsContent value="products">
              {isLoading ? (
                <div className="text-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                  <p>Loading products...</p>
                </div>
              ) : (
                <div className="grid gap-6">
                  {products.map((product) => (
                    <Card key={product.$id}>
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <img
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            className="w-20 h-20 object-cover rounded"
                          />
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-semibold text-lg">{product.name}</h3>
                                <p className="text-muted-foreground">{product.category}</p>
                                <p className="text-sm mt-1">{product.description}</p>
                                
                                <div className="flex items-center gap-2 mt-2">
                                  <span className="font-semibold">
                                    {utils.formatPrice(product.price)}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-sm text-muted-foreground line-through">
                                      {utils.formatPrice(product.originalPrice)}
                                    </span>
                                  )}
                                  <span className="text-sm text-muted-foreground">
                                    Stock: {product.stock || 0}
                                  </span>
                                </div>
                                
                                <div className="flex gap-2 mt-2">
                                  {product.isBestseller && (
                                    <Badge variant="secondary">Bestseller</Badge>
                                  )}
                                  {product.isNew && (
                                    <Badge variant="outline">New</Badge>
                                  )}
                                </div>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleEdit(product)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDelete(product.$id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                  
                  {products.length === 0 && (
                    <div className="text-center py-12">
                      <p className="text-muted-foreground">No products found. Create your first product!</p>
                    </div>
                  )}
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Total Products</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">{products.length}</p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Categories</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">
                      {new Set(products.map(p => p.category)).size}
                    </p>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Bestsellers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">
                      {products.filter(p => p.isBestseller).length}
                    </p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Admin;