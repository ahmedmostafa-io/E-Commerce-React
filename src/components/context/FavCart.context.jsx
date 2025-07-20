import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { TokenContext } from "./Token.context";
import { DefaultContext } from "./Default.context";

export const FavContext = createContext(null);

export function useFav() {
  const context = useContext(FavContext);
  if (!context) {
    throw new Error("useFav must be used within a FavProvider");
  }
  return context;
}

export default function FavProvider({ children }) {
  const { token } = useContext(TokenContext);
  const { setError } = useContext(DefaultContext);
  const [favList, setFavList] = useState(null);
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

  const getLoggedWishlist = useCallback(async () => {
    if (!token) return;
    const res = await axios.get(
      "https://ecommerce.routemisr.com/api/v1/wishlist",
      { headers: { token } }
    );
    setFavList(res.data);
    return res.data;
  }, [token]);

  const {
    data,
    isLoading,
    isError,
    error,
    refetch: refreshFav,
  } = useQuery({
    queryKey: ["wishlist", token],
    queryFn: getLoggedWishlist,
    enabled: !!token,
    staleTime: 1000 * 60 * 10, // 10 دقائق
  });

  useEffect(() => {
    if (data) setFavList(data);
  }, [data]);

  useEffect(() => {
    if (isError) setError(error?.message);
  }, [isError, error, setError]);

  const addToFav = useCallback(
    async (productId) => {
      if (!token) return;
      await handleToast(
        () =>
          axios.post(
            "https://ecommerce.routemisr.com/api/v1/wishlist",
            { productId },
            { headers: { token } }
          ),
        "Adding to favorites...",
        "Added to favorites"
      );
      await queryClient.invalidateQueries({ queryKey: ["wishlist", token] });
    },
    [token, queryClient]
  );

  const removeFromFav = useCallback(
    async (productId) => {
      if (!token) return;
      await handleToast(
        () =>
          axios.delete(
            `https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
            { headers: { token } }
          ),
        "Removing from favorites...",
        "Removed from favorites"
      );
      await queryClient.invalidateQueries({ queryKey: ["wishlist", token] });
    },
    [token, queryClient]
  );

  const contextValue = useMemo(
    () => ({
      favList,
      isFavLoading: isLoading,
      addToFav,
      removeFromFav,
      refreshFav,
    }),
    [favList, isLoading, addToFav, removeFromFav, refreshFav]
  );

  return (
    <FavContext.Provider value={contextValue}>{children}</FavContext.Provider>
  );
}
