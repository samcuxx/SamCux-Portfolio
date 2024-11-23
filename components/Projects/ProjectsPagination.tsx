'use client';

import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function ProjectsPagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8
    },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    },
    tap: { 
      scale: 0.95
    },
    disabled: {
      scale: 1,
      opacity: 0.5
    }
  };

  const arrowVariants = {
    hover: (direction: number) => ({
      x: direction * 3,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25
      }
    }),
    tap: { 
      scale: 0.9
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 1 && i <= currentPage + 1)
      ) {
        pages.push(i);
      } else if (i === currentPage - 2 || i === currentPage + 2) {
        pages.push('...');
      }
    }
    return pages.filter((page, index, array) => 
      array.indexOf(page) === index
    );
  };

  return (
    <motion.div 
      className="flex justify-center items-center gap-2 mt-12"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        animate={currentPage === 1 ? "disabled" : "visible"}
        custom={-1}
        className={`p-2 rounded-lg transition-all duration-300 
          ${currentPage === 1 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'hover:bg-[#ffe400] hover:text-[#101010]'
          }`}
      >
        <motion.div
          variants={arrowVariants}
          custom={-1}
        >
          <ChevronLeft className="w-5 h-5" />
        </motion.div>
      </motion.button>

      <AnimatePresence mode="wait">
        {renderPageNumbers().map((page, index) => (
          <motion.button
            key={page.toString() + index}
            onClick={() => typeof page === 'number' && onPageChange(page)}
            variants={itemVariants}
            whileHover={typeof page === 'number' ? "hover" : undefined}
            whileTap={typeof page === 'number' ? "tap" : undefined}
            className={`w-8 h-8 rounded-lg text-sm font-medium transition-all duration-300
              ${typeof page === 'number' && page === currentPage
                ? 'bg-[#ffe400] text-[#101010]'
                : typeof page === 'number'
                  ? 'hover:bg-[#ffe400] hover:text-[#101010]'
                  : 'cursor-default'
              }`}
            layout
          >
            <motion.span
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
            >
              {page}
            </motion.span>
          </motion.button>
        ))}
      </AnimatePresence>

      <motion.button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        animate={currentPage === totalPages ? "disabled" : "visible"}
        custom={1}
        className={`p-2 rounded-lg transition-all duration-300 
          ${currentPage === totalPages 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'hover:bg-[#ffe400] hover:text-[#101010]'
          }`}
      >
        <motion.div
          variants={arrowVariants}
          custom={1}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}