import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import imgSlider1 from "../../assets/images/slider-image-1.jpeg";
import imgSlider2 from "../../assets/images/slider-image-2.jpeg";
import imgSlider3 from "../../assets/images/slider-image-3.jpeg";

export default function MainSlider() {
  const sliderArr = [imgSlider1, imgSlider2, imgSlider3];

  return (
    <Swiper
      modules={[Autoplay, EffectFade]}
      autoplay={{ delay: 1000, disableOnInteraction: false }}
      loop={true}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      speed={1000}
    >
      {sliderArr.map((item, index) => {
        const smallImages = sliderArr.filter((_, i) => i !== index);

        return (
          <SwiperSlide key={index}>
            <div className="grid grid-cols-12 gap-4 my-8 items-center">
              <div className="col-span-8">
                <img
                  src={item}
                  alt={`Slider ${index + 1}`}
                  className="w-full h-full object-cover rounded-2xl shadow-lg transition-all duration-500"
                />
              </div>

              <div className="col-span-4 flex flex-col gap-4">
                {smallImages.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Small ${i + 1}`}
                    className="w-full h-1/2 object-cover rounded-xl shadow"
                  />
                ))}
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}
