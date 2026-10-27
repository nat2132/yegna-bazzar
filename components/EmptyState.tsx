import React from "react";
import Link from "next/link";

export default function EmptyState({
  title = "Nothing matches here",
  body = "Try a different search term or clear the filters — the market has plenty more.",
  actionLabel = "Clear all filters",
  actionHref = "/search",
  secondaryLabel = "Back to home",
  secondaryHref = "/",
}: {
  title?: string;
  body?: string;
  actionLabel?: string;
  actionHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <div className="flex flex-col items-center rounded-3xl border border-dashed border-sand-300 bg-cream-100/50 px-6 py-16 text-center">
      {/* Small woven-flag motif */}
      <div className="tibeb-bar-thin mb-6 w-24 rounded-full" aria-hidden />
      <h3 className="font-ethiopic text-4xl text-ochre-600" aria-hidden>
        ፍለጋ
      </h3>
      <p className="mt-3 font-display text-xl text-espresso-900">{title}</p>
      <p className="mt-2 max-w-sm text-sm leading-relaxed text-espresso-500">{body}</p>
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Link
          href={actionHref}
          className="rounded-xl bg-berbere-600 px-5 py-2.5 text-sm font-bold text-cream-50 shadow-card transition-colors hover:bg-berbere-700"
        >
          {actionLabel}
        </Link>
        {secondaryHref && (
          <Link
            href={secondaryHref}
            className="rounded-xl border border-espresso-700 px-5 py-2.5 text-sm font-semibold text-espresso-700 transition-colors hover:bg-espresso-700 hover:text-cream-50"
          >
            {secondaryLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
