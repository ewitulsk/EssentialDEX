import TokenInput from "./token-input";
const WaitingSolveModal = ({ showReviewModal, sellAmount, selectedSellToken, buyAmount, selectedBuyToken, doSwap }) => {
  return (
    <>
      {showReviewModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-5 rounded-lg flex flex-col">
            <h2 className="text-muted text-gray-400 mb-4">You're swapping</h2>
            <div>
            <TokenInput
              amount={sellAmount}
              selectedToken={selectedSellToken}
              disabled={true}
            />

            <div className="text-1xl text-muted text-gray-400 cursor-pointer pl-1">↓</div>

            {/* Buy Section */}
            <TokenInput
              amount={buyAmount}
              selectedToken={selectedBuyToken}
              disabled={true}
            />

            <div className="mt-4 text-sm text-gray-400">
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
              className="mt-4 p-2 bg-purple-700 border-none rounded text-white cursor-pointer text-base hover:bg-purple-600 transition-colors"
            >
              Confirm Swap
            </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default WaitingSolveModal;
