"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronDown,
  Wrench,
  User,
  Banknote,
  MapPin,
  MessageSquare,
  Lightbulb,
  Bug,
  AlertTriangle,
  HardHat,
} from "lucide-react";
import { useApp } from "@/context/AppContext";

interface FAQItem {
  q: string;
  a: string;
  category: "customer" | "worker" | "payment" | "nablus";
}

const faqs: FAQItem[] = [
  // Customer FAQs
  {
    category: "customer",
    q: "هل نشر طلب الصيانة على منصة صنايعي عندك مجاني؟",
    a: "نعم، 100% مجاني للزبائن! يمكنك نشر أي عدد من طلبات الصيانة وتصفح العروض والتواصل مع الفنيين دون أي رسوم على الإطلاق.",
  },
  {
    category: "customer",
    q: "كيف أضمن جودة العمل وأمان الزيارة المنزلية؟",
    a: "جميع الصنائعية المسجلين يخضعون للتحقق من الهوية المهنية ورقم الهاتف. يمكنك الاطلاع على تقييمات الزبائن السابقين وسجل أعمال الفني قبل قبول العرض. كما ننصح دائماً بوجود شخصين بالغين في المنزل وفحص العمل فور انتهائه.",
  },
  {
    category: "customer",
    q: "ماذا أفعل إذا تأخر الصنايعي عن الموعد المتفق عليه؟",
    a: "يمكنك التواصل معه مباشرة عبر رقم هاتفه الظاهر في الطلب. إذا لم يستجب أو تعذر التنسيق، يمكنك إلغاء الطلب بنقرة واحدة وإعادة إرساله ليصل لصنائعية آخرين في منطقتك بنابلس.",
  },
  {
    category: "customer",
    q: "كيف تتم عملية التقييم؟",
    a: "بعد تحويل حالة الطلب إلى «مكتمل»، يظهر لك زر التقييم لإعطاء من 1 إلى 5 نجوم وكتابة تعليق حول مدى التزامه ونظافته وأمانته. هذا التقييم يرفع أو يخفض مكانته في لوحة الصدارة.",
  },

  // Payment FAQs
  {
    category: "payment",
    q: "كيف أدفع للصنايعي بعد الانتهاء؟",
    a: "الدفع نقدي 100% يداً بيد (كاش بالشيقل أو الدينار حسب الاتفاق المسبق). المنصة لا تطلب أي بطاقات بنكية أو محافظ رقمية، ولا تأخذ أي نسبة من الزبون إطلاقاً.",
  },
  {
    category: "payment",
    q: "من يدفع ثمن قطع الغيار والمواد المطلوبة للصيانة؟",
    a: "تكلفة قطع الغيار يتحملها الزبون بناءً على سعرها الحقيقي في السوق، ويُفضل الاتفاق مع الصنايعي مسبقاً على نوع القطعة ومطالبته بفاتورة الشراء من محل القطع في نابلس.",
  },
  {
    category: "payment",
    q: "ماذا لو اختلفنا على السعر بعد بدء العمل؟",
    a: "ينص ميثاق شرف الحرفيين على وجوب تحديد تكلفة المصنعية التقديرية قبل البدء. في حال ظهور عطل غير متوقع، يلتزم الفني بالتوقف وإبلاغ الزبون بالتكلفة الجديدة قبل المتابعة.",
  },

  // Worker FAQs
  {
    category: "worker",
    q: "كيف أنضم كصنايعي أو حرفي في نابلس؟",
    a: "يمكنك التسجيل بسهولة عبر التطبيق باختيار كافة المهن التي تتقنها من بين الـ 19 مهنة المعتمدة، وتحديد منطقتك ورقم هاتفك الفلسطيني، ليتم مراجعة طلبك وتفعيله من قبل مالكي المنصة.",
  },
  {
    category: "worker",
    q: "هل التطبيق مجاني للصنائعية؟",
    a: "الشهر الأول مجاني بالكامل 100% لجميع الصنائعية الجدد بدون أي شروط لتجربة المنصة واستقبال الطلبات. بعد ذلك تتوفر باقات رمزية ثابتة، بدون أي عمولة أو نسبة مئوية على أتعابك الميدانية.",
  },
  {
    category: "worker",
    q: "كيف أصل إلى قائمة أفضل 5 صنايعية (لوحة الشرف)؟",
    a: "تعتمد لوحة الشرف على إنجاز الطلبات بنجاح، سرعة الاستجابة، ونيل تقييمات 5 نجوم من الزبائن مع خلو سجلك من الشكاوى. أصحاب المراكز الأولى يحصلون على أولوية الظهور لكافة سكان نابلس.",
  },

  // Nablus FAQs
  {
    category: "nablus",
    q: "ما هي الأحياء والمناطق المغطاة في نابلس؟",
    a: "تغطي المنصة كامل أحياء مدينة نابلس الرئيسية: رفيديا، المخفية، المعاجين، البلدة القديمة، الجبل الشمالي، الجبل الجنوبي، شارع فيصل، المساكن الشعبية، خلة العامود، عين بيت الماء، مخيم بلاطة، مخيم عسكر، زواتا، بيت وزن، وغيرها من المناطق المحيطة.",
  },
  {
    category: "nablus",
    q: "ما هي المهن الـ 19 المتوفرة في المنصة؟",
    a: "تغطي المنصة: سباك ومواسرجي، كهربائي منازل، دهان وديكورات، نجار وتركيب أثاث، حداد ولحام متنقل، بناء وترميم وقصارة، فني تكييف وتبريد، فني غاز وأفران، تصليح غسالات ونشافات، أقفال ومفاتيح سريعة، ألمنيوم وزجاج وشاورات، صيانة أبواب وشبابيك، مضخات وخزانات مياه، تنجيد وصيانة أثاث، صيانة عامة وشاملة، ميكانيكي سيارات متنقل، كهربائي سيارات متنقل، بنشر وإطارات متنقل، وصيانة دراجات وسكوترات كهربائية.",
  },
];

