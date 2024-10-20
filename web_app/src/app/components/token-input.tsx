import {
  TokenETH,
  TokenUSDC
} from '@web3icons/react'
import CustomSelect from './custom-select'

const TokenInput = ({
  label,
  amount,
  onAmountChange,
  selectedToken,
  onTokenChange,
  disabled = false
}: {
  label: string | undefined;
  amount: string;
  onAmountChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectedToken: string;
  onTokenChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}) => {
  const tokenOptions = [
    { value: 'ethereum', label: 'ETH', icon: TokenETH },
    { value: 'usd', label: 'USDC', icon: TokenUSDC },
  ];

  const selectedOption = tokenOptions.find(option => option.value === selectedToken);

  return (
    <div className="flex items-center gap-2">
      <div className="flex flex-col gap-2">

        { label && <label htmlFor={label} className="text-sm font-medium">{label}</label> }
        <div className="flex gap-2">
          <input
            type="number"
            id={`${label}Amount`}
            value={amount}
            onChange={onAmountChange}
            placeholder="0"
            className="flex-2 p-2 rounded bg-gray-800 border border-gray-700 text-white [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            disabled={disabled}
          />
          <CustomSelect
            isDisabled={disabled}
            value={selectedOption}
            onChange={(option) => onTokenChange({ target: { value: option?.value || '' } } as React.ChangeEvent<HTMLSelectElement>)}
            options={tokenOptions}
          />
        </div>
      </div>
    </div>
  );
};

export default TokenInput;
