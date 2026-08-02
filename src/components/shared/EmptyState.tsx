const EmptyState = ({ title }: { title: string }) => {
  return (
    <div className="min-h-[calc(100vh-10rem)] flex items-center justify-center ">
      <h1 className="text-2xl font-bold">{title}</h1>
    </div>
  );
};

export default EmptyState;