export default function FAQPage() {
  const { openFeedbackModal, openWorkerApplicationModal } = useApp();
  const [activeTab, setActiveTab] = useState<
    "all" | "customer" | "worker" | "payment" | "nablus"
  >("all");
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const filteredFaqs =
    activeTab === "all" ? faqs : faqs.filter((f) => f.category === activeTab);

  return (
    <div className="py-12 bg-slate-50 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-xs font-bold text-slate-500 mb-6">
          <Link href="/" className="hover:text-primary transition-colors">
            الرئيسية
          </Link>
          <span>/</span>
          <span className="text-primary">الأسئلة الشائعة والمساعدة</span>
        </nav>

        {/* Header Banner */}
        <div className="bg-gradient-to-br from-slate-900 via-primary to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl mb-10 text-center relative overflow-hidden">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent border border-accent/30 text-xs font-black mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>مركز الدعم والمساعدة المباشرة — نابلس</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black mb-3">
            الأسئلة الأكثر شيوعاً وإجاباتها
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl mx-auto font-medium">
            كل ما تحتاج لمعرفته حول طلب صنايعي، الدفع النقدي المباشر، جودة الصيانة، والتغطية في أحياء نابلس.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab("all")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all ${
              activeTab === "all"
                ? "bg-primary text-white shadow-sm scale-105"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            جميع الأسئلة ({faqs.length})
          </button>
          <button
            onClick={() => setActiveTab("customer")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              activeTab === "customer"
                ? "bg-primary text-white shadow-sm scale-105"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>للزبائن</span>
          </button>
          <button
            onClick={() => setActiveTab("worker")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              activeTab === "worker"
                ? "bg-primary text-white shadow-sm scale-105"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Wrench className="w-3.5 h-3.5" />
            <span>للصنائعية</span>
          </button>
          <button
            onClick={() => setActiveTab("payment")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              activeTab === "payment"
                ? "bg-primary text-white shadow-sm scale-105"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <Banknote className="w-3.5 h-3.5" />
            <span>الدفع والأسعار</span>
          </button>
          <button
            onClick={() => setActiveTab("nablus")}
            className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
              activeTab === "nablus"
                ? "bg-primary text-white shadow-sm scale-105"
                : "bg-white text-slate-600 hover:bg-slate-100 border border-slate-200"
            }`}
          >
            <MapPin className="w-3.5 h-3.5 text-red-500" />
            <span>أحياء ومهن نابلس</span>
          </button>
        </div>

        {/* Accordion List */}
        <div className="space-y-3 mb-12">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full text-right p-5 sm:p-6 flex items-center justify-between gap-4 font-black text-slate-900 text-sm sm:text-base hover:text-primary transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent"></span>
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? "rotate-180 text-primary" : ""
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* In-App Direct Community Center (Replaces Phone/WhatsApp/Hours) */}
        <div className="bg-gradient-to-br from-slate-900 via-primary to-slate-900 text-white rounded-3xl p-8 sm:p-10 shadow-xl">
          <div className="text-center max-w-xl mx-auto mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-black mb-3">
              <MessageSquare className="w-3.5 h-3.5" />
              <span>خدمة متاحة على مدار الساعة بدون انقطاع</span>
            </div>
            <h3 className="text-2xl font-black mb-2">
              شاركنا اقتراحك، أبلغ عن خلل، أو انضم كصنايعي
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm font-medium">
              لا داعي للاتصالات أو المراسلات الخارجية. منظومتنا التفاعلية الذكية تتيح لك إرسال مقترحاتك أو شكواك أو طلب انضمامك بضغطة زر واحدة لتصل مباشرة لمؤسسي المنصة.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              onClick={openFeedbackModal}
              className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl p-4 text-center transition-all group"
            >
              <Lightbulb className="w-6 h-6 text-amber-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-xs mb-1">تقديم اقتراح</div>
              <div className="text-[11px] text-slate-300">لتطوير خدمات نابلس</div>
            </button>

            <button
              onClick={openFeedbackModal}
              className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl p-4 text-center transition-all group"
            >
              <Bug className="w-6 h-6 text-red-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-xs mb-1">إبلاغ عن خلل فني</div>
              <div className="text-[11px] text-slate-300">معالجة فورية وتحديث</div>
            </button>

            <button
              onClick={openFeedbackModal}
              className="bg-white/10 hover:bg-white/20 border border-white/15 rounded-2xl p-4 text-center transition-all group"
            >
              <AlertTriangle className="w-6 h-6 text-orange-400 mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-xs mb-1">شكوى ضد صنايعي</div>
              <div className="text-[11px] text-slate-300">حماية حقوق الزبائن</div>
            </button>

            <button
              onClick={openWorkerApplicationModal}
              className="bg-accent/20 hover:bg-accent/30 border border-accent/40 rounded-2xl p-4 text-center transition-all group"
            >
              <HardHat className="w-6 h-6 text-accent mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <div className="font-bold text-xs text-accent mb-1">التقديم كصنايعي</div>
              <div className="text-[11px] text-slate-200">اختيار تخصصات متعددة</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
