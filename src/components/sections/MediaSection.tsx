import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { useStore } from "../../data/store";
import type { MediaItem } from "../../data/store";

const filters = [
  { key: "all", label: "Tous" },
  { key: "evenements", label: "Événements" },
  { key: "projets", label: "Projets" },
  { key: "communaute", label: "Communauté" },
];

export function MediaSection() {
  const { media } = useStore();
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState(6);
  const [lightbox, setLightbox] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });

  const filtered = activeFilter === "all" ? media : media.filter((m) => m.category === activeFilter);
  const visible = filtered.slice(0, visibleCount);

  const openLightbox = (index: number) => setLightbox({ open: true, index });
  const closeLightbox = () => setLightbox({ open: false, index: 0 });
  const prevImage = () => setLightbox((prev) => ({ ...prev, index: (prev.index - 1 + filtered.length) % filtered.length }));
  const nextImage = () => setLightbox((prev) => ({ ...prev, index: (prev.index + 1) % filtered.length }));

  return (
    <section id="mediatheque" className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <span className="text-green-600 font-semibold text-sm uppercase tracking-widest">Nos moments</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mt-2 mb-4">
            Médiathèque
          </h2>
          <p className="text-gray-500 max-w-xl mx-auto">
            Découvrez nos événements, projets et moments de vie communautaire en images.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => { setActiveFilter(f.key); setVisibleCount(6); }}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                activeFilter === f.key
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-white text-gray-600 border border-gray-200 hover:border-blue-300 hover:text-blue-600"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Masonry Gallery */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 640: 2, 1024: 3 }}>
              <Masonry gutter="16px">
                {visible.map((item, i) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: i * 0.05 }}
                    className="relative rounded-2xl overflow-hidden cursor-pointer group shadow-sm"
                    onClick={() => openLightbox(filtered.indexOf(item))}
                  >
                    <img
                      src={item.thumbnail || item.url}
                      alt={item.title}
                      className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                      <div className="w-full">
                        <p className="text-white font-semibold text-sm mb-2">{item.title}</p>
                        <div className="flex items-center justify-center w-full">
                          <span className="bg-white/20 backdrop-blur-sm border border-white/30 text-white px-4 py-2 rounded-full text-xs font-semibold flex items-center gap-2">
                            <Eye className="w-3 h-3" /> Voir
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </motion.div>
        </AnimatePresence>

        {/* Load More */}
        {visibleCount < filtered.length && (
          <div className="text-center mt-10">
            <button
              onClick={() => setVisibleCount((c) => c + 6)}
              className="bg-white border border-gray-200 hover:border-green-400 hover:text-green-600 text-gray-700 px-8 py-3 rounded-full text-sm font-semibold transition-all shadow-sm hover:shadow-md"
            >
              Afficher plus
            </button>
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox.open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            <button
              className="absolute top-4 right-4 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 z-10"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 z-10"
              onClick={(e) => { e.stopPropagation(); prevImage(); }}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 z-10"
              onClick={(e) => { e.stopPropagation(); nextImage(); }}
            >
              <ChevronRight className="w-6 h-6" />
            </button>
            <motion.div
              key={lightbox.index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-5xl max-h-[85vh] mx-auto px-16"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filtered[lightbox.index]?.url}
                alt={filtered[lightbox.index]?.title}
                className="max-h-[80vh] max-w-full object-contain rounded-xl"
              />
              <p className="text-white text-center mt-4 font-semibold">{filtered[lightbox.index]?.title}</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
