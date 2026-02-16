## Issues Found For Problem3

1. Missing blockchain field in WalletBalance
   - The original interface used blockchain but did not define it.
   - This causes type inconsistency.

2. Switch-case for priority
   - Less maintainable.
   - O(n) lookup vs O(1) object map.

3. Incorrect filter logic
   - Zero balances were included.
   - Undefined variable lhsPriority.

4. Unnecessary dependency in useMemo
   - prices was included but not used.

5. Redundant iteration
   - formattedBalances caused double iteration.

6. Unstable React key
   - Used array index instead of stable identifier.
