import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import {
  Wallet, Cpu, PenLine, CheckCircle, ArrowLeftRight, CreditCard,
  Link as LinkIcon, Zap, Bot, Blocks, GitMerge, Landmark,
  type LucideProps,
} from 'lucide-react';
import type { UseCase } from '@/lib/types/content';

type IconComp = React.ComponentType<LucideProps>;
const ICON_MAP: Record<string, IconComp> = {
  Wallet, Cpu, PenLine, CheckCircle, ArrowLeftRight, CreditCard,
  Link: LinkIcon, Zap, Bot, Blocks, GitMerge, Landmark,
  'arrow-left-right': ArrowLeftRight,
};

interface Colors {
  iconBg: string; iconColor: string; accent: string;
  hookBg: string; hookText: string; hookBorder: string;
  badgeBg: string; badgeText: string;
}

const COLOR_MAP: Record<string, Colors> = {
  'cross-chain-swaps':  { iconBg: 'bg-blue-900/30',    iconColor: 'text-blue-400',    accent: 'text-blue-400',    hookBg: 'bg-blue-900/20',    hookText: 'text-blue-300',    hookBorder: 'border-blue-500/20',    badgeBg: 'bg-blue-900/30',    badgeText: 'text-blue-400' },
  'cross-pay':          { iconBg: 'bg-purple-900/30',  iconColor: 'text-purple-400',  accent: 'text-purple-400',  hookBg: 'bg-purple-900/20',  hookText: 'text-purple-300',  hookBorder: 'border-purple-500/20',  badgeBg: 'bg-purple-900/30',  badgeText: 'text-purple-400' },
  'asset-onboarding':   { iconBg: 'bg-emerald-900/30', iconColor: 'text-emerald-400', accent: 'text-emerald-400', hookBg: 'bg-emerald-900/20', hookText: 'text-emerald-300', hookBorder: 'border-emerald-500/20', badgeBg: 'bg-emerald-900/30', badgeText: 'text-emerald-400' },
  'chain-integration':  { iconBg: 'bg-indigo-900/30',  iconColor: 'text-indigo-400',  accent: 'text-indigo-400',  hookBg: 'bg-indigo-900/20',  hookText: 'text-indigo-300',  hookBorder: 'border-indigo-500/20',  badgeBg: 'bg-indigo-900/30',  badgeText: 'text-indigo-400' },
  'bridging':           { iconBg: 'bg-cyan-900/30',    iconColor: 'text-cyan-400',    accent: 'text-cyan-400',    hookBg: 'bg-cyan-900/20',    hookText: 'text-cyan-300',    hookBorder: 'border-cyan-500/20',    badgeBg: 'bg-cyan-900/30',    badgeText: 'text-cyan-400' },
  'chain-abstraction':  { iconBg: 'bg-amber-900/30',   iconColor: 'text-amber-400',   accent: 'text-amber-400',   hookBg: 'bg-amber-900/20',   hookText: 'text-amber-300',   hookBorder: 'border-amber-500/20',   badgeBg: 'bg-amber-900/30',   badgeText: 'text-amber-400' },
  'cross-chain-earn':   { iconBg: 'bg-teal-900/30',    iconColor: 'text-teal-400',    accent: 'text-teal-400',    hookBg: 'bg-teal-900/20',    hookText: 'text-teal-300',    hookBorder: 'border-teal-500/20',    badgeBg: 'bg-teal-900/30',    badgeText: 'text-teal-400' },
  'token-listing':      { iconBg: 'bg-rose-900/30',    iconColor: 'text-rose-400',    accent: 'text-rose-400',    hookBg: 'bg-rose-900/20',    hookText: 'text-rose-300',    hookBorder: 'border-rose-500/20',    badgeBg: 'bg-rose-900/30',    badgeText: 'text-rose-400' },
};
const DEFAULT_COLORS: Colors = {
  iconBg: 'bg-[#fb4d01]/15', iconColor: 'text-[#fb4d01]', accent: 'text-[#fb4d01]',
  hookBg: 'bg-[#fb4d01]/10', hookText: 'text-[#fb4d01]',  hookBorder: 'border-[#fb4d01]/20',
  badgeBg: 'bg-[#fb4d01]/15', badgeText: 'text-[#fb4d01]',
};

