import React from "react";
import Link from "next/link";
import { Award, CheckCircle, ShieldCheck, HeartHandshake, Sparkles, AlertTriangle, Clock, ThumbsUp } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ميثاق شرف الحرفيين ومعايير الجودة | صنايعي عندك — نابلس",
  description: "ميثاق الشرف الأخلاقي والمهني المعتمد لكافة الحرفيين والصنائعية في نابلس، فلسطين. الالتزام بالمواعيد، الأمانة في التسعير، وضمان الإتقان.",
};

export default function CharterPage() {
  const pillars = [
    {
      title: "الصدق ودقة المواعيد",
      icon: <Clock className="w-6 h-6 text-primary" />,
      desc: "احترام موعد الزيارة المحدد مع الزبون، وفي حال حدوث أي طارئ خارج عن الإرادة، يجب إبلاغ الزبون مسبقاً قبل الموعد بساعة على الأقل.",
    },
    {
      title: "الأمانة والشفافية المالية",
      icon: <CheckCircle className="w-6 h-6 text-emerald-600" />,
      desc: "توضيح تكلفة أجرة اليد (المصنعية) وأسعار قطع الغيار بدقة وصدق قبل البدء في التنفيذ، وعدم فرض أي مبالغ إضافية مفاجئة بدون موافقة مسبقة.",
    },
    {
      title: "صون حرمة البيوت وخصوصية العائلات",
      icon: <ShieldCheck className="w-6 h-6 text-blue-600" />,
      desc: "احترام عادات وتقاليد أهلنا في نابلس، وغض البصر، وحسن الخلق والتعامل بأقصى درجات الأدب والاحتشام واللباقة أثناء الزيارات المنزلية.",
    },
    {
      title: "الإتقان المهني وجودة التنفيذ",
      icon: <Award className="w-6 h-6 text-amber-500" />,
      desc: "العمل بمقتضى الأصول الهندسية والحرفية السليمة، واختبار العطل والتشغيل السليم أمام العميل، وتقديم ضمان معنوي للإصلاح المنفذ.",
    },
    {
      title: "النظافة وترتيب مكان العمل",
      icon: <Sparkles className="w-6 h-6 text-purple-600" />,
      desc: "تنظيف وكنس أي بقايا أو مخلفات نتجت عن أعمال الحفر أو الصيانة أو القطع، وترك المكان كما كان نظيفاً ومرتباً ومحترماً.",
    },
    {
      title: "حسن الاستماع وقبول الملاحظات",
      icon: <HeartHandshake className="w-6 h-6 text-red-500" />,
      desc: "تقبل استفسارات العميل بصدر رحب، وشرح سبب العطل وكيفية تجنب تكراره مستقبلاً لتنمية ثقة المجتمع في الصنائعية المحليين.",
    },
  ];

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">الرئيسية</Link>
          <span>/</span>
          <span className="text-primary">ميثاق شرف الحرفيين</span>
        </nav>

        {/* Header Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-10 relative overflow-hidden">
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-black mb-4">
              <Award className="w-3.5 h-3.5" />
              <span>ميثاق الجودة والأمانة — مهنيو جبل النار</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black mb-3">ميثاق شرف الحرفيين ومعايير الجودة</h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl font-medium">
              العهد الأخلاقي والمهني الذي يلتزم به كل صنايعي وفني ينضم لمنصة «صنايعي عندك» في نابلس. عهد الأمانة والإتقان لإعادة المكانة الرفيعة للحرفيين في مجتمعنا.
            </p>
          </div>
        </div>

        {/* Pillars Grid */}
        <div className="mb-12">
          <h2 className="text-xl font-black text-slate-900 mb-6 border-r-4 border-emerald-600 pr-3">
            الأركان الستة للصنايعي المعتمد في نابلس
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {pillars.map((p, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:border-emerald-500/50 transition-all">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100">
                    {p.icon}
                  </div>
                  <h3 className="font-black text-slate-900 text-base">{p.title}</h3>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Honor Badge & Leaderboard */}
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-amber-50 rounded-xl text-amber-600">
              <ThumbsUp className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">شارة «صنايعي موثوق» وقائمة الشرف (Top 5)</h3>
              <p className="text-xs text-slate-500 font-medium">نظام التكريم والتقدير المهني للصنائعية الأكثر التزاماً في نابلس</p>
            </div>
          </div>
          <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed">
            <p>
              يحصل الصنايعي الملتزم على شارة التوثيق الذهبية بعد إتمام 10 طلبات صيانة ناجحة على الأقل، مع الحفاظ على معدل تقييم لا يقل عن <strong>4.8 من 5 نجوم</strong>، وخلو سجله من أي شكاوى مالية أو أخلاقية.
            </p>
            <p>
              يتم تصعيد أفضل 5 صنايعية شهرياً إلى «لوحة الشرف» في الصفحة الرئيسية للتطبيق، مما يمنحهم أولوية الظهور للزبائن في أحياء نابلس المختلفة ويزيد من دخلهم وفرص عملهم.
            </p>
          </div>
        </div>

        {/* Violations & Penalties */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 sm:p-8 text-red-950 mb-10">
          <div className="flex items-center gap-3 mb-3">
            <div className="p-2.5 bg-red-600 text-white rounded-xl">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-base font-black text-red-950">العقوبات الإدارية عند مخالفة الميثاق</h3>
          </div>
          <p className="text-xs sm:text-sm text-red-900 leading-relaxed mb-4 font-medium">
            تطبق إدارة منصة «صنايعي عندك» سياسة عدم التهاون مع أي إخلال بأمانة المهنة أو بحقوق الزبائن:
          </p>
          <ul className="space-y-2 text-xs sm:text-sm text-red-900 list-disc list-inside font-medium pr-2">
            <li><strong>المخالفة الأولى (تأخر غير مبرر أو خلاف سعري طفيف):</strong> إنذار إداري كتابي مع تسجيل ملحوظة في السجل الداخلي.</li>
            <li><strong>المخالفة الثانية (تكرار الشكاوى أو تقييمات سلبية متتالية):</strong> تجميد الحساب لمدة 14 يوماً مع الحرمان من قائمة الشرف.</li>
            <li><strong>المخالفات الجسيمة (الغش في القطع، سوء السلوك الأخلاقي، التخلف العمدي):</strong> حظر نهائي ودائم للحساب ورقم الهاتف وسحب شارة التوثيق بدون رجعة.</li>
          </ul>
        </div>

        {/* Bottom Call to Action */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-6 bg-slate-900 text-white rounded-2xl">
          <div>
            <h4 className="font-bold text-sm">هل أنت صنايعي محترف في نابلس وتريد الانضمام؟</h4>
            <p className="text-xs text-slate-400">انضم اليوم واستفد من الشهر الأول المجاني بالكامل بدون أي التزامات.</p>
          </div>
          <Link
            href="/"
            className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-5 py-2.5 rounded-xl text-xs transition-all whitespace-nowrap"
          >
            سجل كصنايعي الآن
          </Link>
        </div>

      </div>
    </div>
  );
}
