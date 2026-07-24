const shimmer = `
  @keyframes shimmer {
    0% { background-position: -800px 0; }
    100% { background-position: 800px 0; }
  }
`;

const ShimmerBox = ({
  className = "",
  style = {},
}: {
  className?: string;
  style?: React.CSSProperties;
}) => (
  <div
    className={`rounded-lg ${className}`}
    style={{
      background:
        "linear-gradient(90deg, #e5e7eb 25%, #f3f4f6 50%, #e5e7eb 75%)",
      backgroundSize: "800px 100%",
      animation: "shimmer 1.6s infinite linear",
      ...style,
    }}
  />
);

const PricingSwitchSkeleton = () => (
  <div className="flex justify-center">
    <ShimmerBox className="h-12 w-52 rounded-full" />
  </div>
);

const PlanCardSkeleton = ({ popular = false }: { popular?: boolean }) => (
  <div
    className={`relative flex flex-col h-full rounded-md border border-neutral-200 shadow-md bg-white p-6 ${
      popular ? "ring-2 ring-blue-200" : ""
    }`}
  >
    {/* Header */}
    <div className="flex justify-between items-start mb-4">
      <ShimmerBox className="h-7 w-24" />
      {popular && <ShimmerBox className="h-6 w-20 rounded-full" />}
    </div>

    {/* Description */}
    <ShimmerBox className="h-4 w-full mb-1" />
    <ShimmerBox className="h-4 w-3/4 mb-6" />

    {/* Price */}
    <div className="flex items-baseline gap-2 mb-8">
      <ShimmerBox className="h-12 w-28" />
      <ShimmerBox className="h-4 w-12" />
    </div>

    {/* CTA Button */}
    <ShimmerBox className="h-14 w-full rounded-md mb-8" />

    {/* Features */}
    <ul className="space-y-4 mb-8 flex-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="flex items-center gap-3">
          <ShimmerBox className="h-5 w-5 flex-shrink-0 rounded-full" />
          <ShimmerBox
            className="h-4"
            style={{ width: `${60 + Math.random() * 30}%` }}
          />
        </li>
      ))}
    </ul>

    {/* Divider + included section */}
    <div className="pt-6 border-t border-neutral-200/60 space-y-3">
      <ShimmerBox className="h-4 w-32" />
      <div className="flex items-center gap-3">
        <ShimmerBox className="h-7 w-7 rounded-full flex-shrink-0" />
        <ShimmerBox className="h-4 w-48" />
      </div>
    </div>
  </div>
);

export function PricingSkeleton() {
  return (
    <>
      <style>{shimmer}</style>

      <div className="px-4 pt-40 min-h-screen mx-auto relative bg-neutral-100 overflow-hidden">
        {/* Radial glow bg */}
        <div
          className="absolute top-0 left-[10%] right-[10%] w-[80%] h-full z-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #206ce8 0%, transparent 70%)",
            opacity: 0.2,
            mixBlendMode: "multiply",
          }}
        />

        {/* Hero text block */}
        <div className="text-center mb-10 max-w-3xl mx-auto relative z-10 space-y-4">
          <div className="flex flex-col items-center gap-3">
            <ShimmerBox className="h-12 w-80 sm:w-[480px]" />
            <ShimmerBox className="h-10 w-36 rounded-md" />
          </div>
          <div className="flex flex-col items-center gap-2 mt-4">
            <ShimmerBox className="h-5 w-72 sm:w-96" />
            <ShimmerBox className="h-5 w-56 sm:w-80" />
          </div>
        </div>

        {/* Toggle switch */}
        <div className="relative z-10 mb-10">
          <PricingSwitchSkeleton />
        </div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 max-w-6xl gap-6 py-4 mx-auto relative z-10">
          <PlanCardSkeleton />
          <PlanCardSkeleton popular />
          <PlanCardSkeleton />
        </div>
      </div>
    </>
  );
}
