const TableSkeleton = () => {
  return (
    <div className="animate-pulse">
      <div className="flex space-x-6">
        <div className="h-5 w-32 bg-gray-200 rounded-sm mb-2"></div>
        <div className="h-5 w-32 bg-gray-200 rounded-sm mb-2"></div>
        <div className="h-5 w-32 bg-gray-200 rounded-sm mb-2"></div>
        <div className="h-5 w-20 bg-gray-200 rounded-sm mb-2"></div>
        <div className="h-5 w-20 bg-gray-200 rounded-sm mb-2"></div>
        <div className="h-5 w-32 bg-gray-200 rounded-sm mb-2"></div>
        <div className="h-5 w-16 bg-gray-200 rounded-sm mb-2"></div>
      </div>

      <div className="flex space-x-6">
        <div className="h-5 w-32 bg-gray-200 rounded-sm mb-2"></div>
        <div className="h-5 w-32 bg-gray-200 rounded-sm mb-2"></div>
        <div className="h-5 w-32 bg-gray-200 rounded-sm mb-2"></div>
        <div className="h-5 w-20 bg-gray-200 rounded-sm mb-2"></div>
        <div className="h-5 w-20 bg-gray-200 rounded-sm mb-2"></div>
        <div className="h-5 w-32 bg-gray-200 rounded-sm mb-2"></div>
        <div className="h-5 w-16 bg-gray-200 rounded-sm mb-2"></div>
      </div>
    </div>
  );
};

export default TableSkeleton;
