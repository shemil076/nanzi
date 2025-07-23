const StatusBar = ({ selectedStep }: { selectedStep: number }) => {
  return (
    <div className="flex flex-row gap-5">
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full border ${selectedStep === 1 ? 'bg-black' : 'bg-gray-200'} ${selectedStep === 1 ? 'text-white' : 'text-gray-400'}`}
      >
        1
      </div>
      <div className="border rounded-full rotate-90"></div>
      <div
        className={`w-10 h-10 flex items-center justify-center rounded-full border ${selectedStep === 2 ? 'bg-black' : 'bg-gray-200'} ${selectedStep === 2 ? 'text-white' : 'text-gray-400'}`}
      >
        2
      </div>
    </div>
  );
};

export default StatusBar;
