import Header from "@/components/Header/Header";
import "./globals.css";
import type { AppProps } from "next/app";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export default function App({ Component, pageProps, router }: AppProps) {
  const hideHeader = ["/login", "/signup"].includes(router.pathname);

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={pageProps.dehydratedState}>
        {!hideHeader && <Header />}
        <main className="w-[1200px] min-h-[1200px] mx-auto my-24 border-[1px] border-dashed border-pink-100">
          <Component {...pageProps} />
        </main>
      </HydrationBoundary>
    </QueryClientProvider>
  );
}
