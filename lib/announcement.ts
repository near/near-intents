// Change the key when launching a new announcement so it shows again for everyone.
export const ANNOUNCEMENT_DISMISS_KEY = 'announcement-dismissed:pearl';

// How long a dismissal lasts before the bar shows again.
export const ANNOUNCEMENT_DISMISS_TTL_MS = 60 * 60 * 1000; // 1 hour

// Runs in <head> before first paint, so a dismissed bar never flashes on page load.
// The stored value is the dismissal timestamp. A page reload (normal or hard — browsers
// report both as "reload") clears it; regular link navigation keeps it.
export const ANNOUNCEMENT_INIT_SCRIPT = `try{
var k='${ANNOUNCEMENT_DISMISS_KEY}';
var n=performance.getEntriesByType&&performance.getEntriesByType('navigation')[0];
var isReload=n?n.type==='reload':performance.navigation&&performance.navigation.type===1;
var t=Number(localStorage.getItem(k));
if(isReload||!t||Date.now()-t>${ANNOUNCEMENT_DISMISS_TTL_MS}){localStorage.removeItem(k)}
else{document.documentElement.dataset.announcementDismissed='1'}
}catch(e){}`;
