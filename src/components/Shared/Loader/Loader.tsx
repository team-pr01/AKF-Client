
const Loader= () => {
  return (
    <div className="flex flex-col items-center justify-center py-5 min-h-[200px]">
      <div 
        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-l-2 border-r-2 border-brand-orange"
      />
      <p className={`mt-2.5 text-brand-orange`}>
        Loading...
      </p>
    </div>
  );
};

export default Loader;