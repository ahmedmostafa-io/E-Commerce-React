// CategorySlider.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router";
import axios from "axios";
import { Autoplay } from "swiper/modules";
import { useQuery } from "@tanstack/react-query";

export default function CategorySlider() {
  async function fetchCategories() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      return data.data;
    } catch (err) {
      console.error("Failed to load categories", err);
    }
  }
  const { data: categories } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategories,
    staleTime: 10000,
    gcTime: 10000,
  });
  return (
    <section className="py-6 px-4 md:px-12 bg-white">
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Shop by Category
      </h2>
      <Swiper
        spaceBetween={10}
        slidesPerView={6}
        autoplay={{ delay: 2500 }}
        loop={true}
        modules={[Autoplay]}
        breakpoints={{
          0: { slidesPerView: 2 },
          640: { slidesPerView: 3 },
          768: { slidesPerView: 4 },
          1024: { slidesPerView: 6 },
        }}
      >
        {categories?.map((category) => (
          <SwiperSlide key={category._id} className="text-center">
            <Link to={`/category/${category._id}`}>
              <div className="flex flex-col items-center gap-2 hover:scale-105 transition">
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-30 h-30 object-cover rounded-full border border-gray-300 shadow-sm"
                />
                <p className="text-sm font-medium text-gray-700">
                  {category.name}
                </p>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
