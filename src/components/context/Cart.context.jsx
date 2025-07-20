import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TokenContext } from "./Token.context";
import { DefaultContext } from "./Default.context";

export const CartContext = createContext(null);

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export default function CartProvider({ children }) {
  const [cartInfo, setCartInfo] = useState(null);
  const { token } = useContext(TokenContext);
  const { setError } = useContext(DefaultContext);
  const queryClient = useQueryClient();

  const handleToast = async (asyncFn, loadingMsg, successMsg) => {
    const loading = toast.loading(loadingMsg);
    try {
      const res = await asyncFn();
      toast.success(successMsg);
      return res;
    } catch (err) {
      toast.error(
        err?.response?.data?.message || err?.message || "Unknown error"
      );
      throw err;
    } finally {
      toast.dismiss(loading);
    }
  };

  const getAllCarts = useCallback(async () => {
    if (!token) return;
    const response = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/cart",
      { headers: { token } }
    );
    setCartInfo(response.data);
    return response.data;
  }, [token]);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refreshCart,
  } = useQuery({
    queryKey: ["wantedCart", token],
    queryFn: getAllCarts,
    enabled: !!token,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  useEffect(() => {
    if (data) setCartInfo(data);
  }, [data]);

  useEffect(() => {
    if (isError) setError(error?.message);
  }, [isError, error, setError]);

  const addToCart = useCallback(
    async (id) => {
      if (!token) return;
      await handleToast(
        () =>
          axios.post(
            "https://ecommerce.routemisr.com/api/v1/cart",
            { productId: id },
            { headers: { token } }
          ),
        "Adding product to cart...",
        "Product added to cart successfully"
      );
      await queryClient.invalidateQueries({ queryKey: ["wantedCart", token] });
    },
    [token, queryClient]
  );

  const removeCart = useCallback(
    async (id) => {
      if (!token) return;
      await handleToast(
        () =>
          axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
            headers: { token },
          }),
        "Removing product...",
        "Product removed from cart successfully"
      );
      await queryClient.invalidateQueries({ queryKey: ["wantedCart", token] });
    },
    [token, queryClient]
  );

  const clearCart = useCallback(async () => {
    if (!token) return;
    const res = await handleToast(
      () =>
        axios.delete("https://ecommerce.routemisr.com/api/v1/cart", {
          headers: { token },
        }),
      "Clearing cart...",
      "Cart cleared successfully"
    );
    if (res?.data?.status === "success") {
      await queryClient.invalidateQueries({ queryKey: ["wantedCart", token] });
    }
  }, [token, queryClient]);

  const updateCart = useCallback(
    async (id, count) => {
      if (!token) return;
      const loading = toast.loading("Loading....");
      try {
        const res = await axios.put(
          `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
          { count },
          { headers: { token } }
        );

        // تحديث محلي بدون refetch
        setCartInfo((prev) => {
          const newProducts = prev.data.products.map((item) =>
            item.product.id === id ? { ...item, count } : item
          );
          return { ...prev, data: { ...prev.data, products: newProducts } };
        });

        return res;
      } catch (err) {
        toast.error(
          err?.response?.data?.message || err?.message || "Unknown error"
        );
        console.error(err);
      } finally {
        toast.dismiss(loading);
      }
    },
    [token]
  );

  const contextValue = useMemo(
    () => ({
      addToCart,
      removeCart,
      clearCart,
      getAllCarts,
      cartInfo,
      isLoading,
      refreshCart,
      updateCart,
      setCartInfo,
    }),
    [
      addToCart,
      removeCart,
      clearCart,
      getAllCarts,
      cartInfo,
      isLoading,
      refreshCart,
      updateCart,
      setCartInfo,
    ]
  );

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}
