import { categories as sourceCategories } from "./categories";
import { products as sourceProducts } from "./products";

const PRODUCTS_KEY = "msa_local_products_v11";
const CATEGORIES_KEY = "msa_local_categories_v11";
const ORDERS_KEY = "msa_local_orders_v11";

const now = () => new Date().toISOString();
const makeId = (prefix: string) => `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

const clone = <T,>(value: T): T => JSON.parse(JSON.stringify(value));

const normalizeCategory = (category: any) => {
  const categoryId = String(category._id ?? category.id ?? makeId("cat"));

  return {
    ...category,
    _id: categoryId,
    id: category.id ?? categoryId,
    productCount: category.productCount ?? category.products ?? 0,
    subcategories: (category.subcategories ?? []).map((subcategory: any, index: number) => {
      const subcategoryId = String(subcategory._id ?? subcategory.id ?? `${categoryId}_sub_${index + 1}`);

      return {
        ...subcategory,
        _id: subcategoryId,
        id: subcategory.id ?? subcategoryId,
        productCount: subcategory.productCount ?? subcategory.products ?? 0,
      };
    }),
  };
};

const normalizeProduct = (product: any) => {
  const productId = String(product._id ?? product.id ?? makeId("prod"));
  const { categoryId, categoryName, subcategoryId, subcategoryName } = resolveCategoryNames(
    product.category,
    product.subcategory
  );

  return {
    ...product,
    _id: productId,
    id: product.id ?? productId,
    basePrice: product.basePrice ?? product.price ?? 0,
    price: product.price ?? product.basePrice ?? 0,
    stock: 0,
    description: product.description ?? product.detailedDescription ?? product.shortDescription ?? "",
    shortDescription: product.shortDescription ?? product.description ?? "",
    detailedDescription: product.detailedDescription ?? product.description ?? "",
    category: { _id: categoryId, name: categoryName },
    subcategory: subcategoryName ? { _id: subcategoryId, name: subcategoryName } : null,
    sizes: product.sizes ?? product.size ?? [],
    size: product.size ?? product.sizes ?? [],
    discount: product.discount ?? 0,
    discountType: product.discountType ?? "",
    tags: product.tags ?? [],
    reviews: product.reviews ?? [],
    createdAt: product.createdAt ?? now(),
  };
};

const seedProducts = () => sourceProducts.map(normalizeProduct);
const seedCategories = () => sourceCategories.map(normalizeCategory);

const read = <T,>(key: string, fallback: T): T => {
  const saved = localStorage.getItem(key);
  if (!saved) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return clone(fallback);
  }

  try {
    return JSON.parse(saved);
  } catch {
    localStorage.setItem(key, JSON.stringify(fallback));
    return clone(fallback);
  }
};

const write = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const products = () => read(PRODUCTS_KEY, seedProducts()).map(normalizeProduct);
const categories = () => read(CATEGORIES_KEY, seedCategories());
const orders = () => read(ORDERS_KEY, []);

const resolveCategoryNames = (categoryValue: any, subcategoryValue: any) => {
  const list = categories();
  let categoryName = typeof categoryValue === "string" ? categoryValue : categoryValue?.name ?? "";
  let subcategoryName = typeof subcategoryValue === "string" ? subcategoryValue : subcategoryValue?.name ?? "";
  let categoryId = typeof categoryValue === "string" ? categoryValue : categoryValue?._id ?? categoryName;
  let subcategoryId = typeof subcategoryValue === "string" ? subcategoryValue : subcategoryValue?._id ?? subcategoryName;

  const categoryById = list.find((category: any) => String(category._id) === String(categoryName));
  if (categoryById) {
    categoryName = categoryById.name;
    categoryId = categoryById._id;
  }

  const categoryByName = list.find((category: any) => String(category.name) === String(categoryName));
  if (categoryByName) categoryId = categoryByName._id;

  for (const category of list) {
    const subcategoryById = category.subcategories?.find((sub: any) => String(sub._id) === String(subcategoryName));
    if (subcategoryById) {
      categoryId = category._id;
      categoryName = category.name;
      subcategoryId = subcategoryById._id;
      subcategoryName = subcategoryById.name;
      break;
    }

    const subcategoryByName = category.subcategories?.find((sub: any) => String(sub.name) === String(subcategoryName));
    if (subcategoryByName) {
      categoryId = category._id;
      categoryName = category.name;
      subcategoryId = subcategoryByName._id;
      break;
    }
  }

  return { categoryId, categoryName, subcategoryId, subcategoryName };
};

const productResponse = (data: any) => ({ data: { productdata: { success: true, data } } });
const categoryResponse = (data: any) => ({ data: { categorydata: { success: true, data } } });
const orderResponse = (data: any) => ({ data: { orderdata: { success: true, data } } });

const findCategoryRecord = (categoryId: string) => {
  const list = categories();
  const parent = list.find((category: any) => String(category._id) === String(categoryId));
  if (parent) return { list, type: "main", category: parent };

  for (const category of list) {
    const subcategory = category.subcategories?.find((sub: any) => String(sub._id) === String(categoryId));
    if (subcategory) return { list, type: "sub", parentCategory: category, subcategory };
  }

  return { list, type: "missing" };
};

const hydrateOrderProducts = (order: any) => ({
  ...order,
  products: (order.products ?? []).map((item: any) => {
    const product =
      typeof item.productId === "object"
        ? item.productId
        : products().find((candidate: any) => String(candidate._id) === String(item.productId));

    return {
      ...item,
      productId: product ?? {
        _id: item.productId,
        name: "Local product",
        basePrice: 0,
        images: [],
      },
    };
  }),
});

export const fileToDataUrl = (file: File) =>
  new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });

const localApi = {
  async get(url: string) {
    if (url === "/allproductdata") return productResponse(products());
    if (url === "/allcategorydata") return categoryResponse(categories());
    if (url === "/allorderdata") return orderResponse(orders().map(hydrateOrderProducts));

    if (url.startsWith("/product/")) {
      const id = decodeURIComponent(url.replace("/product/", ""));
      const normalizedName = id.toLowerCase();
      return productResponse(
        products().find(
          (product: any) =>
            String(product._id) === String(id) ||
            String(product.id) === String(id) ||
            String(product.name).toLowerCase() === normalizedName
        )
      );
    }

    if (url.startsWith("/order/")) {
      const id = decodeURIComponent(url.replace("/order/", ""));
      return orderResponse(hydrateOrderProducts(orders().find((order: any) => String(order._id) === String(id))));
    }

    if (url.startsWith("/category/")) {
      const id = decodeURIComponent(url.replace("/category/", ""));
      const record = findCategoryRecord(id);
      if (record.type === "main") {
        return categoryResponse({ type: "main", category: record.category });
      }
      if (record.type === "sub") {
        return categoryResponse({
          type: "sub",
          subcategory: record.subcategory,
          parentCategory: record.parentCategory,
        });
      }
      return categoryResponse(null);
    }

    return { data: { success: true } };
  },

  async post(url: string, body: any) {
    if (url === "/login") {
      return {
        data: {
          status: true,
          AccessToken: "local-admin-token",
          RefreshToken: "local-admin-refresh-token",
          isAdmin: { adminId: "local-admin", adminEmail: body?.email ?? "admin@local.test" },
        },
      };
    }

    if (url === "/add-neworder") {
      const order = {
        ...body,
        _id: makeId("order"),
        status: "Processing",
        createdAt: now(),
      };
      const nextOrders = [order, ...orders()];
      write(ORDERS_KEY, nextOrders);
      return { data: { orderdata: { success: true, data: hydrateOrderProducts(order) } } };
    }

    if (url === "/addproductdata") {
      const product = normalizeProduct({ ...body, _id: makeId("prod"), createdAt: now() });
      const nextProducts = [product, ...products()];
      write(PRODUCTS_KEY, nextProducts);
      return { data: { status: true, success: true, productdata: { success: true, data: product } } };
    }

    if (url === "/categoriesadd") {
      const list = categories();
      if (body?.isSubCategory && body?.parentCategory) {
        const parent = list.find((category: any) => String(category._id) === String(body.parentCategory));
        parent?.subcategories?.push({
          _id: makeId("sub"),
          id: makeId("subid"),
          name: body.name,
          description: body.description,
          image: body.image,
          productCount: 0,
          products: 0,
        });
      } else {
        list.push(normalizeCategory({ ...body, _id: makeId("cat"), id: makeId("catid"), subcategories: [] }));
      }
      write(CATEGORIES_KEY, list);
      return { data: { status: true, success: true } };
    }

    if (url.startsWith("/add-review/")) {
      const id = decodeURIComponent(url.replace("/add-review/", ""));
      const list = products();
      const product = list.find((candidate: any) => String(candidate._id) === String(id));
      if (product) {
        product.reviews = [
          ...(product.reviews ?? []),
          { ...body, createdAt: now() },
        ];
        write(PRODUCTS_KEY, list);
      }
      return { data: { reviewdata: { success: true } } };
    }

    return { data: { status: true, success: true } };
  },

  async put(url: string, body: any) {
    if (url.startsWith("/updateproduct/")) {
      const id = decodeURIComponent(url.replace("/updateproduct/", ""));
      const list = products();
      const index = list.findIndex((product: any) => String(product._id) === String(id));
      if (index >= 0) {
        list[index] = normalizeProduct({ ...list[index], ...body, _id: list[index]._id });
        write(PRODUCTS_KEY, list);
      }
      return { data: { success: true, status: true } };
    }

    if (url.startsWith("/editcategory/")) {
      const id = decodeURIComponent(url.replace("/editcategory/", ""));
      const record = findCategoryRecord(id);
      if (record.type === "main") {
        Object.assign(record.category, body.image ? body : { ...body, image: record.category.image });
        write(CATEGORIES_KEY, record.list);
      }
      if (record.type === "sub") {
        Object.assign(record.subcategory, body.image ? body : { ...body, image: record.subcategory.image });
        write(CATEGORIES_KEY, record.list);
      }
      return { data: { success: true, status: true } };
    }

    return { data: { success: true, status: true } };
  },
};

export default localApi;
