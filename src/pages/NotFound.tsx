import { useLocation } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";

const SectionVideoBackground = lazy(() => import("@/components/SectionVideoBackground"));

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background">
      <Suspense fallback={null}>
        <SectionVideoBackground sectionIds={[]} defaultSection="contact" />
      </Suspense>

      <div className="relative z-10 rounded-2xl border border-border/60 bg-background/65 px-10 py-12 text-center backdrop-blur-md">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
