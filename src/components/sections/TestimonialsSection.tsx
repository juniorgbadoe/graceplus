import React, { useRef } from "react";
import { motion } from "framer-motion";
import Slider from "react-slick";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useStore } from "../../data/store";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export function TestimonialsSection() {
  const { testimonials } = useStore();
  const active = testimonials.filter((t) => t.active);
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <section id="temoignages" className="py-24 bg-gradient-to-br from-green-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Ce qu'ils disent</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Témoignages de nos membres
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Découvrez comment COOPEC GRACE PLUS a transformé la vie de nos membres à travers le Togo.
          </p>
        </motion.div>

        <div className="relative">
          <Slider ref={sliderRef} {...settings}>
            {active.map((testimonial) => (
              <div key={testimonial.id} className="px-3">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow h-full">
                  <Quote className="w-8 h-8 text-green-200 mb-4" />
                  {/* Stars */}
                  <div className="flex gap-1 mb-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"}`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 italic">
                    "{testimonial.text}"
                  </p>
                  <div className="flex items-center gap-3">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.clientName}
                      className="w-12 h-12 rounded-full object-cover border-2 border-green-100"
                    />
                    <div>
                      <p className="font-bold text-gray-900 text-sm">{testimonial.clientName}</p>
                      <p className="text-green-600 text-xs">Membre COOPEC GRACE PLUS</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </Slider>

          {/* Custom Navigation */}
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={() => sliderRef.current?.slickPrev()}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-green-400 hover:text-green-600 flex items-center justify-center transition-all shadow-sm"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => sliderRef.current?.slickNext()}
              className="w-10 h-10 rounded-full bg-white border border-gray-200 hover:border-green-400 hover:text-green-600 flex items-center justify-center transition-all shadow-sm"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
