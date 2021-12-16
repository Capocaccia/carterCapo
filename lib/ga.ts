export const pageview = (url: string) => {
  (window as any).gtag("config", "UA-112016254-1", {
    page_path: url,
  });
};

// log specific events happening.
export const event = ({ action, params }: any) => {
  (window as any).gtag("event", action, params);
};
