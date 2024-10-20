const WaitingSolveModal = ({ showModal }) => {
  return (
    <>
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-5 rounded-lg text-center flex flex-col items-center">
            <div className="spinner border-t-4 border-blue-500 rounded-full w-16 h-16 mb-4 animate-spin"></div>
            <p className="text-center w-1/2">Our solvers are on a mission to outsmart every challenge with even better solutions!</p>
          </div>
        </div>
      )}
    </>
  );
};

export default WaitingSolveModal;
