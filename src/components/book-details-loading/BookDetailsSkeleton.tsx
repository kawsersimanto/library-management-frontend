const BookDetailsSkeleton = () => {
  return (
    <div className="w-full max-w-md animate-pulse">
      <div className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="h-6 bg-gray-200 rounded w-3/5"></div>
            <div className="mt-1 h-4 bg-gray-200 rounded w-2/5"></div>
          </div>
          <div className="ml-2 h-6 bg-gray-200 rounded w-1/4"></div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 text-muted-foreground bg-gray-200 rounded"></div>
          <div className="text-sm font-medium h-4 bg-gray-200 rounded w-2/5"></div>
        </div>

        <div className="h-0.5 bg-gray-200 rounded mt-2"></div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/5"></div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-4 w-4 bg-gray-200 rounded"></div>
            <div className="h-4 bg-gray-200 rounded w-2/5"></div>
          </div>
        </div>

        <div className="h-0.5 bg-gray-200 rounded mt-2"></div>

        <div>
          <div className="text-sm text-muted-foreground leading-relaxed h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsSkeleton;
