import React from 'react';
import { Link } from 'react-router-dom';
import PageTransition from '../components/animations/PageTransition';
import SectionHeading from '../components/common/SectionHeading';
import { navItems, legalLinks } from '../data/navigation';
import { productCategories } from '../data/products';

export default function Sitemap() {
  return (
    <PageTransition>
      <div className="w-full bg-[#F6EDE3] pt-32 pb-24 border-b border-[#DED6C8]">
        <div className="max-w-4xl mx-auto px-5 sm:px-8 text-left">
          <SectionHeading
            eyebrow="INDEX & NAVIGATION"
            title="Sitemap"
            align="left"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h3 className="font-serif text-xl text-[#173D2C] font-semibold mb-4 pb-2 border-b border-[#DED6C8]">
                Main Atelier
              </h3>
              <ul className="space-y-2 text-sm text-[#24221E]">
                <li><Link to="/" className="hover:text-[#B48A4A]">Home</Link></li>
                {navItems.map((n) => (
                  <li key={n.href}>
                    <Link to={n.href} className="hover:text-[#B48A4A]">{n.label}</Link>
                  </li>
                ))}
                <li><Link to="/get-quote" className="hover:text-[#B48A4A]">Instant Quote Journey</Link></li>
                <li><Link to="/contact" className="hover:text-[#B48A4A]">Contact & Sample Kits</Link></li>
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-xl text-[#173D2C] font-semibold mb-4 pb-2 border-b border-[#DED6C8]">
                Packaging Categories
              </h3>
              <ul className="space-y-2 text-sm text-[#24221E]">
                {productCategories.map((c) => (
                  <li key={c.id}>
                    <Link to={c.href} className="hover:text-[#B48A4A]">{c.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-serif text-xl text-[#173D2C] font-semibold mb-4 pb-2 border-b border-[#DED6C8]">
                Legal & Governance
              </h3>
              <ul className="space-y-2 text-sm text-[#24221E]">
                {legalLinks.map((l) => (
                  <li key={l.href}>
                    <Link to={l.href} className="hover:text-[#B48A4A]">{l.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}
