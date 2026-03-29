type MetricPayload = {
  id: string;
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  navigationType: string;
};

const sendMetric = (metric: MetricPayload) => {
  const metricWithPath = {
    ...metric,
    path: window.location.pathname,
  };

  const analyticsWindow = window as Window & {
    gtag?: (command: string, eventName: string, params: Record<string, string | number>) => void;
  };

  if (typeof analyticsWindow.gtag === "function") {
    analyticsWindow.gtag("event", metric.name, {
      value: Math.round(metric.value),
      metric_id: metric.id,
      metric_value: metric.value,
      metric_delta: metric.delta,
      metric_rating: metric.rating,
      page_path: metricWithPath.path,
    });
  }
};

export const initWebVitals = async () => {
  if (typeof window === "undefined" || import.meta.env.DEV) {
    return;
  }

  const { onCLS, onINP, onLCP, onTTFB, onFCP } = await import("web-vitals");

  onCLS(sendMetric);
  onINP(sendMetric);
  onLCP(sendMetric);
  onTTFB(sendMetric);
  onFCP(sendMetric);
};
