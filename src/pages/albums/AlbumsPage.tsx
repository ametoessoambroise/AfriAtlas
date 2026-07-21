import { useState } from "react";
import { motion } from "framer-motion";
import { Camera, Plus } from "lucide-react";
import { Link } from "react-router-dom";
import AlbumsGrid from "@/components/albums/AlbumsGrid";

const AlbumsPage = () => {
  return (
    <div className="min-h-screen pt-24 pb-20 px-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                <Camera className="w-5 h-5 text-primary" />
              </div>
              <span className="text-sm font-black uppercase tracking-[0.3em] text-primary">
                Souvenirs
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight">
              Mes Albums <br />
              <span className="text-muted-foreground/40 italic">de Voyage</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Link
              to="/albums/new"
              className="btn-primary flex items-center gap-2 px-8 py-4 rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all text-xs font-black uppercase tracking-widest"
            >
              <Plus className="w-4 h-4" />
              Nouvel Album
            </Link>
          </motion.div>
        </div>

        {/* Filters/Stats could go here if needed */}

        {/* Albums Grid */}
        <AlbumsGrid />
      </div>
    </div>
  );
};

export default AlbumsPage;
