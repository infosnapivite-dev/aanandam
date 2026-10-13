import React from 'react';
import { PackageOpen } from 'lucide-react';
import PageTransition from '../components/animations/PageTransition';
import PrimaryButton from '../components/buttons/PrimaryButton';

export default function NotFound() {
  return (
    <PageTransition>
      <div className="w-full min-h-[75vh] flex items-center justify-center bg-[#F6EDE3] px-5 py-32 text-center border-b border-[#DED6C8]">
        <div className="max-w-md mx-auto">
          {/* Packaging Illustration */}
          <div className="w-20 h-20 rounded-full bg-[#EEE8DD] border border-[#DFD3C1] flex items-center justify-center mx-auto mb-6 text-[#173D2C]">
            <PackageOpen className="w-10 h-10 stroke-[1.4]" />
          </div>

          <span className="font-serif text-6xl sm:text-7xl text-[#173D2C] font-light tracking-tight block mb-2">
            404
          </span>

          <h1 className="font-serif text-3xl sm:text-4xl text-[#24221E] font-medium mb-3">
            Looks like this box is empty.
          </h1>

          <p className="text-sm text-[#777268] font-light leading-relaxed mb-8">
            The page you're looking for may have moved, been repackaged, or no longer exists in our studio catalog.
          </p>

          <PrimaryButton to="/" size="md" className="mx-auto">
            Return Home
          </PrimaryButton>
        </div>
      </div>
    </PageTransition>
  );
}
