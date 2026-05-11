export interface Screenshot {
  src: string;
  caption: string;
  source?: string;
}

export interface FeaturedPartner {
  name: string;
  logo: string;
  url: string;
  description: string;
}

export interface HowItWorksStep {
  icon: string;
  title: string;
  detail: string;
  color?: string;
  chainPill?: string;
}

export interface UserStory {
  persona: string;
  userType: string;
  context: string;
  app: string;
  partnerSlug?: string | null;
  steps: string[];
  without: string;
}

export interface RevenueModel {
  feeStructure: string;
  revShare?: string;
}

export interface UseCase {
  name: string;
  slug: string;
  icon: string;
  tagline: string;
  coverImage?: string;
  screenshots: Screenshot[];
  featuredPartners: FeaturedPartner[];
  relevantUserTypes: string[];
  demoComponent?: string;
  sortOrder: number;
  revenueHooks: Record<string, string>;
  userStories: UserStory[];
  howItWorksSteps: HowItWorksStep[];
  revenueModel?: RevenueModel;
  comingSoon?: boolean;
  content?: string;
}

export interface LogoAsset {
  symbol: string;
  logo: string;
  chain?: string;
  chainLogo?: string;
}

export interface LogoFlow {
  from: { assets: LogoAsset[]; moreCount?: number };
  to: { assets: LogoAsset[]; moreCount?: number };
  fromLabel?: string;
  toLabel?: string;
}

export interface CaseStudyUseCase {
  useCase: string;
  summary: string;
  flow: string[];
  logoFlow?: LogoFlow;
  screenshots: string[];
  captions: string[];
}

export interface Transformation {
  before: { headline: string; body: string };
  after: { headline: string; body: string };
}

export interface StoryBeat {
  icon: string;
  label: string;
  body: string;
}

export interface Metric {
  label: string;
  value: string;
  period?: string;
}

export interface CaseStudy {
  name: string;
  slug: string;
  logo: string;
  url: string;
  description: string;
  userType: string;
  chains: string[];
  status: 'live' | 'building' | 'opportunity';
  integrationMethod?: string;
  featured: boolean;
  sortOrder: number;
  coverImage?: string;
  metrics: Metric[];
  tags: string[];
  useCases: CaseStudyUseCase[];
  transformation?: Transformation;
  storyBeats: StoryBeat[];
  content?: string;
}

export interface UserType {
  slug: string;
  name: string;
  description: string;
  icon: string;
  question: string;
}
