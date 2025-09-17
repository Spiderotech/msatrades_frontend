import { useNavigate } from "react-router-dom";
import { categories } from "../../../categories";

export default function CategorySection() {
    const navigate = useNavigate();

    const handleCategoryClick = (categoryName: any) => {
      console.log(categoryName);
      
        navigate(`/shop/${categoryName}`); 
    };

    return (
        <section className="py-10 text-center">
            {/* Heading */}
            <h2 className="text-3xl font-bold mb-8 text-gray-800">CHOOSE BY CATEGORY</h2>

            {/* Responsive Grid Container */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 justify-center px-6">
                {categories.map((cat) => (
                    <div 
                        key={cat.id} 
                        className="relative group flex flex-col items-center cursor-pointer"
                        onClick={() => handleCategoryClick(cat.name)}
                    >
                        {/* Image Wrapper with Hover Border */}
                        <div className="relative">
                            {/* Circle Image Container */}
                            <div className="w-58 h-58 rounded-full bg-gray-100 flex flex-col items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 overflow-hidden">
                                <img 
                                    src={cat.image} 
                                    alt={cat.name} 
                                    className="w-28 h-28 object-contain transition-opacity duration-300 group-hover:opacity-50"
                                />
                                <p className="font-semibold mt-2">{cat.name}</p>
                            </div>

                            {/* Perfectly Aligned Hover Border */}
                            <div className="absolute inset-0 w-full h-full rounded-full border-4 border-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                        </div>

                        {/* Hover: Show Product Count */}
                        <span className="absolute bottom-16 transform -translate-y-1/2 text-md font-medium text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {cat.products} products
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
}
