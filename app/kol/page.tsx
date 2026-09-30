import KolDashboard from './KolDashboard';
import { RAW_KOLS, RAW_FUNDS, RAW_TWEETS } from './data';

// Server component: data is imported here (never in the client bundle) and only
// reaches the browser through this route's payload, which the middleware protects.
export default function KolPage() {
  return <KolDashboard rawKols={RAW_KOLS} rawFunds={RAW_FUNDS} rawTweets={RAW_TWEETS} />;
}
