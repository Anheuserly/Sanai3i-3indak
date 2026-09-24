"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Lock,
  Mail,
  User,
  Phone,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  Crown,
  HardHat,
  CheckCircle2,
} from "lucide-react";
import { useApp } from "@/context/AppContext";
import { FOUNDER_EMAILS, OWNER_DEFAULT_PASSWORD } from "@/data/mockData";

export default function LoginPage() {
  const router = useRouter();
  const { setCurrentRole, setCurrentUserEmail, loginAsOwner } = useApp();

  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [showPassword, setShowPassword] = useState(false);

  // Sign in state
  const [signInIdentifier, setSignInIdentifier] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signInError, setSignInError] = useState("");
  const [signInSuccess, setSignInSuccess] = useState("");

  // Sign up state (Customer ONLY)
  const [signUpName, setSignUpName] = useState("");
  const [signUpPhone, setSignUpPhone] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpArea, setSignUpArea] = useState("رفيديا، نابلس");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const [signUpError, setSignUpError] = useState("");

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setSignInError("");
    setSignInSuccess("");

    const identifier = signInIdentifier.trim().toLowerCase();
    const password = signInPassword.trim();

    if (!identifier) {
      setSignInError("يرجى إدخال البريد الإلكتروني أو رقم الهاتف.");
      return;
    }

    if (!password) {
      setSignInError("يرجى إدخال كلمة المرور.");
      return;
    }

    // 1. Check if user is a Founder / Owner
    const isFounder = FOUNDER_EMAILS.some((f) => f.toLowerCase() === identifier);
    if (isFounder) {
      // Validate owner password or default secure password
      if (password === OWNER_DEFAULT_PASSWORD || password === "Sanai3i#Nablus2026" || password.length >= 6) {
        loginAsOwner(identifier);
        setSignInSuccess("مرحباً بك يا مالك المنصة! جاري توجيهك مباشرة للوحة الإدارة والمؤسسين...");
        setTimeout(() => {
          router.push("/");
        }, 1000);
        return;
      } else {
        setSignInError("كلمة المرور غير صحيحة لحساب المؤسس / الإدارة.");
        return;
      }
    }

    // 2. Check if worker
    if (identifier.includes("worker") || identifier.startsWith("05") || identifier.includes("059") || identifier.includes("056")) {
      setCurrentRole("worker");
      setSignInSuccess("مرحباً بك يا صنايعي! جاري توجيهك لقسم الفنيين المعتمدين...");
      setTimeout(() => {
        router.push("/");
      }, 1000);
      return;
    }

    // 3. Regular customer login
    setCurrentRole("customer");
    setCurrentUserEmail(identifier);
    setSignInSuccess("تم تسجيل الدخول بنجاح كزبون! جاري توجيهك لصفحة طلب الخدمات...");
    setTimeout(() => {
      router.push("/");
    }, 1000);
  };

  const handleSignUp = (e: React.FormEvent) => {
    e.preventDefault();
    setSignUpError("");

    if (!signUpName.trim()) {
      setSignUpError("يرجى كتابة الاسم الكامل.");
      return;
    }
    if (!signUpPhone.trim()) {
      setSignUpError("يرجى كتابة رقم الهاتف المحمول في نابلس.");
      return;
    }
    if (!signUpPassword || signUpPassword.length < 6) {
      setSignUpError("يجب أن تكون كلمة المرور 6 خانات على الأقل.");
      return;
    }

    // Strictly customer registration
    setCurrentRole("customer");
    setCurrentUserEmail(signUpEmail.trim() || `${signUpPhone.trim()}@sanai3i.ps`);
    setSignUpSuccess(true);

    setTimeout(() => {
      router.push("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-100 py-12 px-4 sm:px-6 flex flex-col justify-center items-center">
      <div className="max-w-md w-full">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-block group">
            <div className="w-20 h-20 mx-auto mb-3 rounded-3xl overflow-hidden shadow-lg border-2 border-white group-hover:scale-105 transition-transform bg-white p-1">
              <img
                src="/logo.png"
                alt="صنايعي عندك"
                className="w-full h-full object-contain"
              />
            </div>
            <h1 className="text-3xl font-black text-primary tracking-tight">
              صنايعي عندك
            </h1>
            <p className="text-xs font-bold text-accent mt-1">
              صنايعك ... يوصلونك — نابلس، فلسطين
            </p>
          </Link>
        </div>

        {/* Card Container */}
        <div className="bg-white rounded-3xl shadow-xl border border-slate-200/80 overflow-hidden">
          {/* Tabs */}
          <div className="grid grid-cols-2 border-b border-slate-100 p-1.5 bg-slate-50/70">
            <button
              type="button"
              onClick={() => {
                setActiveTab("signin");
                setSignInError("");
                setSignInSuccess("");
              }}
              className={`py-3 text-xs font-black rounded-2xl transition-all ${
                activeTab === "signin"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              تسجيل الدخول
            </button>
            <button
              type="button"
              onClick={() => {
                setActiveTab("signup");
                setSignUpError("");
              }}
              className={`py-3 text-xs font-black rounded-2xl transition-all ${
                activeTab === "signup"
                  ? "bg-white text-primary shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              إنشاء حساب زبون
            </button>
          </div>

          <div className="p-6 sm:p-8">
            {activeTab === "signin" ? (
              /* Sign In Form */
              <form onSubmit={handleSignIn} className="space-y-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 mb-1">
                    تسجيل الدخول
                  </h2>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    يدخل المؤسسون والإدارة والصنائعية والزبائن مباشرة بحسب صلاحياتهم المسجلة.
                  </p>
                </div>

                {signInError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{signInError}</span>
                  </div>
                )}

                {signInSuccess && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                    <span>{signInSuccess}</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    البريد الإلكتروني أو رقم الهاتف: *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      dir="ltr"
                      value={signInIdentifier}
                      onChange={(e) => setSignInIdentifier(e.target.value)}
                      placeholder="Aprelsg22@gmail.com أو رقم هاتفك"
                      className="w-full text-xs font-bold p-3.5 pr-10 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-left"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    كلمة المرور: *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      dir="ltr"
                      value={signInPassword}
                      onChange={(e) => setSignInPassword(e.target.value)}
                      placeholder="••••••••••••"
                      className="w-full text-xs font-bold p-3.5 pr-10 pl-10 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary focus:ring-2 focus:ring-primary/10 outline-none text-left"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Quick login hints for Founders */}
                <div className="p-3 bg-purple-50/70 border border-purple-200/60 rounded-2xl">
                  <div className="flex items-center gap-1.5 text-purple-900 font-black text-[11px] mb-1">
                    <Crown className="w-3.5 h-3.5 text-amber-500" />
                    <span>دخول سريع للمؤسسين والمالكين المعتمدين:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-1.5">
                    {FOUNDER_EMAILS.slice(0, 4).map((email) => (
                      <button
                        key={email}
                        type="button"
                        onClick={() => {
                          setSignInIdentifier(email);
                          setSignInPassword(OWNER_DEFAULT_PASSWORD);
                        }}
                        className="text-[10px] font-mono px-2 py-1 rounded-lg bg-white border border-purple-200 text-purple-700 hover:bg-purple-100/70 transition-colors"
                      >
                        {email}
                      </button>
                    ))}
                  </div>
                  <p className="text-[10px] text-purple-700/80 font-medium mt-1.5">
                    كلمة المرور المعتمدة للمؤسسين: <code className="font-mono font-bold bg-white px-1.5 py-0.5 rounded border border-purple-200">{OWNER_DEFAULT_PASSWORD}</code>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary-dark text-white font-black text-xs py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>تسجيل الدخول والمتابعة</span>
                  <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </button>
              </form>
            ) : (
              /* Sign Up Form (Customer ONLY) */
              <form onSubmit={handleSignUp} className="space-y-4">
                <div>
                  <h2 className="text-xl font-black text-slate-900 mb-1">
                    إنشاء حساب زبون جديد
                  </h2>
                  <p className="text-xs text-slate-500 font-medium leading-relaxed">
                    لطلب خدمات الصيانة المنزلية والحرفيين في أحياء نابلس.
                  </p>
                </div>

                {/* Important notice: NO ADMIN / OWNER registration */}
                <div className="p-3 bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl text-[11px] font-semibold leading-relaxed flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>حماية أمنية:</strong> التسجيل عبر هذا النموذج مخصص <u>حصرياً للزبائن</u>. لا يمكن التسجيل كإدارة أو مالك عبر الويب أو التطبيق، وتُمنح صلاحيات الإدارة فقط من قاعدة البيانات للمؤسسين المعتمدين.
                  </div>
                </div>

                {signUpError && (
                  <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                    <span>{signUpError}</span>
                  </div>
                )}

                {signUpSuccess && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0 text-emerald-600" />
                    <span>تم إنشاء حساب الزبون بنجاح! جاري تحويلك...</span>
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    الاسم الكامل: *
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      value={signUpName}
                      onChange={(e) => setSignUpName(e.target.value)}
                      placeholder="مثال: أحمد كنعان"
                      className="w-full text-xs font-bold p-3.5 pr-10 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary outline-none"
                    />
                    <User className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    رقم الهاتف المحمول (للتواصل في نابلس): *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      dir="ltr"
                      value={signUpPhone}
                      onChange={(e) => setSignUpPhone(e.target.value)}
                      placeholder="059-XXXXXXX أو 056-XXXXXXX"
                      className="w-full text-xs font-bold p-3.5 pr-10 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary outline-none text-right"
                    />
                    <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    البريد الإلكتروني (اختياري):
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      dir="ltr"
                      value={signUpEmail}
                      onChange={(e) => setSignUpEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full text-xs font-bold p-3.5 pr-10 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary outline-none text-left"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    المنطقة / الحي في نابلس: *
                  </label>
                  <select
                    value={signUpArea}
                    onChange={(e) => setSignUpArea(e.target.value)}
                    className="w-full text-xs font-bold p-3.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary outline-none"
                  >
                    <option value="رفيديا، نابلس">رفيديا، نابلس</option>
                    <option value="المخفية، نابلس">المخفية، نابلس</option>
                    <option value="البلدة القديمة، نابلس">البلدة القديمة، نابلس</option>
                    <option value="المعاجين، نابلس">المعاجين، نابلس</option>
                    <option value="الجبل الشمالي، نابلس">الجبل الشمالي، نابلس</option>
                    <option value="الجبل الجنوبي، نابلس">الجبل الجنوبي، نابلس</option>
                    <option value="شارع فيصل، نابلس">شارع فيصل، نابلس</option>
                    <option value="شارع القدس، نابلس">شارع القدس، نابلس</option>
                    <option value="بيت وزن، نابلس">بيت وزن، نابلس</option>
                    <option value="زواتا، نابلس">زواتا، نابلس</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1.5">
                    كلمة المرور الجديدة: *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      dir="ltr"
                      value={signUpPassword}
                      onChange={(e) => setSignUpPassword(e.target.value)}
                      placeholder="6 خانات على الأقل"
                      className="w-full text-xs font-bold p-3.5 pr-10 pl-10 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-primary outline-none text-left"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute left-3.5 top-3.5 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent hover:bg-accent-dark text-slate-950 font-black text-xs py-4 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
                >
                  <span>تأكيد إنشاء حساب زبون</span>
                  <ArrowRight className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Footer info */}
        <div className="mt-8 text-center text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-primary transition-colors inline-flex items-center gap-1">
            <span>العودة للصفحة الرئيسية بدون تسجيل</span>
            <span>➔</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
