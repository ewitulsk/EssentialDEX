import TokenInput from "./token-input";
const WaitingSolveModal = ({ showReviewModal, sellAmount, selectedSellToken, buyAmount, selectedBuyToken, doSwap, setShowReviewModal }) => {
  return (
    <>
      {showReviewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="max-w-md mx-auto p-5 bg-gray-900 rounded-lg text-white">
            <div className="bg-gray-800 p-5 rounded-lg flex flex-col">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-muted text-gray-400">You&apos;re swapping</h2>
                <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-white">
                  ✕
                </button>
              </div>
              <div>
              <TokenInput
                amount={sellAmount}
                selectedToken={selectedSellToken}
                disabled={true}
              />

              <div className="text-xl text-muted text-gray-600 cursor-pointer pl-2 py-2">↓</div>

              {/* Buy Section */}
              <TokenInput
                amount={buyAmount}
                selectedToken={selectedBuyToken}
                disabled={true}
              />

              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-600"></div>
                <div className="mx-8"></div>
                <div className="flex-grow border-t border-gray-600"></div>
              </div>

              <div className="text-sm text-gray-400 space-y-3">
                <div className="flex justify-between">
                  <span>Fee (0.25%)</span>
                  <span>{buyAmount * 0.0025}</span>
                </div>
                <div className="flex justify-between">
                  <span>Network cost</span>
                  <span>{buyAmount * 0.03}</span>
                </div>
                <div className="flex justify-between">
                  <span>Rate</span>
                  <span>1 ETH = 2641.38 USDC ($2,649.33)</span>
                </div>
                <div className="flex justify-between">
                  <span>Max slippage</span>
                  <span>3.08%</span>
                </div>
              </div>
              <button
                onClick={doSwap}
                className="mt-4 p-2 bg-purple-700 border-none rounded text-white cursor-pointer text-base hover:bg-purple-600 transition-colors w-full"
              >
                Confirm Swap
              </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WaitingSolveModal;
