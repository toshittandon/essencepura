import React, { createContext, useContext, useState, useEffect } from "react";
import { productService } from "@/services/appwrite";
import { toast } from "sonner";

const ProductContext = createContext(undefined);

export const useProducts = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const fetchedProducts = await productService.getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error('Error fetching products:', error);
      setError(error.message);
      toast.error("Failed to load products");
    } finally {
      setIsLoading(false);
    }
  };

  const getProduct = async (productId) => {
    try {
      // First check if product is already in local state
      const localProduct = products.find(p => p.$id === productId);
      if (localProduct) {
        return localProduct;
      }
      
      // If not found locally, fetch from Appwrite
      const product = await productService.getProduct(productId);
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error("Failed to load product");
      throw error;
    }
  };

  const getProductsByCategory = async (category) => {
    try {
      if (category === "All Products" || !category) {
        return products;
      }
      
      const categoryProducts = await productService.getProductsByCategory(category);
      return categoryProducts;
    } catch (error) {
      console.error('Error fetching products by category:', error);
      toast.error("Failed to load products");
      return [];
    }
  };

  const createProduct = async (productData) => {
    try {
      const newProduct = await productService.createProduct(productData);
      setProducts(prev => [newProduct, ...prev]);
      toast.success("Product created successfully!");
      return newProduct;
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error("Failed to create product");
      throw error;
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      const updatedProduct = await productService.updateProduct(productId, productData);
      setProducts(prev => 
        prev.map(product => 
          product.$id === productId ? updatedProduct : product
        )
      );
      toast.success("Product updated successfully!");
      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error("Failed to update product");
      throw error;
    }
  };

  const deleteProduct = async (productId) => {
    try {
      await productService.deleteProduct(productId);
      setProducts(prev => prev.filter(product => product.$id !== productId));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error('Error deleting product:', error);
      toast.error("Failed to delete product");
      throw error;
    }
  };

  const uploadProductImage = async (file) => {
    try {
      const result = await productService.uploadImage(file);
      return result;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error("Failed to upload image");
      throw error;
    }
  };

  // Get unique categories from products
  const getCategories = () => {
    const categories = ["All Products"];
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return [...categories, ...uniqueCategories];
  };

  // Search products
  const searchProducts = (query) => {
    if (!query.trim()) return products;
    
    const lowercaseQuery = query.toLowerCase();
    return products.filter(product => 
      product.name.toLowerCase().includes(lowercaseQuery) ||
      product.description.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Get featured/bestseller products
  const getFeaturedProducts = () => {
    return products.filter(product => product.isBestseller || product.isNew);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        isLoading,
        error,
        fetchProducts,
        getProduct,
        getProductsByCategory,
        createProduct,
        updateProduct,
        deleteProduct,
        uploadProductImage,
        getCategories,
        searchProducts,
        getFeaturedProducts,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};