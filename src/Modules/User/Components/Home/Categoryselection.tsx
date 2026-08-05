import { FaArrowRight, FaBicycle, FaBoxes, FaTools } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { categories } from "../../../categories";

const categoryIcons = {
  Cycles: <FaBicycle />,
  Accessories: <FaBoxes />,
  "Spare Parts": <FaTools />,
};

export default function CategorySection() {
  const navigate = useNavigate();

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/shop/${encodeURIComponent(categoryName)}`);
  };

  return (
    <section className="bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-black uppercase tracking-[0.24em] text-orange-500">
              Shop By Category
            </p>
            <h2 className="mt-3 text-3xl font-black text-gray-950 sm:text-4xl">
              Choose Your Ride Essentials
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-7 text-gray-600">
            Browse cycles, accessories, and spare parts grouped for quick, focused shopping.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
          {categories.map((cat) => (
            <article
              key={cat.id}
              onClick={() => handleCategoryClick(cat.name)}
              className="group flex h-full min-h-[520px] cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 bg-gray-50 shadow-sm transition hover:-translate-y-1 hover:border-orange-200 hover:bg-white hover:shadow-lg"
            >
              <div className="relative flex h-56 shrink-0 items-center justify-center border-b border-gray-200 bg-white p-6">
                <div className="absolute left-5 top-5 flex h-11 w-11 items-center justify-center rounded-lg bg-gray-950 text-orange-400 shadow-sm">
                  {categoryIcons[cat.name] || <FaBicycle />}
                </div>
                <span className="absolute right-5 top-5 rounded-full bg-orange-50 px-3 py-1 text-xs font-black uppercase tracking-wide text-orange-500">
                  {cat.products} Products
                </span>
                <div className="flex h-36 w-48 items-center justify-center rounded-lg bg-gray-50 p-3">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                  />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-5">
                <h3 className="text-2xl font-black text-gray-950">{cat.name}</h3>
                <p className="mt-2 min-h-[84px] text-sm leading-7 text-gray-600">
                  {cat.description}
                </p>

                <div className="mt-4 flex min-h-[88px] flex-wrap content-start gap-2">
                  {cat.subcategories.slice(0, 4).map((subcat) => (
                    <span
                      key={subcat.name}
                      className="rounded-full bg-white px-3 py-1.5 text-xs font-black uppercase tracking-wide text-gray-600 ring-1 ring-gray-200"
                    >
                      {subcat.name}
                    </span>
                  ))}
                </div>

                <button
                  type="button"
                  className="mt-auto inline-flex w-full items-center justify-center gap-3 rounded-lg bg-gray-950 px-5 py-3 text-sm font-black uppercase tracking-wide text-white transition group-hover:bg-orange-500"
                >
                  View Category
                  <FaArrowRight />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
