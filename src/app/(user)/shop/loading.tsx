import { Skeleton } from "@/components/ui/skeleton";

export default function ShopSkeleton() {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="card">
            <Skeleton className="h-48 w-full rounded-md mb-2" />
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-12 rounded-full" />
              <Skeleton className="w-3/4 h-4 rounded-md" />
            </div>
            <Skeleton className="h-3 w-1/2 rounded-full mt-2" />
          </div>
        ))}
      </div>
    );
  }
  