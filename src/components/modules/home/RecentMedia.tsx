

import { MediaItem } from "@/services/home/recentMedia.service";
import { RecentMediaCard } from "./RecentMediaCard";

const RecentMedia = ({ recentMedia }: { recentMedia: MediaItem[] }) => {
  return (
    <section className="relative w-full py-20 bg-background overflow-hidden border-t border-white/5">
      {/* Decorative Top Line Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-4">
        {/* Section Header */}
        <div className="mb-14 text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
            Created by Our Community
          </h2>
          <p className="text-zinc-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed">
            Take a look at the latest masterpiece generations created by users
            from around the globe in real-time.
          </p>
        </div>

        {/* Responsive Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {recentMedia.map((item: MediaItem) => (
            <RecentMediaCard key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Decorative background glows */}
      <div className="absolute -left-1/4 top-1/3 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -right-1/4 bottom-1/3 w-[500px] h-[500px] bg-purple-500/5 rounded-full blur-[140px] pointer-events-none" />
    </section>
  );
};

export default RecentMedia;
