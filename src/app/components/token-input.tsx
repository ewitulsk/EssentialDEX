import {
  TokenBTC,
  TokenETH,
  TokenUSDC
} from '@web3icons/react'
import Select from 'react-select'

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
    <div className="flex flex-col gap-2">
      <label htmlFor={`${label}Amount`} className="text-sm font-medium">{label}</label>
      <div className="flex gap-2">
        <input
          type="number"
          id={`${label}Amount`}
          value={amount}
          onChange={onAmountChange}
          placeholder="0"
          className="flex-2 p-2 rounded bg-gray-800 border border-gray-700 text-white"
        />
        <Select
          value={selectedToken ? { value: selectedToken, label: selectedToken } : null}
          onChange={(option) => onTokenChange({ target: { value: option?.value || '' } } as React.ChangeEvent<HTMLSelectElement>)}
          options={[
            { value: 'ETH', label: 'ETH', icon: TokenETH },
            { value: 'BTC', label: 'BTC', icon: TokenBTC },
            { value: 'USDC', label: 'USDC', icon: TokenUSDC },
          ]}
          placeholder="Select token"
          className="flex-1"
          classNamePrefix="react-select"
          styles={{
            control: (provided) => ({
              ...provided,
              backgroundColor: '#1f2937',
              borderColor: '#374151',
              color: 'white',
            }),
            menu: (provided) => ({
              ...provided,
              backgroundColor: '#1f2937',
            }),
            option: (provided, state) => ({
              ...provided,
              backgroundColor: state.isFocused ? '#374151' : '#1f2937',
              color: 'white',
            }),
            singleValue: (provided) => ({
              ...provided,
              color: 'white',
            }),
          }}
          formatOptionLabel={({ value, label, icon: Icon }) => (
            <div className="flex items-center">
              {Icon && <Icon className="w-5 h-5 mr-2" />}
              <span>{label}</span>
            </div>
          )}
        />
      </div>
    </div>
  </div>
);

export default TokenInput;
