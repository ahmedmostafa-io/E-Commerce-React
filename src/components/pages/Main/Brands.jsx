import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Loading from "../Loading";
import Error from "../Error";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Brands() {
  const [brands, setBrands] = useState([]);
  const [selectedBrandId, setSelectedBrandId] = useState(null);
  const [brandProducts, setBrandProducts] = useState([]);
  const [loadingBrands, setLoadingBrands] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [error, setError] = useState(null);

  const swiperRef = useRef();

  useEffect(() => {
    async function fetchBrands() {
      try {
        const { data } = await axios.get(
          "https://ecommerce.routemisr.com/api/v1/brands"
        );
        setBrands(data.data);
        setError(null);
      } catch (err) {
        console.error(err);

        setError("Error fetching brands.");
      } finally {
        setLoadingBrands(false);
      }
    }

    fetchBrands();
  }, []);

  async function handleBrandClick(brandId) {
    setSelectedBrandId(brandId);
    setLoadingProducts(true);
    try {
      const { data } = await axios.get(
        ` https://ecommerce.routemisr.com/api/v1/products?brand=${brandId}`
      );
      setBrandProducts(data.data);
      setError(null);
    } catch (err) {
      console.error(err);

      setError("Error loading products for this brand.");
    } finally {
      setLoadingProducts(false);
    }
  }

  if (loadingBrands) return <Loading />;
  if (error) return <Error message={error} />;

  return (
    <section className="mb-12 mt-28 px-4 relative">
      <title>Brands</title>
      <h2 className="text-3xl font-bold text-center mb-8">Top Brands</h2>

      {/* Navigation Buttons */}
      {/* <button
        onClick={() => swiperRef.current.swiper.slidePrev()}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-md hover:bg-gray-100 p-2 rounded-full cursor-pointer"
      >
        <ChevronLeft className="w-6 h-6 text-gray-600" />
      </button>

      <button
        onClick={() => swiperRef.current.swiper.slideNext()}
        className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 cursor-pointer bg-white border border-gray-200 shadow-md hover:bg-gray-100 p-2 rounded-full"
      >
        <ChevronRight className="w-6 h-6 text-gray-600" />
      </button> */}

      {/* Swiper Brands */}
      <Swiper
        ref={swiperRef}
        spaceBetween={20}
        slidesPerView={2}
        breakpoints={{
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
        }}
        loop={true}
        modules={[Autoplay, Navigation]}
      >
        {brands.map((brand) => (
          <SwiperSlide key={brand._id}>
            <button
              onClick={() => handleBrandClick(brand._id)}
              title={brand.name}
              className="block w-full focus:outline-none cursor-pointer"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all duration-300 p-4 flex flex-col items-center justify-center h-48 group">
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="max-h-24 object-contain mb-3 transition-transform duration-300 group-hover:scale-105"
                />
                <p className="text-sm font-medium text-gray-700 text-center group-hover:text-blue-600 transition-colors duration-300 truncate w-full">
                  {brand.name}
                </p>
              </div>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* عرض المنتجات الخاصة بالبراند المختار */}
      {selectedBrandId && (
        <div className="mt-10">
          {/* زر إغلاق */}
          <div className="flex justify-end mb-4">
            <button
              onClick={() => {
                setSelectedBrandId(null);
                setBrandProducts([]);
              }}
              className="bg-red-500 cursor-pointer text-white px-4 py-1 rounded-full hover:bg-red-600 transition-colors duration-300"
            >
              ❌ Close
            </button>
          </div>

          <h3 className="text-2xl font-semibold mb-6 text-center text-gray-800">
            Products for selected brand
          </h3>

          {loadingProducts ? (
            <Loading />
          ) : brandProducts.length === 0 ? (
            <p className="text-center text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {brandProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white p-4 rounded-xl shadow hover:shadow-lg transition-all"
                >
                  <img
                    src={product.imageCover}
                    alt={product.title}
                    className="h-40 w-full object-contain mb-2"
                  />
                  <h4 className="text-sm font-semibold line-clamp-2 mb-1">
                    {product.title}
                  </h4>
                  <p className="text-green-600 font-bold">
                    {product.price} EGP
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}
