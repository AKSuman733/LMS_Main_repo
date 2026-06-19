import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import { colors } from "../../constants/designTokens";

export function LoadingTableSkeleton({ rows = 5, cols = 6 }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-6">
      <div className="mb-4 h-10 w-64 animate-pulse rounded-lg bg-slate-700" />
      <div className="overflow-hidden rounded-lg border border-white/10">
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid animate-pulse gap-3 border-b border-white/10 p-4 last:border-b-0"
            style={{ gridTemplateColumns: `40px repeat(${cols}, minmax(110px, 1fr))` }}
          >
            {Array.from({ length: cols + 1 }).map((__, colIndex) => (
              <div
                key={colIndex}
                className="h-5 rounded bg-gradient-to-r from-slate-700 via-slate-600 to-slate-700"
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function LoadingCardsSkeleton({ cards = 3 }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {Array.from({ length: cards }).map((_, index) => (
        <div
          key={index}
          className="h-36 animate-pulse rounded-[2rem] border border-white/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900"
        />
      ))}
    </div>
  );
}

export function PageSpinner({ text = "Loading..." }) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-[2rem] border border-white/10 bg-slate-900/80 p-10">
      <Loader2 className="animate-spin text-cyan-300" size={42} />
      <p className="mt-4 font-bold text-slate-300">{text}</p>
    </div>
  );
}

export function EmptyState({
  title = "No Items Yet",
  message = "Ready to create your first item?",
  action,
  icon: Icon = Inbox,
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-10 text-center">
      <Icon className="mx-auto text-slate-500" size={52} />
      <h3 className="mt-4 text-2xl font-black text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-400">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorState({
  title = "Unable to Load Data",
  message = "We encountered an error. Please try again.",
  onRetry,
  supportHref = "mailto:support@uptoskills.com",
}) {
  return (
    <div className="rounded-[2rem] border border-red-400/30 bg-red-400/10 p-10 text-center">
      <AlertTriangle
        className="mx-auto"
        size={52}
        style={{ color: colors.error.base }}
      />
      <h3 className="mt-4 text-2xl font-black text-white">{title}</h3>
      <p className="mx-auto mt-2 max-w-md text-sm text-red-100/80">{message}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {onRetry && (
          <button
            onClick={onRetry}
            className="rounded-lg bg-red-500 px-5 py-3 font-bold text-white"
          >
            Retry
          </button>
        )}
        <a
          href={supportHref}
          className="rounded-lg border border-white/10 px-5 py-3 font-bold text-red-100"
        >
          Contact Support
        </a>
      </div>
    </div>
  );
}
