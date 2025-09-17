import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import QuickViewModal from "./QuickViewModal";
import { products } from "../../../products";
import adminAxios from "../../../Admin/Utils/axios";

const getRandomProducts = (productList, count) => {
  return [...productList].sort(() => 0.5 - Math.random()).slice(0, count);
};

const SuggestedProducts = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isQuickViewOpen, setQuickViewOpen] = useState(false);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
        try {
            const response = await adminAxios.get('/allproductdata'); // 🔁 Update the endpoint as needed
            console.log(response.data.productdata.success,"poo");
            console.log(response.data.productdata.data,"plol");

            
            if (response.data.productdata.success) { 
                console.log();
                
                setProducts(response?.data?.productdata?.data);
            } else {
                console.log("Failed to load products");
            }
        } catch (err) {
            console.error("Error fetching products:", err);
           
        } finally {
          console.log("Failed to load products");
        }
    };

    fetchProducts();
}, []);


  const handleQuickView = (product) => {
    setSelectedProduct(product);
    setQuickViewOpen(true);
  };

  const randomProducts = getRandomProducts(products, 4);

  return (
    <div className="max-w-6xl mx-auto my-12 px-6">
      <h2 className="text-2xl font-bold text-center mb-6">You May Also Like</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {randomProducts.map((product) => (
          <ProductCard key={product.id} product={product} onQuickView={handleQuickView} />
        ))}
      </div>

      <QuickViewModal product={selectedProduct} isOpen={isQuickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </div>
  );
};

export default SuggestedProducts;
