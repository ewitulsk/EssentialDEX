const WaitingSolveModal = ({ showModal, header }: { showModal: boolean, header: string }) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-800 p-8 rounded-xl text-center flex flex-col items-center shadow-lg max-w-md">
            <div className="spinner border-t-4 border-purple-500 border-r-4 border-r-transparent rounded-full w-20 h-20 mb-6 animate-spin"></div>
            <h2 className="text-2xl font-bold text-white mb-4">{header}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">Our solvers are on a mission to outsmart every challenge with even better solutions!</p>
            <div className="mt-6 w-full bg-gray-700 h-2 rounded-full overflow-hidden">
              <div className="bg-purple-500 h-full w-3/4 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WaitingSolveModal;