interface Props {
  useCase: UseCase;
  selectedUserType?: string | null;
  caseStudyLogos?: string[];
}

export default function UseCaseCard({ useCase, selectedUserType, caseStudyLogos = [] }: Props) {
  const colors = COLOR_MAP[useCase.slug] ?? DEFAULT_COLORS;
  const Icon = ICON_MAP[useCase.icon] ?? ArrowLeftRight;

  const revenueHook = selectedUserType
    ? (useCase.revenueHooks?.[selectedUserType] ?? useCase.revenueHooks?.['default'])
    : null;

  const visibleTypes = useCase.relevantUserTypes?.slice(0, 3) ?? [];
  const extraCount = (useCase.relevantUserTypes?.length ?? 0) - visibleTypes.length;

  return (
    <Link
      href={`/use-cases/${useCase.slug}`}
      className="group flex overflow-hidden rounded-xl border border-white/10 bg-[#242424] shadow-sm transition-all hover:shadow-md hover:border-white/20"
    >
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {/* Top: icon + title + arrow */}
        <div className="flex items-start gap-4">
          <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${colors.iconBg} ${colors.iconColor}`}>
            <Icon size={22} strokeWidth={2} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start gap-3">
              <h3 className="text-base font-semibold text-white sm:text-lg">{useCase.name}</h3>
              <ArrowRight
                size={16}
                className={`mt-1 shrink-0 transition-transform group-hover:translate-x-0.5 ${colors.accent}`}
              />
            </div>
            <p className="mt-1 text-sm text-white/60 line-clamp-2">{useCase.tagline}</p>

            {/* Revenue hook (only when filter active) */}
            {revenueHook && (
              <div className={`mt-4 rounded-lg border ${colors.hookBorder} ${colors.hookBg} px-4 py-3`}>
                <p className={`text-xs font-medium leading-snug ${colors.hookText}`}>{revenueHook}</p>
              </div>
            )}
          </div>
        </div>

        {/* Footer: user type badges + case study logos */}
        <div className="mt-4 flex flex-wrap items-end justify-between gap-2">
          <div className="flex flex-wrap gap-1.5">
            {visibleTypes.map((t) => (
              <span
                key={t}
                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${colors.badgeBg} ${colors.badgeText}`}
              >
                {t.replace(/-/g, ' ')}
              </span>
            ))}
            {extraCount > 0 && (
              <span className="inline-flex rounded-full bg-white/10 px-2.5 py-0.5 text-xs font-medium text-white/40">
                +{extraCount}
              </span>
            )}
          </div>

          {/* Overlapping case study logos */}
          {caseStudyLogos.length > 0 && (
            <div className="flex shrink-0 items-center gap-1.5">
              <div className="flex items-center">
                {caseStudyLogos.map((logo, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    key={i}
                    src={logo}
                    alt=""
                    className={`h-5 w-5 rounded-full border border-[#242424] bg-white/5 object-cover shadow-sm ${i > 0 ? '-ml-1.5' : ''}`}
                  />
                ))}
              </div>
              <span className="text-xs font-medium text-white/40">
                {caseStudyLogos.length} case {caseStudyLogos.length === 1 ? 'study' : 'studies'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Cover image (hidden on mobile) */}
      {useCase.coverImage && (
        <div className="hidden w-36 shrink-0 items-center justify-center overflow-hidden bg-[#242424] p-3 sm:flex">
          <Image
            src={useCase.coverImage}
            alt={useCase.name}
            width={144}
            height={240}
            className="w-full rounded-lg object-contain transition-transform duration-300 group-hover:scale-[1.02]"
          />
        </div>
      )}
    </Link>
  );
}
