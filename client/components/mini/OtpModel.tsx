// Put this near your modal code (same file or import it)
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ModalClose, ModalContent, ModalFooter } from "../ui/animated-model";

const BLUE = "#004AAD";
const ORANGE = "#FF7A00";

export  function VerifyOtpModalContent({
  title = "Verify OTP",
  subtitle = "Enter the 6-digit code we sent to your phone/email.",
  length = 6,
  onVerify,
  onResend,
}: {
  title?: string;
  subtitle?: string;
  length?: number;
  onVerify?: (code: string) => Promise<boolean> | boolean;
  onResend?: () => Promise<void> | void;
}) {
  const [digits, setDigits] = useState<string[]>(() => Array.from({ length }, () => ""));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cooldown, setCooldown] = useState(30); // seconds
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);

  const code = useMemo(() => digits.join(""), [digits]);
  const isComplete = code.length === length && digits.every(d => d !== "");

  // focus first input on mount
  useEffect(() => {
    inputsRef.current[0]?.focus();
  }, []);

  // cooldown timer
  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => setCooldown(c => c - 1), 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const setDigitAt = (idx: number, val: string) => {
    setDigits(prev => {
      const next = [...prev];
      next[idx] = val;
      return next;
    });
  };

  const handleChange = (idx: number, value: string) => {
    setError(null);
    const v = value.replace(/\D/g, "").slice(0, 1);
    if (!v) {
      setDigitAt(idx, "");
      return;
    }
    setDigitAt(idx, v);
    // move next
    if (idx < length - 1) inputsRef.current[idx + 1]?.focus();
  };

  const handleKeyDown = (idx: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      if (digits[idx]) {
        setDigitAt(idx, "");
      } else if (idx > 0) {
        inputsRef.current[idx - 1]?.focus();
        setDigitAt(idx - 1, "");
      }
    } else if (e.key === "ArrowLeft" && idx > 0) {
      inputsRef.current[idx - 1]?.focus();
    } else if (e.key === "ArrowRight" && idx < length - 1) {
      inputsRef.current[idx + 1]?.focus();
    } else if (e.key === "Enter" && isComplete && !loading) {
      void submit();
    }
  };

  const handlePaste = (idx: number, e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    const arr = pasted.split("");
    setDigits(prev => {
      const next = [...prev];
      for (let i = 0; i < length && i + idx < length && i < arr.length; i++) {
        next[idx + i] = arr[i];
      }
      return next;
    });
    // focus last filled
    const last = Math.min(idx + arr.length - 1, length - 1);
    inputsRef.current[last]?.focus();
  };

  const submit = async () => {
    if (!isComplete) return;
    setLoading(true);
    setError(null);
    try {
      const ok = (await onVerify?.(code)) ?? true; // default success if not provided
      if (!ok) setError("The code you entered is incorrect. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resend = async () => {
    if (cooldown > 0) return;
    setCooldown(30);
    setDigits(Array.from({ length }, () => ""));
    setError(null);
    inputsRef.current[0]?.focus();
    await onResend?.();
  };

  return (
    <>
      <ModalContent className="p-6 sm:p-7">
        <div className="text-center mb-5">
          <h4 className="text-xl sm:text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            {title}
          </h4>
          <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
            {subtitle}
          </p>
        </div>

        {/* OTP boxes */}
   <motion.div
  className="flex items-center justify-center gap-2 sm:gap-3"
  animate={error ? { x: [-6, 6, -4, 4, 0] } : {}}
  transition={{ duration: 0.28 }}
>
  {Array.from({ length }).map((_, i) => (
    <input
      key={i}
      ref={el => (inputsRef.current[i] = el)}
      inputMode="numeric"
      autoComplete="one-time-code"
      pattern="\d*"
      maxLength={1}
      value={digits[i]}
      onChange={e => handleChange(i, e.target.value)}
      onKeyDown={e => handleKeyDown(i, e)}
      onPaste={e => handlePaste(i, e)}
      aria-label={`Digit ${i + 1}`}
      className="w-10 h-12 sm:w-12 sm:h-14 
                 text-center text-lg sm:text-2xl font-semibold
                 rounded-lg border border-gray-300 
                 bg-white text-black
                 focus:border-blue-500 focus:ring-2 focus:ring-blue-400 
                 outline-none tracking-widest"
    />
  ))}
</motion.div>


        {/* Error / hint */}
        <div className="mt-3 h-5 text-center">
          {error ? (
            <span className="text-sm text-red-400">{error}</span>
          ) : (
            <span className="text-xs text-white/70">Didn’t receive the code?</span>
          )}
        </div>

        {/* Resend + timer */}
        <div className="mt-1 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={resend}
            disabled={cooldown > 0}
            className="text-sm font-medium underline decoration-dotted disabled:no-underline
                       disabled:opacity-50"
            style={{ color: ORANGE }}
          >
            {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend code"}
          </button>
        </div>
      </ModalContent>

      <ModalFooter className="gap-3 sm:gap-4">
        <ModalClose asChild>
          <button className="px-3 py-2 bg-gray-200 text-black dark:bg-black dark:text-white border border-gray-300 dark:border-black rounded-md text-sm w-28">
            Cancel
          </button>
        </ModalClose>

        <button
          onClick={submit}
          disabled={!isComplete || loading}
          className="relative inline-flex items-center justify-center gap-2 w-28
                     rounded-md px-3 py-2 text-sm font-semibold text-white
                     disabled:opacity-60 disabled:cursor-not-allowed"
          style={{ background: `linear-gradient(90deg, ${BLUE}, ${ORANGE})` }}
        >
          {loading ? (
            <>
              <span className="h-4 w-4 border-2 border-white/80 border-t-transparent rounded-full animate-spin" />
              Verifying…
            </>
          ) : (
            "Verify"
          )}
        </button>
      </ModalFooter>
    </>
  );
}
