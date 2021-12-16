export const pageview = (url) => {
  window.gtag("config", "UA-112016254-1", {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }: any) => {
  window.gtag("event", action, params);
};
