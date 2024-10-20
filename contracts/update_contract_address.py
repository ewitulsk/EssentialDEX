import subprocess
import os
import re

current_path = os.getcwd()
print("Initial working directory:", current_path)

result = None

# Change the current working directory to the specified path
os.chdir(f"{current_path}/pint")

# Execute the command "pint build"
try:
    result = subprocess.run(["pint", "build"], check=True, capture_output=True, text=True)
    print("Build successful:")
    print(result.stdout)  # Print the output of the command
except subprocess.CalledProcessError as e:
    print("Error during build:")
    print(e.stderr)  # Print any error output

# Sample output for testing purposes
output = """
   Compiling contracts [contract] (/home/trevor/EssentialDEX/EssentialDEX/contracts/pint)
    Finished build [debug] in 511.7µs
    contract contracts               11389D77D464D305FEED85FCD728C2F10D7FC39DF9EE8AF13C5D39A6164CA38D
         └── contracts::AddLiquidity 076E55D50548B85FF7B3FA182F9183F9545FA6B25A4C112172C2DC0D45A6F894
"""

# Relative path to the .env file
env_file_path = "../test_framework/.env"

# Regex pattern to match contract addresses and predicates
contract_pattern = r"contracts\s+([A-F0-9]+)"
predicate_pattern = r"contracts::(\w+)\s+([A-F0-9]+)"

# Find all contract addresses
contract_matches = re.findall(contract_pattern, result.stdout)

# Find all predicates and their corresponding hashes
predicate_matches = re.findall(predicate_pattern, result.stdout)

# Prepare the content for the .env file
env_content = []
contract_counter = 1

# Process contracts and predicates
for i, contract_hash in enumerate(contract_matches, start=1):
    contract_var = f"CONTRACT_{i}={contract_hash}"
    env_content.append(contract_var)
    
    predicate_counter = 1
    for predicate, predicate_hash in predicate_matches:
        predicate_var = f"CONTRACT_{i}_PREDICATE_{predicate_counter}={predicate_hash}"
        env_content.append(predicate_var)
        predicate_counter += 1
    contract_counter += 1

# Ensure the directory exists
os.makedirs(os.path.dirname(env_file_path), exist_ok=True)

# Write to the .env file
with open(env_file_path, 'w') as env_file:
    env_file.write('\n'.join(env_content))

print(f".env file created at {env_file_path} with contract and predicate data.")


