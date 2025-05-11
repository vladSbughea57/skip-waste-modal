export default function SkipCardSkeleton() {
    return (
      <div className="rounded-lg border-2 border-zinc-700 bg-zinc-800 p-4 h-full flex flex-col animate-pulse">
        <div className="w-full h-44 bg-zinc-700 mb-4 rounded" />
        <div className="h-4 bg-zinc-700 rounded mb-2 w-3/4 mx-auto" />
        <div className="h-3 bg-zinc-700 rounded mb-1 w-1/2 mx-auto" />
        <div className="h-6 bg-zinc-700 rounded mb-2 w-1/2 mx-auto" />
        <div className="h-3 bg-zinc-700 rounded w-2/3 mx-auto" />
      </div>
    );
  }
  