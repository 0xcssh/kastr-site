// Tells Bing, Yandex, Seznam and Naver (IndexNow) which URLs changed. Bing feeds ChatGPT search and Copilot.
// Google does not use IndexNow: for Google, the sitemap in Search Console does the job.
// Usage after a deploy: node scripts/indexnow.mjs            (every URL of both sitemaps)
//                       node scripts/indexnow.mjs <url> ...  (only these)
// The key is public by design: it is served at https://kastr.app/<key>.txt to prove we own the host.
const KEY = "8129061a57c3ebeb3ab94e34fbc3cab2";
const HOST = "kastr.app";

async function sitemapUrls() {
  const urls = [];
  for (const map of ["sitemap.xml", "sitemap-profiles.xml"]) {
    const xml = await (await fetch(`https://${HOST}/${map}`)).text();
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) urls.push(m[1]);
  }
  return urls;
}

const urlList = process.argv.length > 2 ? process.argv.slice(2) : await sitemapUrls();
const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow: ${res.status} for ${urlList.length} URL(s)`);
if (res.status >= 300) process.exit(1);
