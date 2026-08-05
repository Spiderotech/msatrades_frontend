import { useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  FaBars,
  FaHeart,
  FaRegHeart,
  FaSearch,
  FaShoppingBag,
  FaTimes,
} from "react-icons/fa";
import logo from "../../../assets/ChatGPT Image Jul 29, 2026, 04_36_38 AM.png";
import adminAxios from "../../Admin/Utils/axios";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "Shop", path: "/shop" },
  { label: "Contact", path: "/contact" },
  { label: "About", path: "/about-us" },
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [searchProducts, setSearchProducts] = useState<any[]>([]);
  const navigate = useNavigate();
  const cartItems = useSelector((state: any) => state.cart.cartItems);
  const wishlistItems = useSelector((state: any) => state.wishlist.wishlistItems);

  const cartCount = cartItems.reduce((total: number, item: any) => total + (item.quantity || 1), 0);
  const wishlistCount = wishlistItems.length;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await adminAxios.get("/allproductdata");
        setSearchProducts(response.data.productdata.data || []);
      } catch (error) {
        console.error("Search products error:", error);
        setSearchProducts([]);
      }
    };

    fetchProducts();
  }, []);

  const valueName = (value: any) => (typeof value === "string" ? value : value?.name ?? "");

  const searchResults = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (query.length < 2) return [];

    return searchProducts
      .filter((product) => {
        const searchableText = [
          product.name,
          valueName(product.category),
          valueName(product.subcategory),
          product.shortDescription,
          product.detailedDescription,
          product.description,
        ]
          .join(" ")
          .toLowerCase();

        return searchableText.includes(query);
      })
      .slice(0, 8);
  }, [searchProducts, searchQuery]);

  const handleSearchSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchResults[0]) {
      navigate(`/product/${encodeURIComponent(searchResults[0].name)}`, {
        state: { productId: searchResults[0]._id || searchResults[0].id },
      });
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const goToProduct = (product: any) => {
    navigate(`/product/${encodeURIComponent(product.name)}`, {
      state: { productId: product._id || product.id },
    });
    setSearchQuery("");
    setIsMenuOpen(false);
  };

  const Badge = ({ count }: { count: number }) =>
    count > 0 ? (
      <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white">
        {count > 99 ? "99+" : count}
      </span>
    ) : null;

  const renderSearchBox = (compact = false) => (
    <div className="relative w-full">
      <form
        onSubmit={handleSearchSubmit}
        className={`flex items-center rounded-full border border-gray-200 bg-gray-50 text-gray-900 shadow-inner transition focus-within:border-orange-400 focus-within:bg-white ${
          compact ? "h-11 px-4" : "h-12 px-5"
        }`}
      >
        <FaSearch className="mr-3 h-4 w-4 text-gray-500" />
        <input
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          onFocus={() => setIsSearchFocused(true)}
          onBlur={() => window.setTimeout(() => setIsSearchFocused(false), 160)}
          placeholder="Search cycles, bags, gears..."
          className="w-full bg-transparent text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none"
        />
      </form>

      {isSearchFocused && searchQuery.trim().length >= 2 && (
        <div className="absolute left-0 right-0 top-full z-50 mt-3 overflow-hidden rounded-lg border border-gray-100 bg-white shadow-2xl">
          {searchResults.length > 0 ? (
            <>
              <div className="border-b border-gray-100 px-4 py-2 text-xs font-black uppercase tracking-wide text-gray-400">
                Products
              </div>
              {searchResults.map((product) => (
                <button
                  key={product._id || product.id}
                  type="button"
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => goToProduct(product)}
                  className="flex w-full items-center gap-3 px-4 py-3 text-left transition hover:bg-orange-50"
                >
                  <img
                    src={product.images?.[0]}
                    alt={product.name}
                    className="h-12 w-12 rounded-md bg-gray-100 object-contain"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-black text-gray-900">
                      {product.name}
                    </span>
                    <span className="block truncate text-xs font-semibold text-gray-500">
                      {valueName(product.category)} {valueName(product.subcategory) ? `/ ${valueName(product.subcategory)}` : ""}
                    </span>
                  </span>
                  <span className="shrink-0 text-sm font-black text-orange-500">
                    £{product.basePrice ?? product.price}
                  </span>
                </button>
              ))}
            </>
          ) : (
            <div className="px-4 py-5 text-center">
              <p className="text-sm font-black text-gray-900">No products found</p>
              <p className="mt-1 text-xs font-semibold text-gray-500">
                Try searching cycle, light, lock, tire, brake, chain, or gear.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="flex shrink-0 items-center rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
          aria-label="MSAtrades home"
        >
          <img src={logo} alt="MSAtrades" className="h-12 w-40 object-contain object-left sm:w-48" />
        </button>

        <nav className="hidden items-center gap-1 rounded-full bg-gray-100 p-1 md:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) =>
                `rounded-full px-5 py-2 text-sm font-semibold transition ${
                  isActive
                    ? "bg-gray-950 text-white shadow-sm"
                    : "text-gray-600 hover:bg-white hover:text-gray-950"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="hidden min-w-0 flex-1 lg:block">
          {renderSearchBox()}
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => navigate("/wishlist")}
            className="relative hidden h-11 w-11 place-items-center rounded-full border border-gray-200 bg-white text-gray-800 transition hover:border-orange-300 hover:bg-orange-50 md:grid"
            aria-label="Open wishlist"
          >
            {wishlistCount > 0 ? <FaHeart /> : <FaRegHeart />}
            <Badge count={wishlistCount} />
          </button>
          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="relative grid h-11 w-11 place-items-center rounded-full bg-gray-950 text-white transition hover:bg-orange-500"
            aria-label="Open cart"
          >
            <FaShoppingBag />
            <Badge count={cartCount} />
          </button>
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-full border border-gray-200 text-gray-900 transition hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
          >
            <FaBars />
          </button>
        </div>
      </div>

      <div className="border-t border-gray-100 px-4 pb-3 sm:px-6 lg:hidden">
        {renderSearchBox(true)}
      </div>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-gray-950/45 lg:hidden" onClick={() => setIsMenuOpen(false)}>
          <div
            className="ml-auto flex h-full w-full max-w-sm flex-col bg-white shadow-2xl"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-4">
              <button
                type="button"
                onClick={() => {
                  navigate("/");
                  setIsMenuOpen(false);
                }}
                className="flex items-center"
              >
                <img src={logo} alt="MSAtrades" className="h-11 w-44 object-contain object-left" />
              </button>
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full bg-gray-100 text-gray-700"
                aria-label="Close menu"
              >
                <FaTimes />
              </button>
            </div>

            <div className="px-5 py-5">
              {renderSearchBox(true)}
            </div>

            <nav className="flex flex-col px-3">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={({ isActive }) =>
                    `rounded-md px-4 py-4 text-base font-semibold transition ${
                      isActive ? "bg-orange-50 text-orange-600" : "text-gray-800 hover:bg-gray-50"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            <div className="mt-auto grid grid-cols-2 gap-3 border-t border-gray-100 p-5">
              <button
                type="button"
                onClick={() => {
                  navigate("/wishlist");
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-md border border-gray-200 px-4 py-3 font-semibold text-gray-800"
              >
                <FaHeart className="text-orange-500" />
                Wishlist {wishlistCount > 0 ? `(${wishlistCount})` : ""}
              </button>
              <button
                type="button"
                onClick={() => {
                  navigate("/cart");
                  setIsMenuOpen(false);
                }}
                className="flex items-center justify-center gap-2 rounded-md bg-gray-950 px-4 py-3 font-semibold text-white"
              >
                <FaShoppingBag />
                Cart {cartCount > 0 ? `(${cartCount})` : ""}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
