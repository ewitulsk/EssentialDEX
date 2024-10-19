const TokenInput = ({
  label,
  amount,
  onAmountChange,
  selectedToken,
  onTokenChange,
}: {
  label: string;
  amount: string;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedToken: string;
  onTokenChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}) => (
  <div className="flex items-center gap-2">
    <label htmlFor={`${label}Amount`} className="flex-1">{label}</label>
    <input
      type="number"
      id={`${label}Amount`}
      value={amount}
      onChange={onAmountChange}
      placeholder="0"
      className="flex-2 p-2 rounded bg-gray-800 border border-gray-700 text-white"
    />
    <select
      value={selectedToken}
      onChange={onTokenChange}
      className="flex-1 p-2 rounded bg-gray-800 border border-gray-700 text-white"
    >
      <option value="" disabled>Select token</option>
      <option value="ETH">ETH</option>
      <option value="BTC">BTC</option>
      <option value="USDC">USDC</option>
    </select>
  </div>
);

export default TokenInput;
