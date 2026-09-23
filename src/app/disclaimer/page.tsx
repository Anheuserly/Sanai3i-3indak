import React from "react";
import Link from "next/link";
import { AlertOctagon, Banknote, ShieldAlert, CheckCircle2, Home, Sparkles, Scale } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "إخلاء المسؤولية والدفع النقدي | صنايعي عندك — نابلس",
  description: "السياسة الرسمية لإخلاء المسؤولية ونظام الدفع النقدي المباشر 100% بين الزبون والصنايعي في منصة صنايعي عندك بمدينة نابلس.",
};

export default function DisclaimerPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <span>/</span>
          <span className="text-primary">إخلاء المسؤولية والدفع النقدي</span>
        </nav>

        {/* Header Banner */}
        <div className="bg-gradient-to-br from-amber-950 via-slate-900 to-amber-950 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/30 text-xs font-black mb-4">
              <AlertOctagon className="w-3.5 h-3.5" />
              <span>وثيقة التنويه المالي وإخلاء المسؤولية الميدانية</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-3">إخلاء المسؤولية والسياسة المالية</h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              توضيح قانوني وتشغيلي صريح حول طبيعة التعاملات المالية والميدانية بين الزبائن والفنيين المستقلين عبر منصة «صنايعي عندك» في نابلس.
            </p>
          </div>
        </div>

        {/* Major Golden Rule Box */}
        <div className="bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-300 rounded-2xl p-6 sm:p-8 mb-10 text-amber-950 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black">
              <Banknote className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black text-amber-950">القاعدة الذهبية: الدفع نقداً باليد بعد المعاينة والرضا التام</h2>
              <span className="text-xs text-amber-800 font-bold">100% Cash-on-Delivery Direct Settlement</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-amber-900 font-medium">
            تؤكد منصة «صنايعي عندك» لجميع مستخدميها في مدينة نابلس وقراها أنها <strong>لا تمتلك ولا تشغل أي بوابة دفع إلكتروني، ولا تطلب أي أرقام بطاقات ائتمان أو محافظ رقمية، ولا تستقبل أي مبالغ مالية نيابة عن أي طرف</strong>. كافة المدفوعات تتم نقداً (كاش) مباشرة بين العميل والصنايعي بعد الانتهاء من العمل وفحصه شخصياً.
          </p>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-slate-800 text-sm leading-relaxed">

          {/* Section 1 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-amber-600" />
              <span>١. حدود مسؤولية المنصة التقنية</span>
            </h3>
            <p className="text-slate-600 mb-4">
              تعمل «صنايعي عندك» كوسيط إلكتروني ذكي ينشر الطلبات ويسهل التواصل بين طالبي الخدمة وأصحاب المهن المستقلين. بناءً عليه:
            </p>
            <ul className="space-y-2 text-slate-600 text-xs sm:text-sm list-disc list-inside pr-2">
              <li>المنصة لا تعتبر طرفاً في العقد الشفهي أو الخطي المبرم بين الزبون والصنايعي.</li>
              <li>المهنيون والحرفيون ليسوا موظفين ولا ممثلين رسميين للمنصة، بل أصحاب مهن حرة مستقلون.</li>
              <li>المنصة غير مسؤولة مدنياً أو جنائياً عن أي خلافات مادية أو أضرار ناتجة عن سوء التنفيذ أو سوء التقدير بين الطرفين، ولكنها تتيح نظام البلاغات لاتخاذ الإجراءات الإدارية الصارمة بحق المخالفين.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>٢. تعليمات الفحص والمعاينة الإلزامية قبل الدفع</span>
            </h3>
            <p className="text-slate-600 mb-4">
              لحماية حقوقك المالية كزبون، يُلزمك هذا البروتوكول باتباع الخطوات التالية قبل تسليم المبلغ النقدي:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="font-black text-primary block">خطوة ١: التجربة الفعلية</span>
                <p className="text-slate-600">تشغيل الجهاز، أو فحص تسريب المياه، أو تجربة المفاتيح الكهربائية فور إنهاء الفني لعمله.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="font-black text-primary block">خطوة ٢: تدقيق الفواتير</span>
                <p className="text-slate-600">طلب فاتورة قطع الغيار المشتراة من محلات نابلس للتأكد من الأسعار ومطابقتها للمتفق عليه.</p>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                <span className="font-black text-primary block">خطوة ٣: التسليم والتقييم</span>
                <p className="text-slate-600">دفع الأجر النقدي المستحق يداً بيد، وتسجيل تقييمك النزيه في المنصة لمساعدة باقي أهالي نابلس.</p>
              </div>
            </div>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h3 className="text-lg font-black text-slate-900 mb-3 flex items-center gap-2">
              <Home className="w-5 h-5 text-primary" />
              <span>٣. إرشادات السلامة المنزلية واستقبال الفنيين</span>
            </h3>
            <ul className="space-y-2 text-slate-600 text-xs sm:text-sm list-disc list-inside pr-2">
              <li>احرص على تواجد شخصين بالغين على الأقل في المنزل أثناء زيارة الصيانة.</li>
              <li>تأكد من هوية الصنايعي ومطابقة اسمه ورقمه المسجل في طلب التطبيق قبل فتح الباب.</li>
              <li>إبعاد الأطفال والحيوانات الأليفة عن منطقة العمل الميداني، خاصة في أعمال الكهرباء واللحام والسباكة الثقيلة.</li>
              <li>في حال حدوث أي تصرف غير لائق أو مخالف لميثاق الشرف، يُرجى إنهاء الزيارة فوراً والاتصال بالدعم الفني.</li>
            </ul>
          </section>

          {/* Navigation Bar */}
          <div className="pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <Link
              href="/charter"
              className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
            >
              <span>← الاطلاع على ميثاق شرف الحرفيين ومعايير الجودة</span>
            </Link>
            <Link
              href="/terms"
              className="text-xs font-bold text-slate-500 hover:text-slate-900 transition-colors"
            >
              العودة للشروط والأحكام
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
