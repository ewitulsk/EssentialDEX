const Snackbar = ({showSnackbar}: {showSnackbar: boolean}) => {
  return (
    <>
      {showSnackbar && (
          <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white p-3 rounded-lg">
            Purchase completed!
          </div>
        )}
    </>
  );
};

export default Snackbar;
