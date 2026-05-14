'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import type { UseCase } from '@/lib/types/content';
import type { UserType } from '@/lib/types/content';
import UseCaseCard from './UseCaseCard';

interface Props {
  useCases: UseCase[];
  userTypes: UserType[];
  caseStudyLogosMap: Record<string, string[]>;
}

export default function UseCasesList({ useCases, userTypes, caseStudyLogosMap }: Props) {
  const [selected, setSelected] = useState<string | null>(null);

  const activeType = userTypes.find((ut) => ut.slug === selected);

  const filtered = selected
    ? useCases.filter((uc) => uc.relevantUserTypes?.includes(selected))
    : useCases;

  return (
    <div>
      {/* Role selector card */}
      <div className="mb-8 sm:mb-10 rounded-2xl border border-white/10 bg-[#242424] p-6 shadow-sm sm:p-8">
        <p className="mb-5 text-sm font-semibold text-white/60 sm:text-base">
          Filter by your product type
        </p>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
          {userTypes.map((ut) => (
            <button
              key={ut.slug}
              onClick={() => setSelected(selected === ut.slug ? null : ut.slug)}
              className={`rounded-lg border px-3 py-2.5 text-left text-sm transition-all ${
                selected === ut.slug
                  ? 'border-[#fb4d01]/50 bg-[#fb4d01]/10 text-white'
                  : 'border-white/10 bg-black/20 text-white/60 hover:border-white/20 hover:text-white'
              }`}
            >
              <p className="font-semibold text-[13px]">{ut.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Context bar — shown when a type is selected */}
      {activeType && (
        <div className="mb-8 sm:mb-10 flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#fb4d01]/15 text-[#fb4d01]">
            <span className="text-lg">🔍</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">{activeType.name}</p>
            <p className="text-sm text-white/60">{activeType.question}</p>
          </div>
          <button
            onClick={() => setSelected(null)}
            className="ml-auto flex items-center gap-1 text-xs text-white/40 underline hover:text-white transition-colors"
          >
            <X size={12} />
            Clear
          </button>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        {filtered.length === 0 ? (
          <p className="col-span-2 py-12 text-center text-white/40">
            No use cases found for this product type.
          </p>
        ) : (
          filtered.map((uc) => (
            <UseCaseCard
              key={uc.slug}
              useCase={uc}
              selectedUserType={selected}
              caseStudyLogos={caseStudyLogosMap[uc.slug] ?? []}
            />
          ))
        )}
      </div>
    </div>
  );
}
