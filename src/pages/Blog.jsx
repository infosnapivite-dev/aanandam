import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Calendar } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import OptimizedImage from '../components/common/OptimizedImage';
import { blogPosts } from '../data/blog';

export default function Blog() {
  return (
    <PageTransition>
      <div className="w-full bg-[#F6EDE3] pt-32 pb-24 border-b border-[#DED6C8]">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 md:px-12 lg:px-16">
          
          {/* Header */}
          <SectionHeading
            eyebrow="PACKAGING EDITORIAL & INSIGHTS"
            title="The Aanandam Journal"
            description="Essays, technical guides, and design perspectives on bespoke packaging, material tactility, and sustainable brand presentation."
            align="center"
          />

          {/* Articles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="group flex flex-col bg-[#F6EDE3] border border-[#E9E2D6] rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 text-left"
              >
                <Link to={`/blog/${post.slug}`} className="block aspect-[16/10] overflow-hidden bg-[#EEE8DD]">
                  <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full"
                    imgClassName="transition-transform duration-500 ease-out group-hover:scale-105"
                  />
                </Link>

                <div className="p-6 sm:p-7 flex flex-col flex-grow">
                  <div className="flex items-center space-x-4 text-xs text-[#777268] mb-3">
                    <span className="font-semibold uppercase tracking-wider text-[#B48A4A]">
                      {post.category}
                    </span>
                    <span>·</span>
                    <span className="flex items-center">
                      <Clock className="w-3.5 h-3.5 mr-1" />
                      {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl text-[#24221E] font-medium leading-snug mb-3 group-hover:text-[#173D2C] transition-colors">
                    <Link to={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-sm text-[#777268] font-light leading-relaxed mb-6 flex-grow">
                    {post.excerpt}
                  </p>

                  <div className="pt-4 border-t border-[#E9E2D6] mt-auto">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-flex items-center text-xs font-semibold tracking-wider uppercase text-[#173D2C] group-hover:text-[#B48A4A] transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="ml-1.5 w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
