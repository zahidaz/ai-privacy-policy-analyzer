console.log("Content script loaded.");

const collectUrlsAndFindPrivacyLink = () => {
  const urls = Array.from(document.querySelectorAll("a"))
    .map(anchor => anchor.href)
    .filter(href => href.startsWith("http"));
  const mostProbable = findPrivacyPolicyUrl(urls);
  console.log(mostProbable)
  return mostProbable
};


const findPrivacyPolicyUrl = (urls: Array<string>) => {
  const patterns = [
    { regex: /privacy-policy/i, score: 10 },
    { regex: /privacy\/policy/i, score: 8 },
    { regex: /privacy/i, score: 6 },
    { regex: /policy/i, score: 4 },
    { regex: /terms/i, score: 2 }
  ];


  const scoredUrls = urls.map(url => { // url -> { url, score }

    const score = patterns.reduce((total, { regex, score }) =>

      total + (regex.test(url) ? score : 0), 0 // if the url matches the regex, add the score to the total, otherwise add 0
      // total will be higher for urls that matche more of the patterns
    
    ); // url -> score

    return { url, score }; // return the url and score for each url
  });

  // sort the scored urls by score and return the url with the highest score
  return scoredUrls.sort((a, b) => b.score - a.score)[0]?.url;
};

const fetchHtmlContent = async (url: string) => {
  try {
    const response = await fetch(url);
    return response.ok ? await response.text() : null;
  } catch (error) {
    console.error("Error fetching privacy page:", error);
    return null;
  }
};


const parseHTMLContent = (html: string) => {
  const doc = new DOMParser().parseFromString(html, 'text/html');
  return doc.querySelector('main')?.innerText.trim() || doc.body?.innerText.trim() || '';
};


const sendPrivacyPolicyToBackgroundWorker = async () => {
  const privacyUrl = collectUrlsAndFindPrivacyLink();
  if (!privacyUrl) throw new Error("No privacy policy URL found.");

  const html = await fetchHtmlContent(privacyUrl);
  if (!html) throw new Error("Failed to fetch privacy policy page.");

  const text = parseHTMLContent(html);
  chrome.runtime.sendMessage({ action: 'privacyPolicyReady', privacyPolicy: text });
  console.log("privacy policy sent to background worker");
};

sendPrivacyPolicyToBackgroundWorker();
