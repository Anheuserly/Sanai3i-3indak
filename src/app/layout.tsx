import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import { AppProvider } from "@/context/AppContext";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ResponsibilityModal } from "@/components/ResponsibilityModal";
import { DownloadApkModal } from "@/components/DownloadApkModal";
import { StaffLoginModal } from "@/components/StaffLoginModal";
import { WorkerApplicationModal } from "@/components/WorkerApplicationModal";
import { FeedbackReportModal } from "@/components/FeedbackReportModal";

const cairo = Cairo({
  subsets: ["arabic", "latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-cairo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "صنايعي عندك — المنصة المحلية الأولى للصيانة في نابلس، فلسطين",
  description:
    "صنايعي شاطر ومضمون لحد عندك في نابلس. طلب صنايعي مجاني 100%، بدون بطاقات دفع أو محافظ. الدفع نقداً ومباشرة بعد إنجاز العمل.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🛠️</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="font-cairo antialiased min-h-screen flex flex-col bg-slate-50 text-slate-900">
        <AppProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <ResponsibilityModal />
          <DownloadApkModal />
          <StaffLoginModal />
          <WorkerApplicationModal />
          <FeedbackReportModal />
        </AppProvider>
      </body>
    </html>
  );
}
