let arr = [1, 2, 3];

console.log(arr == arr);          
// true ✅ Same reference in memory.

console.log([1, 2, 3] == [1, 2, 3]); 
// false ❌ Different arrays → different references, even if contents match.

console.log(arr === [1, 2, 3]);   
// false ❌ Strict equality, still different references.

console.log(arr.toString() == [1, 2, 3].toString()); 
// true ✅ Both convert to "1,2,3" (string comparison).

console.log(arr == "1,2,3");      
// true ✅ Array gets coerced → "1,2,3", then compared to string.

console.log([arr] == "1,2,3");    
// true ✅ [arr] → ["1,2,3"] → "1,2,3", matches string.
