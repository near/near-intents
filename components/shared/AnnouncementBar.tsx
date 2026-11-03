'use client';

import { Plus, X } from 'lucide-react';
import { ANNOUNCEMENT_DISMISS_KEY } from '@/lib/announcement';

const SWAP_URL = 'https://near.com/pearl';

// Hiding is done via a data attribute on <html> (see .announcement-bar in globals.css),
// the same one the <head> script sets on load, so there's no React state to sync.
function dismiss() {
  try {
    localStorage.setItem(ANNOUNCEMENT_DISMISS_KEY, String(Date.now()));
  } catch {}
  document.documentElement.dataset.announcementDismissed = '1';
}

// Height is fixed (h-12) so Navigation can reserve the same space with a spacer.
export function AnnouncementBar() {
  return (
    <div className="announcement-bar relative h-12 bg-brand-orange text-black pl-4 pr-10 sm:px-12">
      <div className="h-full max-w-7xl mx-auto flex items-center justify-center gap-3 sm:gap-5">
        <p className="text-[14px] sm:text-[16px] font-medium leading-tight">
          Pearl is listed on NEAR.com
          <span className="hidden sm:inline"> — start swapping today</span>
        </p>
        <a
          href={SWAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex-shrink-0 inline-flex items-center gap-1.5 rounded-[6px] bg-black text-white hover:bg-white hover:text-black transition-colors duration-300 px-3 py-1.5 text-[12px] sm:text-[14px] tracking-[0.2em] uppercase [font-family:var(--font-grotesk-mono)] no-underline"
        >
          <Plus size={12}className="transition-transform duration-500 ease-out group-hover:rotate-90" />
          <span className="relative overflow-hidden leading-none translate-y-[1px]">
            <span className="block transition-transform duration-300 ease-out group-hover:-translate-y-full">
              Start Swapping
            </span>
            <span className="absolute top-0 left-0 block transition-transform duration-300 ease-out translate-y-full group-hover:translate-y-0">
              Start Swapping
            </span>
          </span>
        </a>
      </div>
      <button
        type="button"
        onClick={dismiss}
        aria-label="Dismiss announcement"
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-1.5 rounded-[6px] text-black/70 hover:text-black hover:bg-black/10 transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
}
