import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="animate-pulse p-4 rounded-lg shadow-sm space-y-4">
      <div className="h-40 bg-gray-200 rounded-md" />
      <div className="h-4 bg-gray-200 rounded w-3/4" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-6 bg-gray-200 rounded w-full mt-2" />
    </div>
  );
};

export default ProductCardSkeleton;
