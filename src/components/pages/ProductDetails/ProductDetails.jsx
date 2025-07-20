import React, {
  useContext,
  useEffect,
  useMemo,
  useState,
  lazy,
  Suspense,
} from "react";
import StarRating from "./../../StarRating";
import Button from "./../../Button";
import { useParams } from "react-router";
import axios from "axios";
import { useCart } from "../../context/Cart.context";
import Loading from "../Loading";
import Error from "../Error";
import { DefaultContext } from "../../context/Default.context";
import ReactImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

// Lazy load Card component
const Card = lazy(() => import("../cart/Card"));

export default function ProductDetails() {
  const { id } = useParams();

  const [userRating, setUserRating] = useState(0);
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState(null);
  const [adding, setAdding] = useState(false);

  const { addToCart, refreshCart } = useCart();
  const { isLoading, setIsLoading, error, setError } =
    useContext(DefaultContext);

  // Load product rating from localStorage when ID changes
  useEffect(() => {
    const stored = localStorage.getItem(`product-${id}-rating`);
    setUserRating(stored !== null ? Number(stored) : 0);
  }, [id]);

  // Fetch product details
  useEffect(() => {
    const controller = new AbortController();

    async function getProduct() {
      setIsLoading(true);
      try {
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products/${id}`,
          { signal: controller.signal }
        );
        setProduct(data.data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
        }
      } finally {
        setIsLoading(false);
      }
    }

    getProduct();
    return () => controller.abort();
  }, [id]);

  // Fetch related products
  useEffect(() => {
    const controller = new AbortController();

    async function getRelatedProduct() {
      try {
        const { data } = await axios.get(
          `https://ecommerce.routemisr.com/api/v1/products?category[in]=${product.category._id}`,
          { signal: controller.signal }
        );
        setRelatedProducts(data.data);
      } catch (err) {
        setError(err);
      }
    }

    if (product) getRelatedProduct();
    return () => controller.abort();
  }, [product]);

  // Save rating
  useEffect(() => {
    if (userRating > 0) {
      localStorage.setItem(`product-${id}-rating`, userRating);
    }
  }, [userRating, id]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [id]);

  const galleryItems = useMemo(() => {
    if (!product?.images?.length) return [];
    return product.images.map((img) => ({
      original: img,
      thumbnail: img,
    }));
  }, [product]);

  if (isLoading) return <Loading />;
  if (error) return <Error error={error.toString()} />;
  if (!product) return <Loading />;

  return (
    <div className="mt-28 mb-8">
      <div className="md:grid md:gap-16 md:grid-cols-12 flex-col space-y-7">
        {/* Images */}
        <div className="md:col-span-4">
          <ReactImageGallery
            showFullscreenButton={false}
            showPlayButton={false}
            autoPlay={true}
            showNav={false}
            items={galleryItems}
            renderItem={(item) => (
              <img
                src={item.original}
                alt="product"
                loading="lazy"
                className="rounded-xl w-full"
              />
            )}
            renderThumbInner={(item) => (
              <img
                src={item.thumbnail}
                alt="thumb"
                loading="lazy"
                className="rounded-md"
              />
            )}
          />
        </div>

        {/* Product Info */}
        <div className="md:col-span-8">
          <h2 className="text-2xl font-medium">{product.title}</h2>
          <h4 className="text-xl font-semibold text-main">
            {product?.category?.name}
          </h4>
          <p className="text-lg text-main-light">{product.description}</p>
          <div className="flex justify-between items-center">
            <h4>{product.price} EGP</h4>
            <h4>⭐ {product.ratingsAverage}</h4>
          </div>

          {/* Rating */}
          <div className="flex flex-col justify-center items-center h-24 my-5">
            <div className="bg-slate-300 w-72 h-20 rounded-2xl flex justify-center items-center">
              {userRating > 0 ? (
                <p className="text-main-light text-xl">
                  You rated this product{" "}
                  <span className="text-black text-xl">⭐ {userRating}</span>
                </p>
              ) : (
                <StarRating
                  maxRating={5}
                  color="#fcc419"
                  size={30}
                  onSetRating={setUserRating}
                  defaultRating={userRating}
                />
              )}
            </div>
            {userRating > 0 && (
              <button
                className="btn mt-2"
                onClick={() => {
                  setUserRating(0);
                  localStorage.removeItem(`product-${id}-rating`);
                }}
              >
                Change your rate
              </button>
            )}
          </div>

          <Button
            className="btn w-full"
            disabled={adding}
            onClick={async () => {
              setAdding(true);
              await addToCart(id);
              refreshCart();
              setAdding(false);
            }}
          >
            {adding ? "Adding..." : "Add To Cart"}
          </Button>
        </div>
      </div>

      {/* Related Products */}
      <div className="py-5 my-5">
        <h2 className="text-2xl font-semibold my-5 text-main">
          Related Products
        </h2>
        {relatedProducts && (
          <Swiper
            spaceBetween={20}
            slidesPerView={6}
            autoplay={{ delay: 1500 }}
            loop={true}
            modules={[Autoplay]}
            breakpoints={{
              0: { slidesPerView: 2 },
              640: { slidesPerView: 3 },
              768: { slidesPerView: 4 },
              1024: { slidesPerView: 6 },
            }}
          >
            <Suspense fallback={<p>Loading related products...</p>}>
              {relatedProducts.map((prod) => (
                <SwiperSlide key={prod.id}>
                  <Card product={prod} />
                </SwiperSlide>
              ))}
            </Suspense>
          </Swiper>
        )}
      </div>
    </div>
  );
}
