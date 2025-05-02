
import React from "react";
import { useParams } from "react-router-dom";

const CategoryPage = () => {
  const { categoryName } = useParams();

  return (
    <div className="container mt-4">
      <h2 className="text-center">{categoryName.toUpperCase()}</h2>
      
      {/* Add products listing here */}
    </div>
  );
};

export default CategoryPage;
