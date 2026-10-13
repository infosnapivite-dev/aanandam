import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, Clock, Calendar, Share2 } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import OptimizedImage from '../components/common/OptimizedImage';
import PrimaryButton from '../components/buttons/PrimaryButton';
import { blogPosts } from '../data/blog';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogPosts.find((p) => p.slug === slug);

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  return (
    <PageTransition>
      <div className="w-full bg-[#F6EDE3] pt-32 pb-24 border-b border-[#DED6C8]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-left">
          
          {/* Back button */}
          <Link
            to="/blog"
            className="inline-flex items-center text-xs font-semibold tracking-wider uppercase text-[#777268] hover:text-[#173D2C] transition-colors mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-2" />
            Back to Journal
          </Link>

          {/* Article Header */}
          <div className="mb-10">
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#B48A4A] block mb-3">
              {post.category}
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#24221E] font-normal leading-[1.12] mb-6">
              {post.title}
            </h1>
            <div className="flex items-center space-x-6 text-xs text-[#777268] pb-6 border-b border-[#DED6C8]">
              <span className="flex items-center">
                <Calendar className="w-3.5 h-3.5 mr-1.5" />
                {post.date}
              </span>
              <span className="flex items-center">
                <Clock className="w-3.5 h-3.5 mr-1.5" />
                {post.readTime}
              </span>
            </div>
          </div>

          {/* Featured Image */}
          <div className="rounded-xl overflow-hidden mb-12 border border-[#DED6C8] bg-[#EEE8DD]">
            <OptimizedImage
              src={post.image}
              alt={post.title}
              className="w-full aspect-[16/9] object-cover"
            />
          </div>

          {/* Article Body */}
          <div className="prose prose-stone max-w-none text-[#24221E] font-light leading-relaxed space-y-6 text-base sm:text-lg">
            {post.content.split('\n\n').map((paragraph, idx) => {
              const text = paragraph.trim();
              if (text.startsWith('### ')) {
                return (
                  <h3 key={idx} className="font-serif text-2xl sm:text-3xl font-medium text-[#173D2C] pt-6 pb-2">
                    {text.replace('### ', '')}
                  </h3>
                );
              }
              return (
                <p key={idx} className="text-[#3a3731]">
                  {text}
                </p>
              );
            })}
          </div>

          {/* Call to action card */}
          <div className="mt-16 bg-[#F6EDE3] border border-[#DED6C8] rounded-xl p-8 sm:p-10 text-center">
            <h3 className="font-serif text-2xl sm:text-3xl text-[#24221E] mb-3">
              Ready to elevate your product packaging?
            </h3>
            <p className="text-sm text-[#777268] max-w-lg mx-auto mb-6 font-light">
              Discuss your project dimensions, materials, and luxury finishes with our studio production team.
            </p>
            <PrimaryButton to="/get-quote" className="mx-auto">
              Start Quotation Journey
            </PrimaryButton>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
