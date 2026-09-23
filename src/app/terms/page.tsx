import React from "react";
import Link from "next/link";
import { Shield, FileText, ArrowRight, CheckCircle2, AlertTriangle, Scale, Banknote, UserCheck, HelpCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "الشروط والأحكام | صنايعي عندك — نابلس",
  description: "وثيقة الشروط والأحكام الرسمية الحاكمة لاستخدام منصة صنايعي عندك في مدينة نابلس، فلسطين. الالتزامات، سياسة الدفع النقدي، وفض النزاعات.",
};

export default function TermsPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <span>/</span>
          <span className="text-primary">الشروط والأحكام</span>
        </nav>

        {/* Header Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-primary to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 text-xs font-black mb-4">
              <Scale className="w-3.5 h-3.5" />
              <span>الوثيقة القانونية الرسمية — إصدار 2026</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-3">شروط وأحكام الاستخدام</h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              يرجى قراءة هذه الشروط بعناية قبل استخدام منصة «صنايعي عندك». استخدامك للمنصة أو التسجيل فيها كزبون أو حرفي يعتبر موافقة صريحة وكاملة على هذه البنود.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300">
              <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">📍 النطاق الجغرافي: نابلس، فلسطين</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">💵 نموذج الدفع: نقدي مباشر 100%</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">📅 آخر تحديث: سبتمبر 2026</span>
            </div>
          </div>
        </div>

        {/* Quick Highlights Alert Box */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 mb-10 text-amber-950 flex flex-col sm:flex-row gap-4 items-start">
          <div className="p-3 bg-amber-500 text-white rounded-xl flex-shrink-0">
            <AlertTriangle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="font-black text-base mb-1">تنويه جوهري حول التعاملات المالية والأداء الميداني</h3>
            <p className="text-xs sm:text-sm leading-relaxed text-amber-900 font-medium">
              «صنايعي عندك» هي منصة تقنية محلية وسيطة لربط الزبائن بأصحاب المهن والحرفيين المستقلين في نابلس. المنصة <strong>لا تقدم أي خدمات دفع إلكتروني أو بطاقات مصرفية أو محافظ رقمية إطلاقاً</strong>. تتم كافة الحسابات والاتفاقات المالية نقداً ومباشرة (كاش) بين الزبون والصنايعي بعد فحص ومعاينة العمل المنجز.
            </p>
          </div>
        </div>

        {/* Table of Content */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm mb-10">
          <h3 className="font-black text-slate-900 text-sm mb-4 border-r-2 border-primary pr-3">
            فهرس بنود الاتفاقية
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-600">
            <a href="#section-1" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <span>١.</span> التعريفات ونطاق الخدمة
            </a>
            <a href="#section-2" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <span>٢.</span> طبيعة عمل المنصة ودور الوساطة
            </a>
            <a href="#section-3" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <span>٣.</span> الأهلية ومتطلبات الحساب
            </a>
            <a href="#section-4" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <span>٤.</span> آلية تقديم الطلبات والتسعير التقديري
            </a>
            <a href="#section-5" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <span>٥.</span> السياسة المالية والدفع النقدي المباشر
            </a>
            <a href="#section-6" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <span>٦.</span> التزامات وحقوق الزبائن
            </a>
            <a href="#section-7" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <span>٧.</span> التزامات وحقوق الصنائعية
            </a>
            <a href="#section-8" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <span>٨.</span> إلغاء الطلبات والتعديلات
            </a>
            <a href="#section-9" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <span>٩.</span> التقييمات وقواعد النزاهة
            </a>
            <a href="#section-10" className="hover:text-primary transition-colors flex items-center gap-1.5">
              <span>١٠.</span> النزاعات والمسؤولية القانونية
            </a>
          </div>
        </div>

        {/* Detailed Sections */}
        <div className="space-y-8 text-slate-800 text-sm leading-relaxed">
          
          {/* Section 1 */}
          <section id="section-1" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">١</span>
              التعريفات ونطاق الخدمة
            </h2>
            <div className="space-y-3 text-slate-600">
              <p>في تطبيق هذه الشروط والأحكام، تكون للكلمات والعبارات التالية المعاني الموضحة قرين كل منها:</p>
              <ul className="list-disc list-inside space-y-2 pr-2">
                <li><strong className="text-slate-900">المنصة:</strong> تطبيق وموقع «صنايعي عندك» وكافة الأنظمة الرقمية التابعة له.</li>
                <li><strong className="text-slate-900">الزبون:</strong> أي شخص طبيعي أو اعتباري يقوم بطلب خدمة صيانة منزلية أو مهنية عبر المنصة في مدينة نابلس.</li>
                <li><strong className="text-slate-900">الصنايعي / المهني:</strong> الحرفي أو الفني المستقل المسجل لتقديم خدمات الصيانة المتخصصة ضمن الـ 19 مهنة المعتمدة.</li>
                <li><strong className="text-slate-900">نطاق التغطية:</strong> مدينة نابلس (جبل النار)، قراها، ومخيماتها ومحيطها الجغرافي المحدد في قوائم التطبيق.</li>
                <li><strong className="text-slate-900">الطلب:</strong> استمارة الخدمة التي يرسلها الزبون وتحتوي على نوع المشكلة، الحي، والوقت المفضل للزيارة.</li>
              </ul>
            </div>
          </section>

          {/* Section 2 */}
          <section id="section-2" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">٢</span>
              طبيعة عمل المنصة ودور الوساطة
            </h2>
            <p className="text-slate-600 mb-4">
              منصة «صنايعي عندك» هي دليل وبوابة تقنية وسيطة متخصصة لربط الزبائن بالصنائعية المستقلين. المنصة <strong>ليست شركة مقاولات ولا جهة تشغيل مباشرة</strong>، ولا يعتبر الصنايعي موظفاً لدى المنصة، بل يمارس نشاطه المهني كحرفي حر مستقل يخضع لتقديراته المهنية ومسؤوليته الشخصية.
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-2">
              <div className="flex items-center gap-2 font-bold text-slate-900">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>دور المنصة ينحصر في:</span>
              </div>
              <ul className="list-disc list-inside space-y-1 pr-4">
                <li>توفير البنية التقنية السهلة لنشر الطلبات والربط الذكي.</li>
                <li>إتاحة ملفات الصنائعية وتقييمات الزبائن السابقين بكل شفافية.</li>
                <li>توفير نظام تتبع المراحل السبع من الإرسال وحتى الإنهاء.</li>
                <li>التدخل التوفيقي الودي عند ورود بلاغات أو شكاوى.</li>
              </ul>
            </div>
          </section>

          {/* Section 3 */}
          <section id="section-3" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">٣</span>
              الأهلية ومتطلبات الحساب
            </h2>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>يجب أن يكون المستخدم قد أتم 18 عاماً لإنشاء طلبات صيانة تتضمن استقبال فنيين في المنازل.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>يلتزم المستخدم بتقديم بيانات صحيحة ودقيقة (الاسم، رقم الهاتف الفلسطيني الفعال، وعنوان الحي في نابلس).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span>يلتزم الصنايعي بتقديم وثائق إثبات الهوية والخبرة المهنية عند طلب فريق الإدارة لاعتماد شارة «صنايعي موثوق».</span>
              </li>
            </ul>
          </section>

          {/* Section 4 & 5 - Payment */}
          <section id="section-4" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center font-bold text-sm">٤</span>
              السياسة المالية: الدفع النقدي المباشر 100%
            </h2>
            <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-4 text-emerald-950">
              <div className="flex items-center gap-2 font-black text-sm mb-2 text-emerald-900">
                <Banknote className="w-5 h-5 text-emerald-600" />
                <span>نظام الدفع «كاش باليد» بعد المعاينة والرضا التام</span>
              </div>
              <p className="text-xs leading-relaxed font-medium">
                تتبنى منصة «صنايعي عندك» نموذج المعاملات النقدية المباشرة المريح لأهلنا في فلسطين، بحيث يدفع الزبون القيمة المتفق عليها نقداً للصنايعي بعد الانتهاء التام وتجربة عمل الصيانة والتأكد من جودتها.
              </p>
            </div>
            <ul className="space-y-2 text-slate-600 text-xs sm:text-sm">
              <li>• <strong>مجانية الزبائن:</strong> نشر الطلبات وتصفح الصنائعية مجاني 100% وبدون أي عمولات خفية.</li>
              <li>• <strong>اشتراك الصنائعية:</strong> الشهر الأول مجاني بالكامل لكافة الصنائعية الجدد لتجربة المنصة، ويخضع التجديد لباقات شهرية رمزية ثابتة بدون أي اقتطاع نسبة من أجر العمل الميداني.</li>
              <li>• <strong>قطع الغيار والمواد:</strong> أسعار قطع الغيار تخضع لفواتير الشراء الفعلية من محلات نابلس ويتم الاتفاق عليها مسبقاً بين الزبون والفني قبل التركيب.</li>
            </ul>
          </section>

          {/* Section 6 & 7 - Commitments */}
          <section id="section-6" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">٥</span>
              التزامات الأطراف وميثاق السلوك
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-primary" />
                  <span>التزامات الزبون:</span>
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>تحديد موقع العطل بدقة والتواجد في الموعد المحدد.</li>
                  <li>تهيئة مكان العمل وتوفير بيئة آمنة للصنايعي.</li>
                  <li>معاينة العمل بدقة وتجربته فور الانتهاء وسداد الأجر المتفق عليه نقداً.</li>
                  <li>كتابة تقييم نزيه وعادل يعكس التجربة الفعلية.</li>
                </ul>
              </div>

              <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                  <Shield className="w-4 h-4 text-emerald-600" />
                  <span>التزامات الصنايعي:</span>
                </h4>
                <ul className="text-xs text-slate-600 space-y-1.5 list-disc list-inside">
                  <li>الالتزام التام بالمواعيد المحددة مع الزبون.</li>
                  <li>احترام خصوصية المنازل والعائلات في نابلس.</li>
                  <li>الشفافية الكاملة في تكاليف العمل والقطع قبل البدء.</li>
                  <li>تنظيف مكان العمل بعد إنجازه وتقديم نصائح الصيانة.</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Section 8 & 9 */}
          <section id="section-8" className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center font-bold text-sm">٦</span>
              فض النزاعات وسياسة التقييمات العادلة
            </h2>
            <p className="text-slate-600 mb-3">
              نظام التقييم (1 إلى 5 نجوم مع التعليق) هو الركيزة الأساسية لثقة المجتمع في نابلس. يحظر تماماً كتابة تقييمات كيدية أو وهمية. في حال نشوء أي خلاف مهني بين الزبون والصنايعي، يلتزم الطرفان بالتالي:
            </p>
            <ol className="list-decimal list-inside space-y-2 text-xs sm:text-sm text-slate-600 pr-2">
              <li>محاولة التسوية المباشرة بروح الأخوة والأمانة المعهودة في مجتمعنا.</li>
              <li>رفع بلاغ إلى إدارة منصة «صنايعي عندك» عبر زر المساعدة أو رقم الدعم.</li>
              <li>يقوم فريق الدعم بالتحقق من تفاصيل الطلب، ومراجعة المحادثات، والتوسط لحل الإشكال ودياً.</li>
              <li>تحتفظ إدارة المنصة بحق حظر أو تعليق أي حساب يثبت إخلاله بالأمانة أو سوء التعامل.</li>
            </ol>
          </section>

          {/* Contact Box */}
          <div className="bg-slate-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-black text-base mb-1">هل لديك استفسار حول الشروط والأحكام؟</h4>
              <p className="text-xs text-slate-400 font-medium">فريق الدعم الفني متواجد للإجابة على كافة أسئلتكم القانونية والتشغيلية في نابلس.</p>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/faq"
                className="bg-primary hover:bg-primary-dark text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all"
              >
                الأسئلة الشائعة
              </Link>
              <Link
                href="/privacy"
                className="bg-white/10 hover:bg-white/20 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all border border-white/10"
              >
                سياسة الخصوصية
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
