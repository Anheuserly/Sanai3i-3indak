import React from "react";
import Link from "next/link";
import { Lock, ShieldCheck, EyeOff, Server, UserX, BellRing, PhoneCall, CheckCircle } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "سياسة الخصوصية وحماية البيانات | صنايعي عندك — نابلس",
  description: "سياسة الخصوصية الرسمية لمنصة صنايعي عندك. كيف نجمع ونحمي بيانات الزبائن والصنائعية في مدينة نابلس، مع التزام تام بعدم مشاركة البيانات.",
};

export default function PrivacyPage() {
  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <span>/</span>
          <span className="text-primary">سياسة الخصوصية</span>
        </nav>

        {/* Header Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>حماية البيانات والخصوصية — متوافق مع معايير الأمان</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-3">سياسة الخصوصية وحماية البيانات</h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              نحن في «صنايعي عندك» نعتبر خصوصية أهلنا في نابلس أمانة مقدسة. نوضح هنا بشفافية تامة ماهية البيانات التي نجمعها، وكيف نستخدمها لخدمتك، وكيف نحميها دون بيعها أو استغلالها إطلاقاً.
            </p>
            <div className="mt-6 flex flex-wrap gap-4 text-xs text-slate-300">
              <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">🔒 تشفير البيانات: من البداية للنهاية</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">🚫 بيع البيانات: محظور نهائياً 100%</span>
              <span className="bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">📅 تاريخ التحديث: سبتمبر 2026</span>
            </div>
          </div>
        </div>

        {/* Core Principles Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
              <EyeOff className="w-6 h-6" />
            </div>
            <h3 className="font-black text-sm text-slate-900 mb-1">عدم بيع البيانات</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              لا نقوم ولن نقوم أبداً ببيع أو تأجير بيانات مستخدمينا لأي شركات تسويق أو جهات خارجية.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-3">
              <Lock className="w-6 h-6" />
            </div>
            <h3 className="font-black text-sm text-slate-900 mb-1">مشاركة محدودة للغاية</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              رقم الهاتف والحي يشاركان فقط مع الصنايعي المقبول لطلبك لإنجاز الزيارة الميدانية.
            </p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center mb-3">
              <UserX className="w-6 h-6" />
            </div>
            <h3 className="font-black text-sm text-slate-900 mb-1">حق الحذف في أي وقت</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              يمكنك طلب مسح سجلك أو إيقاف حسابك في أي وقت عبر التواصل مع فريق الدعم في نابلس.
            </p>
          </div>
        </div>

        {/* Detailed Content Sections */}
        <div className="space-y-8 text-slate-800 text-sm leading-relaxed">

          {/* Section 1 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center font-bold text-sm">١</span>
              ما هي البيانات التي نقوم بجمعها؟
            </h2>
            <div className="space-y-3 text-slate-600">
              <p>نجمع فقط البيانات الضرورية لتشغيل طلبات الصيانة وتسهيل التواصل بين الزبون والصنايعي:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <strong className="block text-slate-900 mb-1">بيانات الزبائن:</strong>
                  الاسم الكريم، رقم الهاتف الجوال (أوريدو أو جوال)، اسم الحي أو المنطقة في نابلس (مثل رفيديا، المخفية، البلدة القديمة، إلخ)، ووصف المشكلة مع الصور التوضيحية الاختيارية.
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 text-xs">
                  <strong className="block text-slate-900 mb-1">بيانات الحرفيين والصنائعية:</strong>
                  الاسم والمهنة التخصصية، سنوات الخبرة، رقم الهاتف للتواصل التجاري، الحي أو نطاق العمل في نابلس، وسجل التقييمات والإنجازات.
                </div>
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center font-bold text-sm">٢</span>
              كيف نستخدم بياناتك؟
            </h2>
            <ul className="space-y-2.5 text-slate-600 text-xs sm:text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>تنسيق زيارات الصيانة:</strong> إرسال تفاصيل الطلب للصنايعي المعني لتقديم عرضه والتنسيق للزيارة.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>التحقق من الأمان:</strong> منع الطلبات الوهمية والتأكد من جدية المستخدمين لحماية وقت الصنائعية وأمان المنازل.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>لوحة الصدارة والتقييمات:</strong> حساب متوسط التقييمات وعرض أفضل 5 صنايعية وأفضل 3 زبائن لتشجيع المجتمع على الالتزام.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                <span><strong>حل النزاعات والشكاوى:</strong> مراجعة الطلب والمحادثات في حال وجود أي خلاف مهني لإنصاف الطرفين.</span>
              </li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center font-bold text-sm">٣</span>
              حماية رقم الهاتف والموقع
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-3">
              نحن ندرك حساسية أرقام الهواتف وعناوين المنازل في مجتمعنا، لذا نطبق السياسات التالية:
            </p>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-2">
              <p>• <strong>لا تظهر أرقام الهواتف أو العناوين الدقيقة للعامة</strong> في صفحات التطبيق العامة.</p>
              <p>• يُعرض فقط اسم الحي العام (مثلاً: «المعاجين» أو «رفيديا») ونوع العطل في قائمة الطلبات العامة للصنائعية.</p>
              <p>• لا يتم تزويد الصنايعي برقم هاتف الزبون إلا بعد موافقة الزبون على العرض وبدء مرحلة «في الطريق» أو «المعاينة».</p>
            </div>
          </section>

          {/* Section 4 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center font-bold text-sm">٤</span>
              التخزين وحماية السجلات
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm">
              تُخزن البيانات على قواعد بيانات سحابية مشفرة تستخدم أعلى بروتوكولات الأمان (SSL/TLS)، مع استخدام التخزين المحلي (LocalStorage) في المتصفح فقط لحفظ تفضيلات الجلسة ومحاكاة الأدوار بدون تتبع إعلاني خارجي.
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm">
            <h2 className="text-xl font-black text-slate-900 mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-lg bg-emerald-600/10 text-emerald-700 flex items-center justify-center font-bold text-sm">٥</span>
              حقوقك وخيارات التحكم في حسابك
            </h2>
            <p className="text-slate-600 text-xs sm:text-sm mb-4">
              يحق لك في أي وقت:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-600 pr-2">
              <li>طلب نسخة كاملة من بياناتك المسجلة لدينا.</li>
              <li>تعديل أو تصحيح أي بيانات شخصية أو معلومات مهنية.</li>
              <li>طلب حذف الحساب وسجل الطلبات بالكامل من خوادمنا بشكل نهائي.</li>
            </ul>
          </section>

          {/* Support Bar */}
          <div className="bg-emerald-900 text-white rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h4 className="font-black text-base mb-1">هل لديك سؤال حول خصوصية بياناتك؟</h4>
              <p className="text-xs text-emerald-200 font-medium">فريق الأمان وحماية البيانات في نابلس جاهز لمساعدتك بكل سرور.</p>
            </div>
            <Link
              href="/faq"
              className="bg-accent hover:bg-accent-dark text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs transition-all"
            >
              الأسئلة الشائعة والدعم
            </Link>
          </div>

        </div>

      </div>
    </div>
  );
}
