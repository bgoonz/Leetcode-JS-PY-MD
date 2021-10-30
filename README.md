# [**WEBSITE**](https://bgoonz.github.io/Leetcode-JS-PY-MD)

## [Solutions Markdown](./Explinations.md)

---


[2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/description/)
--------------------------------------------------------------------------------

### Problem:

You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

Example

    Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
    Output: 7 -> 0 -> 8
    Explanation: 342 + 465 = 807.

### Solution:

Mind the last carry.

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    let addTwoNumbers = function(l1, l2) {
      const prehead = new ListNode()
      let p = prehead
      let carry = 0
      
      for (let p1 = l1, p2 = l2: p1 || p2 || carry > 0; p = p.next) {
        let sum = carry
        if (p1) {
          sum += p1.val
          p1 = p1.next
        }
        if (p2) {
          sum += p2.val
          p2 = p2.next
        }
        carry = sum / 10 | 0
        p.next = new ListNode(sum % 10)
      }
      
      return prehead.next
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Array": <https://leetcode.com/tag/array> "Binary Search": <https://leetcode.com/tag/binary-search> "Divide and Conquer": <https://leetcode.com/tag/divide-and-conquer>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[4. Median of Two Sorted Arrays](https://leetcode.com/problems/median-of-two-sorted-arrays/description/)
--------------------------------------------------------------------------------------------------------

### Problem:

There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

Example 1:

    nums1 = [1, 3]
    nums2 = [2]

    The median is 2.0

Example 2:

    nums1 = [1, 2]
    nums2 = [3, 4]

    The median is (2 + 3)/2 = 2.5

### Solution:

O(log (m+n)) means half of the sequence is ruled out on each loop. So obviously we need binary search.

To do it on two sorted arrays, we need a formula to guide division.

Let `nums3` be the sorted array combining all the items in `nums1` and `nums2`.

If `nums2[j-1] <= nums1[i] <= nums2[j]`, then we know `nums1[i]` is at `num3[i+j]`. Same goes `nums1[i-1] <= nums2[j] <= nums1[i]`.

Let `k` be `⌊(m+n-1)/2⌋`. We need to find `nums3[k]` (and also `nums3[k+1]` if m+n is even).

Let `i + j = k`, if we find `nums2[j-1] <= nums1[i] <= nums2[j]` or `nums1[i-1] <= nums2[j] <= nums1[i]`, then we got `k`.

Otherwise, if `nums1[i] <= nums2[j]` then we know `nums1[i] < nums2[j-1]` (because we did not find `k`).

-   There are `i` items before `nums1[i]`, and `j-1` items brefor `nums2[j-1]`, which means `nums1[0...i]` are before `nums3[i+j-1]`. So we now know `nums1[0...i] < nums3[k]`. They can be safely discarded.

-   We Also have `nums1[i] < nums2[j]`, which means `nums2[j...n)` are after `nums3[i+j]`. So `nums2[j...n) > nums3[k]`.

Same goes `nums1[i-1] <= nums2[j] <= nums1[i]`.

    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    let findMedianSortedArrays = function (nums1, nums2) {
      const mid = (nums1.length + nums2.length - 1) / 2 | 0

      if ((nums1.length + nums2.length) % 2 === 0) {
        return (_find(nums1, nums2, mid) + _find(nums1, nums2, mid + 1)) / 2
      }

      return _find(nums1, nums2, mid)
    }


    function _find (nums1, nums2, k) {
      if (nums1.length > nums2.length) {
        // So that the `i` below is always smalller than k,
        // which makes `j` always non-negative
        [nums1, nums2] = [nums2, nums1]
      }
      let s1 = 0
      let s2 = 0
      let e1 = nums1.length
      let e2 = nums2.length

      while (s1 < e1 || s2 < e2) {
        const i = s1 + ((e1 - s1) / 2 | 0)
        const j = k - i
        const ni = i >= e1 ? Infinity : nums1[i]
        const nj = j >= e2 ? Infinity : nums2[j]
        const ni_1 = i <= 0 ? -Infinity : nums1[i-1]
        const nj_1 = j <= 0 ? -Infinity : nums2[j-1]

        if (nj_1 <= ni && ni <= nj) {
          return ni
        }

        if (ni_1 <= nj && nj <= ni) {
          return nj
        }

        if (ni <= nj) {
          s1 = i + 1
          e2 = j
        } else {
          s2 = j + 1
          e1 = i
        }
      }
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "String": <https://leetcode.com/tag/string>
------------------------------------------------------------------------------

[6. ZigZag Conversion](https://leetcode.com/problems/zigzag-conversion/description/)
------------------------------------------------------------------------------------

### Problem:

The string `"PAYPALISHIRING"` is written in a zigzag pattern on a given number of rows like this: (you may want to display this pattern in a fixed font for better legibility)

    P   A   H   N
    A P L S I I G
    Y   I   R

And then read line by line: `"PAHNAPLSIIGYIR"`

Write the code that will take a string and make this conversion given a number of rows:

    string convert(string s, int numRows);

**Example 1:**

    Input: s = "PAYPALISHIRING", numRows = 3
    Output: "PAHNAPLSIIGYIR"

**Example 2:**

    Input: s = "PAYPALISHIRING", numRows = 4
    Output: "PINALSIGYAHRPI"
    Explanation:

    P     I    N
    A   L S  I G
    Y A   H R
    P     I

### Solution:

Squeeze the zigzag pattern horizontally to form a matrix. Now deal with the odd and even columns respectively.

For example let numRows be 5, if we list out the indecies:

    row
     1    00    08    16
     2    01 07 09 15 17
     3    02 06 10 14 18
     4    03 05 11 13 19
     5    04    12    20

First calculate the matrix width:

    pairs = floor( len(s) / (numRows + numRows - 2) )
    width = pairs * 2 + ceil( (len(s) - pairs * (numRows + numRows - 2)) / numRows )

We can easily make a observation that the direction of odd and even columns and different.

Let the first column be index 0 and let i be the current position at column col.

We need to count the items between matrix\[row\]\[col\] and matrix\[row\]\[col+1\], exclusive.

    next_i = i + (numRows - row) + (numRows - row), if col is even && 1 < row < numRows
    next_i = i + row - 2 + row, if col is odd && 1 < row < numRows

If row == 1 or row == numRows, skip the odd columns.

    next_i = i + numRows + (numRows - 2), if col is even && (row == 1 || row == numRows)

    /**
     * @param {string} s
     * @param {number} numRows
     * @return {string}
     */
    let convert = function(s, numRows) {
      if (numRows <= 1) { return s }

      const pairs = Math.floor(s.length / (numRows + numRows - 2))
      const width = pairs * 2 + Math.ceil((s.length - pairs * (numRows + numRows - 2)) / numRows)

      let result = ''

      for (let row = 1; row <= numRows; row++) {
        let i = row - 1
        result += s[i] || ''
        for (let col = 0; col < width; col++) {
          if (row === 1 || row === numRows) {
            if (col % 2 === 0) {
              i += numRows + (numRows - 2)
            } else {
              continue
            }
          } else {
            if (col % 2 === 0) {
              i += (numRows - row) + (numRows - row)
            } else {
              i += row - 2 + row
            }
          }
          result += s[i] || ''
        }
      }

      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Math": <https://leetcode.com/tag/math> Similar Questions: "String to Integer (atoi)": <https://leetcode.com/problems/string-to-integer-atoi>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[7. Reverse Integer](https://leetcode.com/problems/reverse-integer/description/)
--------------------------------------------------------------------------------

### Problem:

Given a 32-bit signed integer, reverse digits of an integer.

**Example 1:**

    Input: 123
    Output: 321

**Example 2:**

    Input: -123
    Output: -321

**Example 3:**

    Input: 120
    Output: 21

**Note:**  
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: \[−231,  231 − 1\]. For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.

### Solution:

#### ONE

This is a JavaScript specific solution. It is esay to write but slow to run because it generates O(n) space. This could end up a huge array.

    /**
     * @param {number} x
     * @return {number}
     */
    let reverse = function(x) {
      let n = Math.abs(x).toString().split('').reverse().join('')
      if (n > 2147483647) { return 0 }
      return (x < 0? -1: 1) * n
    };

#### TWO

Pure mathamatical solution.

    /**
     * @param {number} x
     * @return {number}
     */
    let reverse = function(x) {
      let result = 0
      while (x) {
        result = result * 10 + x % 10
        x = x / 10 | 0
      }
      return Math.abs(result) > 2147483647 ? 0 : result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Math": <https://leetcode.com/tag/math> "String": <https://leetcode.com/tag/string> Similar Questions: "Reverse Integer": <https://leetcode.com/problems/reverse-integer> "Valid Number": <https://leetcode.com/problems/valid-number>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[8. String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/description/)
------------------------------------------------------------------------------------------------

### Problem:

Implement `atoi` which converts a string to an integer.

The function first discards as many whitespace characters as necessary until the first non-whitespace character is found. Then, starting from this character, takes an optional initial plus or minus sign followed by as many numerical digits as possible, and interprets them as a numerical value.

The string can contain additional characters after those that form the integral number, which are ignored and have no effect on the behavior of this function.

If the first sequence of non-whitespace characters in str is not a valid integral number, or if no such sequence exists because either str is empty or it contains only whitespace characters, no conversion is performed.

If no valid conversion could be performed, a zero value is returned.

**Note:**

Only the space character `' '` is considered as whitespace character.  
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: \[−231,  231 − 1\]. If the numerical value is out of the range of representable values, INT\_MAX (231 − 1) or INT\_MIN (−231) is returned.

**Example 1:**

    Input: "42"
    Output: 42

**Example 2:**

    Input: "   -42"
    Output: -42
    Explanation: The first non-whitespace character is '-', which is the minus sign.
                 Then take as many numerical digits as possible, which gets 42.

**Example 3:**

    Input: "4193 with words"
    Output: 4193
    Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.

**Example 4:**

    Input: "words and 987"
    Output: 0
    Explanation: The first non-whitespace character is 'w', which is not a numerical 
                 digit or a +/- sign. Therefore no valid conversion could be performed.

**Example 5:**

    Input: "-91283472332"
    Output: -2147483648
    Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer.
                 Thefore INT_MIN (−231) is returned.

### Solution:

#### ONE

    /**
     * @param {string} str
     * @return {number}
     */
    let myAtoi = function (str) {
      return Math.min(2147483647, Math.max(-2147483648, parseInt(str))) || 0
    };

#### TWO

Looks like `Number()` is faster than `parseInt()`.

    /**
     * @param {string} str
     * @return {number}
     */
    let myAtoi = function (str) {
      return Math.min(2147483647, Math.max(-2147483648, (/^ *[-+]?\d+/.exec(str) || [0])[0]))
    };

#### THREE

General solution.

    /**
     * @param {string} str
     * @return {number}
     */
    let myAtoi = function (str) {
      let sign = 1
      let i = 0

      while (i < str.length) {
        const cc = str.charCodeAt(i++)
        if (cc === 45) { // -
          sign = -1
          break
        } else if (cc === 43) { // +
          break
        } else if (cc >= 48 && cc <= 57) { // 0-9
          i--
          break
        } else if (cc !== 32) { // space
          return 0
        }
      }

      let result = 0
      while (i < str.length) {
        const digit = str.charCodeAt(i++) - 48
        if (digit < 0 || digit > 9) {
          break
        }
        result = result * 10 + digit
      }

      return Math.min(2147483647, Math.max(-2147483648, result * sign))
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Math": <https://leetcode.com/tag/math> Similar Questions: "Palindrome Linked List": <https://leetcode.com/problems/palindrome-linked-list>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[9. Palindrome Number](https://leetcode.com/problems/palindrome-number/description/)
------------------------------------------------------------------------------------

### Problem:

Determine whether an integer is a palindrome. An integer is a palindrome when it reads the same backward as forward.

**Example 1:**

    Input: 121
    Output: true

**Example 2:**

    Input: -121
    Output: false
    Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

**Example 3:**

    Input: 10
    Output: false
    Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

**Follow up:**

Coud you solve it without converting the integer to a string?

### Solution:

#### ONE

Easy to write but slow since it generates an array.

    /**
     * @param {number} x
     * @return {boolean}
     */
    let isPalindrome = function(x) {
      return x == String(x).split('').reverse().join('')
    };

#### TWO

A bit faster.

    /**
     * @param {number} x
     * @return {boolean}
     */
    let isPalindrome = function(x) {
      const s = String(x)
      for (let i = 0, j = s.length -1; i < j; i++, j--) {
        if (s[i] !== s[j]) {
          return false
        }
      }
      return true
    };

#### THREE

General solution. Combining [7. Reverse Integer](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/007.%20Reverse%20Integer.md).

    /**
     * @param {number} x
     * @return {boolean}
     */
    let isPalindrome = function(x) {
      if (x < 0) { return false }
      return x === reverse(x)
    };

    /**
     * @param {number} x
     * @return {number}
     */
    function reverse (x) {
      let result = 0
      while (x) {
        result = result * 10 + x % 10
        x = x / 10 | 0
      }
      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "String": <https://leetcode.com/tag/string> "Dynamic Programming": <https://leetcode.com/tag/dynamic-programming> "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "Wildcard Matching": <https://leetcode.com/problems/wildcard-matching>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[10. Regular Expression Matching](https://leetcode.com/problems/regular-expression-matching/description/)
---------------------------------------------------------------------------------------------------------

### Problem:

Given an input string (`s`) and a pattern (`p`), implement regular expression matching with support for `'.'` and `'*'`.

    '.' Matches any single character.
    '*' Matches zero or more of the preceding element.

The matching should cover the **entire** input string (not partial).

**Note:**

`s` could be empty and contains only lowercase letters `a-z`.  
`p` could be empty and contains only lowercase letters `a-z`, and characters like `.` or `*`.

**Example 1:**

    Input:
    s = "aa"
    p = "a"
    Output: false
    Explanation: "a" does not match the entire string "aa".

**Example 2:**

    Input:
    s = "aa"
    p = "a*"
    Output: true
    Explanation: '*' means zero or more of the precedeng element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".

**Example 3:**

    Input:
    s = "ab"
    p = ".*"
    Output: true
    Explanation: ".*" means "zero or more (*) of any character (.)".

**Example 4:**

    Input:
    s = "aab"
    p = "c*a*b"
    Output: true
    Explanation: c can be repeated 0 times, a can be repeated 1 time. Therefore it matches "aab".

**Example 5:**

    Input:
    s = "mississippi"
    p = "mis*is*p*."
    Output: false

### Solution:

#### ONE

Cheating with real RegExp matching.

    /**
     * @param {string} s
     * @param {string} p
     * @return {boolean}
     */
    let isMatch = function(s, p) {
      if (p[0] === '*') { return false }
      return new RegExp(`^${p}$`).test(s)
    };

#### TWO

Let f(i, j) be the matching result of s\[0...i) and p\[0...j).

    f(0, j) =
        j == 0 || // empty
        p[j-1] == '*' && f(i, j-2) // matches 0 time, which matches empty string
        
    f(i, 0) = false // pattern must cover the entire input string

    f(i, j) = 
        if p[j-1] == '.'
            f(i-1, j-1)
        else if p[j-1] == '*'
            f(i, j-2) || // matches 0 time
            f(i-1, j) && (s[i-1] == p[j-2] || p[j-2] == '.') // matches 1 or multiple times
        else
            f(i-1, j-1) && s[i-1] == p[j-1]

    /**
     * @param {string} s
     * @param {string} p
     * @return {boolean}
     */
    let isMatch = function(s, p) {
      if (p[0] === '*') {
        return false
      }

      const dp = [[true]]

      for (let j = 2; j <= p.length; j++) {
        dp[0][j] = p[j-1] === '*' && dp[0][j-2]
      }
        
      for (let i = 1; i <= s.length; i++) {
        dp[i] = []
        for (let j = 1; j <= p.length; j++) {
          switch (p[j-1]) {
            case '.':
              dp[i][j] = dp[i-1][j-1]
              break
            case '*':
              dp[i][j] = dp[i][j-2] ||
                dp[i-1][j] && (p[j-2] === '.' || s[i-1] === p[j-2])
              break
            default:
              dp[i][j] = dp[i-1][j-1] && s[i-1] === p[j-1]
          }
        }
      }

      return !!dp[s.length][p.length]
    }

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Two Pointers": <https://leetcode.com/tag/two-pointers> Similar Questions: "Trapping Rain Water": <https://leetcode.com/problems/trapping-rain-water>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[11. Container With Most Water](https://leetcode.com/problems/CONTENT-with-most-water/description/)
---------------------------------------------------------------------------------------------------

### Problem:

Given n non-negative integers a1, a2, ..., an, where each represents a point at coordinate (i, ai). n vertical lines are drawn such that the two endpoints of line i is at (i, ai) and (i, 0). Find two lines, which together with x-axis forms a container, such that the container contains the most water.

Note: You may not slant the container and n is at least 2.

### Solution:

Greedy Algorithm.

If we look at the simple brute force approach, where we choose one point at a time and calculate all the possible areas with other points on the right, it is easy to make a observation that we are narrowing down the horizontal distance.

Greedy Algorithm can help us skip some of the conditions. It is base on a fact that the area between two columns are determined by the shorter one.

Let's say we have pointer `l` and `r` at the begin and end of a distance, and the area is `area(l, r)`, how should we narrow down the distance?

If `height[l] < height[r]`, we know that the height of the area will never be greater than `height[l]` if we keep `l`. Now if we get rid of `r`, the area can only get smaller since the distance is shorter, and the height is at most `height[l]`.

Here we conclude rule NO.1: Get rid of the smaller one.

What if `height[l] == height[r]`? It is safe to get rid of both. We do not need any of them to constrain the max height of the rest points.

    /**
     * @param {number[]} height
     * @return {number}
     */
    let maxArea = function (height) {
      let max = 0
      for (let l = 0, r = height.length - 1; l < r; l++, r--) {
        max = Math.max(max, (r - l) * Math.min(height[l], height[r]))
        if (height[l] < height[r]) {
          r++
        } else {
          l--
        }
      }
      return max
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Math": <https://leetcode.com/tag/math> "String": <https://leetcode.com/tag/string> Similar Questions: "Roman to Integer": <https://leetcode.com/problems/roman-to-integer> "Integer to English Words": <https://leetcode.com/problems/integer-to-english-words>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[12. Integer to Roman](https://leetcode.com/problems/integer-to-roman/description/)
-----------------------------------------------------------------------------------

### Problem:

Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

    Symbol       Value
    I             1
    V             5
    X             10
    L             50
    C             100
    D             500
    M             1000

For example, two is written as `II` in Roman numeral, just two one's added together. Twelve is written as, `XII`, which is simply `X` + `II`. The number twenty seven is written as `XXVII`, which is `XX` + `V` + `II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:

-   `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.
-   `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.
-   `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given an integer, convert it to a roman numeral. Input is guaranteed to be within the range from 1 to 3999.

**Example 1:**

    Input: 3
    Output: "III"

**Example 2:**

    Input: 4
    Output: "IV"

**Example 3:**

    Input: 9
    Output: "IX"

**Example 4:**

    Input: 58
    Output: "LVIII"
    Explanation: C = 100, L = 50, XXX = 30 and III = 3.

**Example 5:**

    Input: 1994
    Output: "MCMXCIV"
    Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

### Solution:

Treat 4, 40, 400 and 9, 90, 900 specially.

    /**
     * @param {number} num
     * @return {string}
     */
    let intToRoman = function(num) {
      const e = [1000, 900,  500, 400,  100, 90,   50,  40,   10,  9,    5,   4,    1  ]
      const s = ["M",  "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]

      let result = ''
      for (let i = 0; num; i++) {
        const d = e[i]
        const v = s[i]
        while (num >= d) {
          num -= d
          result += v
        }
      }
      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Math": <https://leetcode.com/tag/math> "String": <https://leetcode.com/tag/string> Similar Questions: "Integer to Roman": <https://leetcode.com/problems/integer-to-roman>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[13. Roman to Integer](https://leetcode.com/problems/roman-to-integer/description/)
-----------------------------------------------------------------------------------

### Problem:

Roman numerals are represented by seven different symbols: `I`, `V`, `X`, `L`, `C`, `D` and `M`.

    Symbol       Value
    I             1
    V             5
    X             10
    L             50
    C             100
    D             500
    M             1000

For example, two is written as `II` in Roman numeral, just two one's added together. Twelve is written as, `XII`, which is simply `X` + `II`. The number twenty seven is written as `XXVII`, which is `XX` + `V` + `II`.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for four is not `IIII`. Instead, the number four is written as `IV`. Because the one is before the five we subtract it making four. The same principle applies to the number nine, which is written as `IX`. There are six instances where subtraction is used:

-   `I` can be placed before `V` (5) and `X` (10) to make 4 and 9.
-   `X` can be placed before `L` (50) and `C` (100) to make 40 and 90.
-   `C` can be placed before `D` (500) and `M` (1000) to make 400 and 900.

Given a roman numeral, convert it to an integer. Input is guaranteed to be within the range from 1 to 3999.

**Example 1:**

    Input: "III"
    Output: 3

**Example 2:**

    Input: "IV"
    Output: 4

**Example 3:**

    Input: "IX"
    Output: 9

**Example 4:**

    Input: "LVIII"
    Output: 58
    Explanation: C = 100, L = 50, XXX = 30 and III = 3.

**Example 5:**

    Input: "MCMXCIV"
    Output: 1994
    Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

### Solution:

Normally we just add up the digits, except when the digit is greater than its left (e.g. IV). In that case we need to fallback and remove the last digit then combine the two as new digit. That is why we subtract the last digit twice.

    /**
     * @param {string} s
     * @return {number}
     */
    let romanToInt = function (s) {
      const rdigit = {
        I: 1,
        V: 5,
        X: 10,
        L: 50,
        C: 100,
        D: 500,
        M: 1000,
      }

      let result = 0
      for (let i = 0, lastDigit = Infinity; i < s.length; i++) {
        let digit = rdigit[s[i]]
        result += digit <= lastDigit ? digit : digit - lastDigit * 2
        lastDigit = digit
      }
      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "String": <https://leetcode.com/tag/string>
----------------------------------------------------------------------------

[14. Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/description/)
---------------------------------------------------------------------------------------------

### Problem:

Write a function to find the longest common prefix string amongst an array of strings.

If there is no common prefix, return an empty string `""`.

**Example 1:**

    Input: ["flower","flow","flight"]
    Output: "fl"

**Example 2:**

    Input: ["dog","racecar","car"]
    Output: ""
    Explanation: There is no common prefix among the input strings.

**Note:**

All given inputs are in lowercase letters `a-z`.

### Solution:

#### ONE

JavaScript specific solution. Get the min len then narrow down the prefix.

    /**
     * @param {string[]} strs
     * @return {string}
     */
    let longestCommonPrefix = function (strs) {
      if (strs.length > 0) {
        let minLen = Math.min(...strs.map(s => s.length))
        const anyStr = strs[0]
        while (minLen) {
          const prefix = anyStr.slice(0, minLen--)
          if (strs.every(s => s.startsWith(prefix))) {
            return prefix
          }
        }
      }
      return ''
    };

#### TWO

    /**
     * @param {string[]} strs
     * @return {string}
     */
    let longestCommonPrefix = function(strs) {
      if (strs.length <= 0) { return '' }
      
      let i = 0
      while (strs.every(s => s[i] && s[i] === strs[0][i])) {
        i++
      }
      return strs[0].slice(0, i)
    };

#### THREE

General solution. Build up the prefix.

    /**
     * @param {string[]} strs
     * @return {string}
     */
    let longestCommonPrefix = function (strs) {
      let prefix = ''
      if (strs.length > 0) {
        for (let i = 0; ; i++) {
          const c = strs[0][i]
          if (!c) { return prefix }
          for (let j = 0; j < strs.length; j++) {
            if (strs[j][i] !== c) {
              return prefix
            }
          }
          prefix += c
        }
      }
      return prefix
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Two Pointers": <https://leetcode.com/tag/two-pointers> Similar Questions: "Two Sum": <https://leetcode.com/problems/two-sum> "3Sum Closest": <https://leetcode.com/problems/3sum-closest> "4Sum": <https://leetcode.com/problems/4sum> "3Sum Smaller": <https://leetcode.com/problems/3sum-smaller>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[15. 3Sum](https://leetcode.com/problems/3sum/description/)
-----------------------------------------------------------

### Problem:

Given an array `nums` of *n* integers, are there elements *a*, *b*, *c* in `nums` such that *a* + *b* + *c* = 0? Find all unique triplets in the array which gives the sum of zero.

**Note:**

The solution set must not contain duplicate triplets.

**Example:**

    Given array nums = [-1, 0, 1, 2, -1, -4],

    A solution set is:
    [
      [-1, 0, 1],
      [-1, -1, 2]
    ]

### Solution:

To simplify the problem, sort the nums first.

If `sorted[0] > 0` or `sorted[last] < 0`, return an empty set.

From i = `0` to `len(sorted) - 2`, pick `sorted[i]` as the first number of a possible triplet result.

Let `l = i + 1`, `r = len(sorted) - 1`, we want to narrow them down to enumerate all possible combinations.

-   `l++` if `sorted[i] + sorted[l] + sorted[r] > 0`.
-   `r--` if `sorted[i] + sorted[l] + sorted[r] < 0`.

Skip any duplicate number as we iterate to avoid duplicate triplets.

    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    let threeSum = function (nums) {
      const len = nums.length
      const sorted = nums.sort((a, b) => a - b)
      const result = []

      if (sorted[0] > 0 || sorted[len-1] < 0) {
        return result
      }

      for (let i = 0; i < len - 2; i++) {
        if (sorted[i] > 0) {
          break
        }

        if (i > 0 && sorted[i] === sorted[i-1]) {
          continue
        }

        const twoSum = 0 - sorted[i]

        for (let l = i + 1, r = len - 1; l < r;) {
          const diff = twoSum - sorted[l] - sorted[r]
          if (diff > 0) {
            l++
          } else if (diff < 0) {
            r--
          } else {
            result.push([sorted[i], sorted[l], sorted[r]])
            while (++l < r && sorted[l] === sorted[l - 1]);
            while (--r > l && sorted[r] === sorted[r + 1]);
          }
        }
      }

      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Two Pointers": <https://leetcode.com/tag/two-pointers> Similar Questions: "3Sum": <https://leetcode.com/problems/3sum> "3Sum Smaller": <https://leetcode.com/problems/3sum-smaller>
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[16. 3Sum Closest](https://leetcode.com/problems/3sum-closest/description/)
---------------------------------------------------------------------------

### Problem:

Given an array `nums` of *n* integers and an integer `target`, find three integers in `nums` such that the sum is closest to `target`. Return the sum of the three integers. You may assume that each input would have exactly one solution.

**Example:**

    Given array nums = [-1, 2, 1, -4], and target = 1.

    The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

### Solution:

Simplified version of [15. 3Sum](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/015.%203Sum.md).

    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    let threeSumClosest = function(nums, target) {
      const len = nums.length
      const sorted = nums.sort((a, b) => a - b)

      let minDiff = Infinity

      for (let i = 0; i < len - 2; i++) {
        if (i > 0 && sorted[i] === sorted[i-1]) {
          continue
        }

        const twoSum = target - sorted[i]

        for (let l = i + 1, r = len - 1; l < r;) {
          const diff = twoSum - sorted[l] - sorted[r]
          if (diff === 0) {
            return target
          } else {
            if (diff > 0) {
              l++
            } else {
              r--
            }

            if (Math.abs(diff) < Math.abs(minDiff)) {
              minDiff = diff
            }
          }
        }
      }

      return target - minDiff
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "String": <https://leetcode.com/tag/string> "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "Generate Parentheses": <https://leetcode.com/problems/generate-parentheses> "Combination Sum": <https://leetcode.com/problems/combination-sum> "Binary Watch": <https://leetcode.com/problems/binary-watch>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/description/)
-----------------------------------------------------------------------------------------------------------------------------

### Problem:

Given a string containing digits from `2-9` inclusive, return all possible letter combinations that the number could represent.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

![200px-Telephone-keypad2](./completeLEETCODE_files/200px-Telephone-keypad2.svg.png)

**Example:**

    Input: "23"
    Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].

**Note:**

Although the above answer is in lexicographical order, your answer could be in any order you want.

### Solution:

#### ONE

JavaScript specific optimization.

`Array.prototype.push` accepts arbitrary arguments which enables tighter loops.

Also, appending string is faster than prepending.

    /**
     * @param {string} digits
     * @return {string[]}
     */
    let letterCombinations = function(digits) {
      if (digits.length <= 0) { return [] }

      const letters = [
        ,
        ,
        ['a', 'b', 'c'],
        ['d', 'e', 'f'],
        ['g', 'h', 'i'],
        ['j', 'k', 'l'],
        ['m', 'n', 'o'],
        ['p', 'q', 'r', 's'],
        ['t', 'u', 'v'],
        ['w', 'x', 'y', 'z'],
      ]

      let result = ['']

      for (let i = 0; i < digits.length; i++) {
        const arr = letters[digits[i]]
        let newResult = []
        arr.forEach(c => newResult.push(...result.map(r => r + c)))
        result = newResult
      }

      return result
    };

#### TWO

General recursive DFS solution.

    /**
     * @param {string} digits
     * @return {string[]}
     */
    let letterCombinations = function(digits) {
      const letters = [,, 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz']
      const result = []
      if (digits.length > 0) {
        dfs(digits, 0, '', letters, result)
      }
      return result
    };

    function dfs (digits, idigit, path, letters, result) {
      if (idigit >= digits.length) {
        result.push(path)
        return
      }
      const str = letters[digits[idigit]]
      for (let i = 0; i < str.length; i++) {
        dfs(digits, idigit + 1, path + str[i], letters, result)
      }
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Hash Table": <https://leetcode.com/tag/hash-table> "Two Pointers": <https://leetcode.com/tag/two-pointers> Similar Questions: "Two Sum": <https://leetcode.com/problems/two-sum> "3Sum": <https://leetcode.com/problems/3sum> "4Sum II": <https://leetcode.com/problems/4sum-ii>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[18. 4Sum](https://leetcode.com/problems/4sum/description/)
-----------------------------------------------------------

### Problem:

Given an array `nums` of *n* integers and an integer `target`, are there elements *a*, *b*, *c*, and *d* in `nums` such that *a* + *b* + *c* + *d* = `target`? Find all unique quadruplets in the array which gives the sum of `target`.

**Note:**

The solution set must not contain duplicate quadruplets.

**Example:**

    Given array nums = [1, 0, -1, 0, -2, 2], and target = 0.

    A solution set is:
    [
      [-1,  0, 0, 1],
      [-2, -1, 1, 2],
      [-2,  0, 0, 2]
    ]

### Solution:

Like [15. 3Sum](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/015.%203Sum.md) and [16. 3Sum Closest](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/016.%203Sum%20Closest.md). Wrap one more loop.

    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[][]}
     */
    let fourSum = function(nums, target) {
      const len = nums.length
      const sorted = nums.sort((a, b) => a - b)
      const result = []

      for (let k = 0; k < len - 3; k++) {
        if (k > 0 && sorted[k] === sorted[k-1]) {
          continue
        }

        const threeSum = target - sorted[k]

        for (let i = k+1; i < len - 2; i++) {
          if (i > k+1 && sorted[i] === sorted[i-1]) {
            continue
          }

          const twoSum = threeSum - sorted[i]

          for (let l = i + 1, r = len - 1; l < r;) {
            const diff = twoSum - sorted[l] - sorted[r]
            if (diff > 0) {
              l++
            } else if (diff < 0) {
              r--
            } else {
              result.push([sorted[k], sorted[i], sorted[l], sorted[r]])
              while (++l < r && sorted[l] === sorted[l - 1]);
              while (--r > l && sorted[r] === sorted[r + 1]);
            }
          }
        }
      }

      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Linked List": <https://leetcode.com/tag/linked-list> "Two Pointers": <https://leetcode.com/tag/two-pointers>
------------------------------------------------------------------------------------------------------------------------------------------------

[19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/description/)
-------------------------------------------------------------------------------------------------------------------

### Problem:

Given a linked list, remove the *n*-th node from the end of list and return its head.

**Example:**

    Given linked list: 1->2->3->4->5, and n = 2.

    After removing the second node from the end, the linked list becomes 1->2->3->5.

**Note:**

Given *n* will always be valid.

**Follow up:**

Could you do this in one pass?

### Solution:

Set a pointer `p1` for iterating, and `p2` which is `n` nodes behind, pointing at the (n+1)-th node from the end of list.

Boundaries that should be awared of:

-   `p2` could be one node before `head`, which means the `head` should be removed.
-   `p2` could be larger than the length of the list (Though the description says `n` will always be valid, we take care of it anyway).
-   It should be `p1.next` touches the end rather than `p1` because we want `p1` pointing at the last node.

<!-- -->

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @param {number} n
     * @return {ListNode}
     */
    let removeNthFromEnd = function(head, n) {
      let p1 = head
      while (p1 && n--) {
        p1 = p1.next
      }

      if (!p1) { return n ? head : head.next }

      let p2 = head
      while (p1.next) {
        p1 = p1.next
        p2 = p2.next
      }

      p2.next = p2.next.next

      return head
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "String": <https://leetcode.com/tag/string> "Stack": <https://leetcode.com/tag/stack> Similar Questions: "Generate Parentheses": <https://leetcode.com/problems/generate-parentheses> "Longest Valid Parentheses": <https://leetcode.com/problems/longest-valid-parentheses> "Remove Invalid Parentheses": <https://leetcode.com/problems/remove-invalid-parentheses>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/description/)
-------------------------------------------------------------------------------------

### Problem:

Given a string containing just the characters `'('`, `')'`, `'{'`, `'}'`, `'['` and `']'`, determine if the input string is valid.

An input string is valid if:

1.  Open brackets must be closed by the same type of brackets.
2.  Open brackets must be closed in the correct order.

Note that an empty string is also considered valid.

**Example 1:**

    Input: "()"
    Output: true

**Example 2:**

    Input: "()[]{}"
    Output: true

**Example 3:**

    Input: "(]"
    Output: false

**Example 4:**

    Input: "([)]"
    Output: false

**Example 5:**

    Input: "{[]}"
    Output: true

### Solution:

Stack 101.

Whenever we meet a close bracket, we want to compare it to the last open bracket.

That is why we use stack to store open brackets: first in, last out.

And since there is only bracket characters, the last open bracket happens to be the last character.

    /**
     * @param {string} s
     * @return {boolean}
     */
    let isValid = function(s) {
      const stack = []
      const pairs = {
        '}': '{',
        ']': '[',
        ')': '(',
      }
      for (const c of s) {
        const open = pairs[c]
        if (open) {
          if (stack.pop() !== open) {
            return false
          }
        } else {
          stack.push(c)
        }
      }
      return stack.length <= 0
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Linked List": <https://leetcode.com/tag/linked-list> Similar Questions: "Merge k Sorted Lists": <https://leetcode.com/problems/merge-k-sorted-lists> "Merge Sorted Array": <https://leetcode.com/problems/merge-sorted-array> "Sort List": <https://leetcode.com/problems/sort-list> "Shortest Word Distance II": <https://leetcode.com/problems/shortest-word-distance-ii>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/description/)
-----------------------------------------------------------------------------------------------

### Problem:

Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

Example:

    Input: 1->2->4, 1->3->4
    Output: 1->1->2->3->4->4

### Solution:

Keep tracking the head of two lists and keep moving the pointer of smaller one to the next node.

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    let mergeTwoLists = function(l1, l2) {
      let prehead = { next: null }
      let p = prehead
      let p1 = l1
      let p2 = l2
      while (p1 && p2) {
        let pSel
        if  (p1.val < p2.val) {
          pSel = p1
          p1 = p1.next
        } else {
          pSel = p2
          p2 = p2.next
        }
        p.next = pSel
        p = pSel
      }

      p.next = p1 || p2

      return prehead.next
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "String": <https://leetcode.com/tag/string> "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "Letter Combinations of a Phone Number": <https://leetcode.com/problems/letter-combinations-of-a-phone-number> "Valid Parentheses": <https://leetcode.com/problems/valid-parentheses>
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/description/)
-------------------------------------------------------------------------------------------

### Problem:

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:

    [
      "((()))",
      "(()())",
      "(())()",
      "()(())",
      "()()()"
    ]

### Solution:

#### ONE

Recursive DFS backtracking.

    /**
     * @param {number} n
     * @return {string[]}
     */
    let generateParenthesis = function(n) {
      const result = []
      if (n > 0) {
        dfs(n, 0, 0, '', result)
      }
      return result
    };

    function dfs (n, nopen, nclose, path, result) {
      if (path.length === n * 2) {
        result.push(path)
        return
      }

      if (nopen < n) {
        dfs(n, nopen + 1, nclose, path + '(', result)
      }

      if (nclose < nopen) {
        dfs(n, nopen, nclose + 1, path + ')', result)
      }
    };

#### TWO

BFS.

    /**
     * @param {number} n
     * @return {string[]}
     */
    let generateParenthesis = function(n) {
      if (n <= 0) { return [] }

      const queue = [{
        path: '(',
        open: 1,
        close: 0,
      }]

      while (true) {
        const { path, open, close } = queue.shift()
        if (open + close === n * 2) {
          queue.unshift({ path, open, close })
          break
        }

        if (open < n) {
          queue.push({
            path: path + '(',
            open: open + 1,
            close,
          })
        }

        if (close < open) {
          queue.push({
            path: path + ')',
            open,
            close: close + 1,
          })
        }
      }

      return queue.map(x => x.path)
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Linked List": <https://leetcode.com/tag/linked-list> "Divide and Conquer": <https://leetcode.com/tag/divide-and-conquer> "Heap": <https://leetcode.com/tag/heap> Similar Questions: "Merge Two Sorted Lists": <https://leetcode.com/problems/merge-two-sorted-lists> "Ugly Number II": <https://leetcode.com/problems/ugly-number-ii>
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/description/)
-------------------------------------------------------------------------------------------

### Problem:

Merge *k* sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

**Example:**

    Input:
    [
      1->4->5,
      1->3->4,
      2->6
    ]
    Output: 1->1->2->3->4->4->5->6

### Solution:

#### ONE

Extend the idea of [21. Merge Two Sorted Lists](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/021.%20Merge%20Two%20Sorted%20Lists.md) and compare N items at a time.

This is slow as it reaches O(N^2).

#### TWO

Priority Queue. O(N \* log(K)).

Since JavaScript does not provide a standard built-in Priority Queue data structure, it is challenging to implement an efficient one barehanded.

#### THREE

Divide and conquer. Also O(N \* log(K)).

Divide N lists into ceil(N/2) pairs and merge your way up.

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode[]} lists
     * @return {ListNode}
     */
    let mergeKLists = function(lists) {
      while (lists.length > 1) {
        lists.unshift(mergeTwoLists(lists.pop(), lists.pop()))
      }
      return lists[0] || []
    };

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} l1
     * @param {ListNode} l2
     * @return {ListNode}
     */
    function mergeTwoLists (l1, l2) {
      let prehead = { next: null }
      let p = prehead
      let p1 = l1
      let p2 = l2
      while (p1 && p2) {
        let pSel
        if  (p1.val < p2.val) {
          pSel = p1
          p1 = p1.next
        } else {
          pSel = p2
          p2 = p2.next
        }
        p.next = pSel
        p = pSel
      }

      p.next = p1 || p2

      return prehead.next
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Linked List": <https://leetcode.com/tag/linked-list> Similar Questions: "Reverse Nodes in k-Group": <https://leetcode.com/problems/reverse-nodes-in-k-group>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[24. Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/description/)
-----------------------------------------------------------------------------------------

### Problem:

Given a linked list, swap every two adjacent nodes and return its head.

**Example:**

    Given 1->2->3->4, you should return the list as 2->1->4->3.

**Note:**

-   Your algorithm should use only constant extra space.
-   You may **not** modify the values in the list's nodes, only nodes itself may be changed.

### Solution:

1.  Draw the nodes down on paper to reason about the relationships.
2.  Pointing to every active node is an easy way to keep on track.

<!-- -->

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    let swapPairs = function(head) {
      const prehead = { next: head }

      for (let p = prehead; p.next !== null && p.next.next !== null;) {
        const p1 = p.next
        const p2 = p1.next
        p1.next = p2.next
        p2.next = p1
        p.next = p2
        p = p1
      }

      return prehead.next
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Linked List": <https://leetcode.com/tag/linked-list> Similar Questions: "Swap Nodes in Pairs": <https://leetcode.com/problems/swap-nodes-in-pairs>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/description/)
---------------------------------------------------------------------------------------------------

### Problem:

Given a linked list, reverse the nodes of a linked list *k* at a time and return its modified list.

*k* is a positive integer and is less than or equal to the length of the linked list. If the number of nodes is not a multiple of *k* then left-out nodes in the end should remain as it is.

**Example:**

Given this linked list: `1->2->3->4->5`

For *k* = 2, you should return: `2->1->4->3->5`

For *k* = 3, you should return: `3->2->1->4->5`

**Note:**

-   Only constant extra memory is allowed.
-   You may not alter the values in the list's nodes, only nodes itself may be changed.

### Solution:

1.  Find the end node of a portion that needs to be reversed.
2.  Get the next node of the end node.
3.  Reverse the portion using the next node as edge(null) pointer.
4.  Connect it back to the main linked list.

<!-- -->

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @param {number} k
     * @return {ListNode}
     */
    let reverseKGroup = function(head, k) {
      const prehead = { next: head }
      let p = prehead
      while (true) {
        let n = k
        let pEndNext = p.next
        while (pEndNext && n) {
          pEndNext = pEndNext.next
          n--
        }

        if (n !== 0) {
          break
        }

        const nextp = p.next // The first node will be the last after reverse
        p.next = reverseLinkList(p.next, pEndNext)
        p = nextp
      }

      return prehead.next
    };

    function reverseLinkList (head, nullNode = null) {
      let prev = nullNode
      let curr = head
      while (curr !== nullNode) {
        const next = curr.next
        curr.next = prev
        prev = curr
        curr = next
      }
      return prev
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Array": <https://leetcode.com/tag/array> "Two Pointers": <https://leetcode.com/tag/two-pointers> Similar Questions: "Remove Element": <https://leetcode.com/problems/remove-element> "Remove Duplicates from Sorted Array II": <https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/description/)
-------------------------------------------------------------------------------------------------------------------------

### Problem:

Given a sorted array *nums*, remove the duplicates [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm) such that each element appear only *once* and return the new length.

Do not allocate extra space for another array, you must do this by **modifying the input array in-place** with O(1) extra memory.

**Example 1:**

    Given nums = [1,1,2],

    Your function should return length = 2, with the first two elements of nums being 1 and 2 respectively.

    It doesn't matter what you leave beyond the returned length.

**Example 2:**

    Given nums = [0,0,1,1,1,2,2,3,3,4],

    Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively.

    It doesn't matter what values are set beyond the returned length.

**Clarification:**

Confused why the returned value is an integer but your answer is an array?

Note that the input array is passed in by **reference**, which means modification to the input array will be known to the caller as well.

Internally you can think of this:

    // nums is passed in by reference. (i.e., without making a copy)
    int len = removeDuplicates(nums);

    // any modification to nums in your function would be known by the caller.
    // using the length returned by your function, it prints the first len elements.
    for (int i = 0; i < len; i++) {
        print(nums[i]);
    }

### Solution:

The result array can only be shorter. That is why we can build the array in-place with the new length.

    /**
     * @param {number[]} nums
     * @return {number}
     */
    let removeDuplicates = function(nums) {
      let len = 0
      for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== nums[i-1]) {
          nums[len++] = nums[i]
        }
      }
      return len
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Array": <https://leetcode.com/tag/array> "Two Pointers": <https://leetcode.com/tag/two-pointers> Similar Questions: "Remove Duplicates from Sorted Array": <https://leetcode.com/problems/remove-duplicates-from-sorted-array> "Remove Linked List Elements": <https://leetcode.com/problems/remove-linked-list-elements> "Move Zeroes": <https://leetcode.com/problems/move-zeroes>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[27. Remove Element](https://leetcode.com/problems/remove-element/description/)
-------------------------------------------------------------------------------

### Problem:

Given an array *nums* and a value *val*, remove all instances of that value [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm) and return the new length.

Do not allocate extra space for another array, you must do this by **modifying the input array in-place** with O(1) extra memory.

The order of elements can be changed. It doesn't matter what you leave beyond the new length.

**Example 1:**

    Given nums = [3,2,2,3], val = 3,

    Your function should return length = 2, with the first two elements of nums being 2.

    It doesn't matter what you leave beyond the returned length.

**Example 2:**

    Given nums = [0,1,2,2,3,0,4,2], val = 2,

    Your function should return length = 5, with the first five elements of nums containing 0, 1, 3, 0, and 4.

    Note that the order of those five elements can be arbitrary.

    It doesn't matter what values are set beyond the returned length.

**Clarification:**

Confused why the returned value is an integer but your answer is an array?

Note that the input array is passed in by **reference**, which means modification to the input array will be known to the caller as well.

Internally you can think of this:

    // nums is passed in by reference. (i.e., without making a copy)
    int len = removeElement(nums, val);

    // any modification to nums in your function would be known by the caller.
    // using the length returned by your function, it prints the first len elements.
    for (int i = 0; i < len; i++) {
        print(nums[i]);
    }

### Solution:

The order does not matter. So just take the last number to fill the vacancy.

    /**
     * @param {number[]} nums
     * @param {number} val
     * @return {number}
     */
    let removeElement = function(nums, val) {
      let len = nums.length
      for (let i = 0; i < len; i++) {
        if (nums[i] === val) {
          nums[i--] = nums[--len]
        }
      }
      return len
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Math": <https://leetcode.com/tag/math> "Binary Search": <https://leetcode.com/tag/binary-search>
------------------------------------------------------------------------------------------------------------------------------------

[29. Divide Two Integers](https://leetcode.com/problems/divide-two-integers/description/)
-----------------------------------------------------------------------------------------

### Problem:

Given two integers `dividend` and `divisor`, divide two integers without using multiplication, division and mod operator.

Return the quotient after dividing `dividend` by `divisor`.

The integer division should truncate toward zero.

**Example 1:**

    Input: dividend = 10, divisor = 3
    Output: 3

**Example 2:**

    Input: dividend = 7, divisor = -3
    Output: -2

**Note:**

-   Both dividend and divisor will be 32-bit signed integers.
-   The divisor will never be 0.
-   Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: \[−231,  231 − 1\]. For the purpose of this problem, assume that your function returns 231 − 1 when the division result overflows.

### Solution:

Every decimal number can be represented as `a0*2^0 + a1*2^1 + a2*2^2 + ... + an*2^n`.

Replace multiplication and division with binary shifting.

    /**
     * @param {number} dividend
     * @param {number} divisor
     * @return {number}
     */
    let divide = function(dividend, divisor) {
      if (divisor === 0 ||
          divisor === -1 && dividend < -2147483647 ||
          dividend > 2147483647 ||
          dividend < -2147483648
      ) {
        return 2147483647
      }

      const isNegative = dividend < 0 && divisor >= 0 || dividend >= 0 && divisor < 0
      const pDividend = Math.abs(dividend)
      const pDivisor = Math.abs(divisor)

      if (dividend === 0 || pDividend < pDivisor) { return 0 }

      let doubling = pDivisor
      let count = 1
      while (doubling < pDividend && !(doubling & (1 << 30))) {
        doubling <<= 1
        count <<= 1
      }
      if (doubling > pDividend) {
        doubling >>>= 1
        count >>>= 1
      }

      const result = count + divide(pDividend - doubling, pDivisor)
      return isNegative ? -result : result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> Similar Questions: "Permutations": <https://leetcode.com/problems/permutations> "Permutations II": <https://leetcode.com/problems/permutations-ii> "Permutation Sequence": <https://leetcode.com/problems/permutation-sequence> "Palindrome Permutation II": <https://leetcode.com/problems/palindrome-permutation-ii>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[31. Next Permutation](https://leetcode.com/problems/next-permutation/description/)
-----------------------------------------------------------------------------------

### Problem:

Implement **next permutation**, which rearranges numbers into the lexicographically next greater permutation of numbers.

If such arrangement is not possible, it must rearrange it as the lowest possible order (ie, sorted in ascending order).

The replacement must be **in-place** and use only constant extra memory.

Here are some examples. Inputs are in the left-hand column and its corresponding outputs are in the right-hand column.

`1,2,3` → `1,3,2`  
`3,2,1` → `1,2,3`  
`1,1,5` → `1,5,1`

### Solution:

Observe a few longer examples and the pattern is self-evident.

Divide the list into two parts. The first half must be incremental and the second half must be decremental.

Reverse the second half and find the smallest number in it that is greater the last number of the first half.

Swap the two.

    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    let nextPermutation = function(nums) {
      const len = nums.length
      if (len <= 1) { return }

      for (let i = len - 1; i > 0; i--) {
        if (nums[i] > nums[i-1]) {
          let t
          for (let s = i, e = len-1; s < e; s++, e--) {
            t = nums[s]
            nums[s] = nums[e]
            nums[e]  = t
          }

          let j = len - 1
          while (nums[j] <= nums[i-1]) {
            j--
          }

          t = nums[j]
          nums[j] = nums[i-1]
          nums[i-1] = t
          
          break
        }
      }

      if (i === 0) {
        nums.reverse()
      }
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Binary Search": <https://leetcode.com/tag/binary-search> Similar Questions: "Search in Rotated Sorted Array II": <https://leetcode.com/problems/search-in-rotated-sorted-array-ii> "Find Minimum in Rotated Sorted Array": <https://leetcode.com/problems/find-minimum-in-rotated-sorted-array>
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/description/)
---------------------------------------------------------------------------------------------------------------

### Problem:

Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e., `[0,1,2,4,5,6,7]` might become `[4,5,6,7,0,1,2]`).

You are given a target value to search. If found in the array return its index, otherwise return `-1`.

You may assume no duplicate exists in the array.

Your algorithm's runtime complexity must be in the order of *O*(log *n*).

**Example 1:**

    Input: nums = [4,5,6,7,0,1,2], target = 0
    Output: 4

**Example 2:**

    Input: nums = [4,5,6,7,0,1,2], target = 3
    Output: -1

### Solution:

Obviously the problem requires binary search.

The core idea of binary search is to pick the middle item and then decide to keep which half.

The precondition of it is the array must be sorted.

But take a closer look and we realize that only one of the two halves needs to be sorted. This is sufficient for us to know if the target is in that half. If not, then it must be in the other.

Whenever we choose a pivot, it must be in one of the two sorted parts of the rotated array.

-   If the pivot is in the left part. We know that the begin of the left part to the pivot are sorted.
-   Otherwise the pivot is in the right part. We know that the end of the right part to the pivot are sorted.

<!-- -->

    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    let search = function(nums, target) {
      let s = 0
      let e = nums.length - 1

      while (s <= e) {
        const p = (e + s) / 2 | 0
        const pivot = nums[p]

        if (pivot === target) {
          return p
        }

        if (pivot < nums[e]) {
          // right half is sorted
          if (target > pivot  && target <= nums[e]) {
            // target is inside the right half
            s = p + 1
          } else {
            e = p - 1
          }
        } else {
          // left half is sorted
          if (target < pivot && target >= nums[s]) {
            // target is inside the left half
            e = p - 1
          } else {
            s = p + 1
          }
        }
      }

      return -1
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Binary Search": <https://leetcode.com/tag/binary-search> Similar Questions: "First Bad Version": <https://leetcode.com/problems/first-bad-version>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[34. Find First and Last Position of Element in Sorted Array](https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array/description/)
-----------------------------------------------------------------------------------------------------------------------------------------------------------------

### Problem:

Given an array of integers `nums` sorted in ascending order, find the starting and ending position of a given `target` value.

Your algorithm's runtime complexity must be in the order of *O*(log *n*).

If the target is not found in the array, return `[-1, -1]`.

**Example 1:**

    Input: nums = [5,7,7,8,8,10], target = 8
    Output: [3,4]

**Example 2:**

    Input: nums = [5,7,7,8,8,10], target = 6
    Output: [-1,-1]

### Solution:

Implement two variations of binary search to get the first and last matching positions.

They are basically the same as simple binary search except when we got the match, we mark the index and keep moving forward.

If we want to get the first, we dump the right half. Vice versa.

    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number[]}
     */
    let searchRange = function(nums, target) {
      let s = 0
      let e = nums.length - 1

      const first = searchFirst(nums, target, 0, nums.length - 1)

      if (first === -1) {
        return [-1, -1]
      }

      return [first, searchLast(nums, target, first, nums.length - 1)]
    };

    function searchFirst (nums, target, s, e) {
      let result = -1

      while (s <= e) {
        const p = (s + e) / 2 | 0
        const diff = nums[p] - target
        if (diff === 0) {
          result = p
          e = p - 1
        } else if (diff > 0) {
          e = p - 1
        } else {
          s = s + 1
        }
      }

      return result
    };

    function searchLast (nums, target, s, e) {
      let result = -1

      while (s <= e) {
        const p = (s + e) / 2 | 0
        const diff = nums[p] - target
        if (diff === 0) {
          result = p
          s = p + 1
        } else if (diff > 0) {
          e = p - 1
        } else {
          s = s + 1
        }
      }

      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Array": <https://leetcode.com/tag/array> "Binary Search": <https://leetcode.com/tag/binary-search> Similar Questions: "First Bad Version": <https://leetcode.com/problems/first-bad-version>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[35. Search Insert Position](https://leetcode.com/problems/search-insert-position/description/)
-----------------------------------------------------------------------------------------------

### Problem:

Given a sorted array and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You may assume no duplicates in the array.

**Example 1:**

    Input: [1,3,5,6], 5
    Output: 2

**Example 2:**

    Input: [1,3,5,6], 2
    Output: 1

**Example 3:**

    Input: [1,3,5,6], 7
    Output: 4

**Example 4:**

    Input: [1,3,5,6], 0
    Output: 0

### Solution:

Same as simple binary search except it returns the start index when does not find a match.

    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {number}
     */
    let searchInsert = function(nums, target) {
      let s = 0
      let e = nums.length - 1

      while (s <= e) {
        const p = (s + e) / 2 | 0
        const diff = nums[p] - target
        if (diff === 0) {
          return p
        } else if (diff < 0) {
          s = p + 1
        } else {
          e = p - 1
        }
      }

      return s
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Hash Table": <https://leetcode.com/tag/hash-table> Similar Questions: "Sudoku Solver": <https://leetcode.com/problems/sudoku-solver>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[36. Valid Sudoku](https://leetcode.com/problems/valid-sudoku/description/)
---------------------------------------------------------------------------

### Problem:

Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated **according to the following rules**:

1.  Each row must contain the digits `1-9` without repetition.
2.  Each column must contain the digits `1-9` without repetition.
3.  Each of the 9 `3x3` sub-boxes of the grid must contain the digits `1-9` without repetition.

![250px-Sudoku-by-L2G-20050714.svg.png](./completeLEETCODE_files/250px-Sudoku-by-L2G-20050714.svg.png)

A partially filled sudoku which is valid.

The Sudoku board could be partially filled, where empty cells are filled with the character `'.'`.

**Example 1:**

    Input:
    [
      ["5","3",".",".","7",".",".",".","."],
      ["6",".",".","1","9","5",".",".","."],
      [".","9","8",".",".",".",".","6","."],
      ["8",".",".",".","6",".",".",".","3"],
      ["4",".",".","8",".","3",".",".","1"],
      ["7",".",".",".","2",".",".",".","6"],
      [".","6",".",".",".",".","2","8","."],
      [".",".",".","4","1","9",".",".","5"],
      [".",".",".",".","8",".",".","7","9"]
    ]
    Output: true

**Example 2:**

    Input:
    [
      ["8","3",".",".","7",".",".",".","."],
      ["6",".",".","1","9","5",".",".","."],
      [".","9","8",".",".",".",".","6","."],
      ["8",".",".",".","6",".",".",".","3"],
      ["4",".",".","8",".","3",".",".","1"],
      ["7",".",".",".","2",".",".",".","6"],
      [".","6",".",".",".",".","2","8","."],
      [".",".",".","4","1","9",".",".","5"],
      [".",".",".",".","8",".",".","7","9"]
    ]
    Output: false
    Explanation: Same as Example 1, except with the 5 in the top left corner being 
        modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.

**Note:**

-   A Sudoku board (partially filled) could be valid but is not necessarily solvable.
-   Only the filled cells need to be validated according to the mentioned rules.
-   The given board contain only digits `1-9` and the character `'.'`.
-   The given board size is always `9x9`.

### Solution:

Scan the board once.

    /**
     * @param {character[][]} board
     * @return {boolean}
     */
    let isValidSudoku = function(board) {
      if (!board || board.length !== 9) { return false }

      const newArray = () => []
      const col = board.map(newArray)
      const row = board.map(newArray)
      const sub = board.map(newArray)

      for (let r = 0; r < 9; r++) {
        if (board[r].length !== 9) { return false }

        for (let c = 0; c < 9; c++) {
          const num = board[r][c]
          const subOffset = 3 * (r / 3 | 0) + (c / 3 | 0)
          if (num !== '.') {
            if (!(num >= 1 && num <= 9) ||
                row[r][num] ||
                col[c][num] ||
                sub[subOffset][num]
            ) {
              return false
            }
            row[r][num] = true
            col[c][num] = true
            sub[subOffset][num] = true
          }
        }
      }

      return true
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Hash Table": <https://leetcode.com/tag/hash-table> "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "Valid Sudoku": <https://leetcode.com/problems/valid-sudoku>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[37. Sudoku Solver](https://leetcode.com/problems/sudoku-solver/description/)
-----------------------------------------------------------------------------

### Problem:

Write a program to solve a Sudoku puzzle by filling the empty cells.

A sudoku solution must satisfy **all of the following rules**:

1.  Each of the digits `1-9` must occur exactly once in each row.
2.  Each of the digits `1-9` must occur exactly once in each column.
3.  Each of the the digits `1-9` must occur exactly once in each of the 9 `3x3` sub-boxes of the grid.

Empty cells are indicated by the character `'.'`.

![250px-Sudoku-by-L2G-20050714.svg.png](./completeLEETCODE_files/250px-Sudoku-by-L2G-20050714.svg.png)  
A sudoku puzzle...

![250px-Sudoku-by-L2G-20050714\_solution.svg.png](./completeLEETCODE_files/250px-Sudoku-by-L2G-20050714_solution.svg.png)  
...and its solution numbers marked in red.

**Note:**

-   The given board contain only digits `1-9` and the character `'.'`.
-   You may assume that the given Sudoku puzzle will have a single unique solution.
-   The given board size is always `9x9`.

### Solution:

DFS + backtracking.

Just like [36. Valid Sudoku](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/036.%20Valid%20Sudoku.md) but instead of validating the board with three tables, we use these three tables to get all the valid numbers at a position. This is super fast as it skips a lot of redundant comparisons.

Every time we reach a position, we pick a possible solution and move on to the next position, which is an identical problem.

If the next position fails, we come back and try the next possible solution of the current position.

If all possible solutions fail, we just dump the current position and go back to the last position.

    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    let solveSudoku = function(board) {
      const newArray = () => []
      const col = board.map(newArray)
      const row = board.map(newArray)
      const sub = board.map(newArray)

      for (let r = 0; r < 9; r++) {
        for (let c = 0; c < 9; c++) {
          const num = +board[r][c]
          if (num) {
            const subOffset = 3 * (r / 3 | 0) + (c / 3 | 0)
            row[r][num] = true
            col[c][num] = true
            sub[subOffset][num] = true
          }
        }
      }

      dfs(board, col, row, sub, 0)
    };

    function dfs (board, col, row, sub, pos) {
      if  (pos >= 81) { return true }

      const r = pos / 9 | 0
      const c = pos % 9

      if (board[r][c] !== '.') {
        return dfs(board, col, row, sub, pos + 1)
      }

      const subOffset = 3 * (r / 3 | 0) + (c / 3 | 0)

      for (let num = 1; num <= 9; num++) {
        if (!(row[r][num] || col[c][num] || sub[subOffset][num])) {
          row[r][num] = true
          col[c][num] = true
          sub[subOffset][num] = true

          if (dfs(board, col, row, sub, pos + 1)) {
            board[r][c] = num + ''
            return true
          } else {
            row[r][num] = false
            col[c][num] = false
            sub[subOffset][num] = false
          }
        }
      }

      return false
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "String": <https://leetcode.com/tag/string> Similar Questions: "Encode and Decode Strings": <https://leetcode.com/problems/encode-and-decode-strings> "String Compression": <https://leetcode.com/problems/string-compression>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[38. Count and Say](https://leetcode.com/problems/count-and-say/description/)
-----------------------------------------------------------------------------

### Problem:

The count-and-say sequence is the sequence of integers with the first five terms as following:

    1.     1
    2.     11
    3.     21
    4.     1211
    5.     111221

`1` is read off as `"one 1"` or `11`.  
`11` is read off as `"two 1s"` or `21`.  
`21` is read off as `"one 2`, then `one 1"` or `1211`.

Given an integer n, generate the nth term of the count-and-say sequence.

Note: Each term of the sequence of integers will be represented as a string.

Example 1:

    Input: 1
    Output: "1"

Example 2:

    Input: 4
    Output: "1211"

### Solution:

Just loop and grow the sequence.

#### ONE

JavaScript specific.

    /**
     * @param {number} n
     * @return {string}
     */
    let countAndSay = function(n) {
      let num = '1'

      while (--n > 0) {
        num = num.match(/(\d)\1*/g).map(x => x.length + x[0]).join('')
      }

      return num
    };

#### TWO

General solution.

    /**
     * @param {number} n
     * @return {string}
     */
    let countAndSay = function(n) {
      let num = '1'

      while (--n > 0) {
        let newNum = ''
        for (let i = 0, accu = 1; i < num.length; i++, accu++) {
          if (num[i] !== num[i+1]) {
            newNum += accu + num[i]
            accu = 0
          }
        }
        num = newNum
      }

      return num
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "Letter Combinations of a Phone Number": <https://leetcode.com/problems/letter-combinations-of-a-phone-number> "Combination Sum II": <https://leetcode.com/problems/combination-sum-ii> "Combinations": <https://leetcode.com/problems/combinations> "Combination Sum III": <https://leetcode.com/problems/combination-sum-iii> "Factor Combinations": <https://leetcode.com/problems/factor-combinations> "Combination Sum IV": <https://leetcode.com/problems/combination-sum-iv>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[39. Combination Sum](https://leetcode.com/problems/combination-sum/description/)
---------------------------------------------------------------------------------

### Problem:

Given a **set** of candidate numbers (`candidates`) **(without duplicates)** and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sums to `target`.

The **same** repeated number may be chosen from `candidates` unlimited number of times.

**Note:**

-   All numbers (including `target`) will be positive integers.
-   The solution set must not contain duplicate combinations.

**Example 1:**

    Input: candidates = [2,3,6,7], target = 7,
    A solution set is:
    [
      [7],
      [2,2,3]
    ]

**Example 2:**

    Input: candidates = [2,3,5], target = 8,
    A solution set is:
    [
      [2,2,2,2],
      [2,3,3],
      [3,5]
    ]

### Solution:

DFS + Backtracking.

To prevent duplications, only loop the right side of the candidates.

    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    let combinationSum = function(candidates, target) {
      return dfs(candidates, target, [], [], 0)
    };

    function dfs (candidates, target, result, path, start) {
      for (let i = start; i < candidates.length; i++) {
        const cand = candidates[i]

        if (cand > target) {
          continue
        }

        path.push(cand)
        if (cand === target) {
          result.push(path.slice())
        } else {
          dfs(candidates, target - cand, result, path, i)
        }
        path.pop(cand)
      }

      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "Combination Sum": <https://leetcode.com/problems/combination-sum>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[40. Combination Sum II](https://leetcode.com/problems/combination-sum-ii/description/)
---------------------------------------------------------------------------------------

### Problem:

Given a collection of candidate numbers (`candidates`) and a target number (`target`), find all unique combinations in `candidates` where the candidate numbers sums to `target`.

Each number in `candidates` may only be used **once** in the combination.

**Note:**

-   All numbers (including `target`) will be positive integers.
-   The solution set must not contain duplicate combinations.

**Example 1:**

    Input: candidates = [10,1,2,7,6,1,5], target = 8,
    A solution set is:
    [
      [1, 7],
      [1, 2, 5],
      [2, 6],
      [1, 1, 6]
    ]

**Example 2:**

    Input: candidates = [2,5,2,1,2], target = 5,
    A solution set is:
    [
      [1,2,2],
      [5]
    ]

### Solution:

Mostly the same as [39. Combination Sum](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/039.%20Combination%20Sum.md).

Now the candidates might have duplicate numbers, so we need to sort it.

We can also safely return when number is larger than the target.

To prvent duplicate results, stop searching if the current number is same as the last.

Notice the number at `start` is immune by the rule because we assume that the current group of candidates begins at `start`.

    /**
     * @param {number[]} candidates
     * @param {number} target
     * @return {number[][]}
     */
    let combinationSum2 = function(candidates, target) {
      return dfs(candidates.sort((a, b) => a - b), target, [], [], 0)
    };

    function dfs (candidates, target, result, path, start) {
      for (let i = start; i < candidates.length; i++) {
        const cand = candidates[i]

        if (cand > target) {
          return result
        }

        if (i > start && cand === candidates[i-1]) {
          continue
        }

        path.push(cand)
        if (cand === target) {
          result.push(path.slice())
        } else {
          dfs(candidates, target - cand, result, path, i + 1)
        }
        path.pop()
      }

      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Array": <https://leetcode.com/tag/array> Similar Questions: "Missing Number": <https://leetcode.com/problems/missing-number> "Find the Duplicate Number": <https://leetcode.com/problems/find-the-duplicate-number> "Find All Numbers Disappeared in an Array": <https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array> "Couples Holding Hands": <https://leetcode.com/problems/couples-holding-hands>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[41. First Missing Positive](https://leetcode.com/problems/first-missing-positive/description/)
-----------------------------------------------------------------------------------------------

### Problem:

Given an unsorted integer array, find the smallest missing positive integer.

**Example 1:**

    Input: [1,2,0]
    Output: 3

**Example 2:**

    Input: [3,4,-1,1]
    Output: 2

**Example 3:**

    Input: [7,8,9,11,12]
    Output: 1

**Note:**

Your algorithm should run in *O*(*n*) time and uses constant extra space.

### Solution:

The last requirement is why this problem is marked "hard". Though the solution feels like cheating: it modifies the array to mark numbers.

So the algorithm still requires *O*(*n*) space but *O*(*1*) **extra** space.

The core idea of the solution is, if the length of the array is n, then the smallest missing positive integer must be within \[1, n+1\].

Consider an edge-case scenario where the array is `[1,2,...,n]`. The smallest missing positive integer is `n+1`.

Now if one of these integers is missing in the array, that integer **is** the smallest missing positive integer.

If more than one are missing, pick the smallest.

So here we reuse the array and keep trying to put integer `k` into the slot indexed `k-1` (via swapping).

    /**
     * @param {number[]} nums
     * @return {number}
     */
    let firstMissingPositive = function(nums) {
      const n = nums.length

      for (let i = 1; i < n; i++) {
        while (nums[i] <= n && nums[i] !== nums[nums[i] - 1]) {
          const t = nums[i]
          nums[i] = nums[t - 1]
          nums[t - 1] = t
        }
      }

      for (let i = 0; i < n; i++) {
        if (nums[i] !== i + 1) {
          return i + 1
        }
      }

      return n + 1
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Array": <https://leetcode.com/tag/array> "Two Pointers": <https://leetcode.com/tag/two-pointers> "Stack": <https://leetcode.com/tag/stack> Similar Questions: "Container With Most Water": <https://leetcode.com/problems/CONTENT-with-most-water> "Product of Array Except Self": <https://leetcode.com/problems/product-of-array-except-self> "Trapping Rain Water II": <https://leetcode.com/problems/trapping-rain-water-ii> "Pour Water": <https://leetcode.com/problems/pour-water>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[42. Trapping Rain Water](https://leetcode.com/problems/trapping-rain-water/description/)
-----------------------------------------------------------------------------------------

### Problem:

Given *n* non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.

![rainwatertrap.png](./completeLEETCODE_files/rainwatertrap.png)  
The above elevation map is represented by array \[0,1,0,2,1,0,1,3,2,1,2,1\]. In this case, 6 units of rain water (blue section) are being trapped. **Thanks Marcos** for contributing this image!

**Example:**

    Input: [0,1,0,2,1,0,1,3,2,1,2,1]
    Output: 6

### Solution:

Well explained by Leetcode official: <https://leetcode.com/articles/trapping-rain-water/> .

    /**
     * @param {number[]} height
     * @return {number}
     */
    let trap = function(height) {
      let i = 0
      let j = height.length - 1
      let lMax = 0
      let rMax = 0
      let result = 0

      while (i < j) {
        const left = height[i]
        const right = height[j]
        if (left < right) {
          if (left < lMax) {
            result += lMax - left
          } else {
            lMax = left
          }
          i++
        } else {
          if (right < rMax) {
            result += rMax - right
          } else {
            rMax = right
          }
          j--
        }
      }

      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Math": <https://leetcode.com/tag/math> "String": <https://leetcode.com/tag/string> Similar Questions: "Add Two Numbers": <https://leetcode.com/problems/add-two-numbers> "Plus One": <https://leetcode.com/problems/plus-one> "Add Binary": <https://leetcode.com/problems/add-binary> "Add Strings": <https://leetcode.com/problems/add-strings>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[43. Multiply Strings](https://leetcode.com/problems/multiply-strings/description/)
-----------------------------------------------------------------------------------

### Problem:

Given two non-negative integers `num1` and `num2` represented as strings, return the product of `num1` and `num2`, also represented as a string.

**Example 1:**

    Input: num1 = "2", num2 = "3"
    Output: "6"

**Example 2:**

    Input: num1 = "123", num2 = "456"
    Output: "56088"

**Note:**

1.  The length of both `num1` and `num2` is &lt; 110.
2.  Both `num1` and `num2` contain only digits `0-9`.
3.  Both `num1` and `num2` do not contain any leading zero, except the number 0 itself.
4.  You **must not use any built-in BigInteger library** or **convert the inputs to integer** directly.

### Solution:

Same as we do multiplication on a paper.

    /**
     * @param {string} num1
     * @param {string} num2
     * @return {string}
     */
    let multiply = function(num1, num2) {
      const result = []

      for (i = num1.length - 1; i >= 0; i--) {
        for (j = num2.length - 1; j >= 0; j--) {
          const sum = num1[i] * num2[j] + (result[i+j+1] || 0)
          result[i+j] = (sum / 10 | 0) + (result[i+j] || 0)
          result[i+j+1] = sum % 10
        }
      }

      return result.join('').replace(/^0+(?=[0-9])/, '')
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Array": <https://leetcode.com/tag/array> "Greedy": <https://leetcode.com/tag/greedy> Similar Questions: "Jump Game": <https://leetcode.com/problems/jump-game>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[45. Jump Game II](https://leetcode.com/problems/jump-game-ii/description/)
---------------------------------------------------------------------------

### Problem:

Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Your goal is to reach the last index in the minimum number of jumps.

**Example:**

    Input: [2,3,1,1,4]
    Output: 2
    Explanation: The minimum number of jumps to reach the last index is 2.
        Jump 1 step from index 0 to 1, then 3 steps to the last index.

**Note:**

You can assume that you can always reach the last index.

### Solution:

Greedy. Always pick the one that would allow to jump to the rightest.

    /**
     * @param {number[]} nums
     * @return {number}
     */
    let jump = function(nums) {
      const len = nums.length
      let jump = 0
      for (let l = 0, r = 1; r < len; jump++) {
        let rNext = r
        for (let i = l; i < r; i++) {
          const rNextAtmp = i + nums[i] + 1
          if (rNextAtmp > rNext) {
            rNext = rNextAtmp
          }
        }
        l = r
        r = rNext
      }
      return jump
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "Next Permutation": <https://leetcode.com/problems/next-permutation> "Permutations II": <https://leetcode.com/problems/permutations-ii> "Permutation Sequence": <https://leetcode.com/problems/permutation-sequence> "Combinations": <https://leetcode.com/problems/combinations>
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[46. Permutations](https://leetcode.com/problems/permutations/description/)
---------------------------------------------------------------------------

### Problem:

Given a collection of **distinct** integers, return all possible permutations.

**Example:**

    Input: [1,2,3]
    Output:
    [
      [1,2,3],
      [1,3,2],
      [2,1,3],
      [2,3,1],
      [3,1,2],
      [3,2,1]
    ]

### Solution:

One position at a time, pick a number from the unused set and put it in that position (by swapping). Then move on to the next.

    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    let permute = function(nums) {
      const result = []
      _permute(nums, 0, result)
      return result
    };

    function _permute (nums, start, result) {
      if (start === nums.length) {
        return result.push(nums.slice())
      }

      const begin = nums[start]
      for (let i = start; i < nums.length; i++) {
        const next = nums[i]

        nums[start] = next
        nums[i] = begin

        _permute(nums, start + 1, result)

        nums[start] = begin
        nums[i] = next
      }
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "Next Permutation": <https://leetcode.com/problems/next-permutation> "Permutations": <https://leetcode.com/problems/permutations> "Palindrome Permutation II": <https://leetcode.com/problems/palindrome-permutation-ii>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[47. Permutations II](https://leetcode.com/problems/permutations-ii/description/)
---------------------------------------------------------------------------------

### Problem:

Given a collection of numbers that might contain duplicates, return all possible unique permutations.

**Example:**

    Input: [1,1,2]
    Output:
    [
      [1,1,2],
      [1,2,1],
      [2,1,1]
    ]

### Solution:

Same as [46. Permutations](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/046.%20Permutations.md). To avoid duplication, when picking a number for a position, only pick the unused. Either sort the `nums` or use a set to mark.

    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    let permuteUnique = function(nums) {
      const result = []
      _permuteUnique(nums, 0, result)
      return result
    };

    function _permuteUnique (nums, start, result) {
      if (start === nums.length) {
        result.push(nums.slice())
      }

      const used = new Set()
      const begin = nums[start]
      for (let i = start; i < nums.length; i++) {
        const next = nums[i]

        if (used.has(next)) {
          continue
        }

        used.add(next)

        nums[start] = next
        nums[i] = begin

        _permuteUnique(nums, start + 1, result)

        nums[start] = begin
        nums[i] = next
      }
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array>
----------------------------------------------------------------------------

[48. Rotate Image](https://leetcode.com/problems/rotate-image/description/)
---------------------------------------------------------------------------

### Problem:

You are given an *n* x *n* 2D matrix representing an image.

Rotate the image by 90 degrees (clockwise).

**Note:**

You have to rotate the image [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm), which means you have to modify the input 2D matrix directly. **DO NOT** allocate another 2D matrix and do the rotation.

**Example 1:**

    Given input matrix = 
    [
      [1,2,3],
      [4,5,6],
      [7,8,9]
    ],

    rotate the input matrix in-place such that it becomes:
    [
      [7,4,1],
      [8,5,2],
      [9,6,3]
    ]

**Example 2:**

    Given input matrix =
    [
      [ 5, 1, 9,11],
      [ 2, 4, 8,10],
      [13, 3, 6, 7],
      [15,14,12,16]
    ], 

    rotate the input matrix in-place such that it becomes:
    [
      [15,13, 2, 5],
      [14, 3, 4, 1],
      [12, 6, 8, 9],
      [16, 7,10,11]
    ]

### Solution:

Outside-in. Rotate one square at a time.

    /**
     * @param {number[][]} matrix
     * @return {void} Do not return anything, modify matrix in-place instead.
     */
    let rotate = function(matrix) {
      if (!matrix || matrix.length <= 0) {
        return
      }
      const width = matrix.length
      const halfWidthFloor = Math.floor(width / 2)
      const halfWidthCeil = Math.ceil(width / 2)
      for (let i = 0; i < halfWidthFloor; i++) {
        const iend = width - 1 - i
        for (let j = 0; j < halfWidthCeil; j++) {
          const jend = width - 1 - j
          const tmp = matrix[i][j]
          matrix[i][j] = matrix[jend][i];
          matrix[jend][i] = matrix[iend][jend]
          matrix[iend][jend] = matrix[j][iend]
          matrix[j][iend] = tmp
        }
      }
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Hash Table": <https://leetcode.com/tag/hash-table> "String": <https://leetcode.com/tag/string> Similar Questions: "Valid Anagram": <https://leetcode.com/problems/valid-anagram> "Group Shifted Strings": <https://leetcode.com/problems/group-shifted-strings>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[49. Group Anagrams](https://leetcode.com/problems/group-anagrams/description/)
-------------------------------------------------------------------------------

### Problem:

Given an array of strings, group anagrams together.

**Example:**

    Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
    Output:
    [
      ["ate","eat","tea"],
      ["nat","tan"],
      ["bat"]
    ]

**Note:**

-   All inputs will be in lowercase.
-   The order of your output does not matter.

### Solution:

It's all about hashing the words.

#### ONE

Sort each word to get the key.

    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    let groupAnagrams = function(strs) {
      let result = {};
      for (let i = 0; i < strs.length; i++) {
        const hash = strs[i].split('').sort().join('');
        result[hash] = result[hash] || []
        result[hash].push(strs[i])
      }
      return Object.values(result)
    };

#### TWO

Use the product of prime numbers to generate unique keys.

    const prime = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101]

    /**
     * @param {string[]} strs
     * @return {string[][]}
     */
    let groupAnagrams = function(strs) {
      const result = {};
      for (let i = 0; i < strs.length; i++) {
        const word = strs[i]
        let hash = 1
        for (let k = 0; k < word.length; k++) {
          hash *= prime[word.charCodeAt(k) - 97]
        }
        result[hash] = result[hash] || []
        result[hash].push(word)
      }
      return Object.values(result)
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Math": <https://leetcode.com/tag/math> "Binary Search": <https://leetcode.com/tag/binary-search> Similar Questions: "Sqrt(x)": <https://leetcode.com/problems/sqrtx> "Super Pow": <https://leetcode.com/problems/super-pow>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[50. Pow(x, n)](https://leetcode.com/problems/powx-n/description/)
------------------------------------------------------------------

### Problem:

Implement [pow(*x*, *n*)](http://www.cplusplus.com/reference/valarray/pow/), which calculates *x* raised to the power *n* (xn).

**Example 1:**

    Input: 2.00000, 10
    Output: 1024.00000

**Example 2:**

    Input: 2.10000, 3
    Output: 9.26100

**Example 3:**

    Input: 2.00000, -2
    Output: 0.25000
    Explanation: 2-2 = 1/22 = 1/4 = 0.25

**Note:**

-   -100.0 &lt; *x* &lt; 100.0
-   *n* is a 32-bit signed integer, within the range \[−231, 231 − 1\]

### Solution:

    x^n = x^(n/2) * x^(n/2), if n is even
    x^n = x^((n-1)/2) * x^((n-1)/2) * x, if n is odd

Corner cases:

-   n == 0
-   n &lt; 0

Note here we can not use any bitwise operator, `n = -2^31` might overflow.

    /**
     * @param {number} x
     * @param {number} n
     * @return {number}
     */
    let myPow = function(x, n) {
      if (n === 0) { return 1 }
      if (n === 1) { return x }
      if (n === -1) { return 1 / x }
      if (n % 2 === 0) {
        const res = myPow(x, n / 2)
        return res * res
      }
      const res = myPow(x, (n - 1) / 2)
      return x * res * res
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "N-Queens II": <https://leetcode.com/problems/n-queens-ii>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------

[51. N-Queens](https://leetcode.com/problems/n-queens/description/)
-------------------------------------------------------------------

### Problem:

The *n*-queens puzzle is the problem of placing *n* queens on an *n*×*n* chessboard such that no two queens attack each other.

![8-queens.png](./completeLEETCODE_files/8-queens.png)

Given an integer *n*, return all distinct solutions to the *n*-queens puzzle.

Each solution contains a distinct board configuration of the *n*-queens' placement, where `'Q'` and `'.'` both indicate a queen and an empty space respectively.

**Example:**

    Input: 4
    Output: [
     [".Q..",  // Solution 1
      "...Q",
      "Q...",
      "..Q."],

     ["..Q.",  // Solution 2
      "Q...",
      "...Q",
      ".Q.."]
    ]
    Explanation: There exist two distinct solutions to the 4-queens puzzle as shown above.

### Solution:

Allocate a `n`-length array `queens`. Each item represents a queen coordinate on the borad. Let index `i` be the row index, and `queens[i]` be the column index (or vice versa).

Now use the permutation algorithm from [46. Permutations](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/046.%20Permutations.md) to generate all possible queen positions, then test for diagonal.

#### ONE

    /**
     * @param {number} n
     * @return {string[][]}
     */
    let solveNQueens = function(n) {
      const result = []
      const queens = [...new Array(n)].map((_, i) => i)
      _solveNQueens(queens, 0, result)
      return result
    };

    function _solveNQueens (queens, iStart, result) {
      if (iStart === queens.length) {
        for (let i = 0; i < queens.length; i += 1) {
          for (let j = i + 1; j < queens.length; j += 1) {
            if (Math.abs(i - j) === Math.abs(queens[i] - queens[j])) {
              return
            }
          }
        }
        return result.push(_genBoard(queens))
      }

      const start = queens[iStart]
      for (let i = iStart; i < queens.length; i++) {
        const next = queens[i]

        queens[iStart] = next
        queens[i] = start

        _solveNQueens(queens, iStart + 1, result)

        queens[iStart] = start
        queens[i] = next
      }
    };

    function _genBoard (queens) {
      const board = []
      for (let i = 0; i < queens.length; i++) {
        let row = ''
        for (let j = 0; j < queens.length; j++) {
          row += queens[i] === j ? 'Q' : '.'
        }
        board.push(row)
      }
      return board
    };

This is slow because we test diagonal in the end. We can do a tree pruning by moving it right before diving into the next recursion.

#### TWO

    /**
     * @param {number} n
     * @return {string[][]}
     */
    let solveNQueens = function(n) {
      const result = []
      const queens = [...new Array(n)].map((_, i) => i)
      _solveNQueens(queens, 0, result)
      return result
    };

    function _solveNQueens (queens, iStart, result) {
      if (iStart === queens.length) {
        return result.push(_genBoard(queens))
      }

      const start = queens[iStart]
      for (let i = iStart; i < queens.length; i++) {
        const next = queens[i]

        queens[iStart] = next
        queens[i] = start

        if (_testDiagonal(queens, iStart)) {
          _solveNQueens(queens, iStart + 1, result)
        }

        queens[iStart] = start
        queens[i] = next
      }
    };

    function _testDiagonal(queens, iStart) {
      for (let i = 0; i < iStart; i++) {
        if (Math.abs(queens[iStart] - queens[i]) === iStart - i) {
          return false
        }
      }
      return true
    };

    function _genBoard (queens) {
      const board = []
      for (let i = 0; i < queens.length; i++) {
        let row = ''
        for (let j = 0; j < queens.length; j++) {
          row += queens[i] === j ? 'Q' : '.'
        }
        board.push(row)
      }
      return board
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "N-Queens": <https://leetcode.com/problems/n-queens>
----------------------------------------------------------------------------------------------------------------------------------------------------------------

[52. N-Queens II](https://leetcode.com/problems/n-queens-ii/description/)
-------------------------------------------------------------------------

### Problem:

The *n*-queens puzzle is the problem of placing *n* queens on an *n*×*n* chessboard such that no two queens attack each other.

![8-queens.png](./completeLEETCODE_files/8-queens.png)

Given an integer *n*, return the number of distinct solutions to the *n*-queens puzzle.

**Example:**

    Input: 4
    Output: 2
    Explanation: There are two distinct solutions to the 4-queens puzzle as shown below.
    [
     [".Q..",  // Solution 1
      "...Q",
      "Q...",
      "..Q."],

     ["..Q.",  // Solution 2
      "Q...",
      "...Q",
      ".Q.."]
    ]

### Solution:

Just modify [51. N-Queens](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/051.%20N-Queens.md).

    /**
     * @param {number} n
     * @return {string[][]}
     */
    let totalNQueens = function(n) {
      return _totalNQueens([...new Array(n)].map((_, i) => i), 0)
    };

    function _totalNQueens (queens, iStart, result) {
      if (iStart === queens.length) {
        return 1
      }

      let count = 0

      const start = queens[iStart]
      for (let i = iStart; i < queens.length; i++) {
        const next = queens[i]

        queens[iStart] = next
        queens[i] = start

        if (_testDiagonal(queens, iStart)) {
          count += _totalNQueens(queens, iStart + 1, result)
        }

        queens[iStart] = start
        queens[i] = next
      }

      return count
    };

    function _testDiagonal(queens, iStart) {
      for (let i = 0; i < iStart; i++) {
        if (Math.abs(queens[iStart] - queens[i]) === iStart - i) {
          return false
        }
      }
      return true
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Array": <https://leetcode.com/tag/array> "Divide and Conquer": <https://leetcode.com/tag/divide-and-conquer> "Dynamic Programming": <https://leetcode.com/tag/dynamic-programming> Similar Questions: "Best Time to Buy and Sell Stock": <https://leetcode.com/problems/best-time-to-buy-and-sell-stock> "Maximum Product Subarray": <https://leetcode.com/problems/maximum-product-subarray> "Degree of an Array": <https://leetcode.com/problems/degree-of-an-array>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/description/)
-----------------------------------------------------------------------------------

### Problem:

Given an integer array `nums`, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

**Example:**

    Input: [-2,1,-3,4,-1,2,1,-5,4],
    Output: 6
    Explanation: [4,-1,2,1] has the largest sum = 6.

**Follow up:**

If you have figured out the O(*n*) solution, try coding another solution using the divide and conquer approach, which is more subtle.

### Solution:

DP.

Define `f(i)` to be the largest sum of a contiguous subarray that ends with `nums[i]`.

If `f(i-1)` is negative, then `nums[i]` must be greater than `f(i-1) + nums[i]`.

    f(0) = nums[0]
    f(i) = max( f(i-1), 0 ) + nums[i]

Then return the largest one.

    /**
     * @param {number[]} nums
     * @return {number}
     */
    let maxSubArray = function(nums) {
      const len = nums.length
      if (len <= 0) { return 0 }
      const dp = [nums[0]]
      for (let i = 1; i < len; i++) {
        dp[i] = Math.max(dp[i-1], 0) + nums[i]
      }
      return Math.max(...dp)
    };

We can also compress the dp array:

    /**
     * @param {number[]} nums
     * @return {number}
     */
    let maxSubArray = function(nums) {
      let dp = nums[0]
      let max = dp || 0
      for (let i = 1; i < nums.length; i++) {
        max = Math.max(max, dp = Math.max(dp, 0) + nums[i])
      }
      return max
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> Similar Questions: "Spiral Matrix II": <https://leetcode.com/problems/spiral-matrix-ii>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------

[54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/description/)
-----------------------------------------------------------------------------

### Problem:

Given a matrix of *m* x *n* elements (*m* rows, *n* columns), return all elements of the matrix in spiral order.

**Example 1:**

    Input:
    [
     [ 1, 2, 3 ],
     [ 4, 5, 6 ],
     [ 7, 8, 9 ]
    ]
    Output: [1,2,3,6,9,8,7,4,5]

**Example 2:**

    Input:
    [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9,10,11,12]
    ]
    Output: [1,2,3,4,8,12,11,10,9,5,6,7]

### Solution:

Loop outside-in. Break each cycle into four stages. Note that the last two stages need at least two rows/columns.

    /**
     * @param {number[][]} matrix
     * @return {number[]}
     */
    let spiralOrder = function(matrix) {
      const result = []
      const height = matrix.length
      if (height <= 1) { return matrix[0] || result }
      const width = matrix[0].length
      if (width <= 0) { return result }

      const end = (Math.min(width, height) + 1) / 2 | 0
      for (let start = 0; start < end; start++) {
        const rowEnd = height - start - 1
        const colEnd = width - start - 1
        for (let col = start; col <= colEnd; col++) {
          result.push(matrix[start][col])
        }
        for (let row = start + 1; row <= rowEnd; row++) {
          result.push(matrix[row][colEnd])
        }
        if (rowEnd > start) {
          for (let col = colEnd - 1; col >= start ; col--) {
            result.push(matrix[rowEnd][col])
          }
        }
        if (colEnd > start) {
          for (let row = rowEnd - 1; row > start ; row--) {
            result.push(matrix[row][start])
          }
        }
      }
      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Greedy": <https://leetcode.com/tag/greedy> Similar Questions: "Jump Game II": <https://leetcode.com/problems/jump-game-ii>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[55. Jump Game](https://leetcode.com/problems/jump-game/description/)
---------------------------------------------------------------------

### Problem:

Given an array of non-negative integers, you are initially positioned at the first index of the array.

Each element in the array represents your maximum jump length at that position.

Determine if you are able to reach the last index.

**Example 1:**

    Input: [2,3,1,1,4]
    Output: true
    Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

**Example 2:**

    Input: [3,2,1,0,4]
    Output: false
    Explanation: You will always arrive at index 3 no matter what. Its maximum
                 jump length is 0, which makes it impossible to reach the last index.

### Solution:

#### ONE

See [45. Jump Game II](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/045.%20Jump%20Game%20II.md). If the range does not expand at some point, we know it is stuck.

    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    let canJump = function(nums) {
      for (let l = 0, r = 1; r < nums.length;) {
        let rNext = r
        for (let i = l; i < r; i++) {
          const rNextAtmp = i + nums[i] + 1
          if (rNextAtmp > rNext) {
            rNext = rNextAtmp
          }
        }
        if (rNext <= r) { return false }
        l = r
        r = rNext
      }
      return true
    };

#### TWO

If we view it backward, and if the range of `nums[n-2]` covers `nums[n-1]`, then we can safely make `n-2` the new destination point, and so on.

If `nums[0]` can cover the last destination point, it is good.

    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    let canJump = function(nums) {
      let des = nums.length - 1
      for (let i = des - 1; i > 0; i--) {
        if (nums[i] + i >= des) {
          des = i
        }
      }
      return nums[0] >= des
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Sort": <https://leetcode.com/tag/sort> Similar Questions: "Insert Interval": <https://leetcode.com/problems/insert-interval> "Meeting Rooms": <https://leetcode.com/problems/meeting-rooms> "Meeting Rooms II": <https://leetcode.com/problems/meeting-rooms-ii> "Teemo Attacking": <https://leetcode.com/problems/teemo-attacking> "Add Bold Tag in String": <https://leetcode.com/problems/add-bold-tag-in-string> "Range Module": <https://leetcode.com/problems/range-module> "Employee Free Time": <https://leetcode.com/problems/employee-free-time> "Partition Labels": <https://leetcode.com/problems/partition-labels>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[56. Merge Intervals](https://leetcode.com/problems/merge-intervals/description/)
---------------------------------------------------------------------------------

### Problem:

Given a collection of intervals, merge all overlapping intervals.

**Example 1:**

    Input: [[1,3],[2,6],[8,10],[15,18]]
    Output: [[1,6],[8,10],[15,18]]
    Explanation: Since intervals [1,3] and [2,6] overlaps, merge them into [1,6].

**Example 2:**

    Input: [[1,4],[4,5]]
    Output: [[1,5]]
    Explanation: Intervals [1,4] and [4,5] are considerred overlapping.

### Solution:

Sort then merge.

    /**
     * Definition for an interval.
     * function Interval(start, end) {
     *     this.start = start;
     *     this.end = end;
     * }
     */
    /**
     * @param {Interval[]} intervals
     * @return {Interval[]}
     */
    let merge = function(intervals) {
      if (intervals.length <= 1) { return intervals }
      intervals.sort((a, b) => (a.start - b.start) || (a.end - b.end))
      let last = new Interval(intervals[0].start, intervals[0].end)
      const result = [last]
      for (let i = 1; i < intervals.length; i++) {
        const { start, end } = intervals[i]
        if (start > last.end) {
          last = new Interval(start, end)
          result.push(last)
        } else if (end > last.end) {
          last.end = end
        }
      }
      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Array": <https://leetcode.com/tag/array> "Sort": <https://leetcode.com/tag/sort> Similar Questions: "Merge Intervals": <https://leetcode.com/problems/merge-intervals> "Range Module": <https://leetcode.com/problems/range-module>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[57. Insert Interval](https://leetcode.com/problems/insert-interval/description/)
---------------------------------------------------------------------------------

### Problem:

Given a set of *non-overlapping* intervals, insert a new interval into the intervals (merge if necessary).

You may assume that the intervals were initially sorted according to their start times.

**Example 1:**

    Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
    Output: [[1,5],[6,9]]

**Example 2:**

    Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
    Output: [[1,2],[3,10],[12,16]]
    Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

### Solution:

The logic of the solution is pretty straight forward. Just need to carefully think through all the edge cases. It is better to choose readability over performance.

    /**
     * Definition for an interval.
     * function Interval(start, end) {
     *     this.start = start;
     *     this.end = end;
     * }
     */
    /**
     * @param {Interval[]} intervals
     * @param {Interval} newInterval
     * @return {Interval[]}
     */
    let insert = function(intervals, newInterval) {
      const result = []
      const p = new Interval(newInterval.start, newInterval.end)
      for (let i = 0; i < intervals.length; i++) {
        const { start, end } = intervals[i]
        if (start > p.end) {
          break
        }

        if (end < p.start) {
          result.push(intervals[i])
          continue
        }

        if (start < p.start) {
          p.start = start
        }

        if (end > p.end) {
          p.end = end
        }
      }
      return [...result, p, ...intervals.slice(i)]
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "String": <https://leetcode.com/tag/string>
----------------------------------------------------------------------------

[58. Length of Last Word](https://leetcode.com/problems/length-of-last-word/description/)
-----------------------------------------------------------------------------------------

### Problem:

Given a string s consists of upper/lower-case alphabets and empty space characters `' '`, return the length of last word in the string.

If the last word does not exist, return 0.

Note: A word is defined as a character sequence consists of non-space characters only.

Example:

    Input: "Hello World"
    Output: 5

### Solution:

JavaScript specific solutions:

#### ONE

    /**
     * @param {string} s
     * @return {number}
     */
    let lengthOfLastWord = function(s) {
      return (/\w+$/.exec(s) || [''])[0].length
    };

#### TWO

Super fast. `split` will guarantee that there is at least one item in the resulted array.

    /**
     * @param {string} s
     * @return {number}
     */
    let lengthOfLastWord = function(s) {
      return s.trim().split(' ').pop().length
    };

#### THREE

General solution.

    /**
     * @param {string} s
     * @return {number}
     */
    let lengthOfLastWord = function(s) {
      let end = s.length - 1
      while (end >= 0 && s[end] === ' ') {
        end--
      }

      let start = end
      while (start >= 0 && s[start] !== ' ') {
        start--
      }

      return end - start
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> Similar Questions: "Spiral Matrix": <https://leetcode.com/problems/spiral-matrix>
--------------------------------------------------------------------------------------------------------------------------------------------------------------

[59. Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/description/)
-----------------------------------------------------------------------------------

### Problem:

Given a positive integer *n*, generate a square matrix filled with elements from 1 to *n*2 in spiral order.

**Example:**

    Input: 3
    Output:
    [
     [ 1, 2, 3 ],
     [ 8, 9, 4 ],
     [ 7, 6, 5 ]
    ]

### Solution:

Straight-forward.

    /**
     * @param {number} n
     * @return {number[][]}
     */
    let generateMatrix = function(n) {
      const matrix = [...new Array(n)].map(() => [])
      const halfN = (n + 1) / 2 | 0
      let count = 1
      for (let start = 0; start < halfN; start++) {
        const end = n - start - 1
        for (let col = start; col <= end; col++) {
          matrix[start][col] = count++
        }
        for (let row = start + 1; row <= end; row++) {
          matrix[row][end] = count++
        }
        for (let col = end - 1; col >= start; col--) {
          matrix[end][col] = count++
        }
        for (let row = end - 1; row > start; row--) {
          matrix[row][start] = count++
        }
      }
      return matrix
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Math": <https://leetcode.com/tag/math> "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "Next Permutation": <https://leetcode.com/problems/next-permutation> "Permutations": <https://leetcode.com/problems/permutations>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[60. Permutation Sequence](https://leetcode.com/problems/permutation-sequence/description/)
-------------------------------------------------------------------------------------------

### Problem:

The set `[1,2,3,...,*n*]` contains a total of *n*! unique permutations.

By listing and labeling all of the permutations in order, we get the following sequence for *n* = 3:

1.  `"123"`
2.  `"132"`
3.  `"213"`
4.  `"231"`
5.  `"312"`
6.  `"321"`

Given *n* and *k*, return the *k*th permutation sequence.

**Note:**

-   Given *n* will be between 1 and 9 inclusive.
-   Given *k* will be between 1 and *n*! inclusive.

**Example 1:**

    Input: n = 3, k = 3
    Output: "213"

**Example 2:**

    Input: n = 4, k = 9
    Output: "2314"

### Solution:

The order of the sequence is fixed hence can be calculated. We can view the process as picking digits from a sorted set `[1...n]`.

Each digit appears `(n-1)!` times in `result[0]`. And for a fixed `result[0]` each digit appears `(n-2)!` times in `result[1]`. So on.

We also need `k--` to convert `k` into index so that `k <= (n-1)!` maps `0` (and get `1` from the set).

    /**
     * @param {number} n
     * @param {number} k
     * @return {string}
     */
    let getPermutation = function(n, k) {
      const digits = []
      let factorial = 1
      for (let i = 1; i <= n; i++) {
        digits.push(i)
        factorial *= i
      }

      k--

      let result = ''
      while (n > 0) {
        factorial /= n
        result += digits.splice(k / factorial | 0, 1)[0]
        k %= factorial
        n--
      }
      
      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Linked List": <https://leetcode.com/tag/linked-list> "Two Pointers": <https://leetcode.com/tag/two-pointers> Similar Questions: "Rotate Array": <https://leetcode.com/problems/rotate-array> "Split Linked List in Parts": <https://leetcode.com/problems/split-linked-list-in-parts>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[61. Rotate List](https://leetcode.com/problems/rotate-list/description/)
-------------------------------------------------------------------------

### Problem:

Given a linked list, rotate the list to the right by *k* places, where *k* is non-negative.

**Example 1:**

    Input: 1->2->3->4->5->NULL, k = 2
    Output: 4->5->1->2->3->NULL
    Explanation:
    rotate 1 steps to the right: 5->1->2->3->4->NULL
    rotate 2 steps to the right: 4->5->1->2->3->NULL

**Example 2:**

    Input: 0->1->2->NULL, k = 4
    Output: 2->0->1->NULL
    Explanation:
    rotate 1 steps to the right: 2->0->1->NULL
    rotate 2 steps to the right: 1->2->0->NULL
    rotate 3 steps to the right: 0->1->2->NULL
    rotate 4 steps to the right: 2->0->1->NULL

### Solution:

Classic two-pointers chasing except the `k` could be larger than the length of this list.

We first attempt to locate the right pointer while also recording the length of the list.

If we hit the end of list and still do not have the right pointer, we know `k` is larger than the length.

Locate the right pointer again with `k % len`.

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @param {number} k
     * @return {ListNode}
     */
    let rotateRight = function(head, k) {
      if (head === null || k <= 0) { return head }

      let right = head
      let len = 0
      let kk = k
      while (right !== null && kk > 0) {
        right = right.next
        kk--
        len++
      }

      if (kk > 0) {
        right = head
        kk = k % len
        while (kk--) {
          right = right.next
        }
      }

      if (right !== null) {
        let left = head
        while (right.next !== null) {
          left = left.next
          right = right.next
        }
        right.next = head
        head = left.next
        left.next = null
      }

      return head
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Dynamic Programming": <https://leetcode.com/tag/dynamic-programming> Similar Questions: "Unique Paths II": <https://leetcode.com/problems/unique-paths-ii> "Minimum Path Sum": <https://leetcode.com/problems/minimum-path-sum> "Dungeon Game": <https://leetcode.com/problems/dungeon-game>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[62. Unique Paths](https://leetcode.com/problems/unique-paths/description/)
---------------------------------------------------------------------------

### Problem:

A robot is located at the top-left corner of a *m* x *n* grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?

![robot\_maze.png](./completeLEETCODE_files/robot_maze.png)

Above is a 7 x 3 grid. How many possible unique paths are there?

**Note:** *m* and *n* will be at most 100.

**Example 1:**

    Input: m = 3, n = 2
    Output: 3
    Explanation:
    From the top-left corner, there are a total of 3 ways to reach the bottom-right corner:
    1. Right -> Right -> Down
    2. Right -> Down -> Right
    3. Down -> Right -> Right

**Example 2:**

    Input: m = 7, n = 3
    Output: 28

### Solution:

DP.

Define `f(i, j)` to be the number of total unique paths from `(0, 0)` to `(i, j)`.

    f(i, 0) = 1
    f(0, j) = 1
    f(i, j) = f(i-1, j) + f(i, j-1)

Only two previous states are dependant. Use dynamic array to reduce memory allocation.

    /**
     * @param {number} m
     * @param {number} n
     * @return {number}
     */
    let uniquePaths = function(m, n) {
      const dp = new Array(m).fill(1)
      while (--n > 0) {
        for (let i = 1; i < m; i++) {
          dp[i] += dp[i-1]
        }
      }
      return dp[m-1] || 1
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Dynamic Programming": <https://leetcode.com/tag/dynamic-programming> Similar Questions: "Unique Paths": <https://leetcode.com/problems/unique-paths> "Dungeon Game": <https://leetcode.com/problems/dungeon-game> "Cherry Pickup": <https://leetcode.com/problems/cherry-pickup>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/description/)
-----------------------------------------------------------------------------------

### Problem:

Given a *m* x *n* grid filled with non-negative numbers, find a path from top left to bottom right which *minimizes* the sum of all numbers along its path.

**Note:** You can only move either down or right at any point in time.

**Example:**

    Input:
    [
      [1,3,1],
      [1,5,1],
      [4,2,1]
    ]
    Output: 7
    Explanation: Because the path 1→3→1→1→1 minimizes the sum.

### Solution:

Define `f(i, j)` to be the min sum from `(0, 0)` to `(i, j)`.

    f(0, 0) = grid[0][0]
    f(0, j) = f(0, j-1) + grid[0][j], j > 0
    f(i, 0) = f(i-1, 0) + grid[i][0], i > 0
    f(i, j) = min( f(i-1, j), f(i, j-1) ) + grid[i][j], j > 0 && i > 0

Only two previous states are dependant. Use dynamic array to reduce memory allocation.

    /**
     * @param {number[][]} grid
     * @return {number}
     */
    let minPathSum = function(grid) {
      const height = grid.length
      if (height <= 0) { return 0 }
      const width = grid[0].length
      if (width <= 0) { return 0 }

      const dp = new Array(width).fill(Infinity)
      dp[0] = 0
      for (let i = 0; i < height; i++) {
        dp[0] += grid[i][0]
        for (let j = 1; j < width; j++) {
          dp[j] = Math.min(dp[j], dp[j-1]) + grid[i][j]
        }
      }

      return dp[width-1] || 0
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Math": <https://leetcode.com/tag/math> "String": <https://leetcode.com/tag/string> Similar Questions: "String to Integer (atoi)": <https://leetcode.com/problems/string-to-integer-atoi>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[65. Valid Number](https://leetcode.com/problems/valid-number/description/)
---------------------------------------------------------------------------

### Problem:

Validate if a given string is numeric.

Some examples:  
`"0"` =&gt; `true`  
`" 0.1 "` =&gt; `true`  
`"abc"` =&gt; `false`  
`"1 a"` =&gt; `false`  
`"2e10"` =&gt; `true`

**Note:** It is intended for the problem statement to be ambiguous. You should gather all requirements up front before implementing one.

**Update (2015-02-10):**  
The signature of the `C++` function had been updated. If you still see your function signature accepts a `const char *` argument, please click the reload button to reset your code definition.

### Solution:

JavaScript specific solutions:

#### ONE

-   `Math.abs` will first convert the argument to number.
-   `Math.abs(' ') === 0`.

<!-- -->

    /**
     * @param {string} s
     * @return {boolean}
     */
    let isNumber = function(s) {
      return !!s.trim() && Math.abs(s) >= 0
    };

#### TWO

-   `isNaN` will first convert the argument to number.
-   `isNaN(' ') === false`.

<!-- -->

    /**
     * @param {string} s
     * @return {boolean}
     */
    let isNumber = function(s) {
      return !!s.trim() && !isNaN(s)
    };

#### THREE

General solution. Take a look at the [ECMA Spec](https://www.ecma-international.org/ecma-262/8.0/#sec-literals-numeric-literals).

Similary, we can define our own syntax, which requires a few changes:

    SignedDecimalLiteral::
      DecimalLiteral
      + DecimalLiteral
      - DecimalLiteral

    DecimalLiteral::
      DecimalDigits . [DecimalDigits] [ExponentPart]
      . DecimalDigits [ExponentPart]
      DecimalDigits [ExponentPart]

    DecimalDigits::
      DecimalDigit
      DecimalDigits DecimalDigit

    DecimalDigit:: one of
      0123456789

    ExponentPart::
      ExponentIndicator SignedInteger

    ExponentIndicator::one of
      eE

    SignedInteger::
      DecimalDigits
      + DecimalDigits
      - DecimalDigits

Now implement the parser. It is much easier now because we have a clear mental map of the syntax.

    /**
     * @param {string} s
     * @return {boolean}
     */
    let isNumber = function(s) {
      let start = 0
      while (s[start] === ' ') {
        start++
      }
      if (s[start] === '+' || s[start] === '-') {
        start++
      }
      let nextIndex = parseDecimalLiteral(s, start)
      while (s[nextIndex] === ' ') {
        nextIndex++
      }
      return nextIndex === s.length
    }

    /**
     * @param {string} s
     * @param {number} start - start index
     * @return {number} next index, -1 means error
     */
    function parseDecimalLiteral (s, start) {
      let nextIndex = -1
      if (s[start] === '.') {
        nextIndex = parseDecimalDigits(s, start + 1)
        if (nextIndex === -1) { return -1 }
      } else {
        nextIndex = parseDecimalDigits(s, start)
        if (nextIndex === -1) { return -1 }

        if (s[nextIndex] === '.') {
          const optNextIndex = parseDecimalDigits(s, ++nextIndex)
          if (optNextIndex !== -1) {
            nextIndex = optNextIndex
          }
        }
      }

      const optNextIndex = parseExponentPart(s, nextIndex)
      return optNextIndex === -1 ? nextIndex : optNextIndex
    }

    /**
     * @param {string} s
     * @param {number} start - start index
     * @return {number} next index, -1 means error
     */
    function parseDecimalDigits (s, start) {
      if (start === s.length) { return -1 }

      for (let i = start; i < s.length; i++) {
        const digit = s.charCodeAt(i) - 48
        if (!(digit >= 0 && digit <= 9)) {
          return i === start ? -1 : i
        }
      }
      return s.length
    }

    /**
     * @param {string} s
     * @param {number} start - start index
     * @return {number} next index, -1 means error
     */
    function parseDecimalIntegerLiteral (s, start) {
      if (start === s.length) { return -1 }

      let nextIndex = start
      if (s[start] === '0') {
        nextIndex++
      }

      const digit = s.charCodeAt(nextIndex) - 48
      if (!(digit > 0 && digit <= 9)) {
        return nextIndex === start ? -1 : nextIndex
      }
      nextIndex++

      const optNextIndex = parseDecimalDigits (s, nextIndex)
      return optNextIndex === -1 ? nextIndex : optNextIndex
    }

    /**
     * @param {string} s
     * @param {number} start - start index
     * @return {number} next index, -1 means error
     */
    function parseExponentPart (s, start) {
      if (s[start] !== 'e' && s[start] !== 'E') {
        return -1
      }

      let nextIndex = start + 1
      if (s[nextIndex] === '+' || s[nextIndex] === '-') {
        nextIndex++
      }

      return parseDecimalDigits(s, nextIndex)
    }

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Array": <https://leetcode.com/tag/array> "Math": <https://leetcode.com/tag/math> Similar Questions: "Multiply Strings": <https://leetcode.com/problems/multiply-strings> "Add Binary": <https://leetcode.com/problems/add-binary> "Plus One Linked List": <https://leetcode.com/problems/plus-one-linked-list>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[66. Plus One](https://leetcode.com/problems/plus-one/description/)
-------------------------------------------------------------------

### Problem:

Given a **non-empty** array of digits representing a non-negative integer, plus one to the integer.

The digits are stored such that the most significant digit is at the head of the list, and each element in the array contain a single digit.

You may assume the integer does not contain any leading zero, except the number 0 itself.

**Example 1:**

    Input: [1,2,3]
    Output: [1,2,4]
    Explanation: The array represents the integer 123.

**Example 2:**

    Input: [4,3,2,1]
    Output: [4,3,2,2]
    Explanation: The array represents the integer 4321.

### Solution:

#### ONE

JavaScript specific solution. Note that `unshift` is much slower that expanding.

    /**
     * @param {number[]} digits
     * @return {number[]}
     */
    let plusOne = function(digits) {
      for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
          digits[i]++
          return digits
        }
        digits[i] = 0
      }
      return [1, ...digits]
    };

#### TWO

General solution.

    /**
     * @param {number[]} digits
     * @return {number[]}
     */
    let plusOne = function(digits) {
      for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
          digits[i]++
          return digits
        }
        digits[i] = 0
      }

      for (let i = digits.length; i > 0; i--) {
        digits[i] = digits[i-1]
      }
      digits[0] = 1
      
      return digits
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "String": <https://leetcode.com/tag/string>
----------------------------------------------------------------------------

[68. Text Justification](https://leetcode.com/problems/text-justification/description/)
---------------------------------------------------------------------------------------

### Problem:

Given an array of words and a width *maxWidth*, format the text such that each line has exactly *maxWidth* characters and is fully (left and right) justified.

You should pack your words in a greedy approach; that is, pack as many words as you can in each line. Pad extra spaces `' '` when necessary so that each line has exactly *maxWidth* characters.

Extra spaces between words should be distributed as evenly as possible. If the number of spaces on a line do not divide evenly between words, the empty slots on the left will be assigned more spaces than the slots on the right.

For the last line of text, it should be left justified and no **extra** space is inserted between words.

**Note:**

-   A word is defined as a character sequence consisting of non-space characters only.
-   Each word's length is guaranteed to be greater than 0 and not exceed *maxWidth*.
-   The input array `words` contains at least one word.

**Example 1:**

    Input:
    words = ["This", "is", "an", "example", "of", "text", "justification."]
    maxWidth = 16
    Output:
    [
       "This    is    an",
       "example  of text",
       "justification.  "
    ]

**Example 2:**

    Input:
    words = ["What","must","be","acknowledgment","shall","be"]
    maxWidth = 16
    Output:
    [
      "What   must   be",
      "acknowledgment  ",
      "shall be        "
    ]
    Explanation: Note that the last line is "shall be    " instead of "shall     be",
                 because the last line must be left-justified instead of fully-justified.
                 Note that the second line is also left-justified becase it contains only one word.

**Example 3:**

    Input:
    words = ["Science","is","what","we","understand","well","enough","to","explain",
             "to","a","computer.","Art","is","everything","else","we","do"]
    maxWidth = 20
    Output:
    [
      "Science  is  what we",
      "understand      well",
      "enough to explain to",
      "a  computer.  Art is",
      "everything  else  we",
      "do                  "
    ]

### Solution:

-   Count the current line width (plus 1 space between each two words).
-   When a line is full:
    -   If there is only one word, pad spaces at the end.
    -   Otherwise calculate the gap length using `Math.ceil`.
-   Handle the last line.

<!-- -->

    /**
     * @param {string[]} words
     * @param {number} maxWidth
     * @return {string[]}
     */
    let fullJustify = function(words, maxWidth) {
      let start = 0
      let end = 1
      let lineLen = words[start].length
      const result = []

      while (end < words.length) {
        const newLen = words[end].length + 1 + lineLen
        if (newLen <= maxWidth) {
          lineLen = newLen
        } else {
          let line = ''
          let nWords = end - start
          if (nWords === 1) {
            line = words[start].padEnd(maxWidth)
          } else {
            let nSpaces = maxWidth - (lineLen - (nWords - 1))
            for (let i = start; i < end; i++) {
              const gap = Math.ceil(nSpaces / (end - i - 1))
              line += words[i] + ' '.repeat(gap)
              nSpaces -= gap
            }
          }
          result.push(line)
          start = end
          lineLen = words[start].length
        }
        end++
      }

      let lastline = words[start]
      for (let i = start + 1; i < end; i++) {
        lastline += ' ' + words[i]
      }
      result.push(lastline.padEnd(maxWidth))

      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Math": <https://leetcode.com/tag/math> "Binary Search": <https://leetcode.com/tag/binary-search> Similar Questions: "Pow(x, n)": <https://leetcode.com/problems/powx-n> "Valid Perfect Square": <https://leetcode.com/problems/valid-perfect-square>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[69. Sqrt(x)](https://leetcode.com/problems/sqrtx/description/)
---------------------------------------------------------------

### Problem:

Implement `int sqrt(int x)`.

Compute and return the square root of *x*, where *x* is guaranteed to be a non-negative integer.

Since the return type is an integer, the decimal digits are truncated and only the integer part of the result is returned.

**Example 1:**

    Input: 4
    Output: 2

**Example 2:**

    Input: 8
    Output: 2
    Explanation: The square root of 8 is 2.82842..., and since 
                 the decimal part is truncated, 2 is returned.

### Solution:

Binary Search. The square root of x is within \[0...(x+1)/2\].

    /**
     * @param {number} x
     * @return {number}
     */
    let mySqrt = function(x) {
      let max = Math.round(x / 2)
      let min = 0
      while (min <= max) {
        const mid = Math.floor((min + max) / 2)
        const diff = mid * mid - x
        if (diff > 0) {
          max = mid - 1
        } else if (diff < 0) {
          min = mid + 1
        } else {
          return mid
        }
      }
      return max
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "String": <https://leetcode.com/tag/string> "Stack": <https://leetcode.com/tag/stack>
------------------------------------------------------------------------------------------------------------------------

[71. Simplify Path](https://leetcode.com/problems/simplify-path/description/)
-----------------------------------------------------------------------------

### Problem:

Given an absolute path for a file (Unix-style), simplify it.

For example,  
**path** = `"/home/"`, =&gt; `"/home"`  
**path** = `"/a/./b/../../c/"`, =&gt; `"/c"`

**Corner Cases:**

-   Did you consider the case where **path** = `"/../"`?  
    In this case, you should return `"/"`.
-   Another corner case is the path might contain multiple slashes `'/'` together, such as `"/home//foo/"`.  
    In this case, you should ignore redundant slashes and return `"/home/foo"`.

### Solution:

Use stack to handle `/../`.

#### ONE

RegExp matching.

    /**
     * @param {string} path
     * @return {string}
     */
    let simplifyPath = function(path) {
      return '/' + (path.match(/[^\/]+/g) || [])
        .reduce((stack, p) => {
          if (p === '..') {
            stack.pop()
          } else if (p !== '.') {
            stack.push(p)
          }
          return stack
        }, [])
        .join('/')
    };

#### TWO

Direct search.

    /**
     * @param {string} path
     * @return {string}
     */
    let simplifyPath = function(path) {
      const len = path.length
      const stack = []
      let e = 0
      while (e < len) {
        while (e < len && path[e] === '/') {
          e++
        }
        const s = e
        while (e < len && path[e] !== '/') {
          e++
        }
        if (s < e) {
          const p = path.slice(s, e)
          if (p === '..') {
            stack.pop()
          } else if (p !== '.') {
            stack.push(p)
          }
        }
      }
      return '/' + stack.join('/')
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "String": <https://leetcode.com/tag/string> "Dynamic Programming": <https://leetcode.com/tag/dynamic-programming> Similar Questions: "One Edit Distance": <https://leetcode.com/problems/one-edit-distance> "Delete Operation for Two Strings": <https://leetcode.com/problems/delete-operation-for-two-strings> "Minimum ASCII Delete Sum for Two Strings": <https://leetcode.com/problems/minimum-ascii-delete-sum-for-two-strings>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[72. Edit Distance](https://leetcode.com/problems/edit-distance/description/)
-----------------------------------------------------------------------------

### Problem:

Given two words *word1* and *word2*, find the minimum number of operations required to convert *word1* to *word2*.

You have the following 3 operations permitted on a word:

1.  Insert a character
2.  Delete a character
3.  Replace a character

**Example 1:**

    Input: word1 = "horse", word2 = "ros"
    Output: 3
    Explanation: 
    horse -> rorse (replace 'h' with 'r')
    rorse -> rose (remove 'r')
    rose -> ros (remove 'e')

**Example 2:**

    Input: word1 = "intention", word2 = "execution"
    Output: 5
    Explanation: 
    intention -> inention (remove 't')
    inention -> enention (replace 'i' with 'e')
    enention -> exention (replace 'n' with 'x')
    exention -> exection (replace 'n' with 'c')
    exection -> execution (insert 'u')

### Solution:

DP.

Define `f(i, j)` to be the min edit distance from `word1[0...i)` to `word2[0...j)`.

    f(0, 0) = 0
    f(0, j) = f(0, j-1) + 1 // can only insert
    f(i, 0) = f(i-1, 0) + 1 // can only delete
    f(i, j) = min(
      f(i, j-1) + 1 // insert
      f(i-1, j) + 1 // delete
      f(i-1, j-1) + (word1[i-1] !== word2[j-1] ? 1 : 0) // replace or do nothing
    )

    /**
     * @param {string} word1
     * @param {string} word2
     * @return {number}
     */
    let minDistance = function(word1, word2) {
      const len1 = word1.length
      const len2 = word2.length

      if(len1 <= 0 || len2 <= 0) {
        return len1 + len2
      }

      const dp = []

      for (let i = 0; i <= len1; i++) {
        dp[i] = [i]
      }

      for (let j = 0; j <= len2; j++) {
        dp[0][j] = j
      }

      for (let i = 1; i <= len1; i++) {
        for (let j = 1; j <= len2; j++) {
          dp[i][j] = Math.min(
            dp[i][j-1] + 1,
            dp[i-1][j] + 1,
            dp[i-1][j-1] + (word1[i-1] === word2[j-1] ? 0 : 1)
          )
        }
      }

      return dp[len1][len2]
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> Similar Questions: "Game of Life": <https://leetcode.com/problems/game-of-life>
------------------------------------------------------------------------------------------------------------------------------------------------------------

[73. Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/description/)
-------------------------------------------------------------------------------------

### Problem:

Given a *m* x *n* matrix, if an element is 0, set its entire row and column to 0. Do it [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm).

**Example 1:**

    Input: 
    [
      [1,1,1],
      [1,0,1],
      [1,1,1]
    ]
    Output: 
    [
      [1,0,1],
      [0,0,0],
      [1,0,1]
    ]

**Example 2:**

    Input: 
    [
      [0,1,2,0],
      [3,4,5,2],
      [1,3,1,5]
    ]
    Output: 
    [
      [0,0,0,0],
      [0,4,5,0],
      [0,3,1,0]
    ]

**Follow up:**

-   A straight forward solution using O(*m\*\*n*) space is probably a bad idea.
-   A simple improvement uses O(*m* + *n*) space, but still not the best solution.
-   Could you devise a constant space solution?

### Solution:

-   O(*m\*\*n*) space solution: Copy a new matrix.
-   O(*m* + *n*) space solution: Use extra arrays to store rows and columns that need to be set 0.
-   Constant space solutions:

#### ONE

Instead of allocating extra arrays. Just use the first row and column.

First scan through the first row and column to see if they need be set 0. If so, mark and do it in the end.

Now scan the matrix and set 0 to the first row and column whenever a 0 is met.

Walk the matrix again and set 0 according to the first row and column.

Finally set the first row and column to 0 if needed.

    /**
     * @param {number[][]} matrix
     * @return {void} Do not return anything, modify matrix in-place instead.
     */
    let setZeroes = function(matrix) {
      const height = matrix.length
      if (height <= 0) { return }
      const width = matrix[0].length
      if (width <= 0) { return }

      const shouldClearFirstRow = matrix[0].some(x => x === 0)
      const shouldClearFirstCol = matrix.some(row => row[0] === 0)

      for (let i = 1; i < height; i++) {
        for (let j = 1; j < width; j++) {
          if (matrix[i][j] === 0) {
            matrix[i][0] = 0
            matrix[0][j] = 0
          }
        }
      }

      for (let i = 1; i < height; i++) {
        if (matrix[i][0] === 0) {
          matrix[i].fill(0)
        }
      }

      for (let j = 1; j < width; j++) {
        if (matrix[0][j] === 0) {
          for (let i = 1; i < height; i++) {
            matrix[i][j] = 0
          }
        }
      }

      if (shouldClearFirstRow) {
        matrix[0].fill(0)
      }

      if (shouldClearFirstCol) {
        for (let i = 0; i < height; i++) {
          matrix[i][0] = 0
        }
      }
    };

#### TWO

Use `NaN` to mark cells that need to be set 0.

Still constant space just a bit slower due to repeatedly setting overlapping `NaN`s.

    /**
     * @param {number[][]} matrix
     * @return {void} Do not return anything, modify matrix in-place instead.
     */
    let setZeroes = function(matrix) {
      const height = matrix.length
      if (height <= 0) { return }
      const width = matrix[0].length
      if (width <= 0) { return }

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (matrix[i][j] !== 0) { continue }

          for (let jj = 0; jj < width; jj++) {
            if (matrix[i][jj] !== 0) {
              matrix[i][jj] = NaN
            }
          }

          for (let ii = 0; ii < height; ii++) {
            if (matrix[ii][j] !== 0) {
              matrix[ii][j] = NaN
            }
          }
        }
      }

      for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
          if (isNaN(matrix[i][j])) {
            matrix[i][j] = 0
          }
        }
      }
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Binary Search": <https://leetcode.com/tag/binary-search> Similar Questions: "Search a 2D Matrix II": <https://leetcode.com/problems/search-a-2d-matrix-ii>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[74. Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/description/)
---------------------------------------------------------------------------------------

### Problem:

Write an efficient algorithm that searches for a value in an *m* x *n* matrix. This matrix has the following properties:

-   Integers in each row are sorted from left to right.
-   The first integer of each row is greater than the last integer of the previous row.

**Example 1:**

    Input:
    matrix = [
      [1,   3,  5,  7],
      [10, 11, 16, 20],
      [23, 30, 34, 50]
    ]
    target = 3
    Output: true

**Example 2:**

    Input:
    matrix = [
      [1,   3,  5,  7],
      [10, 11, 16, 20],
      [23, 30, 34, 50]
    ]
    target = 13
    Output: false

### Solution:

#### ONE

Search from top-left to bottom-right. O(*n*).

    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    let searchMatrix = function(matrix, target) {
      const height = matrix.length
      if (height <= 0) { return false }
      const width = matrix[0].length
      if (width <= 0) { return false }

      let i = 0
      let j = width - 1
      while (i < height && j >= 0) {
        const diff = matrix[i][j] - target
        if (diff > 0) {
          j--
        } else if (diff < 0) {
          i++
        } else {
          return true
        }
      }

      return false
    };

#### TWO

Binary search. O(log*n*).

View the matrix as an sorted array that is cut into `n` slices.

Take the algorithm from [35. Search Insert Position](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/035.%20Search%20Insert%20Position.md).

    /**
     * @param {number[][]} matrix
     * @param {number} target
     * @return {boolean}
     */
    let searchMatrix = function(matrix, target) {
      const height = matrix.length
      if (height <= 0) { return false }
      const width = matrix[0].length
      if (width <= 0) { return false }

      let s = 0
      let e = width * height - 1
      while (s <= e) {
        const mid = Math.floor((s + e) / 2)
        const diff = matrix[Math.floor(mid / width)][mid % width] - target
        if (diff < 0) {
          s = mid + 1
        } else if (diff > 0) {
          e = mid - 1
        } else {
          return true
        }
      }

      return false
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Two Pointers": <https://leetcode.com/tag/two-pointers> "Sort": <https://leetcode.com/tag/sort> Similar Questions: "Sort List": <https://leetcode.com/problems/sort-list> "Wiggle Sort": <https://leetcode.com/problems/wiggle-sort> "Wiggle Sort II": <https://leetcode.com/problems/wiggle-sort-ii>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[75. Sort Colors](https://leetcode.com/problems/sort-colors/description/)
-------------------------------------------------------------------------

### Problem:

Given an array with *n* objects colored red, white or blue, sort them **in-place**so that objects of the same color are adjacent, with the colors in the order red, white and blue.

Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

**Note:** You are not suppose to use the library's sort function for this problem.

**Example:**

    Input: [2,0,2,1,1,0]
    Output: [0,0,1,1,2,2]

**Follow up:**

-   A rather straight forward solution is a two-pass algorithm using counting sort.  
    First, iterate the array counting number of 0's, 1's, and 2's, then overwrite array with total number of 0's, then 1's and followed by 2's.
-   Could you come up with a one-pass algorithm using only constant space?

### Solution:

One-pass algorithm.

Take the idea of the partition algorithm from quick sort. Use `1` as pivot.

Count the number of sorted `0`s and `2`s so that we know where to swap.

    /**
     * @param {number[]} nums
     * @return {void} Do not return anything, modify nums in-place instead.
     */
    let sortColors = function(nums) {
      const len = nums.length
      let zeroEnd = 0
      let twoStart = len - 1
      let i = 0
      while (i <= twoStart) {
        if (nums[i] === 0 && i !== zeroEnd) {
          const t = nums[i]
          nums[i] = nums[zeroEnd]
          nums[zeroEnd] = t
          zeroEnd++
        } else if (nums[i] === 2 && i !== twoStart) {
          const t = nums[i]
          nums[i] = nums[twoStart]
          nums[twoStart] = t
          twoStart--
        } else {
          i++
        }
      }
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "Combination Sum": <https://leetcode.com/problems/combination-sum> "Permutations": <https://leetcode.com/problems/permutations>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[77. Combinations](https://leetcode.com/problems/combinations/description/)
---------------------------------------------------------------------------

### Problem:

Given two integers *n* and *k*, return all possible combinations of *k* numbers out of 1 ... *n*.

**Example:**

    Input: n = 4, k = 2
    Output:
    [
      [2,4],
      [3,4],
      [2,3],
      [1,2],
      [1,3],
      [1,4],
    ]

### Solution:

Basic DFS + Backtracking.

    /**
     * @param {number} n
     * @param {number} k
     * @return {number[][]}
     */
    let combine = function(n, k) {
      const result = []
      _combine(1, [], n, k, result)
      return result
    };

    function _combine (cur, path, n, k, result) {
      if (path.length === k) {
        return result.push(path.slice())
      }

      while (cur <= n) {
        path.push(cur)
        _combine(++cur, path, n, k, result)
        path.pop()
      }
    }

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Backtracking": <https://leetcode.com/tag/backtracking> "Bit Manipulation": <https://leetcode.com/tag/bit-manipulation> Similar Questions: "Subsets II": <https://leetcode.com/problems/subsets-ii> "Generalized Abbreviation": <https://leetcode.com/problems/generalized-abbreviation> "Letter Case Permutation": <https://leetcode.com/problems/letter-case-permutation>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[78. Subsets](https://leetcode.com/problems/subsets/description/)
-----------------------------------------------------------------

### Problem:

Given a set of **distinct** integers, *nums*, return all possible subsets (the power set).

**Note:** The solution set must not contain duplicate subsets.

**Example:**

    Input: nums = [1,2,3]
    Output:
    [
      [3],
      [1],
      [2],
      [1,2,3],
      [1,3],
      [2,3],
      [1,2],
      []
    ]

### Solution:

#### ONE

BFS.

    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    let subsets = function(nums) {
      return nums.reduce((result, num) => result.concat(result.map(r => [...r, num])), [[]])
    };

Or more imperative. Loop backward to avoid crossing the boundary.

    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    let subsets = function(nums) {
      const result = [[]]
      for (let i = nums.length - 1; i >= 0; i--) {
        for (let j = result.length - 1; j >= 0; j--) {
          result.push([nums[i], ...result[j]])
        }
      }
      return result
    };

#### TWO

DFS + Backtracking.

    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    let subsets = function(nums) {
      const result = []
      _subsets(nums, 0, [], result)
      return result
    };

    function _subsets(nums, start, path, result) {
      result.push(path.slice())
      while (start < nums.length) {
        path.push(nums[start])
        _subsets(nums, ++start, path, result)
        path.pop()
      }
    }

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "Word Search II": <https://leetcode.com/problems/word-search-ii>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[79. Word Search](https://leetcode.com/problems/word-search/description/)
-------------------------------------------------------------------------

### Problem:

Given a 2D board and a word, find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

**Example:**

    board =
    [
      ['A','B','C','E'],
      ['S','F','C','S'],
      ['A','D','E','E']
    ]

    Given word = "ABCCED", return true.
    Given word = "SEE", return true.
    Given word = "ABCB", return false.

### Solution:

DFS + Backtracking. Replace the cell with `NaN` before proceeding to the next level and restore when backtracking.

    /**
     * @param {character[][]} board
     * @param {string} word
     * @return {boolean}
     */
    let exist = function(board, word) {
      const height = board.length
      if (height <= 0) { return false }
      const width = board[0].length
      if (width <= 0) { return false }

      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          if (board[row][col] === word[0] &&
              _exist(board, word, 0, [[-1, 0], [1, 0], [0, -1], [0, 1]], row, col)
          ) {
            return true
          }
        }
      }

      return false
    };

    function _exist (board, word, iWord, directions, row, col) {
      if (iWord === word.length) {
        return true
      }

      if (!board[row] || word[iWord] !== board[row][col]) {
        return false
      }

      const cell = board[row][col]
      board[row][col] = NaN

      for (let i = directions.length - 1; i >= 0; i--) {
        if (_exist(board, word, iWord+1, directions, row+directions[i][0], col+directions[i][1])) {
          return true
        }
      }

      board[row][col] = cell

      return false
    }

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Two Pointers": <https://leetcode.com/tag/two-pointers> Similar Questions: "Remove Duplicates from Sorted Array": <https://leetcode.com/problems/remove-duplicates-from-sorted-array>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[80. Remove Duplicates from Sorted Array II](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/description/)
-------------------------------------------------------------------------------------------------------------------------------

### Problem:

Given a sorted array *nums*, remove the duplicates [**in-place**](https://en.wikipedia.org/wiki/In-place_algorithm) such that duplicates appeared at most *twice* and return the new length.

Do not allocate extra space for another array, you must do this by **modifying the input array in-place** with O(1) extra memory.

**Example 1:**

    Given nums = [1,1,1,2,2,3],

    Your function should return length = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.

    It doesn't matter what you leave beyond the returned length.

**Example 2:**

    Given nums = [0,0,1,1,1,1,2,3,3],

    Your function should return length = 7, with the first seven elements of nums being modified to 0, 0, 1, 1, 2, 3 and 3 respectively.

    It doesn't matter what values are set beyond the returned length.

**Clarification:**

Confused why the returned value is an integer but your answer is an array?

Note that the input array is passed in by **reference**, which means modification to the input array will be known to the caller as well.

Internally you can think of this:

    // nums is passed in by reference. (i.e., without making a copy)
    int len = removeDuplicates(nums);

    // any modification to nums in your function would be known by the caller.
    // using the length returned by your function, it prints the first len elements.
    for (int i = 0; i < len; i++) {
        print(nums[i]);
    }

### Solution:

Similar to [26. Remove Duplicates from Sorted Array](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/026.%20Remove%20Duplicates%20from%20Sorted%20Array.md).

    /**
     * @param {number[]} nums
     * @return {number}
     */
    let removeDuplicates = function(nums) {
      let len = 0
      for (let i = 0; i < nums.length; i++) {
        if (nums[i] !== nums[len-2]) {
          nums[len++] = nums[i]
        }
      }
      return len
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Binary Search": <https://leetcode.com/tag/binary-search> Similar Questions: "Search in Rotated Sorted Array": <https://leetcode.com/problems/search-in-rotated-sorted-array>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[81. Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/description/)
---------------------------------------------------------------------------------------------------------------------

### Problem:

Suppose an array sorted in ascending order is rotated at some pivot unknown to you beforehand.

(i.e., `[0,0,1,2,2,5,6]` might become `[2,5,6,0,0,1,2]`).

You are given a target value to search. If found in the array return `true`, otherwise return `false`.

**Example 1:**

    Input: nums = [2,5,6,0,0,1,2], target = 0
    Output: true

**Example 2:**

    Input: nums = [2,5,6,0,0,1,2], target = 3
    Output: false

**Follow up:**

-   This is a follow up problem to [Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/description/), where `nums` may contain duplicates.
-   Would this affect the run-time complexity? How and why?

### Solution:

See [33. Search in Rotated Sorted Array](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/033.%20Search%20in%20Rotated%20Sorted%20Array.md). The code is basically the same. Except with duplicates we can not tell which way to jump when `pivot == nums[e]`. The only thing we can do is to ditch `nums[e]`. SO worst case `O(*n*)`.

    /**
     * @param {number[]} nums
     * @param {number} target
     * @return {boolean}
     */
    let search = function(nums, target) {
      let s = 0
      let e = nums.length - 1

      while (s <= e) {
        const p = (e + s) / 2 | 0
        const pivot = nums[p]

        if (target === pivot) {
          return true
        }

        if (pivot < nums[e]) {
          if (target > nums[p] && target <= nums[e]) {
            s = p + 1
          } else {
            e = p - 1
          }
        } else if (pivot > nums[e]) {
          if (target < nums[p] && target >= nums[s]) {
            e = p - 1
          } else {
            s = p + 1
          }
        } else {
          e--
        }
      }

      return false
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Linked List": <https://leetcode.com/tag/linked-list> Similar Questions: "Remove Duplicates from Sorted List": <https://leetcode.com/problems/remove-duplicates-from-sorted-list>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[82. Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/description/)
-----------------------------------------------------------------------------------------------------------------------------

### Problem:

Given a sorted linked list, delete all nodes that have duplicate numbers, leaving only *distinct* numbers from the original list.

**Example 1:**

    Input: 1->2->3->3->4->4->5
    Output: 1->2->5

**Example 2:**

    Input: 1->1->1->2->3
    Output: 2->3

### Solution:

`p1` points to the current node. `p` points to the node before `p1` so that we can ditch `p1` if needed.

The list is sorted so we only need `dupVal` to keep the latest duplicate value.

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    let deleteDuplicates = function(head) {
      if (!head) { return null }
      const prehead = { next: head }

      let p = prehead
      let dupVal = NaN

      for (let p1 = head; p1; p1 = p1.next) {
        if (p1.val === dupVal) {
          p.next = p1.next
        } else if (p1.next && p1.val === p1.next.val) {
          p.next = p1.next
          dupVal = p1.val
        } else {
          p = p1
        }
      }

      return prehead.next
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Linked List": <https://leetcode.com/tag/linked-list> Similar Questions: "Remove Duplicates from Sorted List II": <https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[83. Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/description/)
-----------------------------------------------------------------------------------------------------------------------

### Problem:

Given a sorted linked list, delete all duplicates such that each element appear only *once*.

**Example 1:**

    Input: 1->1->2
    Output: 1->2

**Example 2:**

    Input: 1->1->2->3->3
    Output: 1->2->3

### Solution:

#### ONE

Just like [82. Remove Duplicates from Sorted List II](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/082.%20Remove%20Duplicates%20from%20Sorted%20List%20II.md) except keeping the first duplicate node.

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    let deleteDuplicates = function(head) {
      if (!head) { return null }
      const prehead = { next: head }

      let p = prehead
      let dupVal = NaN

      for (let p1 = head; p1; p1 = p1.next) {
        if (p1.val === dupVal) {
          p.next = p1.next
        } else {
          if (p1.next && p1.val === p1.next.val) {
            dupVal = p1.val
          }
          p = p1
        }
      }

      return prehead.next
    };

#### TWO

Just compare the next node. This is way more faster.

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    let deleteDuplicates = function(head) {
      if (!head) { return null }

      let p = head
      while (p) {
        if (p.next && p.val === p.next.val) {
          p.next = p.next.next
        } else {
          p = p.next
        }
      }

      return head
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Array": <https://leetcode.com/tag/array> "Stack": <https://leetcode.com/tag/stack> Similar Questions: "Maximal Rectangle": <https://leetcode.com/problems/maximal-rectangle>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[84. Largest Rectangle in Histogram](https://leetcode.com/problems/largest-rectangle-in-histogram/description/)
---------------------------------------------------------------------------------------------------------------

### Problem:

Given *n* non-negative integers representing the histogram's bar height where the width of each bar is 1, find the area of largest rectangle in the histogram.

![histogram.png](./completeLEETCODE_files/histogram.png)

Above is a histogram where width of each bar is 1, given height = `[2,1,5,6,2,3]`.

![histogram\_area.png](./completeLEETCODE_files/histogram_area.png)

The largest rectangle is shown in the shaded area, which has area = `10` unit.

**Example:**

    Input: [2,1,5,6,2,3]
    Output: 10

### Solution:

The height of a rectangle is determined by the lowest bar inside of it. So the core idea is, for each bar, assume it is the lowest bar and see how far it can expand. Then we have `len(heights)` rectangles. Return the max area.

For a bar `b` whose height is `h`, find the closest bar `b1` on the left that is lower than `h`, and `b2` on the right. The area of the rectangle is `h * (i2 - i1 - 1)`.

Notice that if we just loop the bars from left to right, `b1` and `b2` of each bar may overlap.

<table><thead><tr class="header"><th style="text-align: center;">index</th><th style="text-align: center;">height</th><th style="text-align: center;">width</th><th style="text-align: center;">area</th></tr></thead><tbody><tr class="odd"><td style="text-align: center;"><code>i</code></td><td style="text-align: center;"><code>heights[i]</code></td><td style="text-align: center;"><code>i2 - i1 - 1</code></td><td style="text-align: center;"><code>height * width</code></td></tr><tr class="even"><td style="text-align: center;">0</td><td style="text-align: center;">2</td><td style="text-align: center;">1 - -1 - 1</td><td style="text-align: center;">2</td></tr><tr class="odd"><td style="text-align: center;">1</td><td style="text-align: center;">1</td><td style="text-align: center;">6 - -1 - 1</td><td style="text-align: center;">6</td></tr><tr class="even"><td style="text-align: center;">2</td><td style="text-align: center;">5</td><td style="text-align: center;">4 - 1 - 1</td><td style="text-align: center;">10</td></tr><tr class="odd"><td style="text-align: center;">3</td><td style="text-align: center;">6</td><td style="text-align: center;">4 - 2 - 1</td><td style="text-align: center;">6</td></tr><tr class="even"><td style="text-align: center;">4</td><td style="text-align: center;">2</td><td style="text-align: center;">6 - 1 - 1</td><td style="text-align: center;">8</td></tr><tr class="odd"><td style="text-align: center;">5</td><td style="text-align: center;">3</td><td style="text-align: center;">6 - 4 - 1</td><td style="text-align: center;">3</td></tr></tbody></table>

Observe how `i1` and `i2` changes depending on the height.

To reduce O(*n^2*) to O(*n*), we use a stack to store incremental `b`s. Because `b1` and `b2` are both lower than `b`, whenever we reach a bar that is lower than the top of the stack, we know it's a `b2`. So stack top is a `b`. Second top is a `b1`. Keep popping the `b` to calculate areas until `b2` is no longer lower than stack top.

    /**
     * @param {number[]} heights
     * @return {number}
     */
    let largestRectangleArea = function(heights) {
      const stack = [-1]
      let max = 0
      for (let i2 = 0; i2 <= heights.length; i2++) {
        while ((heights[i2] || 0) < heights[stack[stack.length-1]]) {
          const i = stack.pop()
          const i1 = stack[stack.length-1]
          max = Math.max(max, heights[i] * (i2 - i1 - 1))
        }
        stack.push(i2)
      }
      return max
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Array": <https://leetcode.com/tag/array> "Hash Table": <https://leetcode.com/tag/hash-table> "Dynamic Programming": <https://leetcode.com/tag/dynamic-programming> "Stack": <https://leetcode.com/tag/stack> Similar Questions: "Largest Rectangle in Histogram": <https://leetcode.com/problems/largest-rectangle-in-histogram> "Maximal Square": <https://leetcode.com/problems/maximal-square>
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[85. Maximal Rectangle](https://leetcode.com/problems/maximal-rectangle/description/)
-------------------------------------------------------------------------------------

### Problem:

Given a 2D binary matrix filled with 0's and 1's, find the largest rectangle containing only 1's and return its area.

**Example:**

    Input:
    [
      ["1","0","1","0","0"],
      ["1","0","1","1","1"],
      ["1","1","1","1","1"],
      ["1","0","0","1","0"]
    ]
    Output: 6

### Solution:

#### ONE

View every row as a base line then we just have to solve `height(matrix)` times the problem of [84. Largest Rectangle in Histogram](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/084.%20Largest%20Rectangle%20in%20Histogram.md).

    /**
     * @param {character[][]} matrix
     * @return {number}
     */
    let maximalRectangle = function(matrix) {
      const height = matrix.length
      if (height <= 0) { return 0 }
      const width = matrix[0].length
      if (width <= 0) { return 0 }

      const heights = []
      let max = 0
      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          heights[col] = ((heights[col] || 0) + 1) * matrix[row][col]
        }
        max = Math.max(max, largestRectangleArea(heights))
      }

      return max
    };

    /**
     * @param {number[]} heights
     * @return {number}
     */
    function largestRectangleArea (heights) {
      const stack = [-1]
      let max = 0
      for (let i2 = 0; i2 <= heights.length; i2++) {
        while ((heights[i2] || 0) < heights[stack[stack.length-1]]) {
          const i = stack.pop()
          const i1 = stack[stack.length-1]
          max = Math.max(max, heights[i] * (i2 - i1 - 1))
        }
        stack.push(i2)
      }
      return max
    };

#### TWO

Same idea as above. Use DP to cache accumulated states.

Pick a pivot point `(row, col)` and assume it is on the base line. The adjoining `1`s above `(row, col)` makes up the height of the rectangle. The width of the rectangle is determined by how many ajoining bars are taller than the pivot bar.

So for the rectangle whose bottom pivot is `(row, col)`:

-   Define `area(row, col)` to be the area.
-   Define `height(row, col)` to be the height.
-   Define `left(row, col)` to be the `col` value of the bottom-left corner.
-   Define `right(row, col)` to be the `col` value of the bottom-right corner.

Also:

-   Define `conLeft(row, col)` to be the `col` value of the leftmost cell of the consecutive `1`s on the left of `(row, col)`.
-   Define `conRight(row, col)` to be the `col` value of the rightmost cell of the consecutive `1`s on the right of `(row, col)`.

With `conLeft` and `conRight` we can know if the rectangle on `(row, col)` shrinks comparing to `(row-1, col)`.

    if matrix[row][col] == 1
      height(row, col) = height(row-1, col) + 1
      
      // see how long this horizontal line can get
      conLeft(row, col) = conLeft(row, col-1)
      conRight(row, col) = conRight(row, col+1)
      
      // width can only be shorter
      left(row, col) = max( left(row-1, col), conLeft(row, col) )
      right(row, col) = min( right(row-1, col), conRight(row, col) )

    if matrix[row][col] == 0
      height(row, col) = 0
      conLeft(row, col) = col + 1
      conRight(row, col) = col - 1
      left(row, col) = 0 // back to leftmost position
      right(row, col) = matrix.width // back to rightmost position

    area(row, col) = (right(row, col) - left(row, col) + 1) * height(row, col)

We only need to keep the last state. Use dynamic arrays to reduce space complexity.

    /**
     * @param {character[][]} matrix
     * @return {number}
     */
    let maximalRectangle = function(matrix) {
      const height = matrix.length
      if (height <= 0) { return 0 }
      const width = matrix[0].length
      if (width <= 0) { return 0 }

      const heights = new Array(width).fill(0)
      const lefts = new Array(width).fill(0)
      const rights = new Array(width).fill(width)

      let max = 0

      for (let row = 0; row < height; row++) {
        let conLeft = 0
        let conRight = width - 1
        for (let col = 0; col < width; col++) {
          if (matrix[row][col] === '1') {
            heights[col] = heights[col] + 1
            lefts[col] = Math.max(lefts[col], conLeft)
          } else {
            heights[col] = 0
            lefts[col] = 0
            conLeft = col + 1
          }
        }

        for (let col = width - 1; col >= 0; col--) {
          if (matrix[row][col] === '1') {
            rights[col] = Math.min(rights[col], conRight)
          } else {
            rights[col] = width
            conRight = col - 1
          }
        }

        for (let col = 0; col < width; col++) {
          max = Math.max(max, (rights[col] - lefts[col] + 1) * heights[col])
        }
      }

      return max
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Linked List": <https://leetcode.com/tag/linked-list> "Two Pointers": <https://leetcode.com/tag/two-pointers>
------------------------------------------------------------------------------------------------------------------------------------------------

[86. Partition List](https://leetcode.com/problems/partition-list/description/)
-------------------------------------------------------------------------------

### Problem:

Given a linked list and a value *x*, partition it such that all nodes less than *x* come before nodes greater than or equal to *x*.

You should preserve the original relative order of the nodes in each of the two partitions.

**Example:**

    Input: head = 1->4->3->2->5->2, x = 3
    Output: 1->2->2->4->3->5

### Solution:

Take the second part out as a new list and connect it back.

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @param {number} x
     * @return {ListNode}
     */
    let partition = function(head, x) {
      const prehead1 = { next: head }
      let p1 = prehead1
      let ptail1 = prehead1

      const prehead2 = { next: null }
      let p2 = prehead2

      while (p1) {
        const next = p1.next
        if (next && next.val >= x) {
          p1.next = next.next
          p2.next = next
          p2 = next
        } else {
          ptail1 = p1
          p1 = p1.next
        }
      }

      p2.next = null
      ptail1.next = prehead2.next

      return prehead1.next
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Array": <https://leetcode.com/tag/array> "Two Pointers": <https://leetcode.com/tag/two-pointers> Similar Questions: "Merge Two Sorted Lists": <https://leetcode.com/problems/merge-two-sorted-lists>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/description/)
---------------------------------------------------------------------------------------

### Problem:

Given two sorted integer arrays *nums1* and *nums2*, merge *nums2* into *nums1* as one sorted array.

**Note:**

-   The number of elements initialized in *nums1* and *nums2* are *m* and *n* respectively.
-   You may assume that *nums1* has enough space (size that is greater or equal to *m* + *n*) to hold additional elements from *nums2*.

**Example:**

    Input:
    nums1 = [1,2,3,0,0,0], m = 3
    nums2 = [2,5,6],       n = 3

    Output: [1,2,2,3,5,6]

### Solution:

Loop backward and keep picking the larger one. `nums1` is guaranteed longer than `nums2` so just use `n` as boundary.

    /**
     * @param {number[]} nums1
     * @param {number} m
     * @param {number[]} nums2
     * @param {number} n
     * @return {void} Do not return anything, modify nums1 in-place instead.
     */
    let merge = function(nums1, m, nums2, n) {
      let len = (m--) + (n--)
      while (n >= 0) {
        nums1[--len] = nums1[m] >= nums2[n] ? nums1[m--] : nums2[n--]
      }
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "1-bit and 2-bit Characters": <https://leetcode.com/problems/1-bit-and-2-bit-characters>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[89. Gray Code](https://leetcode.com/problems/gray-code/description/)
---------------------------------------------------------------------

### Problem:

The gray code is a binary numeral system where two successive values differ in only one bit.

Given a non-negative integer *n* representing the total number of bits in the code, print the sequence of gray code. A gray code sequence must begin with 0.

**Example 1:**

    Input: 2
    Output: [0,1,3,2]
    Explanation:
    00 - 0
    01 - 1
    11 - 3
    10 - 2

    For a given n, a gray code sequence may not be uniquely defined.
    For example, [0,2,3,1] is also a valid gray code sequence.

    00 - 0
    10 - 2
    11 - 3
    01 - 1

**Example 2:**

    Input: 0
    Output: [0]
    Explanation: We define the gray code sequence to begin with 0.
                 A gray code sequence of n has size = 2n, which for n = 0 the size is 20 = 1.
                 Therefore, for n = 0 the gray code sequence is [0].

### Solution:

    0: [  0                                   ]
    1: [  0,   1                              ]
    2: [ 00,  01,  11,  10                    ]
    3: [000, 001, 011, 010, 110, 111, 101, 100]

The pattern is self-evident. Reverse the result set and prepend '1' to each item.

Use bitwise shift to speed up the calculation. It is unlikely to overflow since the result set is exponential.

    /**
     * @param {number} n
     * @return {number[]}
     */
    let grayCode = function(n) {
      const result = [0]
      for (let level = 0; level < n; level++) {
        const prefix = 1 << level
        for (let i = result.length - 1; i >= 0; i--) {
          result.push(result[i] + prefix)
        }
      }
      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "Subsets": <https://leetcode.com/problems/subsets>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[90. Subsets II](https://leetcode.com/problems/subsets-ii/description/)
-----------------------------------------------------------------------

### Problem:

Given a collection of integers that might contain duplicates, **nums**, return all possible subsets (the power set).

**Note:** The solution set must not contain duplicate subsets.

**Example:**

    Input: [1,2,2]
    Output:
    [
      [2],
      [1],
      [1,2,2],
      [2,2],
      [1,2],
      []
    ]

### Solution:

See [78. Subsets](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/078.%20Subsets.md). Except:

1.  Sort input to group duplicates.
2.  Only consider each duplicate once, that is, when it is at the first slot.

<!-- -->

    /**
     * @param {number[]} nums
     * @return {number[][]}
     */
    let subsetsWithDup = function(nums) {
      const result = []
      _subsetsWithDup(nums.sort(), 0, [], result)
      return result
    };

    function _subsetsWithDup(nums, start, path, result) {
      result.push(path.slice())
      for (let i = start; i < nums.length; i++) {
        if(i > start && nums[i] === nums[i-1]) {
          continue
        }
        path.push(nums[i])
        _subsetsWithDup(nums, i + 1, path, result)
        path.pop()
      }
    }

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "String": <https://leetcode.com/tag/string> "Dynamic Programming": <https://leetcode.com/tag/dynamic-programming> Similar Questions: "Decode Ways II": <https://leetcode.com/problems/decode-ways-ii>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[91. Decode Ways](https://leetcode.com/problems/decode-ways/description/)
-------------------------------------------------------------------------

### Problem:

A message containing letters from `A-Z` is being encoded to numbers using the following mapping:

    'A' -> 1
    'B' -> 2
    ...
    'Z' -> 26

Given a **non-empty** string containing only digits, determine the total number of ways to decode it.

**Example 1:**

    Input: "12"
    Output: 2
    Explanation: It could be decoded as "AB" (1 2) or "L" (12).

**Example 2:**

    Input: "226"
    Output: 3
    Explanation: It could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

### Solution:

Define `f(i)` to be the number of ways to decode `s[0...i]`.

Note that there could be `'0'`.

    f(0) = 1, if s[i] !== '0'
    f(i) = 0, if s.length <= 0 || s[i] === '0'
    f(i) = f(i-1), if i > 0 && s[i] !== '0'
           +
           f(i-2), if i > 0 && s[i-1] !== '0' && s[i-1] * 10 + s[i] <= 26

Only need to store the last two states. Init `f(-1) = 1` for easy calculation.

    /**
     * @param {string} s
     * @return {number}
     */
    let numDecodings = function(s) {
      let dp = s[0] > 0 ? 1 : 0
      let dp_1 = dp
      let dp_2 = 1
      
      for (let i = 1; i < s.length; i++) {
        dp = 0
        if (s[i] !== '0') {
          dp += dp_1
        }
        if (s[i-1] !== '0' && s[i-1] + s[i] <= 26) {
          dp += dp_2
        }
        dp_2 = dp_1
        dp_1 = dp
      }
      
      return dp
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Linked List": <https://leetcode.com/tag/linked-list> Similar Questions: "Reverse Linked List": <https://leetcode.com/problems/reverse-linked-list>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[92. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/description/)
-----------------------------------------------------------------------------------------------

### Problem:

Reverse a linked list from position *m* to *n*. Do it in one-pass.

\*\*Note:\*\*1 ≤ *m* ≤ *n* ≤ length of list.

**Example:**

    Input: 1->2->3->4->5->NULL, m = 2, n = 4
    Output: 1->4->3->2->5->NULL

### Solution:

Break the list into 3 parts.

    /**
     * Definition for singly-linked list.
     * function ListNode(val) {
     *     this.val = val;
     *     this.next = null;
     * }
     */
    /**
     * @param {ListNode} head
     * @param {number} m
     * @param {number} n
     * @return {ListNode}
     */
    let reverseBetween = function(head, m, n) {
      if (m === n) { return head }

      const prehead = { next: head }
      n = n - m

      let l1tail = prehead
      while (--m > 0) {
        l1tail = l1tail.next
      }

      let l2prehead = l1tail
      let l2head = l2prehead.next
      let l2tail = l2head
      while (n-- > 0) {
        const next = l2head.next
        l2head.next = l2prehead
        l2prehead = l2head
        l2head = next
      }

      l2tail.next = l2head.next // l3head
      l2head.next = l2prehead
      l1tail.next = l2head

      return prehead.next
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "String": <https://leetcode.com/tag/string> "Backtracking": <https://leetcode.com/tag/backtracking> Similar Questions: "IP to CIDR": <https://leetcode.com/problems/ip-to-cidr>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[93. Restore IP Addresses](https://leetcode.com/problems/restore-ip-addresses/description/)
-------------------------------------------------------------------------------------------

### Problem:

Given a string containing only digits, restore it by returning all possible valid IP address combinations.

**Example:**

    Input: "25525511135"
    Output: ["255.255.11.135", "255.255.111.35"]

### Solution:

Backtracking. Note that leading `'0'` is not allowed except just `'0'`.

    /**
     * @param {string} s
     * @return {string[]}
     */
    let restoreIpAddresses = function(s, i = 0, path = [], result = []) {
      if (i === s.length) {
        if (path.length === 4) {
          result.push(path.join('.'))
        }
        return result
      }

      const digit = s.charCodeAt(i) - 48

      if (i === 0) {
        path[0] = digit
        restoreIpAddresses(s, i + 1, path, result)
        path[0] = 0
        return result
      }

      const sum = path[path.length - 1] * 10 + digit

      if (digit < sum && sum <= 255) {
        path[path.length - 1] = sum
        restoreIpAddresses(s, i + 1, path, result)
        path[path.length - 1] = (sum - digit) / 10
      }

      if (path.length < 4) {
        path.push(digit)
        restoreIpAddresses(s, i + 1, path, result)
        path.pop()
      }

      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "String": <https://leetcode.com/tag/string> "Dynamic Programming": <https://leetcode.com/tag/dynamic-programming>
--------------------------------------------------------------------------------------------------------------------------------------------------

[97. Interleaving String](https://leetcode.com/problems/interleaving-string/description/)
-----------------------------------------------------------------------------------------

### Problem:

Given *s1*, *s2*, *s3*, find whether *s3* is formed by the interleaving of *s1* and *s2*.

**Example 1:**

    Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbcbcac"
    Output: true

**Example 2:**

    Input: s1 = "aabcc", s2 = "dbbca", s3 = "aadbbbaccc"
    Output: false

### Solution:

Define `f(i, j)` to be whether `s3[0...i+j-1)` can be formed by the interleaving of `s1[0...i)` and `s2[0...j)`.

    f(i, j) = true, i <= 0 || j <= 0 // meaningless, skipped
    f(i, j) = f(i-1, j) && s1[i-1] == s3[i+j-1] || f(i, j-1) && s2[j-1] == s3[i+j-1], 0 < i <= len(s1), 0 < j <= len(s2)

Dynamic array can be used.

    /**
     * @param {string} s1
     * @param {string} s2
     * @param {string} s3
     * @return {boolean}
     */
    let isInterleave = function(s1, s2, s3) {
      const len1 = s1.length
      const len2 = s2.length
      const len3 = s3.length
      if (len1 + len2 !== len3) { return false }
      if (len1 <= 0) { return s2 === s3 }
      if (len2 <= 0) { return s1 === s3 }

      const dp = []
      for (let i = 0; i <= len1; i++) {
        for (let j = 0; j <= len2; j++) {
          dp[j] = (i <= 0 || dp[j]) && s1[i-1] === s3[i+j-1] ||
                  (j <= 0 || dp[j-1]) && s2[j-1] === s3[i+j-1]
        }
      }
      return dp[len2]
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Tree": <https://leetcode.com/tag/tree> "Depth-first Search": <https://leetcode.com/tag/depth-first-search>
--------------------------------------------------------------------------------------------------------------------------------------------

[100. Same Tree](https://leetcode.com/problems/same-tree/description/)
----------------------------------------------------------------------

### Problem:

Given two binary trees, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical and the nodes have the same value.

**Example 1:**

    Input:     1         1
              / \       / \
             2   3     2   3

            [1,2,3],   [1,2,3]

    Output: true

**Example 2:**

    Input:     1         1
              /           \
             2             2

            [1,2],     [1,null,2]

    Output: false

**Example 3:**

    Input:     1         1
              / \       / \
             2   1     1   2

            [1,2,1],   [1,1,2]

    Output: false

### Solution:

The code should be self-evident.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {boolean}
     */
    let isSameTree = function(p, q) {
      return p === null && q === null ||
        p !== null && q !== null && p.val === q.val && isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Tree": <https://leetcode.com/tag/tree> "Depth-first Search": <https://leetcode.com/tag/depth-first-search> "Breadth-first Search": <https://leetcode.com/tag/breadth-first-search>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/description/)
--------------------------------------------------------------------------------

### Problem:

Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree `[1,2,2,3,4,4,3]` is symmetric:

    1
       / \
      2   2
     / \ / \
    3  4 4  3

But the following `[1,2,2,null,3,null,3]` is not:

    1
       / \
      2   2
       \   \
       3    3

Note:  
Bonus points if you could solve it both recursively and iteratively.

### Solution:

#### ONE

The result of pre-order and post-order traversal on a symmetric tree should be the same.

So just like [100. Same Tree](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/100.%20Same%20Tree.md). Except one is pre-order traversal and the other is post-order.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {boolean}
     */
    let isSymmetric = function(root) {
      return root === null || isSymmetricTree(root.left, root.right)
    };

    /**
     * @param {TreeNode} p
     * @param {TreeNode} q
     * @return {boolean}
     */
    function isSymmetricTree (p, q) {
      return p === null && q === null ||
        p !== null && q !== null && p.val === q.val && isSymmetricTree(p.left, q.right) && isSymmetricTree(p.right, q.left)
    };

#### TWO

Level order traversal. Check symmetry before entering the next level.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {boolean}
     */
    let isSymmetric = function(root) {
      if (root === null) { return true }

      const queue = [NaN, root]

      while (queue.length > 1) {
        const node = queue.shift()
        if (node !== node) {
          for (let i = 0, j = queue.length-1; i <= j; i++, j--) {
            if (queue[i] === null && queue[j] !== null ||
                queue[i] !== null && queue[j] === null ||
                queue[i] !== null && queue[j] !== null && queue[i].val !== queue[j].val
               ) {
              return false
            }
          }
          queue.push(NaN)
        } else {
          if (node !== null) {
            queue.push(node.left)
            queue.push(node.right)
          }
        }
      }

      return true
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Tree": <https://leetcode.com/tag/tree> "Breadth-first Search": <https://leetcode.com/tag/breadth-first-search> Similar Questions: "Binary Tree Zigzag Level Order Traversal": <https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal> "Binary Tree Level Order Traversal II": <https://leetcode.com/problems/binary-tree-level-order-traversal-ii> "Minimum Depth of Binary Tree": <https://leetcode.com/problems/minimum-depth-of-binary-tree> "Binary Tree Vertical Order Traversal": <https://leetcode.com/problems/binary-tree-vertical-order-traversal> "Average of Levels in Binary Tree": <https://leetcode.com/problems/average-of-levels-in-binary-tree> "N-ary Tree Level Order Traversal": <https://leetcode.com/problems/n-ary-tree-level-order-traversal>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[102. Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/description/)
----------------------------------------------------------------------------------------------------------------------

### Problem:

Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

For example:  
Given binary tree `[3,9,20,null,null,15,7]`,

    3
       / \
      9  20
        /  \
       15   7

return its level order traversal as:

    [
      [3],
      [9,20],
      [15,7]
    ]

### Solution:

The code should be self-evident.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {number[][]}
     */
    let levelOrder = function(root) {
      if (!root) { return [] }

      const result = []
      const queue = [NaN, root]
      while (queue.length > 1) {
        const node = queue.shift()
        if (node !== node) {
          result.push(queue.map(n => n.val))
          queue.push(NaN)
        } else {
          if (node.left) { queue.push(node.left) }
          if (node.right) { queue.push(node.right) }
        }
      }

      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Stack": <https://leetcode.com/tag/stack> "Tree": <https://leetcode.com/tag/tree> "Breadth-first Search": <https://leetcode.com/tag/breadth-first-search> Similar Questions: "Binary Tree Level Order Traversal": <https://leetcode.com/problems/binary-tree-level-order-traversal>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[103. Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/description/)
------------------------------------------------------------------------------------------------------------------------------------

### Problem:

Given a binary tree, return the zigzag level order traversal of its nodes' values. (ie, from left to right, then right to left for the next level and alternate between).

For example:  
Given binary tree `[3,9,20,null,null,15,7]`,

    3
       / \
      9  20
        /  \
       15   7

return its zigzag level order traversal as:

    [
      [3],
      [20,9],
      [15,7]
    ]

### Solution:

Reverse the level when pushing to the reuslt.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {number[][]}
     */
    let zigzagLevelOrder = function(root) {
      if (!root) { return [] }

      const result = []
      const queue = [NaN, root]
      let zipzag = false
      while (queue.length > 1) {
        const node = queue.shift()
        if (node !== node) {
          if (zipzag = !zipzag) {
            result.push(queue.map(n => n.val))
          } else {
            result.push(queue.map(n => n.val).reverse())
          }
          queue.push(NaN)
        } else {
          if (node.left) { queue.push(node.left) }
          if (node.right) { queue.push(node.right) }
        }
      }

      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Tree": <https://leetcode.com/tag/tree> "Depth-first Search": <https://leetcode.com/tag/depth-first-search> Similar Questions: "Balanced Binary Tree": <https://leetcode.com/problems/balanced-binary-tree> "Minimum Depth of Binary Tree": <https://leetcode.com/problems/minimum-depth-of-binary-tree> "Maximum Depth of N-ary Tree": <https://leetcode.com/problems/maximum-depth-of-n-ary-tree>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/description/)
------------------------------------------------------------------------------------------------------------

### Problem:

Given a binary tree, find its maximum depth.

The maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

**Note:** A leaf is a node with no children.

**Example:**

Given binary tree `[3,9,20,null,null,15,7]`,

        3
       / \
      9  20
        /  \
       15   7

return its depth = 3.

### Solution:

The code should be self-evident.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    let maxDepth = function(root) {
      return root === null
        ? 0
        : Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Tree": <https://leetcode.com/tag/tree> "Depth-first Search": <https://leetcode.com/tag/depth-first-search> Similar Questions: "Construct Binary Tree from Inorder and Postorder Traversal": <https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/description/)
----------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Problem:

Given preorder and inorder traversal of a tree, construct the binary tree.

**Note:**  
You may assume that duplicates do not exist in the tree.

For example, given

    preorder = [3,9,20,15,7]
    inorder = [9,3,15,20,7]

Return the following binary tree:

        3
       / \
      9  20
        /  \
       15   7

### Solution:

Pattern of preorder traversal result: `pre(root) = root + pre(root.left) + pre(root.right)`

Pattern of inorder traversal result: `in(root) = in(root.left) + root + in(root.right)`

There are no duplicates so get the first item in preorder result, pinpoint it in inorder result. Then we know the size of left and right subtree.

Repeat the process on subtrees.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {number[]} preorder
     * @param {number[]} inorder
     * @return {TreeNode}
     */
    let buildTree = function(preorder, inorder) {
      return _buildTree(preorder, inorder, 0, preorder.length, 0, inorder.length)
    };

    function _buildTree (preorder, inorder, pStart, pEnd, iStart, iEnd) {
      if (pStart >= pEnd || iStart >= iEnd) {
        return null
      }
      const val = preorder[pStart]
      const node = new TreeNode(val)
      for (let i = iStart; i < iEnd; i++) {
        if (val === inorder[i]) {
          node.left = _buildTree(preorder, inorder, pStart + 1, i - iStart + (pStart + 1), iStart, i)
          node.right = _buildTree(preorder, inorder, (i + 1) - iEnd + pEnd, pEnd, i + 1, iEnd)
          break
        }
      }
      return node
    }

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Tree": <https://leetcode.com/tag/tree> "Depth-first Search": <https://leetcode.com/tag/depth-first-search> Similar Questions: "Construct Binary Tree from Preorder and Inorder Traversal": <https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[106. Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/description/)
------------------------------------------------------------------------------------------------------------------------------------------------------------------------

### Problem:

Given inorder and postorder traversal of a tree, construct the binary tree.

**Note:**  
You may assume that duplicates do not exist in the tree.

For example, given

    inorder = [9,3,15,20,7]
    postorder = [9,15,7,20,3]

Return the following binary tree:

        3
       / \
      9  20
        /  \
       15   7

### Solution:

Pattern of inorder traversal result: `in(root) = in(root.left) + root + in(root.right)`

Pattern of postorder traversal result: `post(root) = post(root.left) + post(root.right) + root`

There are no duplicates so get the first item in preorder result, pinpoint it in inorder result. Then we know the size of left and right subtree.

Repeat the process on subtrees.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {number[]} inorder
     * @param {number[]} postorder
     * @return {TreeNode}
     */
    let buildTree = function(inorder, postorder) {
      return _buildTree(postorder, inorder, 0, postorder.length, 0, inorder.length)
    };

    function _buildTree (postorder, inorder, pStart, pEnd, iStart, iEnd) {
      if (pStart >= pEnd || iStart >= iEnd) {
        return null
      }
      const val = postorder[pEnd - 1]
      const node = new TreeNode(val)
      for (let i = iStart; i < iEnd; i++) {
        if (val === inorder[i]) {
          node.left = _buildTree(postorder, inorder, pStart, i - iStart + pStart, iStart, i)
          node.right = _buildTree(postorder, inorder, (i + 1) - iEnd + (pEnd - 1), pEnd - 1, i + 1, iEnd)
          break
        }
      }
      return node
    }

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Tree": <https://leetcode.com/tag/tree> "Breadth-first Search": <https://leetcode.com/tag/breadth-first-search> Similar Questions: "Binary Tree Level Order Traversal": <https://leetcode.com/problems/binary-tree-level-order-traversal> "Average of Levels in Binary Tree": <https://leetcode.com/problems/average-of-levels-in-binary-tree>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[107. Binary Tree Level Order Traversal II](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/description/)
----------------------------------------------------------------------------------------------------------------------------

### Problem:

Given a binary tree, return the bottom-up level order traversal of its nodes' values. (ie, from left to right, level by level from leaf to root).

For example:  
Given binary tree `[3,9,20,null,null,15,7]`,

        3
       / \
      9  20
        /  \
       15   7

return its bottom-up level order traversal as:

    [
      [15,7],
      [9,20],
      [3]
    ]

### Solution:

See [102. Binary Tree Level Order Traversal](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/102.%20Binary%20Tree%20Level%20Order%20Traversal.md).

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {number[][]}
     */
    let levelOrderBottom = function(root) {
      if (!root) { return [] }

      const result = []
      const queue = [NaN, root]
      while (queue.length > 1) {
        const node = queue.shift()
        if (node !== node) {
          result.unshift(queue.map(n => n.val))
          queue.push(NaN)
        } else {
          if (node.left) { queue.push(node.left) }
          if (node.right) { queue.push(node.right) }
        }
      }

      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Tree": <https://leetcode.com/tag/tree> "Depth-first Search": <https://leetcode.com/tag/depth-first-search> Similar Questions: "Maximum Depth of Binary Tree": <https://leetcode.com/problems/maximum-depth-of-binary-tree>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[110. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/description/)
--------------------------------------------------------------------------------------------

### Problem:

Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as:

a binary tree in which the depth of the two subtrees of *every* node never differ by more than 1.

**Example 1:**

Given the following tree `[3,9,20,null,null,15,7]`:

        3
       / \
      9  20
        /  \
       15   7

Return true.

**Example 2:**

Given the following tree `[1,2,2,3,3,null,null,4,4]`:

           1
          / \
         2   2
        / \
       3   3
      / \
     4   4

Return false.

### Solution:

Get the depth of subtrees and compare. Prune the DFS tree by returning `-1`.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {boolean}
     */
    let isBalanced = function(root) {
      return getDepth(root) >= 0
    };

    function getDepth (root) {
      if (!root) { return 0 }
      const leftDepth = getDepth(root.left)
      if (leftDepth < 0) { return -1 }
      const rightDepth = getDepth(root.right)
      if (rightDepth < 0) { return -1 }
      return Math.abs(leftDepth - rightDepth) <= 1 ? Math.max(leftDepth, rightDepth) + 1 : -1
    }

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Tree": <https://leetcode.com/tag/tree> "Depth-first Search": <https://leetcode.com/tag/depth-first-search> "Breadth-first Search": <https://leetcode.com/tag/breadth-first-search> Similar Questions: "Binary Tree Level Order Traversal": <https://leetcode.com/problems/binary-tree-level-order-traversal> "Maximum Depth of Binary Tree": <https://leetcode.com/problems/maximum-depth-of-binary-tree>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[111. Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/description/)
------------------------------------------------------------------------------------------------------------

### Problem:

Given a binary tree, find its minimum depth.

The minimum depth is the number of nodes along the shortest path from the root node down to the nearest leaf node.

**Note:** A leaf is a node with no children.

**Example:**

Given binary tree `[3,9,20,null,null,15,7]`,

        3
       / \
      9  20
        /  \
       15   7

return its minimum depth = 2.

### Solution:

Ignore `null` children.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    let minDepth = function(root) {
      if (!root) { return 0 }
      if (root.left !== null && root.right !== null) {
        return Math.min(minDepth(root.left), minDepth(root.right)) + 1
      } else if (root.left !== null) {
        return minDepth(root.left) + 1
      } else {
        return minDepth(root.right) + 1
      }
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Tree": <https://leetcode.com/tag/tree> "Depth-first Search": <https://leetcode.com/tag/depth-first-search> Similar Questions: "Path Sum II": <https://leetcode.com/problems/path-sum-ii> "Binary Tree Maximum Path Sum": <https://leetcode.com/problems/binary-tree-maximum-path-sum> "Sum Root to Leaf Numbers": <https://leetcode.com/problems/sum-root-to-leaf-numbers> "Path Sum III": <https://leetcode.com/problems/path-sum-iii> "Path Sum IV": <https://leetcode.com/problems/path-sum-iv>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[112. Path Sum](https://leetcode.com/problems/path-sum/description/)
--------------------------------------------------------------------

### Problem:

Given a binary tree and a sum, determine if the tree has a root-to-leaf path such that adding up all the values along the path equals the given sum.

**Note:** A leaf is a node with no children.

**Example:**

Given the below binary tree and `sum = 22`,

          5
         / \
        4   8
       /   / \
      11  13  4
     /  \      \
    7    2      1

return true, as there exist a root-to-leaf path `5->4->11->2` which sum is 22.

### Solution:

Note that node value could be negative so pruning can not be performed.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @param {number} sum
     * @return {boolean}
     */
    let hasPathSum = function(root, sum) {
      if (!root) { return false }
      if (root.left === null && root.right === null) { return root.val === sum }
      return hasPathSum(root.left, sum - root.val) || hasPathSum(root.right, sum - root.val)
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Tree": <https://leetcode.com/tag/tree> "Depth-first Search": <https://leetcode.com/tag/depth-first-search> Similar Questions: "Path Sum": <https://leetcode.com/problems/path-sum> "Binary Tree Paths": <https://leetcode.com/problems/binary-tree-paths> "Path Sum III": <https://leetcode.com/problems/path-sum-iii> "Path Sum IV": <https://leetcode.com/problems/path-sum-iv>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[113. Path Sum II](https://leetcode.com/problems/path-sum-ii/description/)
--------------------------------------------------------------------------

### Problem:

Given a binary tree and a sum, find all root-to-leaf paths where each path's sum equals the given sum.

**Note:** A leaf is a node with no children.

**Example:**

Given the below binary tree and `sum = 22`,

          5
         / \
        4   8
       /   / \
      11  13  4
     /  \    / \
    7    2  5   1

Return:

    [
       [5,4,11,2],
       [5,8,4,5]
    ]

### Solution:

Simple backtracking.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @param {number} sum
     * @return {number[][]}
     */
    let pathSum = function(root, sum, path = [], result = []) {
      if (!root) { return result }

      if (root.left === null && root.right === null) {
        if (root.val === sum) {
          result.push([...path, root.val])
        }
        return result
      }

      path.push(root.val)
      pathSum(root.left, sum - root.val, path, result)
      pathSum(root.right, sum - root.val, path, result)
      path.pop()

      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Tree": <https://leetcode.com/tag/tree> "Depth-first Search": <https://leetcode.com/tag/depth-first-search> Similar Questions: "Flatten a Multilevel Doubly Linked List": <https://leetcode.com/problems/flatten-a-multilevel-doubly-linked-list>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[114. Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/description/)
------------------------------------------------------------------------------------------------------------------------

### Problem:

Given a binary tree, flatten it to a linked list in-place.

For example, given the following tree:

        1
       / \
      2   5
     / \   \
    3   4   6

The flattened tree should look like:

    1
     \
      2
       \
        3
         \
          4
           \
            5
             \
              6

### Solution:

Return the leaf node of a flattened subtree for concatenation.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {void} Do not return anything, modify root in-place instead.
     */
    let flatten = function(root) {
      _flatten(root)
    };

    /**
     * @param {TreeNode} root
     * @return {TreeNode} leaf node of a flattened subtree
     */
    function _flatten (root) {
      if (!root) { return null }
      const leftLeaf = _flatten(root.left)
      const rightLeaf = _flatten(root.right)
      if (leftLeaf !== null) {
        leftLeaf.right = root.right
        root.right = root.left
      } else if (rightLeaf === null) {
        return root
      }
      
      root.left = null
      return rightLeaf || leftLeaf
    }

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "String": <https://leetcode.com/tag/string> "Dynamic Programming": <https://leetcode.com/tag/dynamic-programming>
--------------------------------------------------------------------------------------------------------------------------------------------------

[115. Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/description/)
----------------------------------------------------------------------------------------------

### Problem:

Given a string **S** and a string **T**, count the number of distinct subsequences of **S** which equals **T**.

A subsequence of a string is a new string which is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (ie, `"ACE"` is a subsequence of `"ABCDE"` while `"AEC"` is not).

**Example 1:**

    Input: S = "rabbbit", T = "rabbit"
    Output: 3
    Explanation:

    As shown below, there are 3 ways you can generate "rabbit" from S.
    (The caret symbol ^ means the chosen letters)

    rabbbit
    ^^^^ ^^
    rabbbit
    ^^ ^^^^
    rabbbit
    ^^^ ^^^

**Example 2:**

    Input: S = "babgbag", T = "bag"
    Output: 5
    Explanation:

    As shown below, there are 5 ways you can generate "bag" from S.
    (The caret symbol ^ means the chosen letters)

    babgbag
    ^^ ^
    babgbag
    ^^    ^
    babgbag
    ^    ^^
    babgbag
      ^  ^^
    babgbag
        ^^^

### Solution:

Define `f(i, j)` to be the number of ways that generate `T[0...j)` from `S[0...i)`.

For `f(i, j)` you can always skip `S[i-1]`, but can only take it when `S[i-1] === T[j-1]`.

    f(0, j) = 0, j > 0 // nothing to delete
    f(i, 0) = 1 // delete all
    f(i, j) = f(i-1, j) + (S[i-1] === T[j-1] ? f(i-1, j-1) : 0)

Dynamic array can be used.

    /**
     * @param {string} s
     * @param {string} t
     * @return {number}
     */
    let numDistinct = function(s, t) {
      const lens = s.length
      const lent = t.length
      const dp = new Array(lent + 1).fill(0)
      dp[0] = 1
      for (let i = 1; i <= lens; i++) {
        for (let j = lent; j >= 1; j--) {
          if (s[i-1] === t[j-1]) {
            dp[j] += dp[j-1]
          }
        }
      }
      return dp[lent]
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Tree": <https://leetcode.com/tag/tree> "Depth-first Search": <https://leetcode.com/tag/depth-first-search> Similar Questions: "Populating Next Right Pointers in Each Node II": <https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii> "Binary Tree Right Side View": <https://leetcode.com/problems/binary-tree-right-side-view>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[116. Populating Next Right Pointers in Each Node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/description/)
------------------------------------------------------------------------------------------------------------------------------------------

### Problem:

Given a binary tree

    struct TreeLinkNode {
      TreeLinkNode *left;
      TreeLinkNode *right;
      TreeLinkNode *next;
    }

Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to `NULL`.

Initially, all next pointers are set to `NULL`.

**Note:**

-   You may only use constant extra space.
-   Recursive approach is fine, implicit stack space does not count as extra space for this problem.
-   You may assume that it is a perfect binary tree (ie, all leaves are at the same level, and every parent has two children).

**Example:**

Given the following perfect binary tree,

         1
       /  \
      2    3
     / \  / \
    4  5  6  7

After calling your function, the tree should look like:

         1 -> NULL
       /  \
      2 -> 3 -> NULL
     / \  / \
    4->5->6->7 -> NULL

### Solution:

#### ONE

Recursive.

For every `node`:

-   Left child: points to `node.right`.
-   Right child: points to `node.next.left` if `node.next` exists.

<!-- -->

    /**
     * Definition for binary tree with next pointer.
     * function TreeLinkNode(val) {
     *     this.val = val;
     *     this.left = this.right = this.next = null;
     * }
     */

    /**
     * @param {TreeLinkNode} root
     * @return {void} Do not return anything, modify tree in-place instead.
     */
    let connect = function(root) {
      if (!root) { return }
      if (root.left !== null) {
        root.left.next = root.right
        connect(root.left)
      }
      if (root.right !== null) {
        if (root.next !== null) {
          root.right.next = root.next.left
        }
        connect(root.right)
      }
    };

#### TWO

Level order traversal.

    /**
     * Definition for binary tree with next pointer.
     * function TreeLinkNode(val) {
     *     this.val = val;
     *     this.left = this.right = this.next = null;
     * }
     */

    /**
     * @param {TreeLinkNode} root
     * @return {void} Do not return anything, modify tree in-place instead.
     */
    let connect = function(root) {
      if (!root) { return }

      const queue = [NaN, root]
      while (queue.length > 1) {
        const node = queue.shift()
        if (node !== node) {
          for (let i = 0; i < queue.length; i++) {
            queue[i].next = queue[i+1] || null
          }
          queue.push(NaN)
        } else {
          if (node.left !== null) { queue.push(node.left) }
          if (node.right !== null) { queue.push(node.right) }
        }
      }
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Tree": <https://leetcode.com/tag/tree> "Depth-first Search": <https://leetcode.com/tag/depth-first-search> Similar Questions: "Populating Next Right Pointers in Each Node": <https://leetcode.com/problems/populating-next-right-pointers-in-each-node>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[117. Populating Next Right Pointers in Each Node II](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/description/)
------------------------------------------------------------------------------------------------------------------------------------------------

### Problem:

Given a binary tree

    struct TreeLinkNode {
      TreeLinkNode *left;
      TreeLinkNode *right;
      TreeLinkNode *next;
    }

Populate each next pointer to point to its next right node. If there is no next right node, the next pointer should be set to `NULL`.

Initially, all next pointers are set to `NULL`.

**Note:**

-   You may only use constant extra space.
-   Recursive approach is fine, implicit stack space does not count as extra space for this problem.

**Example:**

Given the following binary tree,

         1
       /  \
      2    3
     / \    \
    4   5    7

After calling your function, the tree should look like:

         1 -> NULL
       /  \
      2 -> 3 -> NULL
     / \    \
    4-> 5 -> 7 -> NULL

### Solution:

#### ONE

Recursive. See [116. Populating Next Right Pointers in Each Node](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/116.%20Populating%20Next%20Right%20Pointers%20in%20Each%20Node.md).

The tree may not be perfect now. So keep finding `next` until there is a node with children, or `null`.

This also means post-order traversal is required.

    /**
     * Definition for binary tree with next pointer.
     * function TreeLinkNode(val) {
     *     this.val = val;
     *     this.left = this.right = this.next = null;
     * }
     */

    /**
     * @param {TreeLinkNode} root
     * @return {void} Do not return anything, modify tree in-place instead.
     */
    let connect = function(root) {
      if (!root) { return }
      let next = null
      for (let node = root.next; node !== null; node = node.next) {
        if (node.left !== null) {
          next = node.left
          break
        }
        if (node.right !== null) {
          next = node.right
          break
        }
      }
      if (root.right !== null) {
        root.right.next = next
      }
      if (root.left !== null) {
        root.left.next = root.right || next
      }
      connect(root.right)
      connect(root.left)
    };

#### TWO

Level order traversal. Exact same as [116. Populating Next Right Pointers in Each Node](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/116.%20Populating%20Next%20Right%20Pointers%20in%20Each%20Node.md).

    /**
     * Definition for binary tree with next pointer.
     * function TreeLinkNode(val) {
     *     this.val = val;
     *     this.left = this.right = this.next = null;
     * }
     */

    /**
     * @param {TreeLinkNode} root
     * @return {void} Do not return anything, modify tree in-place instead.
     */
    let connect = function(root) {
      if (!root) { return }

      const queue = [NaN, root]
      while (queue.length > 1) {
        const node = queue.shift()
        if (node !== node) {
          for (let i = 0; i < queue.length; i++) {
            queue[i].next = queue[i+1] || null
          }
          queue.push(NaN)
        } else {
          if (node.left !== null) { queue.push(node.left) }
          if (node.right !== null) { queue.push(node.right) }
        }
      }
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Array": <https://leetcode.com/tag/array> Similar Questions: "Pascal's Triangle II": <https://leetcode.com/problems/pascals-triangle-ii>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[118. Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/description/)
-------------------------------------------------------------------------------------

### Problem:

Given a non-negative integer *numRows*, generate the first *numRows* of Pascal's triangle.

![PascalTriangleAnimated2.gif](./completeLEETCODE_files/PascalTriangleAnimated2.gif)

In Pascal's triangle, each number is the sum of the two numbers directly above it.

**Example:**

    Input: 5
    Output:
    [
         [1],
        [1,1],
       [1,2,1],
      [1,3,3,1],
     [1,4,6,4,1]
    ]

### Solution:

Dynamic Programming 101.

    /**
     * @param {number} numRows
     * @return {number[][]}
     */
    let generate = function(numRows) {
      if (numRows <= 0) { return [] }

      const result = [[1]]
      for (let i = 1; i < numRows; i++) {
        const lastRow = result[i-1]
        const row = [1]
        for (let j = 1; j < i; j++) {
          row[j] = lastRow[j] + lastRow[j-1]
        }
        row.push(1)
        result.push(row)
      }
      
      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Array": <https://leetcode.com/tag/array> Similar Questions: "Pascal's Triangle": <https://leetcode.com/problems/pascals-triangle>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------

[119. Pascal's Triangle II](https://leetcode.com/problems/pascals-triangle-ii/description/)
-------------------------------------------------------------------------------------------

### Problem:

Given a non-negative index *k* where *k* ≤ 33, return the *k*th index row of the Pascal's triangle.

Note that the row index starts from 0.

![PascalTriangleAnimated2.gif](./completeLEETCODE_files/PascalTriangleAnimated2.gif)

In Pascal's triangle, each number is the sum of the two numbers directly above it.

**Example:**

    Input: 3
    Output: [1,3,3,1]

**Follow up:**

Could you optimize your algorithm to use only *O*(*k*) extra space?

### Solution:

Dynamic Programming 101 with dynamic array.

State `(i, j)` depends on `(i-1, j)` and `(i-1, j-1)`. So to access `(i-1, j-1)` iteration must be from right to left.

    /**
     * @param {number} rowIndex
     * @return {number[]}
     */
    let getRow = function(rowIndex) {
      if (rowIndex < 0) { return [] }

      const row = [1]
      for (let i = 1; i <= rowIndex; i++) {
        for (let j = i - 1; j > 0; j--) {
          row[j] += row[j-1]
        }
        row.push(1)
      }
      
      return row
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Array": <https://leetcode.com/tag/array> "Dynamic Programming": <https://leetcode.com/tag/dynamic-programming>
--------------------------------------------------------------------------------------------------------------------------------------------------

[120. Triangle](https://leetcode.com/problems/triangle/description/)
--------------------------------------------------------------------

### Problem:

Given a triangle, find the minimum path sum from top to bottom. Each step you may move to adjacent numbers on the row below.

For example, given the following triangle

    [
         [2],
        [3,4],
       [6,5,7],
      [4,1,8,3]
    ]

The minimum path sum from top to bottom is `11` (i.e., **2** + **3** + **5** + **1** = 11).

**Note:**

Bonus point if you are able to do this using only *O*(*n*) extra space, where *n* is the total number of rows in the triangle.

### Solution:

Define `f(i, j)` to be the minimum path sum from `triangle[0][0]` to `triangle[i][j]`.

    f(i, 0) = f(i-1, j) + triangle[i][0]
    f(i, j) = min( f(i-1, j-1), f(i-1, j) ) + triangle[i][j], 0 < j < i
    f(i, i) = f(i-1, i-1) + triangle[i][i], i > 0

Dynamic array can be used.

    /**
     * @param {number[][]} triangle
     * @return {number}
     */
    let minimumTotal = function(triangle) {
      if (triangle.length <= 0) { return 0 }

      const dp = [triangle[0][0]]
      for (let i = 1; i < triangle.length; i++) {
        dp[i] = dp[i-1] + triangle[i][i]
        for (let j = i - 1; j >= 1; j--) {
          dp[j] = Math.min(dp[j], dp[j-1]) + triangle[i][j]
        }
        dp[0] += triangle[i][0]
      }
      return Math.min(...dp)
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Array": <https://leetcode.com/tag/array> "Dynamic Programming": <https://leetcode.com/tag/dynamic-programming> Similar Questions: "Maximum Subarray": <https://leetcode.com/problems/maximum-subarray> "Best Time to Buy and Sell Stock II": <https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii> "Best Time to Buy and Sell Stock III": <https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii> "Best Time to Buy and Sell Stock IV": <https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv> "Best Time to Buy and Sell Stock with Cooldown": <https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/description/)
------------------------------------------------------------------------------------------------------------------

### Problem:

Say you have an array for which the *i*th element is the price of a given stock on day *i*.

If you were only permitted to complete at most one transaction (i.e., buy one and sell one share of the stock), design an algorithm to find the maximum profit.

Note that you cannot sell a stock before you buy one.

**Example 1:**

    Input: [7,1,5,3,6,4]
    Output: 5
    Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
                 Not 7-1 = 6, as selling price needs to be larger than buying price.

**Example 2:**

    Input: [7,6,4,3,1]
    Output: 0
    Explanation: In this case, no transaction is done, i.e. max profit = 0.

### Solution:

Only care about positive profits. Take the frist item as base and scan to the right. If we encounter an item `j` whose price `price[j]` is lower than the base (which means if we sell now the profit would be negative), we sell `j-1` instead and make `j` the new base.

Because `price[j]` is lower that the base, using `j` as new base is guaranteed to gain more profit comparing to the old one.

    /**
     * @param {number[]} prices
     * @return {number}
     */
    let maxProfit = function(prices) {
      let max = 0
      let base = prices[0]
      for (let i = 1; i < prices.length; i++) {
        const profit = prices[i] - base
        if (profit > max) {
          max = profit
        } else if (profit < 0) {
          base = prices[i]
        }
      }
      return max
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Array": <https://leetcode.com/tag/array> "Greedy": <https://leetcode.com/tag/greedy> Similar Questions: "Best Time to Buy and Sell Stock": <https://leetcode.com/problems/best-time-to-buy-and-sell-stock> "Best Time to Buy and Sell Stock III": <https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii> "Best Time to Buy and Sell Stock IV": <https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv> "Best Time to Buy and Sell Stock with Cooldown": <https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown> "Best Time to Buy and Sell Stock with Transaction Fee": <https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee>
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[122. Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/)
------------------------------------------------------------------------------------------------------------------------

### Problem:

Say you have an array for which the *i*th element is the price of a given stock on day *i*.

Design an algorithm to find the maximum profit. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times).

**Note:** You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

**Example 1:**

    Input: [7,1,5,3,6,4]
    Output: 7
    Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
                 Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.

**Example 2:**

    Input: [1,2,3,4,5]
    Output: 4
    Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
                 Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
                 engaging multiple transactions at the same time. You must sell before buying again.

**Example 3:**

    Input: [7,6,4,3,1]
    Output: 0
    Explanation: In this case, no transaction is done, i.e. max profit = 0.

### Solution:

Sell immediately after the price drops. Or in other perspective, it is the sum of all the incremental pairs (buy in then immediately sell out).

    /**
     * @param {number[]} prices
     * @return {number}
     */
    let maxProfit = function(prices) {
      let max = 0
      for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i-1]) {
          max += prices[i] - prices[i-1]
        }
      }
      return max
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Array": <https://leetcode.com/tag/array> "Dynamic Programming": <https://leetcode.com/tag/dynamic-programming> Similar Questions: "Best Time to Buy and Sell Stock": <https://leetcode.com/problems/best-time-to-buy-and-sell-stock> "Best Time to Buy and Sell Stock II": <https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii> "Best Time to Buy and Sell Stock IV": <https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv> "Maximum Sum of 3 Non-Overlapping Subarrays": <https://leetcode.com/problems/maximum-sum-of-3-non-overlapping-subarrays>
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[123. Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/)
--------------------------------------------------------------------------------------------------------------------------

### Problem:

Say you have an array for which the *i*th element is the price of a given stock on day *i*.

Design an algorithm to find the maximum profit. You may complete at most *two* transactions.

\*\*Note:\*\*You may not engage in multiple transactions at the same time (i.e., you must sell the stock before you buy again).

**Example 1:**

    Input: [3,3,5,0,0,3,1,4]
    Output: 6
    Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
                 Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

**Example 2:**

    Input: [1,2,3,4,5]
    Output: 4
    Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
                 Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
                 engaging multiple transactions at the same time. You must sell before buying again.

**Example 3:**

    Input: [7,6,4,3,1]
    Output: 0
    Explanation: In this case, no transaction is done, i.e. max profit = 0.

### Solution:

Multiple transactions may not be engaged in at the same time. That means if we view the days that involed in the same transaction as a group, there won't be any intersection. We may complete at most *two* transactions, so divide the days into two groups, `[0...k]` and `[k...n-1]`. Notice `k` exists in both groups because technically we can sell out then immediately buy in at the same day.

Define `p1(i)` to be the max profit of day `[0...i]`. This is just like the problem of [121. Best Time to Buy and Sell Stock](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/121.%20Best%20Time%20to%20Buy%20and%20Sell%20Stock.md).

    p1(0) = 0
    p1(i) = max( p1(i-1), prices[i] - min(prices[0], ..., prices[i-1]) ), 0 < i <= n-1

Define `p2(i)` to be the max profit of day `[i...n-1]`. This is the mirror of `p1`.

    p2(n-1) = 0
    p2(i) = max( p2(i+1), max(prices[i], ..., prices[n-1]) - prices[i] ), n-1 > i >= 0

Define `f(k)` to be `p1(k) + p2(k)`. We need to get `max( f(0), ..., f(n-1) )`.

    /**
     * @param {number[]} prices
     * @return {number}
     */
    let maxProfit = function(prices) {
      const len = prices.length
      if (len <= 1) { return 0 }

      const dp = [0]

      let min = prices[0]
      for (let i = 1; i < len; i++) {
        dp[i] = Math.max(dp[i-1], prices[i] - min)
        min = Math.min(prices[i], min)
      }

      let p2 = 0
      let max = prices[len-1]
      for (let i = len-2; i >= 0; i--) {
        max = Math.max(prices[i], max)
        p2 = Math.max(p2, max - prices[i])
        dp[i] += p2
      }

      return Math.max(...dp)
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Tree": <https://leetcode.com/tag/tree> "Depth-first Search": <https://leetcode.com/tag/depth-first-search> Similar Questions: "Path Sum": <https://leetcode.com/problems/path-sum> "Sum Root to Leaf Numbers": <https://leetcode.com/problems/sum-root-to-leaf-numbers> "Path Sum IV": <https://leetcode.com/problems/path-sum-iv> "Longest Univalue Path": <https://leetcode.com/problems/longest-univalue-path>
---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[124. Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/description/)
------------------------------------------------------------------------------------------------------------

### Problem:

Given a **non-empty** binary tree, find the maximum path sum.

For this problem, a path is defined as any sequence of nodes from some starting node to any node in the tree along the parent-child connections. The path must contain **at least one node** and does not need to go through the root.

**Example 1:**

    Input: [1,2,3]

           1
          / \
         2   3

    Output: 6

**Example 2:**

    Input: [-10,9,20,null,null,15,7]

       -10
       / \
      9  20
        /  \
       15   7

    Output: 42

### Solution:

For every `node`, there are six possible ways to get the max path sum:

-   With `node.val`
    1.  `node.val` plus the max sum of a path that ends with `node.left`.
    2.  `node.val` plus the max sum of a path that starts with `node.right`.
    3.  `node.val` plus the max sum of both paths.
    4.  Just `node.val` (the max sum of both paths are negative).
-   Without`node.val` (disconnected)
    1.  The max-sum path is somewhere under the `node.left` subtree.
    2.  The max-sum path is somewhere under the `node.right` subtree.

There are two ways to implement this.

#### ONE

Define a function that returns two values. The max sum of a path that may or may not end with `root` node, and the max sum of the path that ends with `root` node.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    let maxPathSum = function(root) {
      return Math.max(..._maxPathSum(root))
    };

    /**
     * @param {TreeNode} root
     * @return {number[]}
     */
    function _maxPathSum (root) {
      if (!root) { return [-Infinity, -Infinity] }
      
      const left = _maxPathSum(root.left)
      const right = _maxPathSum(root.right)
      return [
        Math.max(left[0], right[0], root.val + Math.max(0, left[1], right[1], left[1] + right[1])),
        Math.max(left[1], right[1], 0) + root.val
      ]
    }

#### TWO

Just return the later (max sum of a path that ends with `root`). Maintain a global variable to store the disconnected max sum.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    let maxPathSum = function(root) {
      const global = { max: -Infinity }
      _maxPathSum(root, global)
      return global.max
    };


    /**
     * @param {TreeNode} root
     * @param {object} global
     * @param {number} global.max 
     * @return {number[]}
     */
    function _maxPathSum (root, global) {
      if (!root) { return -Infinity }
      
      const left = _maxPathSum(root.left, global)
      const right = _maxPathSum(root.right, global)
      const localMax = Math.max(left, right, 0) + root.val
      global.max = Math.max(global.max, localMax, root.val + left + right)
      return localMax
    }

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Easy Related Topics: "Two Pointers": <https://leetcode.com/tag/two-pointers> "String": <https://leetcode.com/tag/string> Similar Questions: "Palindrome Linked List": <https://leetcode.com/problems/palindrome-linked-list> "Valid Palindrome II": <https://leetcode.com/problems/valid-palindrome-ii>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/description/)
------------------------------------------------------------------------------------

### Problem:

Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

**Note:** For the purpose of this problem, we define empty string as valid palindrome.

**Example 1:**

    Input: "A man, a plan, a canal: Panama"
    Output: true

**Example 2:**

    Input: "race a car"
    Output: false

### Solution:

#### ONE

    /**
     * @param {string} s
     * @return {boolean}
     */
    let isPalindrome = function(s) {
      const clean = s.toLowerCase().split(/[^a-z0-9]*/)
      return clean.join('') === clean.reverse().join('')
    };

#### TWO

Remove non-alphanumeric characters then compare.

    /**
     * @param {string} s
     * @return {boolean}
     */
    let isPalindrome = function(s) {
      const clean = s.replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
      for (let i = 0, j = clean.length - 1; i < j; i++, j--) {
        if (clean[i] !== clean[j]) { return false }
      }
      return true
    };

#### THREE

Compare the char codes.

    /**
     * @param {string} s
     * @return {boolean}
     */
    let isPalindrome = function(s) {
      for (let i = 0, j = s.length - 1; i < j; i++, j--) {
        let left = s.charCodeAt(i)
        while (i < j && (left < 48 || left > 57 && left < 65 || left > 90 && left < 97 || left > 122)) {
          left = s.charCodeAt(++i)
        }
        if (i >= j) { return true }
        if (left >= 65 && left <= 90) {
          left += 32
        }
        
        let right = s.charCodeAt(j)
        while (i < j && (right < 48 || right > 57 && right < 65 || right > 90 && right < 97 || right > 122)) {
          right = s.charCodeAt(--j)
        }
        if (i >= j) { return true }
        if (right >= 65 && right <= 90) {
          right += 32
        }
        
        if (left !== right) { return false }
      }
      
      return true
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Array": <https://leetcode.com/tag/array> "String": <https://leetcode.com/tag/string> "Backtracking": <https://leetcode.com/tag/backtracking> "Breadth-first Search": <https://leetcode.com/tag/breadth-first-search> Similar Questions: "Word Ladder": <https://leetcode.com/problems/word-ladder>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[126. Word Ladder II](https://leetcode.com/problems/word-ladder-ii/description/)
--------------------------------------------------------------------------------

### Problem:

Given two words (*beginWord* and *endWord*), and a dictionary's word list, find all shortest transformation sequence(s) from *beginWord* to *endWord*, such that:

1.  Only one letter can be changed at a time
2.  Each transformed word must exist in the word list. Note that *beginWord* is *not* a transformed word.

**Note:**

-   Return an empty list if there is no such transformation sequence.
-   All words have the same length.
-   All words contain only lowercase alphabetic characters.
-   You may assume no duplicates in the word list.
-   You may assume *beginWord* and *endWord* are non-empty and are not the same.

**Example 1:**

    Input:
    beginWord = "hit",
    endWord = "cog",
    wordList = ["hot","dot","dog","lot","log","cog"]

    Output:
    [
      ["hit","hot","dot","dog","cog"],
      ["hit","hot","lot","log","cog"]
    ]

**Example 2:**

    Input:
    beginWord = "hit"
    endWord = "cog"
    wordList = ["hot","dot","dog","lot","log"]

    Output: []

    Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.

### Solution:

This is just like [127. Word Ladder](file:///C:/MY-WEB-DEV/06-DS-ALGO-OUTTER/06-DS-ALGO/main/CONTENT/DS-n-Algos/SANDBOX/127.%20Word%20Ladder).

The constrain still works, but instead of deleting the words right away, collect them and delete them all when a level ends, so that we can reuse the words (matching different parents in the same level).

The items in the queue are not just words now. Parent nodes are also kept so that we can backtrack the path from the end.

    /**
     * @param {string} beginWord
     * @param {string} endWord
     * @param {string[]} wordList
     * @return {string[][]}
     */
    function findLadders (beginWord, endWord, wordList) {
      wordList = new Set(wordList)
      if (!wordList.has(endWord)) { return [] }

      const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

      const result = []
      let isEndWordFound = false
      const levelWords = new Set()
      const queue = [[beginWord, null], null]
      while (queue.length > 1) {
        const node = queue.shift()

        if (node === null) {
          if (isEndWordFound) {
            break
          }
          levelWords.forEach(word => wordList.delete(word))
          levelWords.clear()
          queue.push(null)
          continue
        }

        const word = node[0]

        for (let i = word.length - 1; i >= 0; i--) {
          const head = word.slice(0, i)
          const tail = word.slice(i+1)

          for (let c = 0; c < 26; c++) {
            if (ALPHABET[c] !== word[i]) {
              const w = head + ALPHABET[c] + tail
              if (w === endWord) {
                const path = [endWord]
                for (let n = node; n !== null; n = n[1]) {
                  path.unshift(n[0])
                }
                result.push(path)
                isEndWordFound = true
              }
              if (wordList.has(w)) {
                levelWords.add(w)
                queue.push([w, node])
              }
            }
          }
        }
      }

      return result
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Breadth-first Search": <https://leetcode.com/tag/breadth-first-search> Similar Questions: "Word Ladder II": <https://leetcode.com/problems/word-ladder-ii> "Minimum Genetic Mutation": <https://leetcode.com/problems/minimum-genetic-mutation>
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[127. Word Ladder](https://leetcode.com/problems/word-ladder/description/)
--------------------------------------------------------------------------

### Problem:

Given two words (*beginWord* and *endWord*), and a dictionary's word list, find the length of shortest transformation sequence from *beginWord* to *endWord*, such that:

1.  Only one letter can be changed at a time.
2.  Each transformed word must exist in the word list. Note that *beginWord* is *not* a transformed word.

**Note:**

-   Return 0 if there is no such transformation sequence.
-   All words have the same length.
-   All words contain only lowercase alphabetic characters.
-   You may assume no duplicates in the word list.
-   You may assume *beginWord* and *endWord* are non-empty and are not the same.

**Example 1:**

    Input:
    beginWord = "hit",
    endWord = "cog",
    wordList = ["hot","dot","dog","lot","log","cog"]

    Output: 5

    Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
    return its length 5.

**Example 2:**

    Input:
    beginWord = "hit"
    endWord = "cog"
    wordList = ["hot","dot","dog","lot","log"]

    Output: 0

    Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.

### Solution:

Think of it as building a tree, with `begineWord` as root and `endWord` as leaves.

The best way control the depth (length of the shortest transformations) while building the tree is level-order traversal (BFS).

We do not actually build the tree because it is expensive (astronomical if the list is huge). In fact, we only need one shortest path. So just like Dijkstra's algorithm, we say that the first time (level `i`) we encounter a word that turns out to be in a shortest path, then level `i` is the lowest level this word could ever get. We can safely remove it from the `wordList`.

To find all the next words, instead of filtering the `wordList`, enumerate all 25 possible words and check if in `wordList`.

    /**
     * @param {string} beginWord
     * @param {string} endWord
     * @param {string[]} wordList
     * @return {number}
     */
    let ladderLength = function(beginWord, endWord, wordList) {
      wordList = new Set(wordList)
      if (!wordList.has(endWord)) { return 0 }

      const ALPHABET = 'abcdefghijklmnopqrstuvwxyz'

      let level = 1
      const queue = [beginWord, null]
      while (queue.length > 1) {
        const word = queue.shift()

        if (word === null) {
          level++
          queue.push(null)
          continue
        }

        for (let i = word.length - 1; i >= 0; i--) {
          const head = word.slice(0, i)
          const tail = word.slice(i+1)

          for (let c = 0; c < 26; c++) {
            if (ALPHABET[c] !== word[i]) {
              const word = head + ALPHABET[c] + tail
              if (word === endWord) {
                return level + 1
              }
              if (wordList.delete(word)) {
                queue.push(word)
              }
            }
          }
        }
      }

      return 0
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Hard Related Topics: "Array": <https://leetcode.com/tag/array> "Union Find": <https://leetcode.com/tag/union-find> Similar Questions: "Binary Tree Longest Consecutive Sequence": <https://leetcode.com/problems/binary-tree-longest-consecutive-sequence>
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[128. Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/description/)
------------------------------------------------------------------------------------------------------------

### Problem:

Given an unsorted array of integers, find the length of the longest consecutive elements sequence.

Your algorithm should run in O(*n*) complexity.

**Example:**

    Input: [100, 4, 200, 1, 3, 2]
    Output: 4
    Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.

### Solution:

Build a Set from the list. Pick a number, find all it's adjacent numbers that are also in the Set. Count them and remove them all from the Set. Repeat until the Set is empty. Time complexity O(n + n) = O(n).

    /**
     * @param {number[]} nums
     * @return {number}
     */
    let longestConsecutive = function(nums) {
      const numSet = new Set(nums)
      let maxCount = 0
      while (numSet.size > 0) {
        const num = numSet.values().next().value
        numSet.delete(num)
        let count = 1
        for (let n = num + 1; numSet.delete(n); n++) {
          count++
        }
        for (let n = num - 1; numSet.delete(n); n--) {
          count++
        }
        if (count > maxCount) {
          maxCount = count
        }
      }
      return maxCount
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Tree": <https://leetcode.com/tag/tree> "Depth-first Search": <https://leetcode.com/tag/depth-first-search> Similar Questions: "Path Sum": <https://leetcode.com/problems/path-sum> "Binary Tree Maximum Path Sum": <https://leetcode.com/problems/binary-tree-maximum-path-sum>
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[129. Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/description/)
----------------------------------------------------------------------------------------------------

### Problem:

Given a binary tree containing digits from `0-9` only, each root-to-leaf path could represent a number.

An example is the root-to-leaf path `1->2->3` which represents the number `123`.

Find the total sum of all root-to-leaf numbers.

**Note:** A leaf is a node with no children.

**Example:**

    Input: [1,2,3]
        1
       / \
      2   3
    Output: 25
    Explanation:
    The root-to-leaf path 1->2 represents the number 12.
    The root-to-leaf path 1->3 represents the number 13.
    Therefore, sum = 12 + 13 = 25.

**Example 2:**

    Input: [4,9,0,5,1]
        4
       / \
      9   0
     / \
    5   1
    Output: 1026
    Explanation:
    The root-to-leaf path 4->9->5 represents the number 495.
    The root-to-leaf path 4->9->1 represents the number 491.
    The root-to-leaf path 4->0 represents the number 40.
    Therefore, sum = 495 + 491 + 40 = 1026.

### Solution:

To write a clean solution for this promblem, use `0` as indicator of leaf node. If all the children get `0`, it is a leaf node, return the sum of current level.

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {number}
     */
    let sumNumbers = function(root, sum = 0) {
      if (!root) { return 0 }
      sum = sum * 10 + root.val
      return sumNumbers(root.left, sum) + sumNumbers(root.right, sum) || sum
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Depth-first Search": <https://leetcode.com/tag/depth-first-search> "Breadth-first Search": <https://leetcode.com/tag/breadth-first-search> "Union Find": <https://leetcode.com/tag/union-find> Similar Questions: "Number of Islands": <https://leetcode.com/problems/number-of-islands> "Walls and Gates": <https://leetcode.com/problems/walls-and-gates>
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[130. Surrounded Regions](https://leetcode.com/problems/surrounded-regions/description/)
----------------------------------------------------------------------------------------

### Problem:

Given a 2D board containing `'X'` and `'O'` (**the letter O**), capture all regions surrounded by `'X'`.

A region is captured by flipping all `'O'`s into `'X'`s in that surrounded region.

**Example:**

    X X X X
    X O O X
    X X O X
    X O X X

After running your function, the board should be:

    X X X X
    X X X X
    X X X X
    X O X X

**Explanation:**

Surrounded regions shouldn't be on the border, which means that any `'O'` on the border of the board are not flipped to `'X'`. Any `'O'` that is not on the border and it is not connected to an `'O'` on the border will be flipped to `'X'`. Two cells are connected if they are adjacent cells connected horizontally or vertically.

### Solution:

Find all the `O`s that are connected to the `O`s on the border, change them to `#`. Then scan the board, change `O` to `X` and `#` back to `O`.

The process of finding the connected `O`s is just like tree traversal. `O`s on the border are the same level. Their children are the second level. And so on.

So both BFS and DFS are good. I prefer BFS when pruning is not needed in favor of its readability.

    /**
     * @param {character[][]} board
     * @return {void} Do not return anything, modify board in-place instead.
     */
    let solve = function(board) {
      const height = board.length
      if (height <= 1) { return }
      const width = board[0].length
      if (width <= 1) { return }

      const rowend = height - 1
      const colend = width - 1

      const queue = []

      for (let row = 0; row < height; row++) {
        if (board[row][0] === 'O') {
          board[row][0] = '#'
          queue.push(row, 0)
        }
        if (board[row][colend] === 'O') {
          board[row][colend] = '#'
          queue.push(row, colend)
        }
      }

      for (let col = 0; col < width; col++) {
        if (board[0][col] === 'O') {
          board[0][col] = '#'
          queue.push(0, col)
        }
        if (board[rowend][col] === 'O') {
          board[rowend][col] = '#'
          queue.push(rowend, col)
        }
      }

      while (queue.length > 0) {
        const row = queue.shift()
        const col = queue.shift()
        if (row < rowend && board[row + 1][col] === 'O') {
          board[row + 1][col] = '#'
          queue.push(row + 1, col)
        }
        if (row > 0 && board[row - 1][col] === 'O') {
          board[row - 1][col] = '#'
          queue.push(row - 1, col)
        }
        if (board[row][col + 1] === 'O') {
          board[row][col + 1] = '#'
          queue.push(row, col + 1)
        }
        if (board[row][col - 1] === 'O') {
          board[row][col - 1] = '#'
          queue.push(row, col - 1)
        }
      }

      for (let row = 0; row < height; row++) {
        for (let col = 0; col < width; col++) {
          if (board[row][col] === '#') {
            board[row][col] = 'O'
          } else if (board[row][col] === 'O') {
            board[row][col] = 'X'
          }
        }
      }
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

------------------------------------------------------------------------

Difficulty: Medium Related Topics: "Depth-first Search": <https://leetcode.com/tag/depth-first-search> "Breadth-first Search": <https://leetcode.com/tag/breadth-first-search> "Graph": <https://leetcode.com/tag/graph> Similar Questions: "Copy List with Random Pointer": <https://leetcode.com/problems/copy-list-with-random-pointer>
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

[133. Clone Graph](https://leetcode.com/problems/clone-graph/description/)
--------------------------------------------------------------------------

### Problem:

Given the head of a graph, return a deep copy (clone) of the graph. Each node in the graph contains a `label` (`int`) and a list (`List[UndirectedGraphNode]`) of its `neighbors`. There is an edge between the given node and each of the nodes in its neighbors.

OJ's undirected graph serialization (so you can understand error output):

Nodes are labeled uniquely.

We use `#` as a separator for each node, and `,` as a separator for node label and each neighbor of the node.

As an example, consider the serialized graph `{0,1,2#1,2#2,2}`.

The graph has a total of three nodes, and therefore contains three parts as separated by `#`.

1.  First node is labeled as `0`. Connect node `0` to both nodes `1` and `2`.
2.  Second node is labeled as `1`. Connect node `1` to node `2`.
3.  Third node is labeled as `2`. Connect node `2` to node `2` (itself), thus forming a self-cycle.

Visually, the graph looks like the following:

           1
          / \
         /   \
        0 --- 2
             / \
             \_/

**Note**: The information about the tree serialization is only meant so that you can understand error output if you get a wrong answer. You don't need to understand the serialization to solve the problem.

### Solution:

DFS. Cache the visited node before entering the next recursion.

    /**
     * Definition for undirected graph.
     * function UndirectedGraphNode(label) {
     *     this.label = label;
     *     this.neighbors = [];   // Array of UndirectedGraphNode
     * }
     */

    /**
     * @param {UndirectedGraphNode} graph
     * @return {UndirectedGraphNode}
     */
    let cloneGraph = function(graph) {
      const cache = {}
      return _clone(graph)

      function _clone (graph) {
        if (!graph) { return graph }
        const label = graph.label
        if (!cache[label]) {
          cache[label] = new UndirectedGraphNode(label)
          cache[label].neighbors = graph.neighbors.map(_clone)
        }
        return cache[label]
      }
    };

*Template generated via [Leetmark](https://github.com/crimx/crx-leetmark).*

![alt text](./completeLEETCODE_files/binary-tree-upside-down.webp "binary-tree-upside-down")

    /**
     * Definition for a binary tree node.
     * function TreeNode(val) {
     *     this.val = val;
     *     this.left = this.right = null;
     * }
     */
    /**
     * @param {TreeNode} root
     * @return {TreeNode}
     */
    const upsideDownBinaryTree = function(root) {
      let curr = root
      let next = null
      let temp = null
      let prev = null
      while (curr !== null) {
        next = curr.left
        curr.left = temp
        temp = curr.right
        curr.right = prev
        prev = curr
        curr = next
      }
      return prev
    }

    // another

    const upsideDownBinaryTree = function(root) {
      if (root == null || root.left == null) {
        return root
      }
      const newRoot = upsideDownBinaryTree(root.left)
      root.left.left = root.right
      root.left.right = root
      root.left = null
      root.right = null
      return newRoot
    }

![alt text](./completeLEETCODE_files/maximum-sum-circular-subarray.png "maximum-sum-circular-subarray")

    /**
     * @param {number[]} A
     * @return {number}
     */
    const maxSubarraySumCircular = function(A) {
      let minSum = Infinity, sum = 0, maxSum = -Infinity, curMax = 0, curMin = 0
      for(let a of A) {
        sum += a
        curMax = Math.max(curMax + a, a);
        maxSum = Math.max(maxSum, curMax);
        curMin = Math.min(curMin + a, a);
        minSum = Math.min(minSum, curMin);
      }
      return  maxSum > 0 ? Math.max(maxSum, sum - minSum) : maxSum;
    };

Balanced Binary Tree - LeetCode
===============================

> Level up your coding skills and quickly land a job. This is the best place to expand your knowledge and get prepared for your next interview.

Given a binary tree, determine if it is height-balanced.

For this problem, a height-balanced binary tree is defined as:

> a binary tree in which the left and right subtrees of *every* node differ in height by no more than 1.

**Example 1:**

![](./completeLEETCODE_files/balance_1.jpg)

**Input:** root = <span class="katex-display"><span class="katex"><span class="katex-mathml">
3, 9, 20, *n**u**l**l*, *n**u**l**l*, 15, 7
</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="
                    height: 0.8888799999999999em;
                    vertical-align: -0.19444em;
                  "></span><span class="mord">3</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">9</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">2</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">1</span><span class="mord">5</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">7</span></span></span></span></span>  
**Output:** true

**Example 2:**

![](./completeLEETCODE_files/balance_2.jpg)

**Input:** root = <span class="katex-display"><span class="katex"><span class="katex-mathml">
1, 2, 2, 3, 3, *n**u**l**l*, *n**u**l**l*, 4, 4
</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="
                    height: 0.8888799999999999em;
                    vertical-align: -0.19444em;
                  "></span><span class="mord">1</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">2</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">2</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">3</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">3</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">4</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">4</span></span></span></span></span>  
**Output:** false

**Example 3:**

**Input:** root = \[\]  
**Output:** true

**Constraints:**

-   The number of nodes in the tree is in the range `[0, 5000]`.
-   `-104 <= Node.val <= 104`

[Source](https://leetcode.com/problems/balanced-binary-tree/)\# Convert Sorted Array to Binary Search Tree

> Level up your coding skills and quickly land a job. This is the best place to expand your knowledge and get prepared for your next interview.

Given an array where elements are sorted in ascending order, convert it to a height balanced BST.

For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of *every* node never differ by more than 1.

**Example:**

Given the sorted array: <span class="katex-display"><span class="katex"><span class="katex-mathml">
 − 10,  − 3, 0, 5, 9
</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="
                    height: 0.8388800000000001em;
                    vertical-align: -0.19444em;
                  "></span><span class="mord">−</span><span class="mord">1</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">−</span><span class="mord">3</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">5</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">9</span></span></span></span></span>,

One possible answer is: <span class="katex-display"><span class="katex"><span class="katex-mathml">
0,  − 3, 9,  − 10, *n**u**l**l*, 5
</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="
                    height: 0.8888799999999999em;
                    vertical-align: -0.19444em;
                  "></span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">−</span><span class="mord">3</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">9</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">−</span><span class="mord">1</span><span class="mord">0</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">5</span></span></span></span></span>, which represents the following height balanced BST:

      0
     / \\

-3 9  
/ /  
-10 5

[Source](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/)\# Delete Node in a BST

> Level up your coding skills and quickly land a job. This is the best place to expand your knowledge and get prepared for your next interview.

Given a root node reference of a BST and a key, delete the node with the given key in the BST. Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:

1.  Search for a node to remove.
2.  If the node is found, delete the node.

**Follow up:** Can you solve it with time complexity `O(height of tree)`?

**Example 1:**

![](./completeLEETCODE_files/del_node_1.jpg)

**Input:** root = <span class="katex-display"><span class="katex"><span class="katex-mathml">
5, 3, 6, 2, 4, *n**u**l**l*, 7
</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="
                    height: 0.8888799999999999em;
                    vertical-align: -0.19444em;
                  "></span><span class="mord">5</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">3</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">6</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">2</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">4</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">7</span></span></span></span></span>, key = 3  
**Output:** <span class="katex-display"><span class="katex"><span class="katex-mathml">
5, 4, 6, 2, *n**u**l**l*, *n**u**l**l*, 7
</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="
                    height: 0.8888799999999999em;
                    vertical-align: -0.19444em;
                  "></span><span class="mord">5</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">4</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">6</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">2</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">7</span></span></span></span></span>  
**Explanation:** Given key to delete is 3. So we find the node with value 3 and delete it.  
One valid answer is <span class="katex-display"><span class="katex"><span class="katex-mathml">
5, 4, 6, 2, *n**u**l**l*, *n**u**l**l*, 7
</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="
                    height: 0.8888799999999999em;
                    vertical-align: -0.19444em;
                  "></span><span class="mord">5</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">4</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">6</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">2</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">7</span></span></span></span></span>, shown in the above BST.  
Please notice that another valid answer is <span class="katex-display"><span class="katex"><span class="katex-mathml">
5, 2, 6, *n**u**l**l*, 4, *n**u**l**l*, 7
</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="
                    height: 0.8888799999999999em;
                    vertical-align: -0.19444em;
                  "></span><span class="mord">5</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">2</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">6</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">4</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">7</span></span></span></span></span> and it's also accepted.  
![](./completeLEETCODE_files/del_node_supp.jpg)

**Example 2:**

**Input:** root = <span class="katex-display"><span class="katex"><span class="katex-mathml">
5, 3, 6, 2, 4, *n**u**l**l*, 7
</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="
                    height: 0.8888799999999999em;
                    vertical-align: -0.19444em;
                  "></span><span class="mord">5</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">3</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">6</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">2</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">4</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">7</span></span></span></span></span>, key = 0  
**Output:** <span class="katex-display"><span class="katex"><span class="katex-mathml">
5, 3, 6, 2, 4, *n**u**l**l*, 7
</span><span class="katex-html" aria-hidden="true"><span class="base"><span class="strut" style="
                    height: 0.8888799999999999em;
                    vertical-align: -0.19444em;
                  "></span><span class="mord">5</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">3</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">6</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">2</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">4</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord mathnormal">n</span><span class="mord mathnormal">u</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mord mathnormal" style="margin-right: 0.01968em">l</span><span class="mpunct">,</span><span class="mspace" style="margin-right: 0.16666666666666666em"></span><span class="mord">7</span></span></span></span></span>  
**Explanation:** The tree does not contain a node with value = 0.

**Example 3:**

**Input:** root = \[\], key = 0  
**Output:** \[\]

**Constraints:**

-   The number of nodes in the tree is in the range `[0, 104]`.
-   `-105 <= Node.val <= 105`
-   Each node has a **unique** value.
-   `root` is a valid binary search tree.
-   `-105 <= key <= 105`

[Source](https://leetcode.com/problems/delete-node-in-a-bst/)![alt text](./completeLEETCODE_files/meeting-room-ii-0.jpg "meeting-room-ii")  
![alt text](./completeLEETCODE_files/meeting-room-ii-1.jpg "meeting-room-ii")

    /**
     * @param {number[][]} intervals
     * @return {number}
     */
    const minMeetingRooms = function(intervals) {
      const len = intervals.length
      const starts = new Array(len)
      const ends = new Array(len)
      for (let i = 0; i < len; i++) {
        starts[i] = intervals[i][0]
        ends[i] = intervals[i][1]
      }
      starts.sort((a, b) => a - b)
      ends.sort((a, b) => a - b)
      let rooms = 0
      let endsIdx = 0
      for (let i = 0; i < len; i++) {
        if (starts[i] < ends[endsIdx]) rooms++
        else endsIdx++
      }
      return rooms
    }



#### Easy
=======
---



- [7. Reverse Integer](https://oj.leetcode.com/problems/reverse-integer/) - [Solution](./Easy/7-reverseInteger.js)
- [8. String to Integer (atoi)](https://leetcode.com/problems/string-to-integer-atoi/) - [Solution](./Easy/8-stringToInteger.js)
- [9. Palindrome Number](https://leetcode.com/problems/palindrome-number/) - [Solution](./Easy/9-palindromeNumber.js)
- [13. Roman to Integer](https://leetcode.com/problems/roman-to-integer/) - [Solution](./Easy/13-romanToInteger.js)
- [14. Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/) - [Solution](./Easy/14-longestCommonPrefix.js)
- [19. Remove Nth Node From End of List](https://leetcode.com/problems/remove-nth-node-from-end-of-list/) - [Solution](./Easy/19-removeNthNodeFromEndofList.js)
- [20. Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) - [Solution](./Easy/20-validParentheses.js)
- [21. Merge Two Sorted Lists](https://leetcode.com/problems/merge-two-sorted-lists/) - [Solution](./Easy/21-mergeSortedLists.js)
- [24. Swap Nodes in Pairs](https://leetcode.com/problems/swap-nodes-in-pairs/) - [Solution](./Easy/24-swapNodesPairs.js)
- [28. Implement strStr()](https://leetcode.com/problems/implement-strstr/) - [Solution](./Easy/28-implementstrStr.js)
- [26. Remove Duplicates from Sorted Array](https://leetcode.com/problems/remove-duplicates-from-sorted-array/) - [Solution](./Easy/26-removeDuplicatesSortedArray.js)
- [27. Remove Element](https://leetcode.com/problems/remove-element/) - [Solution](./Easy/27-removeElement.js)
- [36. Valid Sudoku](https://leetcode.com/problems/valid-sudoku/) - [Solution](./Easy/36-validSudoku.js)
- [38. Count and Say](https://leetcode.com/problems/count-and-say/) - [Solution](./Easy/38-countandSay.js)
- [53. Maximum Subarray](https://leetcode.com/problems/maximum-subarray/) - [Solution](./Easy/53-maximumSubarray.js)
- [66. Plus One](https://leetcode.com/problems/plus-one/) - [Solution](./Easy/66-plusOne.js)
- [67. Add Binary](https://leetcode.com/problems/add-binary/) - [Solution](./Easy/67-addBinary.js)
- [70. Climbing Stairs](https://leetcode.com/problems/climbing-stairs/) - [Solution](./Easy/70-climbChairs.js)
- [83. Remove Duplicates from Sorted List](https://leetcode.com/problems/remove-duplicates-from-sorted-list/) - [Solution](./Easy/83-removeDuplicatesFromSortedList.js)
- [88. Merge Sorted Array](https://leetcode.com/problems/merge-sorted-array/) - [Solution](./Easy/88-mergeSortedArray.js)
- [100. Same Tree](https://leetcode.com/problems/same-tree/) - [Solution](./Easy/100-sameTree.js)
- [101. Symmetric Tree](https://leetcode.com/problems/symmetric-tree/) - [Solution](./Easy/101-symmetricTree.js)
- [102. Binary Tree Level Order Traversal ](https://leetcode.com/problems/binary-tree-level-order-traversal/) - [Solution](./Easy/102-binaryTreeLevelOrder.js)
- [104. Maximum Depth of Binary Tree](https://leetcode.com/problems/maximum-depth-of-binary-tree/) - [Solution](./Easy/104-maxDepth.js)
- [107. Binary Tree Level Order Traversal II](https://leetcode.com/problems/binary-tree-level-order-traversal-ii/) - [Solution](./Easy/107-binaryTreeLevelTraversalII.js)
- [110. Balanced Binary Tree](https://leetcode.com/problems/balanced-binary-tree/) - [Solution](./Easy/110-balancedBinaryTree.js)
- [111. Minimum Depth of Binary Tree](https://leetcode.com/problems/minimum-depth-of-binary-tree/) - [Solution](./Easy/111-minimumDepthBinaryTree.js)
- [112. Path Sum](https://leetcode.com/problems/path-sum/) - [Solution](./Easy/112-pathSum.js)
- [118. Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/) - [Solution](./Easy/118-pascalTriangle.js)
- [119. Pascal's Triangle II](https://leetcode.com/problems/pascals-triangle-ii/) - [Solution](./Easy/119-pascalTriangleII.js)
- [125. Valid Palindrome](https://leetcode.com/problems/valid-palindrome/) - [Solution](./Easy/125-validPalindrome.js)
- [160. Intersection of Two Linked Lists](https://leetcode.com/problems/intersection-of-two-linked-lists/) - [Solution](./Easy/160-IntersectionofTwoLinkedLists.js)
- [165. Compare Version Numbers](https://leetcode.com/problems/compare-version-numbers/) - [Solution](./Easy/165-compareVersionNumbers.js)
- [167. Two Sum II - Input array is sorted](https://leetcode.com/problems/two-sum-ii-input-array-is-sorted) - [Solution](./Easy/167-twoSummII.js)
- [169. Majority Element](https://leetcode.com/problems/majority-element/) - [Solution](./Easy/169-majorityElement.js)
- [172. Factorial Trailing Zeroes](https://leetcode.com/problems/factorial-trailing-zeroes/) - [Solution](./Easy/172-factorialTrailingZeroes.js)
- [190. Reverse Bits](https://leetcode.com/problems/reverse-bits/) - [Solution](./Easy/190-reverseBits.js)
- [191. Number of 1 Bits](https://leetcode.com/problems/number-of-1-bits/) - [Solution](./Easy/191-numerOneBits.js)
- [198. House Robber](https://leetcode.com/problems/house-robber/) - [Solution](./Easy/198-houseRobber.js)
- [202. Happy Number](https://leetcode.com/problems/happy-number/) - [Solution](./Easy/202-happyNumber.js)
- [203. Remove Linked List Elements](https://leetcode.com/problems/remove-linked-list-elements/) - [Solution](./Easy/203-removeLinkedListElements.js)
- [204. Count Primes](https://leetcode.com/problems/count-primes/) - [Solution](./Easy/204-countPrimes.js)
- [205. Isomorphic Strings](https://leetcode.com/problems/isomorphic-strings/) - [Solution](./Easy/205-isomorphicStrings.js)
- [206. Reverse Linked List](https://leetcode.com/problems/reverse-linked-list/) - [Solution](./Easy/206-reversedLinkedList.js)
- [217. Contains Duplicate](https://leetcode.com/problems/contains-duplicate/) - [Solution](./Easy/217-containsDuplicate.js)
- [219. Contains Duplicate II](https://leetcode.com/problems/contains-duplicate-ii/) - [Solution](./Easy/219-containsDuplicateII.js)
- [223. Rectangle Area](https://leetcode.com/problems/rectangle-area/) - [Solution](./Easy/223-rectangleArea.js)
- [225. Implement Stack using Queues](https://leetcode.com/problems/implement-stack-using-queues/) - [Solution](./Easy/225-stackUsingQueues.js)
- [226. Invert Binary Tree](https://leetcode.com/problems/invert-binary-tree/) - [Solution](./Easy/226-invertBinaryTree.js)
- [228. Summary Ranges](https://leetcode.com/problems/summary-ranges/) - [Solution](./Easy/228-summaryRanges.js)
- [231. Power of Two](https://leetcode.com/problems/power-of-two/) - [Solution](./Easy/231-powerOfTwo.js)
- [232. Implement Queue using Stacks](https://leetcode.com/problems/implement-queue-using-stacks/) - [Solution](./Easy/232-implementQueueUsingStack.js)
- [234. Palindrome Linked List](https://leetcode.com/problems/palindrome-linked-list/) - [Solution](./Easy/234-palindromeLinkedList.js)
- [235. Lowest Common Ancestor of a Binary Search Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree/) - [Solution](./Easy/235-lcaBST.js)
- [237. Delete Node in a Linked List](https://leetcode.com/problems/delete-node-in-a-linked-list/) - [Solution](./Easy/237-deleteLinkedListNode.js)
- [242. Valid Anagram](https://leetcode.com/problems/valid-anagram/) - [Solution](./Easy/242-anagram.js)
- [243. Shortest Word Distance](https://leetcode.com/problems/shortest-word-distance) - [Solution](./Medium/245-shortestWordDist.js)
- [258. Add Digits](https://leetcode.com/problems/add-digits/) - [Solution](./Easy/258-addDigits.js)
- [263. Ugly Number](https://leetcode.com/problems/ugly-number/) - [Solution](./Easy/263-uglyNumber.js)
- [278. First Bad Version](https://leetcode.com/problems/first-bad-version/) - [Solution](./Easy/278-firstBadVersion.js)
- [283. Move Zeroes](https://leetcode.com/problems/move-zeroes/) - [Solution](./Easy/283-moveZeros.js)
- [290. Word Pattern](https://leetcode.com/problems/word-pattern/) - [Solution](./Easy/290-wordPattern.js)
- [299. Bulls and Cows](https://leetcode.com/problems/bulls-and-cows/) - [Solution](./Easy/299-bullsandCows.js)
- [303. Range Sum Query - Immutable](https://leetcode.com/problems/range-sum-query-immutable/) - [Solution](./Easy/303-rangeSumQuery.js)
- [326. Power of Three](https://leetcode.com/problems/power-of-three/) - [Solution](./Easy/326-powerOfThree.js)
- [328. Odd Even Linked List](https://leetcode.com/problems/odd-even-linked-list/) - [Solution](./Easy/328-oddevenLinkedList.js)
- [342. Power of Four](https://leetcode.com/problems/power-of-four/) - [Solution](./Easy/342-powerOfFour.js)
- [344. Reverse String](https://leetcode.com/problems/reverse-string/) - [Solution](./Easy/344-reverseString.js)
- [349. Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/) - [Solution](./Easy/349-intersectionTwoArrays.js)
- [350. Intersection of Two Arrays II](https://leetcode.com/problems/intersection-of-two-arrays-ii/) - [Solution](./Easy/349-intersectionTwoArraysII.js)
- [367. Valid Perfect Square](https://leetcode.com/problems/valid-perfect-square/) - [Solution](./Easy/367-perfectSquare.js)
- [412. Fizz Buzz](https://leetcode.com/problems/fizz-buzz/?tab=Solutions) - [Solution](./Easy/412-fizzBuzz.js)

##### Medium

- [1. Two Sum](https://leetcode.com/problems/two-sum/) - [Solution](./Medium/1-twoSum.js)
- [2. Add Two Numbers](https://leetcode.com/problems/add-two-numbers/) - [Solution](./Medium/2-addTwoNumbers.js)
- [3. Longest Substring Without Repeating Characters](https://oj.leetcode.com/problems/longest-substring-without-repeating-characters/) - [Solution](./Medium/3-lengthOfLongestSubstring.js)
- [5. Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) - [Solution](./Medium/5-longestPalindromicSubstring.js)
- [11. Container With Most Water](https://leetcode.com/problems/container-with-most-water/) - [Solution](./Medium/11-containerMostWater.js)
- [12. Integer to Roman](https://leetcode.com/problems/integer-to-roman/) - [Solution](./Medium/12-integerToRoman.js)
- [15. 3Sum](https://leetcode.com/problems/3sum/) - [Solution](./Medium/15-3sum.js)
- [16. 3Sum Closest](https://leetcode.com/problems/3sum-closest/) - [Solution](./Medium/16-3sumClosest.js)
- [17. Letter Combinations of a Phone Number](https://leetcode.com/problems/letter-combinations-of-a-phone-number/) - [Solution](./Medium/17-LetterCombinationsPhoneNumber.js)
- [22. Generate Parentheses](https://leetcode.com/problems/generate-parentheses/) - [Solution](./Medium/22-generateParentheses.js)
- [29. Divide Two Integers](https://leetcode.com/problems/divide-two-integers/) - [Solution](./Medium/29-DivideTwoIntegers.js)
- [31. Next Permutation](https://leetcode.com/problems/next-permutation/) - [Solution](./Medium/31-nextPermutation.js)
- [31. Next Permutation](https://leetcode.com/problems/next-permutation/) - [Solution](./Medium/31-nextPermutation.js)
- [33. Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) - [Solution](./Medium/33-searchRotatedSortedArray.js)
- [34. Search for a Range](https://leetcode.com/problems/search-for-a-range/) - [Solution](./Medium/34-searchforRange.js)
- [39. Combination Sum](https://oj.leetcode.com/problems/combination-sum/) - [Solution](./Medium/39-combinationSum.js)
- [40. Combination Sum II](https://oj.leetcode.com/problems/combination-sum-ii/) - [Solution](./Medium/40-combinationSumII.js)
- [43. Multiply Strings](https://leetcode.com/problems/multiply-strings/) - [Solution](./Medium/43-multiplyStrings.js)
- [46. Permutations](https://leetcode.com/problems/permutations/) - [Solution](./Medium/46-permutations.js)
- [47. Permutations II](https://leetcode.com/problems/permutations-ii/) - [Solution](./Medium/47-permutationsII.js)
- [48. Rotate Image](https://leetcode.com/problems/rotate-image/) - [Solution](./Medium/48-rotateImage.js)
- [49. Group Anagrams](https://leetcode.com/problems/anagrams/) - [Solution](./Medium/49-groupAnagrams.js)
- [50. Pow(x, n)](https://leetcode.com/problems/powx-n/) - [Solution](./Medium/50-powerxn.js)
- [54. Spiral Matrix](https://leetcode.com/problems/spiral-matrix/) - [Solution](./Medium/54-spiralMatrix.js)
- [55. Jump Game](https://leetcode.com/problems/jump-game/) - [Solution](./Medium/55-jumpGame.js)
- [59. Spiral Matrix II](https://leetcode.com/problems/spiral-matrix-ii/) - [Solution](./Medium/59-spiralMatrixII.js)
- [60. Permutation Sequence](https://leetcode.com/problems/permutation-sequence/) - [Solution](./Medium/60-permutationSequence.js)
- [61. Rotate List](https://leetcode.com/problems/rotate-list/) - [Solution](./Medium/61-rotateList.js)
- [62. Unique Paths](https://leetcode.com/problems/unique-paths/) - [Solution](./Medium/62-uniquePaths.js)
- [63. Unique Paths II](https://leetcode.com/problems/unique-paths-ii/) - [Solution](./Medium/63-uniquePathsII.js)
- [64. Minimum Path Sum](https://leetcode.com/problems/minimum-path-sum/) - [Solution](./Medium/64-minimumPathSum.js)
- [69. Sqrt(x)](https://leetcode.com/problems/sqrtx/) - [Solution](./Medium/69-sqrtx.js)
- [71. Simplify Path](https://leetcode.com/problems/simplify-path/) - [Solution](./Medium/71-simplifyPath.js)
- [73. Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/) - [Solution](./Medium/73-setMatrixZeroes.js)
- [74. Search a 2D Matrix](https://leetcode.com/problems/search-a-2d-matrix/) - [Solution](./Medium/74-search2DMatrix.js)
- [75. Sort Colors](https://leetcode.com/problems/sort-colors/) - [Solution](./Medium/75-sortColors.js)
- [77. Combinations](https://leetcode.com/problems/combinations/) - [Solution](./Medium/77-combinations.js)
- [78. Subsets](https://leetcode.com/problems/subsets/) - [Solution](./Medium/78-subsets.js)
- [79. Word Search](https://leetcode.com/problems/word-search/) - [Solution](./Medium/79-wordSearch.js)
- [80. Remove Duplicates from Sorted Array II](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/) - [Solution](./Medium/80-removeDuplicatesII.js)
- [81. Search in Rotated Sorted Array II](https://leetcode.com/problems/search-in-rotated-sorted-array-ii/) - [Solution](./Medium/81-searchRotatedSortedArrayII.js)
- [82. Remove Duplicates from Sorted List II](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii/) - [Solution](./Medium/82-removeDuplicatesListII.js)
- [86. Partition List](https://leetcode.com/problems/partition-list/) - [Solution](./Medium/86-partition-List.js)
- [89. Gray Code](https://leetcode.com/problems/gray-code/) - [Solution](./Medium/89-grayCode.js)
- [90. Subsets II ](https://leetcode.com/problems/subsets-ii/) - [Solution](./Medium/90-subsetsII.js)
- [91. Decode Ways ](https://leetcode.com/problems/decode-ways/) - [Solution](./Medium/91-decodeways.js)
- [92. Reverse Linked List II](https://leetcode.com/problems/reverse-linked-list-ii/) - [Solution](./Medium/92-reverseLinkedListII.js)
- [93. Restore IP Addresses](https://leetcode.com/problems/restore-ip-addresses/) - [Solution](./Medium/93-restoreIPAddresses.js)
- [94. Binary Tree Inorder Traversal](https://leetcode.com/problems/binary-tree-inorder-traversal/) - [Solution](./Medium/94-binaryTreeInorder.js)
- [96. Unique Binary Search Trees](https://leetcode.com/problems/unique-binary-search-trees/) - [Solution](./Medium/96-uniqueBinarySearchTrees.js)
- [98. Validate Binary Search Tree](https://leetcode.com/problems/validate-binary-search-tree/) - [Solution](./Medium/98-validateBST.js)
- [103. Binary Tree Zigzag Level Order Traversal](https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/) - [Solution](./Medium/103-BSTZigzagLevelTraversal.js)
- [105. Construct Binary Tree from Preorder and Inorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal/) - [Solution](./Medium/105-constructBinaryTree.js)
- [106. Construct Binary Tree from Inorder and Postorder Traversal](https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal/) - [Solution](./Medium/106-constructBinaryTree.js)
- [108. Convert Sorted Array to Binary Search Tree](https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/) - [Solution](./Medium/108-convertSortedArraytoBST.js)
- [109. Convert Sorted List to Binary Search Tree](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree/) - [Solution](./Medium/109-convertSortedListToBST.js)
- [113. Path Sum II](https://leetcode.com/problems/path-sum-ii/) - [Solution](./Medium/113-pathSumII.js)
- [114. Flatten Binary Tree to Linked List](https://leetcode.com/problems/flatten-binary-tree-to-linked-list/) - [Solution](./Medium/114-flattenTree.js)
- [116. Populating Next Right Pointers in Each Node](https://leetcode.com/problems/populating-next-right-pointers-in-each-node/) - [Solution](./Medium/116-PopulatingNextRightPointersinEachNode.js)
- [120. Triangle](https://leetcode.com/problems/triangle/) - [Solution](./Medium/120-triangle.js)
- [121. Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) - [Solution](./Medium/121-bestTimeToBuySellStock.js)
- [122. Best Time to Buy and Sell Stock II](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/) - [Solution](./Medium/122-bestTimeToBuySellStockII.js)
- [129. Sum Root to Leaf Numbers](https://leetcode.com/problems/sum-root-to-leaf-numbers/) - [Solution](./Medium/129-sumRootToLeafNumbers.js)
- [127. Word Ladder](https://leetcode.com/problems/word-ladder/) - [Solution](./Medium/127-wordLadder.js)
- [130. Surrounded Regions](https://leetcode.com/problems/surrounded-regions/) - [Solution](./Medium/130-surroundedRegions.js)
- [131. Palindrome Partitioning](https://leetcode.com/problems/palindrome-partitioning/) - [Solution](./Medium/131-palindromePartitioning.js)
- [134. Gas Station](https://leetcode.com/problems/gas-station/) - [Solution](./Medium/134-gasStation.js)
- [136. Single Number](https://leetcode.com/problems/single-number/) - [Solution](./Medium/136-singleNumber.js)
- [139. Word Break](https://leetcode.com/problems/word-break/) - [Solution](./Medium/139-wordBreak.js)
- [141. Linked List Cycle](https://leetcode.com/problems/linked-list-cycle/) - [Solution](./Medium/141-linkedListCycle.js)
- [142. Linked List Cycle II](https://leetcode.com/problems/linked-list-cycle-ii/) - [Solution](./Medium/142-linkedListCycleII.js)
- [143. Reorder List](https://leetcode.com/problems/reorder-list/) - [Solution](./Medium/143-reorderList.js)
- [144. Binary Tree Preorder Traversal](https://leetcode.com/problems/binary-tree-preorder-traversal/) - [Solution](./Medium/144-binaryTreePreorder.js)
- [147. Insertion Sort List](https://leetcode.com/problems/insertion-sort-list/) - [Solution](./Medium/147-insertionSortList.js)
- [148. Sort List](https://leetcode.com/problems/sort-list/) - [Solution](./Medium/148-sortList.js)
- [150. Evaluate Reverse Polish Notation](https://leetcode.com/problems/evaluate-reverse-polish-notation/) - [Solution](./Medium/150-reversePolishNotation.js)
- [151. Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/) - [Solution](./Medium/151-reverseWordsInAString.js)
- [152. Maximum Product Subarray](https://leetcode.com/problems/maximum-product-subarray/) - [Solution](./Medium/152-MaxProductSubarray.js)
- [153. Find Minimum in Rotated Sorted Array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/) - [Solution](./Medium/153-findMinimumInRotatedSortedArray.js)
- [162. Find Peak Element](https://leetcode.com/problems/find-peak-element/) - [Solution](./Medium/162-findPeakElement.js)
- [173. Binary Search Tree Iterator](https://leetcode.com/problems/binary-search-tree-iterator/) - [Solution](./Medium/173-binarySearchTreeIterator.js)
- [179. Largest Number](https://leetcode.com/problems/largest-number/) - [Solution](./Medium/179-largestNumber.js)
- [199. Binary Tree Right Side View](https://leetcode.com/problems/binary-tree-right-side-view/) - [Solution](./Medium/199-binaryTreeRightSideView.js)
- [213. House Robber II](https://leetcode.com/problems/house-robber-ii/) - [Solution](./Medium/213-houseRobberII.js)
- [215. Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) - [Solution](./Medium/215-KthLargestElementInArray.js)
- [216. Combination Sum III](https://leetcode.com/problems/combination-sum-iii/) - [Solution](./Medium/216-CombinationSumIII.js)
- [221. Maximal Square](https://leetcode.com/problems/maximal-square/) - [Solution](./Medium/221-maximalSquare.js)
- [227. Basic Calculator II](https://leetcode.com/problems/basic-calculator-ii/) - [Solution](./Medium/227-calculatorII.js)
- [229. Majority Element II](https://leetcode.com/problems/majority-element-ii/) - [Solution](./Medium/229-majorityElementII.js)
- [230. Kth Smallest Element in a BST](https://leetcode.com/problems/kth-smallest-element-in-a-bst/) - [Solution](./Medium/230-kthSmallestElementinBST.js)
- [236. Lowest Common Ancestor of a Binary Tree](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree/) - [Solution](./Medium/236-lcaBinaryTree.js)
- [238. Product of Array Except Self](https://leetcode.com/problems/product-of-array-except-self/) - [Solution](./Medium/238-productExceptSelf.js)
- [240. Search a 2D Matrix II](https://leetcode.com/problems/search-a-2d-matrix-ii/) - [Solution](./Medium/240-Search2DMatrixII.js)
- [241. Different Ways to Add Parentheses](https://leetcode.com/problems/different-ways-to-add-parentheses/) - [Solution](./Medium/241-differentWaysAddParentheses.js)
- [244. Shortest Word Distance II](https://leetcode.com/problems/shortest-word-distance-ii) - [Solution](./Medium/245-shortestWordDistII.js)
- [245. Shortest Word Distance III](https://leetcode.com/problems/shortest-word-distance-iii) - [Solution](./Medium/245-shortestWordDistIII.js)
- [260. Single Number III](https://leetcode.com/problems/single-number-iii/) - [Solution](./Medium/260-singleNumberIII.js)
- [268. Missing Number](https://leetcode.com/problems/missing-number/) - [Solution](./Medium/268-missingNumber.js)
- [274. H-Index](https://leetcode.com/problems/h-index/) - [Solution](./Medium/274-hIndex.js)
- [284. Peeking Iterator](https://leetcode.com/problems/peeking-iterator/) - [Solution](./Medium/284-peekingIterator.java)
- [300. Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) - [Solution](./Medium/300-longestIncreasingSubsequence.js)
- [309. Best Time to Buy and Sell Stock with Cooldown](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown/) - [Solution](./Medium/309-bestTimeStockCooldown.js)
- [318. Maximum Product of Word Lengths](https://leetcode.com/problems/maximum-product-of-word-lengths/) - [Solution](./Medium/318-maximumProductWordLengths.js)
- [319. Bulb Switcher](https://leetcode.com/problems/bulb-switcher/) - [Solution](./Medium/319-bulbSwitcher.js)
- [331. Verify Preorder Serialization of a Binary Tree](https://leetcode.com/problems/verify-preorder-serialization-of-a-binary-tree/) - [Solution](./Medium/331-verifyBinaryTree.js)
- [337. House Robber III](https://leetcode.com/problems/house-robber-iii/) - [Solution](./Medium/337-houseRobberIII.js)
- [338. Counting Bits](https://leetcode.com/problems/counting-bits/) - [Solution](./Medium/338-countingBits.js)
- [347. Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) - [Solution](./Medium/247-topKFrequentElements.js)
- [515. Find Largest Value in Each Tree Row](https://leetcode.com/problems/find-largest-value-in-each-tree-row/) - [Solution](./Medium/515-largestValEachTree.js)

##### Hard

- [23. Merge k Sorted Lists](https://leetcode.com/problems/merge-k-sorted-lists/) - [Solution](./Hard/23-MergeKSortedLists.js)
- [25. Reverse Nodes in k-Group](https://leetcode.com/problems/reverse-nodes-in-k-group/) - [Solution](./Hard/25-reverseNodesInKGroup.js)
- [32. Longest Valid Parentheses](https://leetcode.com/problems/longest-valid-parentheses/) - [Solution](./Hard/32-longestValidParentheses.js)
- [41. First Missing Positive](https://leetcode.com/problems/first-missing-positive/) - [Solution](./Hard/41-firstMissingPositive.js)
- [45. Jump Game II](https://leetcode.com/problems/jump-game-ii/) - [Solution](./Hard/45-jumpGameII.js)
- [56. Merge Intervals](https://leetcode.com/problems/merge-intervals/) - [Solution](./Hard/56-MergeIntervals.js)
- [57. Insert Interval](https://leetcode.com/problems/insert-interval/) - [Solution](./Hard/57-insertInterval.js)
- [65. Valid Number](https://leetcode.com/problems/valid-number/) - [Solution](./Hard/65-validNumber.js)
- [115. Distinct Subsequences](https://leetcode.com/problems/distinct-subsequences/) - [Solution](./Hard/115-distinctSubsequences.js)
- [117. Populating Next Right Pointers in Each Node II](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii/) - [Solution](./Hard/117-populatingNextRightII.js)
- [123. Best Time to Buy and Sell Stock III](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/) - [Solution](./Hard/123-bestTimeBuySellStockIII.js)
- [132. Palindrome Partitioning II](https://leetcode.com/problems/palindrome-partitioning-ii/) - [Solution](./Hard/132-palindromePartitioningII.js)
- [145. Binary Tree Postorder Traversal](https://leetcode.com/problems/binary-tree-postorder-traversal/) - [Solution](./Hard/145-binaryTreePostorder.js)
- [154. Find Minimum in Rotated Sorted Array II](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii/) - [Solution](./Hard/154-findMinimumInRotatedSortedArray-II.js)
- [273. Integer to English Words](https://leetcode.com/problems/integer-to-english-words/) - [Solution](./Hard/273-integerToEnglish.js)
- [287. Find the Duplicate Number](https://leetcode.com/problems/find-the-duplicate-number/) - [Solution](./Hard/287-findDuplicateNumber.js)

# <span id="asymptotic-notation"></span>Asymptotic Notation

### Definition:

Asymptotic Notation is the hardware independent notation used to tell the time and space complexity of an algorithm. Meaning it’s a standardized way of measuring how much memory an algorithm uses or how long it runs for given an input.

### Complexities

The following are the Asymptotic rates of growth from best to worst:

- constant growth - `O(1)` Runtime is constant and does not grow with `n`
- logarithmic growth – `O(log n)` Runtime grows logarithmically in proportion to `n`
- linear growth – `O(n)` Runtime grows directly in proportion to `n`
- superlinear growth – `O(n log n)` Runtime grows in proportion _and_ logarithmically to `n`
- polynomial growth – `O(n^c)` Runtime grows quicker than previous all based on `n`
- exponential growth – `O(c^n)` Runtime grows even faster than polynomial growth based on `n`
- factorial growth – `O(n!)` Runtime grows the fastest and becomes quickly unusable for even small values of `n` [(source: Soumyadeep Debnath, _Analysis of Algorithms | Big-O analysis_)](https://www.geeksforgeeks.org/analysis-algorithms-big-o-analysis/) Visualized below; the x-axis representing input size and the y-axis representing complexity: ![#](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Comparison_computational_complexity.svg/400px-Comparison_computational_complexity.svg.png) [(source: Wikipedia, _Computational Complexity of Mathematical Operations_)](https://en.wikipedia.org/wiki/Computational_complexity_of_mathematical_operations)

### Big-O notation

Big-O refers to the upper bound of time or space complexity of an algorithm, meaning it worst case runtime scenario. An easy way to think of it is that runtime could be better than Big-O but it will never be worse.

### Big-Ω (Big-Omega) notation

Big-Omega refers to the lower bound of time or space complexity of an algorithm, meaning it is the best runtime scenario. Or runtime could worse than Big-Omega, but it will never be better.

### Big-θ (Big-Theta) notation

Big-Theta refers to the tight bound of time or space complexity of an algorithm. Another way to think of it is the intersection of Big-O and Big-Omega, or more simply runtime is guaranteed to be a given complexity, such as `n log n`.

### What you need to know

- Big-O and Big-Theta are the most common and helpful notations
- Big-O does _not_ mean Worst Case Scenario, Big-Theta does _not_ mean average case, and Big-Omega does _not_ mean Best Case Scenario. They only connote the algorithm’s performance for a particular scenario, and all three can be used for any scenario.
- Worst Case means given an unideal input, Average Case means given a typical input, Best case means a ideal input. Ex. Worst case means given an input the algorithm performs particularly bad, or best case an already sorted array for a sorting algorithm.
- Best Case and Big Omega are generally not helpful since Best Cases are rare in the real world and lower bound might be very different than an upper bound.
- Big-O isn’t everything. On paper merge sort is faster than quick sort, but in practice quick sort is superior.

# <span id="data-structures"></span>Data Structures

### <span id="array"></span> Array

### Definition

- Stores data elements based on an sequential, most commonly 0 based, index.
- Based on [tuples](http://en.wikipedia.org/wiki/Tuple) from set theory.
- They are one of the oldest, most commonly used data structures.

### What you need to know

- Optimal for indexing; bad at searching, inserting, and deleting (except at the end).
- **Linear arrays**, or one dimensional arrays, are the most basic.
  - Are static in size, meaning that they are declared with a fixed size.
- **Dynamic arrays** are like one dimensional arrays, but have reserved space for additional elements.
  - If a dynamic array is full, it copies its contents to a larger array.
- **Multi dimensional arrays** nested arrays that allow for multiple dimensions such as an array of arrays providing a 2 dimensional spacial representation via x, y coordinates.

### Time Complexity

- Indexing: Linear array: `O(1)`, Dynamic array: `O(1)`
- Search: Linear array: `O(n)`, Dynamic array: `O(n)`
- Optimized Search: Linear array: `O(log n)`, Dynamic array: `O(log n)`
- Insertion: Linear array: n/a, Dynamic array: `O(n)`

### <span id="linked-list"></span> Linked List

### Definition

- Stores data with **nodes** that point to other nodes.
  - Nodes, at its most basic it has one datum and one reference (another node).
  - A linked list _chains_ nodes together by pointing one node’s reference towards another node.

### What you need to know

- Designed to optimize insertion and deletion, slow at indexing and searching.
- **Doubly linked list** has nodes that also reference the previous node.
- **Circularly linked list** is simple linked list whose **tail**, the last node, references the **head**, the first node.
- **Stack**, commonly implemented with linked lists but can be made from arrays too.
  - Stacks are **last in, first out** (LIFO) data structures.
  - Made with a linked list by having the head be the only place for insertion and removal.
- **Queues**, too can be implemented with a linked list or an array.
  - Queues are a **first in, first out** (FIFO) data structure.
  - Made with a doubly linked list that only removes from head and adds to tail.

### Time Complexity

- Indexing: Linked Lists: `O(n)`
- Search: Linked Lists: `O(n)`
- Optimized Search: Linked Lists: `O(n)`
- Append: Linked Lists: `O(1)`
- Prepend: Linked Lists: `O(1)`
- Insertion: Linked Lists: `O(n)`

### <span id="hash"></span> Hash Table or Hash Map

### Definition

- Stores data with key value pairs.
- **Hash functions** accept a key and return an output unique only to that specific key.
  - This is known as **hashing**, which is the concept that an input and an output have a one-to-one correspondence to map information.
  - Hash functions return a unique address in memory for that data.

### What you need to know

- Designed to optimize searching, insertion, and deletion.
- **Hash collisions** are when a hash function returns the same output for two distinct inputs.
  - All hash functions have this problem.
  - This is often accommodated for by having the hash tables be very large.
- Hashes are important for associative arrays and database indexing.

### Time Complexity

- Indexing: Hash Tables: `O(1)`
- Search: Hash Tables: `O(1)`
- Insertion: Hash Tables: `O(1)`

### <span id="binary-tree"></span> Binary Tree

### Definition

- Is a tree like data structure where every node has at most two children.
  - There is one left and right child node.

### What you need to know

- Designed to optimize searching and sorting.
- A **degenerate tree** is an unbalanced tree, which if entirely one-sided, is essentially a linked list.
- They are comparably simple to implement than other data structures.
- Used to make **binary search trees**.
  - A binary tree that uses comparable keys to assign which direction a child is.
  - Left child has a key smaller than its parent node.
  - Right child has a key greater than its parent node.
  - There can be no duplicate node.
  - Because of the above it is more likely to be used as a data structure than a binary tree.

### Time Complexity

- Indexing: Binary Search Tree: `O(log n)`
- Search: Binary Search Tree: `O(log n)`
- Insertion: Binary Search Tree: `O(log n)`

# <span id="algorithms"></span> Algorithms

## <span id="algorithm-basics"></span> Algorithm Basics

### Recursive Algorithms

### Definition

- An algorithm that calls itself in its definition.
  - **Recursive case** a conditional statement that is used to trigger the recursion.
  - **Base case** a conditional statement that is used to break the recursion.

### What you need to know

- **Stack level too deep** and **stack overflow**.
  - If you’ve seen either of these from a recursive algorithm, you messed up.
  - It means that your base case was never triggered because it was faulty or the problem was so massive you ran out of alloted memory.
  - Knowing whether or not you will reach a base case is integral to correctly using recursion.
  - Often used in Depth First Search

### Iterative Algorithms

### Definition

- An algorithm that is called repeatedly but for a finite number of times, each time being a single iteration.
  - Often used to move incrementally through a data set.

### What you need to know

- Generally you will see iteration as loops, for, while, and until statements.
- Think of iteration as moving one at a time through a set.
- Often used to move through an array.

### Recursion Vs. Iteration

- The differences between recursion and iteration can be confusing to distinguish since both can be used to implement the other. But know that,
  - Recursion is, usually, more expressive and easier to implement.
  - Iteration uses less memory.
- **Functional languages** tend to use recursion. (i.e. Haskell)
- **Imperative languages** tend to use iteration. (i.e. Ruby)
- Check out this [Stack Overflow post](http://stackoverflow.com/questions/19794739/what-is-the-difference-between-iteration-and-recursion) for more info.

### Pseudo Code of Moving Through an Array

    | Recursion                    | Iteration                     |
    | ---------------------------- | ----------------------------- |
    | recursive method (array, n)  | iterative method (array)      |
    | if array[n] is not nil       | for n from 0 to size of array |
    | print array[n]               | print(array[n])               |
    | recursive method(array, n+1) |
    | else                         |
    | exit loop                    |

### Greedy Algorithms

### Definition

- An algorithm that, while executing, selects only the information that meets a certain criteria.
- The general five components, taken from [Wikipedia](http://en.wikipedia.org/wiki/Greedy_algorithm#Specifics):
  - A candidate set, from which a solution is created.
  - A selection function, which chooses the best candidate to be added to the solution.
  - A feasibility function, that is used to determine if a candidate can be used to contribute to a solution.
  - An objective function, which assigns a value to a solution, or a partial solution.
  - A solution function, which will indicate when we have discovered a complete solution.

### What you need to know

- Used to find the expedient, though non-optimal, solution for a given problem.
- Generally used on sets of data where only a small proportion of the information evaluated meets the desired result.
- Often a greedy algorithm can help reduce the Big O of an algorithm.

### Pseudo Code of a Greedy Algorithm to Find Largest Difference of any Two Numbers in an Array.

    greedy algorithm (array)
      let largest difference = 0
      let new difference = find next difference (array[n], array[n+1])
      largest difference = new difference if new difference is > largest difference
      repeat above two steps until all differences have been found
      return largest difference

This algorithm never needed to compare all the differences to one another, saving it an entire iteration.

## <span id="search-algorithms"></span>Search Algorithms

### <span id="breadth-first-search"></span>Breadth First Search

### Definition

- An algorithm that searches a tree (or graph) by searching levels of the tree first, starting at the root.
  - It finds every node on the same level, most often moving left to right.
  - While doing this it tracks the children nodes of the nodes on the current level.
  - When finished examining a level it moves to the left most node on the next level.
  - The bottom-right most node is evaluated last (the node that is deepest and is farthest right of it’s level).

### What you need to know

- Optimal for searching a tree that is wider than it is deep.
- Uses a queue to store information about the tree while it traverses a tree.
  - Because it uses a queue it is more memory intensive than **depth first search**.
  - The queue uses more memory because it needs to stores pointers

### Time Complexity

- Search: Breadth First Search: O(V + E)
- E is number of edges
- V is number of vertices

### <span id="depth-first-search"></span>Depth First Search

### Definition

- An algorithm that searches a tree (or graph) by searching depth of the tree first, starting at the root.
  - It traverses left down a tree until it cannot go further.
  - Once it reaches the end of a branch it traverses back up trying the right child of nodes on that branch, and if possible left from the right children.
  - When finished examining a branch it moves to the node right of the root then tries to go left on all it’s children until it reaches the bottom.
  - The right most node is evaluated last (the node that is right of all it’s ancestors).

### What you need to know

- Optimal for searching a tree that is deeper than it is wide.
- Uses a stack to push nodes onto.
  - Because a stack is LIFO it does not need to keep track of the nodes pointers and is therefore less memory intensive than breadth first search.
  - Once it cannot go further left it begins evaluating the stack.

### Time Complexity

- Search: Depth First Search: O(|E| + |V|)
- E is number of edges
- V is number of vertices

### Breadth First Search Vs. Depth First Search

- The simple answer to this question is that it depends on the size and shape of the tree.
  - For wide, shallow trees use Breadth First Search
  - For deep, narrow trees use Depth First Search

### Nuances

- Because BFS uses queues to store information about the nodes and its children, it could use more memory than is available on your computer. (But you probably won’t have to worry about this.)
- If using a DFS on a tree that is very deep you might go unnecessarily deep in the search. See [xkcd](http://xkcd.com/761/) for more information.
- Breadth First Search tends to be a looping algorithm.
- Depth First Search tends to be a recursive algorithm.

## <span id="sorting-algorithms"></span>Sorting Algorithms

### <span id="selection-sort"></span>Selection Sort

### Definition

- A comparison based sorting algorithm.
  - Starts with the cursor on the left, iterating left to right
  - Compares the left side to the right, looking for the smallest known item
    - If the left is smaller than the item to the right it continues iterating
    - If the left is bigger than the item to the right, the item on the right becomes the known smallest number
    - Once it has checked all items, it moves the known smallest to the cursor and advances the cursor to the right and starts over
  - As the algorithm processes the data set, it builds a fully sorted left side of the data until the entire data set is sorted
- Changes the array in place.

### What you need to know

- Inefficient for large data sets.
- Very simple to implement.

### Time Complexity

- Best Case Sort: Merge Sort: `O(n^2)`
- Average Case Sort: Merge Sort: `O(n^2)`
- Worst Case Sort: Merge Sort: `O(n^2)`

### Space Complexity

- Worst Case: `O(1)`

### Visualization

![#](https://upload.wikimedia.org/wikipedia/commons/9/94/Selection-Sort-Animation.gif) [(source: Wikipedia, _Insertion Sort_)](https://en.wikipedia.org/wiki/Selection_sort)

### <span id="insertion-sort"></span>Insertion Sort

### Definition

- A comparison based sorting algorithm.
  - Iterates left to right comparing the current cursor to the previous item.
  - If the cursor is smaller than the item on the left it swaps positions and the cursor compares itself again to the left hand side until it is put in its sorted position.
  - As the algorithm processes the data set, the left side becomes increasingly sorted until it is fully sorted.
- Changes the array in place.

### What you need to know

- Inefficient for large data sets, but can be faster for than other algorithms for small ones.
- Although it has an `O(n^2)`, in practice it slightly less since its comparison scheme only requires checking place if its smaller than its neighbor.

### Time Complexity

- Best Case: `O(n)`
- Average Case: `O(n^2)`
- Worst Case: `O(n^2)`

### Space Complexity

- Worst Case: `O(n)`

### Visualization

![#](https://upload.wikimedia.org/wikipedia/commons/0/0f/Insertion-sort-example-300px.gif) [(source: Wikipedia, _Insertion Sort_)](https://en.wikipedia.org/wiki/Insertion_sort)

### <span id="merge-sort"></span>Merge Sort

### Definition

- A divide and conquer algorithm.
  - Recursively divides entire array by half into subsets until the subset is one, the base case.
  - Once the base case is reached results are returned and sorted ascending left to right.
  - Recursive calls are returned and the sorts double in size until the entire array is sorted.

### What you need to know

- This is one of the fundamental sorting algorithms.
- Know that it divides all the data into as small possible sets then compares them.

### Time Complexity

- Worst Case: `O(n log n)`
- Average Case: `O(n log n)`
- Best Case: `O(n)`

### Space Complexity

- Worst Case: `O(1)`

### Visualization

![#](https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Merge_sort_algorithm_diagram.svg/400px-Merge_sort_algorithm_diagram.svg.png) [(source: Wikipedia, _Merge Sort_)](https://en.wikipedia.org/wiki/Merge_sort)

### <span id="quick-sort"></span>Quicksort

### Definition

- A divide and conquer algorithm
  - Partitions entire data set in half by selecting a random pivot element and putting all smaller elements to the left of the element and larger ones to the right.
  - It repeats this process on the left side until it is comparing only two elements at which point the left side is sorted.
  - When the left side is finished sorting it performs the same operation on the right side.
- Computer architecture favors the quicksort process.
- Changes the array in place.

### What you need to know

- While it has the same Big O as (or worse in some cases) many other sorting algorithms it is often faster in practice than many other sorting algorithms, such as merge sort.

### Time Complexity

- Worst Case: `O(n^2)`
- Average Case: `O(n log n)`
- Best Case: `O(n log n)`

### Space Complexity

- Worst Case: `O(log n)`

### Visualization

![#](https://upload.wikimedia.org/wikipedia/commons/6/6a/Sorting_quicksort_anim.gif) [(source: Wikipedia, _Quicksort_)](https://en.wikipedia.org/wiki/Quicksort)

### Merge Sort Vs. Quicksort

- Quicksort is likely faster in practice, but merge sort is faster on paper.
- Merge Sort divides the set into the smallest possible groups immediately then reconstructs the incrementally as it sorts the groupings.
- Quicksort continually partitions the data set by a pivot, until the set is recursively sorted.

## <span id="additional-resources"></span>Additional Resources

[Khan Academy’s Algorithm Course](https://www.khanacademy.org/computing/computer-science/algorithms)

### What is ARIA and when should you use it?

### Answer

ARIA stands for “Accessible Rich Internet Applications”, and is a technical specification created by the World Wide Web Consortium (W3C). Better known as WAI-ARIA, it provides additional HTML attributes in the development of web applications to offer people who use assistive technologies (AT) a more robust and interoperable experience with dynamic components. By providing the component’s role, name, and state, AT users can better understand how to interact with the component. WAI-ARIA should only be used when an HTML element equivalent is not available or lacks full browser or AT support. WAI-ARIA’s semantic markup coupled with JavaScript works to provide an understandable and interactive experience for people who use AT. An example using ARIA:

…

Credit: W3C’s [ARIA 1.1 Combobox with Grid Popup Example](https://w3c.github.io/aria-practices/examples/combobox/aria1.1pattern/grid-combo.html)

### Don’t forget:

- Accessible Rich Internet Applications
- Benefits people who use assistive technologies (AT)
- Provides role, name, and state
- Semantic HTML coupled with JavaScript

### Additional links

- [WAI-ARIA Overview](https://www.w3.org/WAI/standards-guidelines/aria/)
- [WAI-ARIA Spec](https://www.w3.org/TR/wai-aria/)
- [ARIA Serious? Eric Eggert presentation](https://youtu.be/4bH57rWPnYo)

### What is the minimum recommended ratio of contrast between foreground text and background to comply with WCAG? Why does this matter?

### Answer

4.5:1 is the calculated contrast ratio between foreground text and background that is recommended by the Web Content Accessibiity Guidelines (WCAG) success criteria (SC) 1.4.3: Contrast (Minimum). This SC was written by the World Wide Web Consortium (W3C) to ensure that people with low vision or color deficiencies are able to read (perceive) important content on a web page. It goes beyond color choices to ensure text stands out on the background it’s placed on.

### Don’t forget:

- At least 4.5:1 contrast ratio between foreground text and background
- Benefits people with low vision or color deficiencies

### Additional links

- [Understanding SC 1.4.3](https://www.alaskawebdev.com/contact)
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Contrast Ratio checker](https://contrast-ratio.com/#)

### What are some of the tools available to test the accessibility of a website or web application?

### Answer

There are multiple tools that can help you to find for accessibility issues in your website or application. Check for issues in your website:

- Lighthouse from Google, it provides an option for accessibility testing, it will check for the compliance of different accessibility standards and give you an score with details on the different issues
- Axe Coconut from DequeLabs, it is a Chrome extension that adds a tab in the Developer tools, it will check for accessibility issues and it will classify them by severity and suggest possible solutions Check for issues in your code: \* Jest Axe, you can add unit tests for accessibility \* React Axe, test your React application with the axe-core accessibility testing library. Results will show in the Chrome DevTools console. \* eslint-plugin-jsx-a11y, pairing this plugin with an editor lint plugin, you can bake accessibility standards into your application in real-time. Check for individual issues: \* Color Contrast checkers \* Use a screen reader \* Use only keyboard to navigate your site

### Don’t forget:

- None of the tools will replace manual testing
- Mention of different ways to test accessibility

### Additional links

- [Jest Axe](https://github.com/nickcolley/jest-axe)
- [eslint-plugin-jsx-a11y](https://www.w3.org/TR/wai-aria/)
- [React axe](https://github.com/dequelabs/react-axe)
- [Accessibility Checklist](http://romeo.elsevier.com/accessibility_checklist/)

### What is the Accessibility Tree?

### Answer

The Accessibility Tree is a structure produced by the browser’s Accessibility APIs which provides accessibility information to assistive technologies such as screen readers. It runs parallel to the DOM and is similar to the DOM API, but with much fewer nodes, because a lot of that information is only useful for visual presentation. By writing semantic HTML we can take advantage of this process in creating an accessible experience for our users.

### Don’t forget:

- Tree structure exposing information to assistive technologies
- Runs parallel to the DOM
- Semantic HTML is essential in creating accessible experiences

### Additional links

- [Accessibility APIs](https://www.smashingmagazine.com/2015/03/web-accessibility-with-accessibility-api/)

### What is the purpose of the `alt` attribute on images?

### Answer

The `alt` attribute provides alternative information for an image if a user cannot view it. The `alt` attribute should be used to describe any images except those which only serve a decorative purpose, in which case it should be left empty.

### Don’t forget:

- Decorative images should have an empty `alt` attribute.
- Web crawlers use `alt` tags to understand image content, so they are considered important for Search Engine Optimization (SEO).
- Put the `.` at the end of `alt` tag to improve accessibility.

### Additional links

- [A good basis for accessibility](https://developer.mozilla.org/en-US/docs/Learn/Accessibility/HTML)

### What are `defer` and `async` attributes on a `<script>` tag?

### Answer

If neither attribute is present, the script is downloaded and executed synchronously, and will halt parsing of the document until it has finished executing (default behavior). Scripts are downloaded and executed in the order they are encountered. The `defer` attribute downloads the script while the document is still parsing but waits until the document has finished parsing before executing it, equivalent to executing inside a `DOMContentLoaded` event listener. `defer` scripts will execute in order. The `async` attribute downloads the script during parsing the document but will pause the parser to execute the script before it has fully finished parsing. `async` scripts will not necessarily execute in order. Note: both attributes must only be used if the script has a `src` attribute (i.e. not an inline script).

    <script src="myscript.js"></script>
    <script src="myscript.js" defer></script>
    <script src="myscript.js" async></script>

### Don’t forget:

- Placing a `defer` script in the `<head>` allows the browser to download the script while the page is still parsing, and is therefore a better option than placing the script before the end of the body.
- If the scripts rely on each other, use `defer`.
- If the script is independent, use `async`.
- Use `defer` if the DOM must be ready and the contents are not placed within a `DOMContentLoaded` listener.

### Additional links

- [async vs defer attributes](http://www.growingwiththeweb.com/2014/02/async-vs-defer-attributes.html)

### What is an `async` function?

```js
    async function foo() {
      ...
    }

```

### Answer

An `async` function is a function that allows you to pause the function’s execution while it waits for (`await`s) a promise to resolve. It’s an abstraction on top of the Promise API that makes asynchronous operations _look_ like they’re synchronous. `async` functions automatically return a Promise object. Whatever you `return` from the `async` function will be the promise’s _resolution_. If instead you `throw` from the body of an `async` function, that will be how your async function _rejects_ the promise it returns. Most importantly, `async` functions are able to use the `await` keyword in their function body, which **pauses the function** until the operation after the `await` completes, and allows it to return that operation’s result to a variable synchronously.

```js
// Normal promises in regular function:
function foo() {
  promiseCall().then((result) => {
    // do something with the result
  });
}
// async functions
async function foo() {
  const result = await promiseCall();
  // do something with the result
}
```

### Don’t forget:

- `async` functions are just syntactic sugar on top of Promises.
- They make asynchronous operations look like synchronous operations in your function.
- They implicitly return a promise which resolves to whatever your `async` function returns, and reject to whatever your `async` function `throw`s.

### Additional links

- [MDN Docs - async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [MDN Docs - await](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/await)

### Create a function `batches` that returns the maximum number of whole batches that can be cooked from a recipe.

```js
/**
    It accepts two objects as arguments: the first object is the recipe
    for the food, while the second object is the available ingredients.
    Each ingredient's value is a number representing how many units there are.
    `batches(recipe, available)`
    */
// 0 batches can be made
batches(
  { milk: 100, butter: 50, flour: 5 },
  { milk: 132, butter: 48, flour: 51 }
);
batches(
  { milk: 100, flour: 4, sugar: 10, butter: 5 },
  { milk: 1288, flour: 9, sugar: 95 }
);
// 1 batch can be made
batches(
  { milk: 100, butter: 50, cheese: 10 },
  { milk: 198, butter: 52, cheese: 10 }
);
// 2 batches can be made
batches(
  { milk: 2, sugar: 40, butter: 20 },
  { milk: 5, sugar: 120, butter: 500 }
);
```

### Answer

We must have all ingredients of the recipe available, and in quantities that are more than or equal to the number of units required. If just one of the ingredients is not available or lower than needed, we cannot make a single batch. Use `Object.keys()` to return the ingredients of the recipe as an array, then use `Array.prototype.map()` to map each ingredient to the ratio of available units to the amount required by the recipe. If one of the ingredients required by the recipe is not available at all, the ratio will evaluate to `NaN`, so the logical OR operator can be used to fallback to `0` in this case. Use the spread `...` operator to feed the array of all the ingredient ratios into `Math.min()` to determine the lowest ratio. Passing this entire result into `Math.floor()` rounds down to return the maximum number of whole batches.

```js
const batches = (recipe, available) =>
  Math.floor(
    Math.min(...Object.keys(recipe).map((k) => available[k] / recipe[k] || 0))
  );
```

### Don’t forget:

### Additional links

### What is CSS BEM?

### Answer

The BEM methodology is a naming convention for CSS classes in order to keep CSS more maintainable by defining namespaces to solve scoping issues. BEM stands for Block Element Modifier which is an explanation for its structure. A Block is a standalone component that is reusable across projects and acts as a “namespace” for sub components (Elements). Modifiers are used as flags when a Block or Element is in a certain state or is different in structure or style.

```css
/* block component */
.block {
}
/* element */
.block__element {
}
/* modifier */
.block__element--modifier {
}
```

Here is an example with the class names on markup:

```html
<nav class="navbar">
  <a href="/" class="navbar__link navbar__link--active"></a>
  <a href="/" class="navbar__link"></a>
  <a href="/" class="navbar__link"></a>
</nav>
```

In this case, `navbar` is the Block, `navbar__link` is an Element that makes no sense outside of the `navbar` component, and `navbar__link--active` is a Modifier that indicates a different state for the `navbar__link` Element. Since Modifiers are verbose, many opt to use `is-*` flags instead as modifiers.

    <a href="/" class="navbar__link is-active"></a>

These must be chained to the Element and never alone however, or there will be scope issues.

```css
.navbar__link.is-active {
}
```

### Don’t forget:

- Alternative solutions to scope issues like CSS-in-JS

### Additional links

- [Writing clean and maintainable CSS](https://hackernoon.com/writing-clean-and-maintainable-css-using-bem-methodology-1dcbf810a664)

### What is Big O Notation?

### Answer

Big O notation is used in Computer Science to describe the time complexity of an algorithm. The best algorithms will execute the fastest and have the simplest complexity. Algorithms don’t always perform the same and may vary based on the data they are supplied. While in some cases they will execute quickly, in other cases they will execute slowly, even with the same number of elements to deal with. In these examples, the base time is 1 element = `1ms`.

### O(1)

```js
arr[arr.length - 1];
```

- 1000 elements = `1ms` Constant time complexity. No matter how many elements the array has, it will theoretically take (excluding real-world variation) the same amount of time to execute.

### O(N)

```js
arr.filter(fn);
```

- 1000 elements = `1000ms` Linear time complexity. The execution time will increase linearly with the number of elements the array has. If the array has 1000 elements and the function takes 1ms to execute, 7000 elements will take 7ms to execute. This is because the function must iterate through all elements of the array before returning a result.

### O(\[1, N\])

```js
arr.some(fn);
```

- 1000 elements = `1ms <= x <= 1000ms` The execution time varies depending on the data supplied to the function, it may return very early or very late. The best case here is O(1) and the worst case is O(N).

### O(NlogN)

```js
arr.sort(fn);
```

- 1000 elements ~= `10000ms` Browsers usually implement the quicksort algorithm for the `sort()` method and the average time complexity of quicksort is O(NlgN). This is very efficient for large collections.

### O(N^2)

```js
for (let i = 0; i < arr.length; i++) {
  for (let j = 0; j < arr.length; j++) {
    // ...
  }
}
```

- 1000 elements = `1000000ms` The execution time rises quadratically with the number of elements. Usually the result of nesting loops.

### O(N!)

```js
const permutations = (arr) => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((val) => [
          item,
          ...val,
        ])
      ),
    []
  );
};
```

- 1000 elements = `Infinity` (practically) ms The execution time rises extremely fast with even just 1 addition to the array.

### Don’t forget:

- Be wary of nesting loops as execution time increases exponentially.

### Additional links

- [Big O Notation in JavaScript](https://medium.com/cesars-tech-insights/big-o-notation-javascript-25c79f50b19b)

### Create a standalone function `bind` that is functionally equivalent to the method `Function.prototype.bind`.

```js
function example() {
  console.log(this);
}
```

---

```js
const boundExample = bind(example, { a: true });
boundExample.call({ b: true }); // logs { a: true }
```

### Answer

Return a function that accepts an arbitrary number of arguments by gathering them with the rest `...` operator. From that function, return the result of calling the `fn` with `Function.prototype.apply` to apply the context and the array of arguments to the function.

```js
const bind =
  (fn, context) =>
  (...args) =>
    fn.apply(context, args);
```

### Don’t forget:

### Additional links

### What is the purpose of cache busting and how can you achieve it?

### Answer

Browsers have a cache to temporarily store files on websites so they don’t need to be re-downloaded again when switching between pages or reloading the same page. The server is set up to send headers that tell the browser to store the file for a given amount of time. This greatly increases website speed and preserves bandwidth. However, it can cause problems when the website has been changed by developers because the user’s cache still references old files. This can either leave them with old functionality or break a website if the cached CSS and JavaScript files are referencing elements that no longer exist, have moved or have been renamed. Cache busting is the process of forcing the browser to download the new files. This is done by naming the file something different to the old file. A common technique to force the browser to re-download the file is to append a query string to the end of the file.

- `src="js/script.js"` =&gt; `src="js/script.js?v=2"` The browser considers it a different file but prevents the need to change the file name.

### Don’t forget:

### Additional links

- [Strategies for cache-busting CSS](https://css-tricks.com/strategies-for-cache-busting-css/)

### How can you avoid callback hells?

```js
getData(function (a) {
  getMoreData(a, function (b) {
    getMoreData(b, function (c) {
      getMoreData(c, function (d) {
        getMoreData(d, function (e) {
          // ...
        });
      });
    });
  });
});
```

### Answer

Refactoring the functions to return promises and using `async/await` is usually the best option. Instead of supplying the functions with callbacks that cause deep nesting, they return a promise that can be `await`ed and will be resolved once the data has arrived, allowing the next line of code to be evaluated in a sync-like fashion. The above code can be restructured like so:

```js
async function asyncAwaitVersion() {
  const a = await getData();
  const b = await getMoreData(a);
  const c = await getMoreData(b);
  const d = await getMoreData(c);
  const e = await getMoreData(d);
  // ...
}
```

There are lots of ways to solve the issue of callback hells:

- Modularization: break callbacks into independent functions
- Use a control flow library, like async
- Use generators with Promises
- Use async/await (from v7 on)

### Don’t forget:

- As an efficient JavaScript developer, you have to avoid the constantly growing indentation level, produce clean and readable code and be able to handle complex flows.

### Additional links

- [Avoiding Callback Hell in Node.js](http://stackabuse.com/avoiding-callback-hell-in-node-js/)
- [Asynchronous JavaScript: From Callback Hell to Async and Await](https://blog.hellojs.org/asynchronous-javascript-from-callback-hell-to-async-and-await-9b9ceb63c8e8)

### What is the purpose of callback function as an argument of `setState`?

### Answer

The callback function is invoked when `setState` has finished and the component gets rendered. Since `setState` is asynchronous, the callback function is used for any post action.

```js
setState({ name: "sudheer" }, () => {
  console.log("The name has updated and component re-rendered");
});
```

### Don’t forget:

- The callback function is invoked after `setState` finishes and is used for any post action.
- It is recommended to use lifecycle method rather this callback function.

### Additional links

- [React docs on `setState`](https://reactjs.org/docs/react-component.html#setstate)

### Which is the preferred option between callback refs and findDOMNode()?

### Answer

Callback refs are preferred over the `findDOMNode()` API, due to the fact that `findDOMNode()` prevents certain improvements in React in the future.

```js
// Legacy approach using findDOMNode()
class MyComponent extends Component {
  componentDidMount() {
    findDOMNode(this).scrollIntoView();
  }
  render() {
    return <div />;
  }
}
// Recommended approach using callback refs
class MyComponent extends Component {
  componentDidMount() {
    this.node.scrollIntoView();
  }
  render() {
    return <div ref={(node) => (this.node = node)} />;
  }
}
```

### Don’t forget:

- Callback refs are preferred over `findDOMNode()`.

### Additional links

- [React docs on Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html#exposing-dom-refs-to-parent-components)

### What is a callback? Can you show an example using one?

### Answer

Callbacks are functions passed as an argument to another function to be executed once an event has occurred or a certain task is complete, often used in asynchronous code. Callback functions are invoked later by a piece of code but can be declared on initialization without being invoked. As an example, event listeners are asynchronous callbacks that are only executed when a specific event occurs.

```js
function onClick() {
  console.log("The user clicked on the page.");
}
document.addEventListener("click", onClick);
```

However, callbacks can also be synchronous. The following `map` function takes a callback function that is invoked synchronously for each iteration of the loop (array element).

```js
const map = (arr, callback) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i));
  }
  return result;
};
map([1, 2, 3, 4, 5], (n) => n * 2); // [2, 4, 6, 8, 10]
```

### Don’t forget:

- Functions are first-class objects in JavaScript
- Callbacks vs Promises

### Additional links

- [MDN docs for callbacks](https://developer.mozilla.org/en-US/docs/Glossary/Callback_function)

### What is the `children` prop?

### Answer

`children` is part of the props object passed to components that allows components to be passed as data to other components, providing the ability to compose components cleanly. There are a number of methods available in the React API to work with this prop, such as `React.Children.map`, `React.Children.forEach`, `React.Children.count`, `React.Children.only` and `React.Children.toArray`. A simple usage example of the children prop is as follows:

```js
function GenericBox({ children }) {
  return <div className="container">{children}</div>;
}
function App() {
  return (
    <GenericBox>
      <span>Hello</span> <span>World</span>
    </GenericBox>
  );
}
```

### Don’t forget:

- Children is a prop that allows components to be passed as data to other components.
- The React API provides methods to work with this prop.

### Additional links

- [React docs on Children](https://reactjs.org/docs/jsx-in-depth.html#children-in-jsx)

### Why does React use `className` instead of `class` like in HTML?

### Answer

React’s philosophy in the beginning was to align with the browser DOM API rather than HTML, since that more closely represents how elements are created. Setting a `class` on an element meant using the `className` API:

```js
const element = document.createElement("div");
element.className = "hello";
```

Additionally, before ES5, reserved words could not be used in objects:

```js
const element = {
  attributes: {
    class: "hello",
  },
};
```

In IE8, this will throw an error. In modern environments, destructuring will throw an error if trying to assign to a variable:

```js

    const { class } = this.props // Error
    const { className } = this.props // All good
    const { class: className } =
        this.props // All good, but
            cumbersome!
```

However, `class` _can_ be used as a prop without problems, as seen in other libraries like Preact. React currently allows you to use `class`, but will throw a warning and convert it to `className` under the hood. There is currently an open thread (as of January 2019) discussing changing `className` to `class` to reduce confusion.

### Don’t forget:

### Additional links

### How do you clone an object in JavaScript?

### Answer

Using the object spread operator `...`, the object’s own enumerable properties can be copied into the new object. This creates a shallow clone of the object.

```js
const obj = { a: 1, b: 2 };
const shallowClone = { ...obj };
```

With this technique, prototypes are ignored. In addition, nested objects are not cloned, but rather their references get copied, so nested objects still refer to the same objects as the original. Deep-cloning is much more complex in order to effectively clone any type of object (Date, RegExp, Function, Set, etc) that may be nested within the object. Other alternatives include:

- `JSON.parse(JSON.stringify(obj))` can be used to deep-clone a simple object, but it is CPU-intensive and only accepts valid JSON (therefore it strips functions and does not allow circular references).
- `Object.assign({}, obj)` is another alternative.
- `Object.keys(obj).reduce((acc, key) => (acc[key] = obj[key], acc), {})` is another more verbose alternative that shows the concept in greater depth.

### Don’t forget:

- JavaScript passes objects by reference, meaning that nested objects get their references copied, instead of their values.
- The same method can be used to merge two objects.

### Additional links

- [MDN docs for Object.assign()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)
- [Clone an object in vanilla JS](http://voidcanvas.com/clone-an-object-in-vanilla-js-in-depth/)

### What is a closure? Can you give a useful example of one?

### Answer

A closure is a function defined inside another function and has access to its lexical scope even when it is executing outside its lexical scope. The closure has access to variables in three scopes:

- Variables declared in its own scope
- Variables declared in the scope of the parent function
- Variables declared in the global scope In JavaScript, all functions are closures because they have access to the outer scope, but most functions don’t utilise the usefulness of closures: the persistence of state. Closures are also sometimes called stateful functions because of this. In addition, closures are the only way to store private data that can’t be accessed from the outside in JavaScript. They are the key to the UMD (Universal Module Definition) pattern, which is frequently used in libraries that only expose a public API but keep the implementation details private, preventing name collisions with other libraries or the user’s own code.

### Don’t forget:

- Closures are useful because they let you associate data with a function that operates on that data.
- A closure can substitute an object with only a single method.
- Closures can be used to emulate private properties and methods.

### Additional links

- [MDN docs for closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- [What is a closure](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-closure-b2f0d2152b36)
- [I never understood JavaScript closures](https://medium.com/dailyjs/i-never-understood-javascript-closures-9663703368e8)

### How do you compare two objects in JavaScript?

### Answer

Even though two different objects can have the same properties with equal values, they are not considered equal when compared using `==` or `===`. This is because they are being compared by their reference (location in memory), unlike primitive values which are compared by value. In order to test if two objects are equal in structure, a helper function is required. It will iterate through the own properties of each object to test if they have the same values, including nested objects. Optionally, the prototypes of the objects may also be tested for equivalence by passing `true` as the 3rd argument. Note: this technique does not attempt to test equivalence of data structures other than plain objects, arrays, functions, dates and primitive values.

```js
function isDeepEqual(obj1, obj2, testPrototypes = false) {
  if (obj1 === obj2) {
    return true;
  }
  if (typeof obj1 === "function" && typeof obj2 === "function") {
    return obj1.toString() === obj2.toString();
  }
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }
  if (
    Object.prototype.toString.call(obj1) !==
      Object.prototype.toString.call(obj2) ||
    typeof obj1 !== "object"
  ) {
    return false;
  }
  const prototypesAreEqual = testPrototypes
    ? isDeepEqual(
        Object.getPrototypeOf(obj1),
        Object.getPrototypeOf(obj2),
        true
      )
    : true;
  const obj1Props = Object.getOwnPropertyNames(obj1);
  const obj2Props = Object.getOwnPropertyNames(obj2);
  return (
    obj1Props.length === obj2Props.length &&
    prototypesAreEqual &&
    obj1Props.every((prop) => isDeepEqual(obj1[prop], obj2[prop]))
  );
}
```

### Don’t forget:

- Primitives like strings and numbers are compared by their value
- Objects on the other hand are compared by their reference (location in memory)

### Additional links

- [Object Equality in JavaScript](http://adripofjavascript.com/blog/drips/object-equality-in-javascript.html)
- [Deep comparison between two values](https://30secondsofcode.org/object#equals)

### What is context?

### Answer

Context provides a way to pass data through the component tree without having to pass props down manually at every level. For example, authenticated user, locale preference, UI theme need to be accessed in the application by many components.

```js
const { Provider, Consumer } = React.createContext(defaultValue);
```

### Don’t forget:

- Context provides a way to pass data through a tree of React components, without having to manually pass props.
- Context is designed to share data that is considered _global_ for a tree of React components.

### Additional links

- [React docs on Context](https://reactjs.org/docs/context.html)

### What is CORS?

### Answer

Cross-Origin Resource Sharing or CORS is a mechanism that uses additional HTTP headers to grant a browser permission to access resources from a server at an origin different from the website origin. An example of a cross-origin request is a web application served from `http://mydomain.com` that uses AJAX to make a request for `http://yourdomain.com`. For security reasons, browsers restrict cross-origin HTTP requests initiated by JavaScript. `XMLHttpRequest` and `fetch` follow the same-origin policy, meaning a web application using those APIs can only request HTTP resources from the same origin the application was accessed, unless the response from the other origin includes the correct CORS headers.

### Don’t forget:

- CORS behavior is not an error,  it’s a security mechanism to protect users.
- CORS is designed to prevent a malicious website that a user may unintentionally visit from making a request to a legitimate website to read their personal data or perform actions against their will.

### Additional links

- [MDN docs for CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS)

### Describe the layout of the CSS Box Model and briefly describe each component.

### Answer

`Content`: The inner-most part of the box filled with content, such as text, an image, or video player. It has the dimensions `content-box width` and `content-box height`. `Padding`: The transparent area surrounding the content. It has dimensions `padding-box width` and `padding-box height`. `Border`: The area surrounding the padding (if any) and content. It has dimensions `border-box width` and `border-box height`. _Margin_: The transparent outer-most layer that surrounds the border. It separates the element from other elements in the DOM. It has dimensions `margin-box width` and `margin-box height`. ![alt text](https://www.washington.edu/accesscomputing/webd2/student/unit3/images/boxmodel.gif) alt text

### Don’t forget:

- This is a very common question asked during front-end interviews and while it may seem easy, it is critical you know it well!
- Shows a solid understanding of spacing and the DOM

### Additional links

- [W3School’s CSS Box Model Page](https://www.w3schools.com/Css/css_boxmodel.asp)
- [Mozilla’s Intro to the CSS Box Model](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Box_Model/Introduction_to_the_CSS_box_model)

### What are the advantages of using CSS preprocessors?

### Answer

CSS preprocessors add useful functionality that native CSS does not have, and generally make CSS neater and more maintainable by enabling DRY (Don’t Repeat Yourself) principles. Their terse syntax for nested selectors cuts down on repeated code. They provide variables for consistent theming (however, CSS variables have largely replaced this functionality) and additional tools like color functions (`lighten`, `darken`, `transparentize`, etc), mixins, and loops that make CSS more like a real programming language and gives the developer more power to generate complex CSS.

### Don’t forget:

- They allow us to write more maintainable and scalable CSS
- Some disadvantages of using CSS preprocessors (setup, re-compilation time can be slow etc.)

### Additional links

- [CSS Preprocessors](https://medium.com/@garyfagan/css-preprocessors-6f226fa16f27)

### What is the difference between ‘+’ and ‘~’ sibling selectors?.

### Answer

The General Sibling Selector `~` selects all elements that are siblings of a specified element. The following example selects all `<p>` elements that are siblings of `<div>` elements:

    div ~ p {
      background-color: blue;
    }

The Adjacent Sibling Selector `+` selects all elements that are the adjacent siblings of a specified element. The following example will select all `<p>` elements that are placed immediately after `<div>` elements:

```css
div + p {
  background-color: red;
}
```

### Don’t forget:

### Additional links

- [W3School’s CSS Combinators Page](https://www.w3schools.com/css/css_combinators.asp)
- [Mozilla’s Combinators and groups of selectors page](https://developer.mozilla.org/en-US/docs/Learn/CSS/Introduction_to_CSS/Combinators_and_multiple_selectors)

### Can you describe how CSS specificity works?

### Answer

Assuming the browser has already determined the set of rules for an element, each rule is assigned a matrix of values, which correspond to the following from highest to lowest specificity:

- Inline rules (binary - 1 or 0)
- Number of id selectors
- Number of class, pseudo-class and attribute selectors
- Number of tags and pseudo-element selectors When two selectors are compared, the comparison is made on a per-column basis (e.g. an id selector will always be higher than any amount of class selectors, as ids have higher specificity than classes). In cases of equal specificity between multiple rules, the rules that comes last in the page’s style sheet is deemed more specific and therefore applied to the element.

### Don’t forget:

- Specificity matrix: \[inline, id, class/pseudo-class/attribute, tag/pseudo-element\]
- In cases of equal specificity, last rule is applied

### Additional links

- [CSS Specificity](https://www.smashingmagazine.com/2007/07/css-specificity-things-you-should-know/)

### What is debouncing?

### Answer

Debouncing is a process to add some delay before executing a function. It is commonly used with DOM event listeners to improve the performance of page. It is a technique which allow us to “group” multiple sequential calls in a single one. A raw DOM event listeners can easily trigger 20+ events per second. A debounced function will only be called once the delay has passed.

```js
const debounce = (func, delay) => {
  let debounceTimer;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};
window.addEventListere(
  "scroll",
  debounce(function () {
    // Do stuff, this function will be called after a delay of 1 second
  }, 1000)
);
```

### Don’t forget:

- Common use case is to make API call only when user is finished typing while searching.

### Additional links

- [Debouncing explained](https://css-tricks.com/debouncing-throttling-explained-examples/)

### What is the DOM?

### Answer

The DOM (Document Object Model) is a cross-platform API that treats HTML and XML documents as a tree structure consisting of nodes. These nodes (such as elements and text nodes) are objects that can be programmatically manipulated and any visible changes made to them are reflected live in the document. In a browser, this API is available to JavaScript where DOM nodes can be manipulated to change their styles, contents, placement in the document, or interacted with through event listeners.

### Don’t forget:

- The DOM was designed to be independent of any particular programming language, making the structural representation of the document available from a single, consistent API.
- The DOM is constructed progressively in the browser as a page loads, which is why scripts are often placed at the bottom of a page, in the `<head>` with a `defer` attribute, or inside a `DOMContentLoaded` event listener. Scripts that manipulate DOM nodes should be run after the DOM has been constructed to avoid errors.
- `document.getElementById()` and `document.querySelector()` are common functions for selecting DOM nodes.
- Setting the `innerHTML` property to a new value runs the string through the HTML parser, offering an easy way to append dynamic HTML content to a node.

### Additional links

- [MDN docs for DOM](https://developer.mozilla.org/en-US/docs/DOM)

### What is the difference between the equality operators `==` and `===`?

### Answer

Triple equals (`===`) checks for strict equality, which means both the type and value must be the same. Double equals (`==`) on the other hand first performs type coercion so that both operands are of the same type and then applies strict comparison.

### Don’t forget:

- Whenever possible, use triple equals to test equality because loose equality `==` can have unintuitive results.
- Type coercion means the values are converted into the same type.
- Mention of falsy values and their comparison.

### Additional links

- [MDN docs for comparison operators](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comparison_Operators)

### What is the difference between an element and a component in React?

### Answer

An element is a plain JavaScript object that represents a DOM node or component. Elements are pure and never mutated, and are cheap to create. A component is a function or class. Components can have state and take props as input and return an element tree as output (although they can represent generic containers or wrappers and don’t necessarily have to emit DOM). Components can initiate side effects in lifecycle methods (e.g. AJAX requests, DOM mutations, interfacing with 3rd party libraries) and may be expensive to create.

```js

    const Component = () => "Hello";
    const componentElement = <Component />;
    const domNodeElement = <div />;

### Don’t forget:

- Elements are immutable, plain objects that describe the DOM nodes or components you want to render.
- Components can be either classes or functions, that take props as an input and return an element tree as the output.

### Additional links

- [React docs on Rendering Elements](https://reactjs.org/docs/rendering-elements.html)
- [React docs on Components and Props](https://reactjs.org/docs/components-and-props.html)

### What is the difference between `em` and `rem` units?

### Answer

Both `em` and `rem` units are based on the `font-size` CSS property. The only difference is where they inherit their values from.

- `em` units inherit their value from the `font-size` of the parent element
- `rem` units inherit their value from the `font-size` of the root element (`html`) In most browsers, the `font-size` of the root element is set to `16px` by default.

### Don’t forget:

- Benefits of using `em` and `rem` units

### Additional links

- [CSS units for font-size: px | em | rem](https://medium.com/code-better/css-units-for-font-size-px-em-rem-79f7e592bb97)

### What are error boundaries in React?

### Answer

Error boundaries are React components that catch JavaScript errors anywhere in their child component tree, log those errors, and display a fallback UI instead of the component tree that crashed. Class components become error boundaries if they define either (or both) of the lifecycle methods `static getDerivedStateFromError()` or `componentDidCatch().`

    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false };
      }
      // Use componentDidCatch to log the error
      componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        logErrorToMyService(error, info);
      }
      // use getDerivedStateFromError to update state
      static getDerivedStateFromError(error) {
        // Display fallback UI
        return { hasError: true };
      }
      render() {
        if (this.state.hasError) {
          // You can render any custom fallback UI
          return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
      }
    }

```

### Don’t forget:

- Error boundaries only catch errors in the components below them in the tree. An error boundary can’t catch an error within itself.

### Additional links

https://reactjs.org/docs/error-boundaries.html

### What is event delegation and why is it useful? Can you show an example of how to use it?

### Answer

Event delegation is a technique of delegating events to a single common ancestor. Due to event bubbling, events “bubble” up the DOM tree by executing any handlers progressively on each ancestor element up to the root that may be listening to it. DOM events provide useful information about the element that initiated the event via `Event.target`. This allows the parent element to handle behavior as though the target element was listening to the event, rather than all children of the parent or the parent itself. This provides two main benefits:

- It increases performance and reduces memory consumption by only needing to register a single event listener to handle potentially thousands of elements.
- If elements are dynamically added to the parent, there is no need to register new event listeners for them. Instead of:

  document.querySelectorAll("button").forEach((button) => {
  button.addEventListener("click", handleButtonClick);
  });

Event delegation involves using a condition to ensure the child target matches our desired element:

```js
document.addEventListener("click", (e) => {
  if (e.target.closest("button")) {
    handleButtonClick();
  }
});
```

### Don’t forget:

- The difference between event bubbling and capturing

### Additional links

- [Event Delegation](https://davidwalsh.name/event-delegate)

### What is event-driven programming?

### Answer

Event-driven programming is a paradigm that involves building applications that send and receive events. When the program emits events, the program responds by running any callback functions that are registered to that event and context, passing in associated data to the function. With this pattern, events can be emitted into the wild without throwing errors even if no functions are subscribed to it. A common example of this is the pattern of elements listening to DOM events such as `click` and `mouseenter`, where a callback function is run when the event occurs.

````js

    document.addEventListener("click", function (event) {
      // This callback function is run when the user
      // clicks on the document.
    });

Without the context of the DOM, the pattern may look like this:

```js

    const hub = createEventHub();
    hub.on("message", function (data) {
      console.log(`${data.username} said ${data.text}`);
    });
    hub.emit("message", {
      username: "John",
      text: "Hello?",
    });

With this implementation, `on` is the way to _subscribe_ to an event, while `emit` is the way to _publish_ the event.

### Don’t forget:

- Follows a publish-subscribe pattern.
- Responds to events that occur by running any callback functions subscribed to the event.
- Show how to create a simple pub-sub implementation with JavaScript.

### Additional links

- [MDN docs on Events and Handlers](https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Overview_of_Events_and_Handlers)
- [Understanding Node.js event-driven architecture](https://medium.freecodecamp.org/understanding-node-js-event-driven-architecture-223292fcbc2d)

### What is the difference between an expression and a statement in JavaScript?

### Answer

There are two main syntactic categories in JavaScript: expressions and statements. A third one is both together, referred to as an expression statement. They are roughly summarized as:

- **Expression**: produces a value
- **Statement**: performs an action
- **Expression statement**: produces a value and performs an action A general rule of thumb: &gt; If you can print it or assign it to a variable, it’s an expression. If you can’t, it’s a statement.

### Statements

    let x = 0;
    function declaration() {}
    if (true) {
    }

Statements appear as instructions that do something but don’t produce values.
```js

    // Assign `x` to the absolute value of `y`.
    let x;
    if (y >= 0) {
      x = y;
    } else {
      x = -y;
    }

The only expression in the above code is `y >= 0` which produces a value, either `true` or `false`. A value is not produced by other parts of the code.

### Expressions

Expressions produce a value. They can be passed around to functions because the interpreter replaces them with the value they resolve to.

    5 + 5; // => 10
    lastCharacter("input"); // => "t"
    true === true; // => true

### Expression statements

There is an equivalent version of the set of statements used before as an expression using the conditional operator:
```js

    // Assign `x` as the absolute value of `y`.
    let x = y >= 0 ? y : -y;

This is both an expression and a statement, because we are declaring a variable `x` (statement) as an evaluation (expression).

### Don’t forget:

- Function declarations vs function expressions

### Additional links

- [What is the difference between a statement and an expression?](https://stackoverflow.com/questions/12703214/javascript-difference-between-a-statement-and-an-expression)

### What are truthy and falsy values in JavaScript?

### Answer

A value is either truthy or falsy depending on how it is evaluated in a Boolean context. Falsy means false-like and truthy means true-like. Essentially, they are values that are coerced to `true` or `false` when performing certain operations. There are 6 falsy values in JavaScript. They are:

- `false`
- `undefined`
- `null`
- `""` (empty string)
- `NaN`
- `0` (both `+0` and `-0`) Every other value is considered truthy. A value’s truthiness can be examined by passing it into the `Boolean` function.

  Boolean(""); // false
  Boolean([]); // true

There is a shortcut for this using the logical NOT `!` operator. Using `!` once will convert a value to its inverse boolean equivalent (i.e. not false is true), and `!` once more will convert back, thus effectively converting the value to a boolean.

    !!""; // false
    !![]; // true

### Don’t forget:

### Additional links

- [Truthy on MDN](https://developer.mozilla.org/en/docs/Glossary/Truthy)
- [Falsy on MDN](https://developer.mozilla.org/en-US/docs/Glossary/Falsy)

### Generate an array, containing the Fibonacci sequence, up until the nth term.

### Answer

Initialize an empty array of length `n`. Use `Array.prototype.reduce()` to add values into the array, using the sum of the last two values, except for the first two.

```js

    const fibonacci = (n) =>
      [...Array(n)].reduce(
        (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
        []
      );

````

### Don’t forget:

### Additional links

- [Similar problem](https://github.com/Chalarangelo/30-seconds-of-code/blob/master/snippets_archive/fibonacciUntilNum.md)

### Given an array of words, write a method to output matching sets of anagrams.

````js

    const words = [
      "rates",
      "rat",
      "stare",
      "taser",
      "tears",
      "art",
      "tabs",
      "tar",
      "bats",
      "state",
    ];

### Answer

```js

    const words = [
      "rates",
      "rat",
      "stare",
      "taser",
      "tears",
      "art",
      "tabs",
      "tar",
      "bats",
      "state",
    ];
    function anagramGroups(wordAry) {
      const groupedWords = {};
      // iterate over each word in the array
      wordAry.map((word) => {
        // alphabetize the word and a separate variable
        alphaWord = word.split("").sort().join("");
        // if the alphabetize word is already a key, push the actual word value (this is an anagram)
        if (groupedWords[alphaWord]) {
          return groupedWords[alphaWord].push(word);
        }
        // otherwise add the alphabetize word key and actual word value (may not turn out to be an anagram)
        groupedWords[alphaWord] = [word];
      });
      return groupedWords;
    }
    // call the function and store results in a variable called collectedAnagrams
    const collectedAnagrams = anagramGroups(words);
    // iterate over groupedAnagrams, printing out group of values
    for (const sortedWord in collectedAnagrams) {
      if (collectedAnagrams[sortedWord].length > 1) {
        console.log(collectedAnagrams[sortedWord].toString());
      }
    }

````

### Don’t forget:

- Iterate the array
- Alphabetize each word
- Store alphabetize word as the key value in a groupedWords object with the original word as the value
- Compare alphabetize words to object keys and add additional original words when matches are found
- Iterate over the return object and output the values, when there is more then one. (single values mean no anagram )

### Additional links

- [Find The Anagrams Gist](https://gist.github.com/tinabme/fe6878f5cff42f60a537262503f9b765)
- [isAnagram function implementation](https://www.30secondsofcode.org/snippet/isAnagram)

### Using flexbox, create a 3-column layout where each column takes up a `col-{n} / 12` ratio of the container.

    <div class="row">
      <div class="col-2"></div>
      <div class="col-7"></div>
      <div class="col-3"></div>
    </div>

### Answer

Set the `.row` parent to `display: flex;` and use the `flex` shorthand property to give the column classes a `flex-grow` value that corresponds to its ratio value.

    .row {
      display: flex;
    }
    .col-2 {
      flex: 2;
    }
    .col-7 {
      flex: 7;
    }
    .col-3 {
      flex: 3;
    }

````

### Don’t forget:

### Additional links

- [MDN docs for basic concepts of flexbox](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox)
- [A complete guide to Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/)

### What does `0.1 + 0.2 === 0.3` evaluate to?

### Answer

It evaluates to `false` because JavaScript uses the IEEE 754 standard for Math and it makes use of 64-bit floating numbers. This causes precision errors when doing decimal calculations, in short, due to computers working in Base 2 while decimal is Base 10.

    0.1 + 0.2; // 0.30000000000000004

A solution to this problem would be to use a function that determines if two numbers are approximately equal by defining an error margin (epsilon) value that the difference between two values should be less than.

```js

    const approxEqual = (n1, n2, epsilon = 0.0001) => Math.abs(n1 - n2) < epsilon;
    approxEqual(0.1 + 0.2, 0.3); // true

### Don’t forget:

- A simple solution to this problem

### Additional links

- [A simple helper function to check equality](https://github.com/Chalarangelo/30-seconds-of-code#approximatelyequal)
- [Fix “0.1 + 0.2 = 0.300000004” in JavaScript](http://blog.blakesimpson.co.uk/read/61-fix-0-1-0-2-0-300000004-in-javascript)

### What is a focus ring? What is the correct solution to handle them?

### Answer

A focus ring is a visible outline given to focusable elements such as buttons and anchor tags. It varies depending on the vendor, but generally it appears as a blue outline around the element to indicate it is currently focused. In the past, many people specified `outline: 0;` on the element to remove the focus ring. However, this causes accessibility issues for keyboard users because the focus state may not be clear. When not specified though, it causes an unappealing blue ring to appear around an element. In recent times, frameworks like Bootstrap have opted to use a more appealing `box-shadow` outline to replace the default focus ring. However, this is still not ideal for mouse users. The best solution is an upcoming pseudo-selector `:focus-visible` which can be polyfilled today with JavaScript. It will only show a focus ring if the user is using a keyboard and leave it hidden for mouse users. This keeps both aesthetics for mouse use and accessibility for keyboard use.

### Don’t forget:

### Additional links

- [:focus-visible](https://css-tricks.com/focus-visible-and-backwards-compatibility/)

### What is the difference between the array methods `map()` and `forEach()`?

### Answer

Both methods iterate through the elements of an array. `map()` maps each element to a new element by invoking the callback function on each element and returning a new array. On the other hand, `forEach()` invokes the callback function for each element but does not return a new array. `forEach()` is generally used when causing a side effect on each iteration, whereas `map()` is a common functional programming technique.

### Don’t forget:

- Use `forEach()` if you need to iterate over an array and cause mutations to the elements without needing to return values to generate a new array.
- `map()` is the right choice to keep data immutable where each value of the original array is mapped to a new array.

### Additional links

- [MDN docs for forEach](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)
- [MDN docs for map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)
- [JavaScript — Map vs. ForEach](https://codeburst.io/javascript-map-vs-foreach-f38111822c0f)

### What are fragments?

### Answer

Fragments allow a React component to return multiple elements without a wrapper, by grouping the children without adding extra elements to the DOM. Fragments offer better performance, lower memory usage, a cleaner DOM and can help in dealing with certain CSS mechanisms (e.g. tables, Flexbox and Grid).

    render() {
      return (
        <React.Fragment>
          <ChildA />
          <ChildB />
          <ChildC />
        </React.Fragment>
      );
    }
    // Short syntax supported by Babel 7
    render() {
      return (
        <>
          <ChildA />
          <ChildB />
          <ChildC />
        </>
      );
    }

````

### Don’t forget:

- Fragments group multiple elements returned from a component, without adding a DOM element around them.

### Additional links

- [React docs on Fragments](https://reactjs.org/docs/fragments.html)

### What is functional programming?

### Answer

Functional programming is a paradigm in which programs are built in a declarative manner using pure functions that avoid shared state and mutable data. Functions that always return the same value for the same input and don’t produce side effects are the pillar of functional programming. Many programmers consider this to be the best approach to software development as it reduces bugs and cognitive load.

### Don’t forget:

- Cleaner, more concise development experience
- Simple function composition
- Features of JavaScript that enable functional programming (`.map`, `.reduce` etc.)
- JavaScript is multi-paradigm programming language (Object-Oriented Programming and Functional Programming live in harmony)

### Additional links

- [Javascript and Functional Programming: An Introduction](https://hackernoon.com/javascript-and-functional-programming-an-introduction-286aa625e26d)
- [Master the JavaScript Interview: What is Functional Programming?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0)

### Describe your thoughts on how a single page web app should handle focus when changing routes

### Answer

Single page applications make use of client-side rendering. This means that ‘examplesite.com’ and ‘examplesite.com/page2’ are actually the same HTML web page, but the client app decides what content to drop into that single page at runtime. Your user never actually “leaves” the page, and this causes some accessibility issues in terms of focus. Unless focus is explicitly managed in the app, a scenario like this may happen:

1.  User visits ‘examplesite.com’
2.  User clicks a link to go to another route: ‘examplesite.com/product1’
3.  Client app changes the visible content to show the details for this new route (e.g. some info about Product 1)
4.  Focus is still on the link that was clicked in step 2
5.  If a user uses the keyboard or screen reader to now try and read the content, the focused starting point is in the middle of the page on an element no longer visible Many strategies have been proposed in handling this situation, all involving explicitly managing the focus when the new page content is rendered. [Recent research by GatsbyJS](https://www.gatsbyjs.org/blog/2019-07-11-user-testing-accessible-client-routing/) suggests the best approach is:
6.  User visits ‘examplesite.com’
7.  User clicks a link to go to another route: ‘examplesite.com/product1’
8.  Client app changes the visible content to show the details for this new route (e.g. some info about Product 1)
9.  Client app manually places focus on the main header at the top of the page (almost always this will be the H1 element) By doing so, focus is reset to the top of the page, ready for the user to begin exploring the new content. This solution requires inserting the main heading into the start of tabbing order with `tabindex="-1"`.

### Don’t forget:

- Focus issues caused by client-side rendering, instead of server-side
- Focus should not be left on elements no longer visible on the page
- Challenges faced by screen reader users and users utilising keyboard navigation
- Careful manual focus management required

### Additional links

- [Handling Focus on Route Change: Up Your A11y](https://www.upyoura11y.com/handling-focus/)

### What are higher-order components?

### Answer

A higher-order component (HOC) is a function that takes a component as an argument and returns a new component. It is a pattern that is derived from React’s compositional nature. Higher-order components are like **pure components** because they accept any dynamically provided child component, but they won’t modify or copy any behavior from their input components.

```js
const EnhancedComponent = higherOrderComponent(WrappedComponent);
```

### Don’t forget:

- They can be used for state abstraction and manipulation, props manipulation, render high jacking, etc.

### Additional links

### What will the console log in this example?

    let foo = 1;
    let foobar = function () {
      console.log(foo);
      let foo = 2;
    };
    foobar();

```
### Answer

Due to hoisting, the local variable `foo` is declared before the `console.log` method is called. This means the local variable `foo` is passed as an argument to `console.log()` instead of the global one declared outside of the function. However, since the value is not hoisted with the variable declaration, the output will be `undefined`, not `2`.

### Don’t forget:

- Hoisting is JavaScript’s default behavior of moving declarations to the top
- Mention of `strict` mode

### Additional links

- [MDN docs for hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)

### How does hoisting work in JavaScript?

### Answer

Hoisting is a JavaScript mechanism where variable and function declarations are put into memory during the compile phase. This means that no matter where functions and variables are declared, they are moved to the top of their scope regardless of whether their scope is global or local. However, the value is not hoisted with the declaration. The following snippet:

    console.log(hoist);
    let hoist = "value";

is equivalent to:

    let hoist;
    console.log(hoist);
    hoist = "value";

Therefore logging `hoist` outputs `undefined` to the console, not `"value"`. Hoisting also allows you to invoke a function declaration before it appears to be declared in a program.

    myFunction(); // No error; logs "hello"
    function myFunction() {
      console.log("hello");
    }

But be wary of function expressions that are assigned to a variable:

    myFunction(); // Error: `myFunction` is not a function
    let myFunction = function () {
      console.log("hello");
    };

### Don’t forget:

- Hoisting is JavaScript’s default behavior of moving declarations to the top
- Functions declarations are hoisted before variable declarations

### Additional links

- [MDN docs for hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
- [Understanding Hoisting in JavaScript](https://scotch.io/tutorials/understanding-hoisting-in-javascript)

### Can a web page contain multiple `<header>` elements? What about `<footer>` elements?

### Answer

Yes to both. The W3 documents state that the tags represent the header(`<header>`) and footer(`<footer>`) areas of their nearest ancestor “section”. So not only can the page `<body>` contain a header and a footer, but so can every `<article>` and `<section>` element.

### Don’t forget:

- W3 recommends having as many as you want, but only 1 of each for each “section” of your page, i.e. body, section etc.

### Additional links

- [StackOverflow - Using header or footer tag twice](https://stackoverflow.com/questions/4837269/html5-using-header-or-footer-tag-twice?utm_medium=organic&utm_source=google_rich_qa&utm_campaign=google_rich_qa)

### Discuss the differences between an HTML specification and a browser’s implementation thereof.

### Answer

HTML specifications such as `HTML5` define a set of rules that a document must adhere to in order to be “valid” according to that specification. In addition, a specification provides instructions on how a browser must interpret and render such a document. A browser is said to “support” a specification if it handles valid documents according to the rules of the specification. As of yet, no browser supports all aspects of the `HTML5` specification (although all of the major browser support most of it), and as a result, it is necessary for the developer to confirm whether the aspect they are making use of will be supported by all of the browsers on which they hope to display their content. This is why cross-browser support continues to be a headache for developers, despite the improved specificiations.

### Don’t forget:

- `HTML5` defines some rules to follow for an invalid `HTML5` document (i.e., one that contains syntactical errors)
- However, invalid documents may contain anything, so it’s impossible for the specification to handle all possibilities comprehensively.
- Thus, many decisions about how to handle malformed documents are left up to the browser.

### Additional links

- [HTML 5.2 WWW Specifications](https://www.w3.org/TR/html52/)

### What is the difference between HTML and React event handling?

### Answer

In HTML, the attribute name is in all lowercase and is given a string invoking a function defined somewhere:

    <button onclick="handleClick()"></button>

In React, the attribute name is camelCase and are passed the function reference inside curly braces:

    <button onClick={handleClick} />

In HTML, `false` can be returned to prevent default behavior, whereas in React `preventDefault` has to be called explicitly.

    <a href="#" onclick="console.log('The link was clicked.'); return false" />

    function handleClick(e) {
      e.preventDefault();
      console.log("The link was clicked.");
    }

```

### Don’t forget:

- HTML uses lowercase, React uses camelCase.

### Additional links

- [React docs on Handling Events](https://reactjs.org/docs/handling-events.html)

### What are some differences that XHTML has compared to HTML?

### Answer

Some of the key differences are:

- An XHTML element must have an XHTML `<DOCTYPE>`
- Attributes values must be enclosed in quotes
- Attribute minimization is forbidden (e.g. one has to use `checked="checked"` instead of `checked`)
- Elements must always be properly nested
- Elements must always be closed
- Special characters must be escaped

### Don’t forget:

- Any element can be self-closed
- Tags ands attributes are case-sensitive, usually lowercase

### Additional links

- [W3Schools docs for HTML and XHTML](https://www.w3schools.com/html/html_xhtml.asp)

### Briefly describe the correct usage of the following HTML5 semantic elements: `<header>`, `<article>`,`<section>`, `<footer>`

### Answer

- `<header>` is used to contain introductory and navigational information about a section of the page. This can include the section heading, the author’s name, time and date of publication, table of contents, or other navigational information.
- `<article>` is meant to house a self-contained composition that can logically be independently recreated outside of the page without losing its meaning. Individual blog posts or news stories are good examples.
- `<section>` is a flexible container for holding content that shares a common informational theme or purpose.
- `<footer>` is used to hold information that should appear at the end of a section of content and contain additional information about the section. Author’s name, copyright information, and related links are typical examples of such content.

### Don’t forget:

- Other semantic elements are `<form>` and `<table>`

### Additional links

- [HTML 5 Semantic Elements](https://www.w3schools.com/html/html5_semantic_elements.asp)

### What is HTML5 Web Storage? Explain `localStorage` and `sessionStorage`.

### Answer

With HTML5, web pages can store data locally within the user’s browser. The data is stored in name/value pairs, and a web page can only access data stored by itself. **Differences between `localStorage` and `sessionStorage` regarding lifetime:**

- Data stored through `localStorage` is permanent: it does not expire and remains stored on the user’s computer until a web app deletes it or the user asks the browser to delete it.
- `sessionStorage` has the same lifetime as the top-level window or browser tab in which the data got stored. When the tab is permanently closed, any data stored through `sessionStorage` is deleted. **Differences between `localStorage` and `sessionStorage` regarding storage scope:** Both forms of storage are scoped to the document origin so that documents with different origins will never share the stored objects.
- `sessionStorage` is also scoped on a per-window basis. Two browser tabs with documents from the same origin have separate `sessionStorage` data.
- Unlike in `localStorage`, the same scripts from the same origin can’t access each other’s `sessionStorage` when opened in different tabs.

### Don’t forget:

- Earlier, this was done with cookies.
- The storage limit is far larger (at least 5MB) than with cookies and its faster.
- The data is never transferred to the server and can only be used if the client specifically asks for it.

### Additional links

- [W3Schools - HTML5 Webstorage](https://www.w3schools.com/html/html5_webstorage.asp)

### What is the reason for wrapping the entire contents of a JavaScript source file in a function that is immediately invoked?

### Answer

This technique is very common in JavaScript libraries. It creates a closure around the entire contents of the file which creates a private namespace and thereby helps avoid potential name clashes between different JavaScript modules and libraries. The function is immediately invoked so that the namespace (library name) is assigned the return value of the function.

````js

    const myLibrary = (function () {
      let privateVariable = 2;
      return {
        publicMethod: () => privateVariable,
      };
    })();
    privateVariable; // ReferenceError
    myLibrary.publicMethod(); // 2

### Don’t forget:

- Used among many popular JavaScript libraries
- Creates a private namespace

### Additional links

- [MDN docs for closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

### Explain the differences between imperative and declarative programming.

### Answer

These two types of programming can roughly be summarized as:

- Imperative: **how** to achieve something
- Declarative: **what** should be achieved A common example of declarative programming is CSS. The developer specifies CSS properties that describe what something should look like rather than how to achieve it. The “how” is abstracted away by the browser. On the other hand, imperative programming involves the steps required to achieve something. In JavaScript, the differences can be contrasted like so:

### Imperative

```js

    const numbers = [1, 2, 3, 4, 5];
    const numbersDoubled = [];
    for (let i = 0; i < numbers.length; i++) {
      numbersDoubled[i] = numbers[i] * 2;
    }

We manually loop over the numbers of the array and assign the new index as the number doubled.

### Declarative

```js

    const numbers = [1, 2, 3, 4, 5];
    const numbersDoubled = numbers.map((n) => n * 2);

We declare that the new array is mapped to a new one where each value is doubled.

### Don’t forget:

- Declarative programming often works with functions and expressions. Imperative programming frequently uses statements and relies on low-level features that cause mutations, while declarative programming has a strong focus on abstraction and purity.
- Declarative programming is more terse and easier to process at a glance.

### Additional links

- [Declarative vs Imperative Programming](https://codeburst.io/declarative-vs-imperative-programming-a8a7c93d9ad2)

### What are inline conditional expressions?

### Answer

Since a JSX element tree is one large expression, you cannot embed statements inside. Conditional expressions act as a replacement for statements to use inside the tree. For example, this won’t work:

    function App({ messages, isVisible }) {
      return (
        <div>
          if (messages.length > 0){" "}
          {<h2>You have {messages.length} unread messages.</h2>} else{" "}
          {<h2>You have no unread messages.</h2>}
          if (isVisible) {<p>I am visible.</p>}
        </div>
      );
    }

Logical AND `&&` and the ternary `? :` operator replace the `if`/`else` statements.

    function App({ messages, isVisible }) {
      return (
        <div>
          {messages.length > 0 ? (
            <h2>You have {messages.length} unread messages.</h2>
          ) : (
            <h2>You have no unread messages.</h2>
          )}
          {isVisible && <p>I am visible.</p>}
        </div>
      );
    }

````

### Don’t forget:

### Additional links

- [React docs on Conditional Rendering](https://reactjs.org/docs/conditional-rendering.html)

### What is a key? What are the benefits of using it in lists?

### Answer

Keys are a special string attribute that helps React identify which items have been changed, added or removed. They are used when rendering array elements to give them a stable identity. Each element’s key must be unique (e.g. IDs from the data or indexes as a last resort).

````js

    const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);

- Using indexes as keys is not recommended if the order of items may change, as it might negatively impact performance and may cause issues with component state.
- If you extract list items as a separate component then apply keys on the list component instead of the `<li>` tag.

### Don’t forget:

- Keys give elements in a collection a stable identity and help React identify changes.
- You should avoid using indexes as keys if the order of items may change.
- You should lift the key up to the component, instead of the `<li>` element, if you extract list items as components.

### Additional links

- [React docs on Lists and Keys](https://reactjs.org/docs/lists-and-keys.html)

### What are landmark roles and how can they be useful?

### Answer

Landmark roles is a way to identify different sections of a page like the main content or a navigation region. The Landmarks helps assistive technology users to navigate a page, allowing them skip over areas of it. For example,

    <div id="header" role="banner">Header of the Page</div>
    <div id="content" role="main">Main Content Goes Here</div>

### Don’t forget:

- Identify sections of a page
- Assist users in navigating a page

### Additional links

- [ARIA Landmark Roles](https://www.washington.edu/accessibility/web/landmarks/)
- [Using ARIA landmarks to identify regions of a page](https://www.w3.org/WAI/GL/wiki/Using_ARIA_landmarks_to_identify_regions_of_a_page)

### What is the difference between lexical scoping and dynamic scoping?

### Answer

Lexical scoping refers to when the location of a function’s definition determines which variables you have access to. On the other hand, dynamic scoping uses the location of the function’s invocation to determine which variables are available.

### Don’t forget:

- Lexical scoping is also known as static scoping.
- Lexical scoping in JavaScript allows for the concept of closures.
- Most languages use lexical scoping because it tends to promote source code that is more easily understood.

### Additional links

- [Mozilla Docs - Closures & Lexical Scoping](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)

### What are the lifecycle methods in React?

### Answer

`getDerivedStateFromProps`: Executed before rendering on the initial mount and all component updates. Used to update the state based on changes in props over time. Has rare use cases, like tracking component animations during the lifecycle. There are only few cases where this makes sense to use over other lifecycle methods. It expects to return an object that will be the the new state, or null to update nothing. This method does not have access to the component instance either. `componentDidMount`: Executed after first rendering and here all AJAX requests, DOM or state updates, and set up eventListeners should occur. `shouldComponentUpdate`: Determines if the component will be updated or not. By default, it returns true. If you are sure that the component doesn’t need to render after state or props are updated, you can return a false value. It is a great place to improve performance as it allows you to prevent a rerender if component receives new prop. `getSnapshotBeforeUpdate`: Invoked right after a component render happens because of an update, before `componentDidUpdate`. Any value returned from this method will be passed to `componentDidUpdate`. `componentDidUpdate`: Mostly it is used to update the DOM in response to prop or state changes. `componentWillUnmount`: It will be used to cancel any outgoing network requests, or remove all event listeners associated with the component. `componentDidCatch`: Used in error boundaries, which are components that implement this method. It allows the component to catch JavaScript errors anywhere in the _child_ component tree (below this component), log errors, and display a UI with error information.

### Don’t forget:

### Additional links

### What are the different phases of the component lifecycle in React?

### Answer

There are four different phases of component’s lifecycle: **Initialization**: In this phase, the component prepares setting up the initial state and default props. **Mounting**: The react component is ready to mount to the DOM. This phase covers the `getDerivedStateFromProps` and `componentDidMount` lifecycle methods. **Updating**: In this phase, the component gets updated in two ways, sending the new props and updating the state. This phase covers the `getDerivedStateFromProps`, `shouldComponentUpdate`, `getSnapshotBeforeUpdate` and `componentDidUpdate` lifecycle methods. **Unmounting**: In this last phase, the component is not needed and gets unmounted from the browser DOM. This phase includes the `componentWillUnmount` lifecycle method. **Error Handling**: In this phase, the component is called whenever there’s an error during rendering, in a lifecycle method, or in the constructor for any child component. This phase includes the `componentDidCatch` lifecycle method.

### Don’t forget:

### Additional links

### What does lifting state up in React mean?

### Answer

When several components need to share the same data, then it is recommended to lift the shared state up to their closest common ancestor. For example, if two child components share the same data, it is recommended to move the shared state to parent instead of maintaining the local state in both child components.

### Don’t forget:

### Additional links

### Create a function that masks a string of characters with `#` except for the last four (4) characters.

    mask("123456789"); // "#####6789"

### Answer

> There are many ways to solve this problem, this is just one one of them. Using `String.prototype.slice()` we can grab the last 4 characters of the string by passing `-4` as an argument. Then, using `String.prototype.padStart()`, we can pad the string to the original length with the repeated mask character.

```js

    const mask = (str, maskChar = "#") =>
      str.slice(-4).padStart(str.length, maskChar);
````

### Don’t forget:

- Short, one-line functional solutions to problems should be preferred provided they are efficient

### Additional links

### Can you name the four types of `@media` properties?

### Answer

- `all`, which applies to all media type devices
- `print`, which only applies to printers
- `screen`, which only applies to screens (desktops, tablets, mobile etc.)
- `speech`, which only applies to screenreaders

### Don’t forget:

### Additional links

- [MDN docs for `@media` rule](https://developer.mozilla.org/en-US/docs/Web/CSS/@media)
- [MDN docs for using media queries](https://developer.mozilla.org/en-US/docs/Web/CSS/Media_Queries/Using_media_queries)

### What is memoization?

### Answer

Memoization is the process of caching the output of function calls so that subsequent calls are faster. Calling the function again with the same input will return the cached output without needing to do the calculation again. A basic implementation in JavaScript looks like this:

````js

    const memoize = (fn) => {
      const cache = new Map();
      return (value) => {
        const cachedResult = cache.get(value);
        if (cachedResult !== undefined) return cachedResult;
        const result = fn(value);
        cache.set(value, result);
        return result;
      };
    };

### Don’t forget:

- The above technique returns a unary function even if the function can take multiple arguments.
- The first function call will be slower than usual because of the overhead created by checking if a cached result exists and setting a result before returning the value.
- Memoization increases performance on subsequent function calls but still needs to do work on the first call.

### Additional links

- [Implementing memoization in JavaScript](https://www.sitepoint.com/implementing-memoization-in-javascript/)

### How do you ensure methods have the correct `this` context in React component classes?

### Answer

In JavaScript classes, the methods are not bound by default. This means that their `this` context can be changed (in the case of an event handler, to the element that is listening to the event) and will not refer to the component instance. To solve this, `Function.prototype.bind()` can be used to enforce the `this` context as the component instance.

```js

    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      // Perform some logic
    }

- The `bind` approach can be verbose and requires defining a `constructor`, so the new public class fields syntax is generally preferred:

  handleClick = () => {
  console.log('this is:', this);
  }
  render() {
  return (
  <button onClick={this.handleClick}>
  Click me
  </button>
  );
  }

- You can also use an inline arrow function, because lexical `this` (referring to the component instance) is preserved:

  <button onClick={(e) => this.handleClick(e)}>Click me</button>

Note that extra re-rendering can occur using this technique because a new function reference is created on render, which gets passed down to child components and breaks `shouldComponentUpdate` / `PureComponent` shallow equality checks to prevent unnecessary re-renders. In cases where performance is important, it is preferred to go with `bind` in the constructor, or the public class fields syntax approach, because the function reference remains constant.

### Don’t forget:

- You can either bind methods to the component instance context in the constructor, use public class fields syntax, or use inline arrow functions.

### Additional links

- [React docs on Handling Events](https://reactjs.org/docs/handling-events.html)
- [React docs on Passing Functions to Components](https://reactjs.org/docs/faq-functions.html#how-do-i-bind-a-function-to-a-component-instance)

### What is a MIME type and what is it used for?

### Answer

`MIME` is an acronym for `Multi-purpose Internet Mail Extensions`. It is used as a standard way of classifying file types over the Internet.

### Don’t forget:

- A `MIME type` actually has two parts: a type and a subtype that are separated by a slash (/). For example, the `MIME type` for Microsoft Word files is `application/msword` (i.e., type is application and the subtype is msword).

### Additional links

- [MIME Type - MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)

### Contrast mutable and immutable values, and mutating vs non-mutating methods.

### Answer

The two terms can be contrasted as:

- Mutable: subject to change
- Immutable: cannot change In JavaScript, objects are mutable while primitive values are immutable. This means operations performed on objects can change the original reference in some way, while operations performed on a primitive value cannot change the original value. All `String.prototype` methods do not have an effect on the original string and return a new string. On the other hand, while some methods of `Array.prototype` do not mutate the original array reference and produce a fresh array, some cause mutations.

  const myString = "hello!";
  myString.replace("!", ""); // returns a new string, cannot mutate the original value
  const originalArray = [1, 2, 3];
  originalArray.push(4); // mutates originalArray, now [1, 2, 3, 4]
  originalArray.concat(4); // returns a new array, does not mutate the original

### Don’t forget:

- List of mutating and non-mutating array methods

### Additional links

- [Mutating vs non-mutating array methods](https://lorenstewart.me/2017/01/22/javascript-array-methods-mutating-vs-non-mutating/)

### What is the only value not equal to itself in JavaScript?

### Answer

`NaN` (Not-a-Number) is the only value not equal to itself when comparing with any of the comparison operators. `NaN` is often the result of meaningless math computations, so two `NaN` values make no sense to be considered equal.

### Don’t forget:

- The difference between `isNaN()` and `Number.isNaN()`
- `const isNaN = x => x !== x`

### Additional links

- [MDN docs for `NaN`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NaN)

### NodeJS often uses a callback pattern where if an error is encountered during execution, this error is passed as the first argument to the callback. What are the advantages of this pattern?

    fs.readFile(filePath, function (err, data) {
      if (err) {
        // handle the error, the return is important here
        // so execution stops here
        return console.log(err);
      }
      // use the data object
      console.log(data);
    });
````

### Answer

Advantages include:

- Not needing to process data if there is no need to even reference it
- Having a consistent API leads to more adoption
- Ability to easily adapt a callback pattern that will lead to more maintainable code As you can see from below example, the callback is called with null as its first argument if there is no error. However, if there is an error, you create an Error object, which then becomes the callback’s only parameter. The callback function allows a user to easily know whether or not an error occurred. This practice is also called the _Node.js error convention_, and this kind of callback implementations are called _error-first callbacks_.

  let isTrue = function (value, callback) {
  if (value === true) {
  callback(null, "Value was true.");
  } else {
  callback(new Error("Value is not true!"));
  }
  };
  let callback = function (error, retval) {
  if (error) {
  console.log(error);
  return;
  }
  console.log(retval);
  };
  isTrue(false, callback);
  isTrue(true, callback);
  /_
  { stack: [Getter/Setter],
  arguments: undefined,
  type: undefined,
  message: 'Value is not true!' }
  Value was true.
  _/

### Don’t forget:

- This is just a convention. However, you should stick to it.

### Additional links

- [The Node.js Way - Understanding Error-First Callbacks](http://fredkschott.com/post/2014/03/understanding-error-first-callbacks-in-node-js/)
- [What are the error conventions?](https://docs.nodejitsu.com/articles/errors/what-are-the-error-conventions)

### What is the event loop in Node.js?

### Answer

The event loop handles all async callbacks. Callbacks are queued in a loop, while other code runs, and will run one by one when the response for each one has been received.

### Don’t forget:

- The event loop allows Node.js to perform non-blocking I/O operations, despite the fact that JavaScript is single-threaded

### Additional links

- [Node.js docs on event loop, timers and process.nextTick()](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)

### What is the difference between `null` and `undefined`?

### Answer

In JavaScript, two values discretely represent nothing - `undefined` and `null`. The concrete difference between them is that `null` is explicit, while `undefined` is implicit. When a property does not exist or a variable has not been given a value, the value is `undefined`. `null` is set as the value to explicitly indicate “no value”. In essence, `undefined` is used when the nothing is not known, and `null` is used when the nothing is known.

### Don’t forget:

- `typeof undefined` evaluates to `"undefined"`.
- `typeof null` evaluates `"object"`. However, it is still a primitive value and this is considered an implementation bug in JavaScript.
- `undefined == null` evaluates to `true`.

### Additional links

- [MDN docs for null](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/null)
- [MDN docs for undefined](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined)

### Describe the different ways to create an object. When should certain ways be preferred over others?

### Answer

### Object literal

Often used to store one occurrence of data.

````js

    const person = {
      name: "John",
      age: 50,
      birthday() {
        this.age++;
      },
    };
    person.birthday(); // person.age === 51

### Constructor

Often used when you need to create multiple instances of an object, each with their own data that other instances of the class cannot affect. The `new` operator must be used before invoking the constructor or the global object will be mutated.

    function Person(name, age) {
      this.name = name;
      this.age = age;
    }
    Person.prototype.birthday = function () {
      this.age++;
    };
    const person1 = new Person("John", 50);
    const person2 = new Person("Sally", 20);
    person1.birthday(); // person1.age === 51
    person2.birthday(); // person2.age === 21

### Factory function

Creates a new object similar to a constructor, but can store private data using a closure. There is also no need to use `new` before invoking the function or the `this` keyword. Factory functions usually discard the idea of prototypes and keep all properties and methods as own properties of the object.

```js

    const createPerson = (name, age) => {
      const birthday = () => person.age++;
      const person = { name, age, birthday };
      return person;
    };
    const person = createPerson("John", 50);
    person.birthday(); // person.age === 51

### `Object.create()`

Sets the prototype of the newly created object.

```js

    const personProto = {
      birthday() {
        this.age++;
      },
    };
    const person = Object.create(personProto);
    person.age = 50;
    person.birthday(); // person.age === 51

A second argument can also be supplied to `Object.create()` which acts as a descriptor for the new properties to be defined.

    Object.create(personProto, {
      age: {
        value: 50,
        writable: true,
        enumerable: true,
      },
    });
````

### Don’t forget:

- Prototypes are objects that other objects inherit properties and methods from.
- Factory functions offer private properties and methods through a closure but increase memory usage as a tradeoff, while classes do not have private properties or methods but reduce memory impact by reusing a single prototype object.

### Additional links

### What is the difference between a parameter and an argument?

### Answer

Parameters are the variable names of the function definition, while arguments are the values given to a function when it is invoked.

    function myFunction(parameter1, parameter2) {
      console.log(arguments[0]); // "argument1"
    }
    myFunction("argument1", "argument2");

````
### Don’t forget:

- `arguments` is an array-like object containing information about the arguments supplied to an invoked function.
- `myFunction.length` describes the arity of a function (how many parameters it has, regardless of how many arguments it is supplied).

### Additional links

### Does JavaScript pass by value or by reference?

### Answer

JavaScript always passes by value. However, with objects, the value is a reference to the object.

### Don’t forget:

- Difference between pass-by-value and pass-by-reference

### Additional links

- [JavaScript Value vs Reference](https://medium.com/dailyjs/back-to-roots-javascript-value-vs-reference-8fb69d587a18)

### How do you pass an argument to an event handler or callback?

### Answer

You can use an arrow function to wrap around an event handler and pass arguments, which is equivalent to calling `bind`:

    <button onClick={() => this.handleClick(id)} />
    <button onClick={this.handleClick.bind(this, id)} />

### Don’t forget:

### Additional links

- [React docs on Handling Events](https://reactjs.org/docs/handling-events.html)

### Create a function `pipe` that performs left-to-right function composition by returning a function that accepts one argument.

```js

    const square = (v) => v * v;
    const double = (v) => v * 2;
    const addOne = (v) => v + 1;
    const res = pipe(square, double, addOne);
    res(3); // 19; addOne(double(square(3)))

### Answer

Gather all supplied arguments using the rest operator `...` and return a unary function that uses `Array.prototype.reduce()` to run the value through the series of functions before returning the final value.

```js

    const pipe =
      (...fns) =>
      (x) =>
        fns.reduce((v, fn) => fn(v), x);
````

### Don’t forget:

- Function composition is the process of combining two or more functions to produce a new function.

### Additional links

- [What is function composition?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-function-composition-20dfb109a1a0)

### What are portals in React?

### Answer

Portal are the recommended way to render children into a DOM node that exists outside the DOM hierarchy of the parent component.

    ReactDOM.createPortal(child, container);

The first argument (`child`) is any renderable React child, such as an element, string, or fragment. The second argument (`container`) is a DOM element.

### Don’t forget:

### Additional links

- [React docs on Portals](https://reactjs.org/docs/portals.html)

### What is the difference between the postfix `i++` and prefix `++i` increment operators?

### Answer

Both increment the variable value by 1. The difference is what they evaluate to. The postfix increment operator evaluates to the value _before_ it was incremented.

    let i = 0;
    i++; // 0
    // i === 1

The prefix increment operator evaluates to the value _after_ it was incremented.

    let i = 0;
    ++i; // 1
    // i === 1

### Don’t forget:

### Additional links

### In which states can a Promise be?

### Answer

A `Promise` is in one of these states:

- pending: initial state, neither fulfilled nor rejected.
- fulfilled: meaning that the operation completed successfully.
- rejected: meaning that the operation failed. A pending promise can either be fulfilled with a value, or rejected with a reason (error). When either of these options happens, the associated handlers queued up by a promise’s then method are called.

### Don’t forget:

### Additional links

- [Official Web Docs - Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

### What are Promises?

### Answer

The `Promise` object represents the eventual completion (or failure) of an asynchronous operation, and its resulting value. An example can be the following snippet, which after 100ms prints out the result string to the standard output. Also, note the catch, which can be used for error handling. `Promise`s are chainable.

    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("result");
      }, 100);
    })
      .then(console.log)
      .catch(console.error);

```
### Don’t forget:

- Take a look into the other questions regarding `Promise`s!

### Additional links

- [Master the JavaScript Interview: What is a Promise?](https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e772618)

### How to apply prop validation in React?

### Answer

When the application is running in development mode, React will automatically check for all props that we set on components to make sure they are the correct data type. For incorrect data types, it will generate warning messages in the console for development mode. They are stripped in production mode due to their performance impact. Required props are defined with `isRequired`. For example, we define `propTypes` for component as below:

    import PropTypes from "prop-types"
    class User extends React.Component {
      static propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired
      }
      render() {
        return (
          <h1>Welcome, {this.props.name}</h1>
          <h2>Age, {this.props.age}
        )
      }
    }

```

### Don’t forget:

- We can define custom `propTypes`
- Using `propTypes` is not mandatory. However, it is a good practice and can reduce bugs.

### Additional links

### How does prototypal inheritance differ from classical inheritance?

### Answer

In the classical inheritance paradigm, object instances inherit their properties and functions from a class, which acts as a blueprint for the object. Object instances are typically created using a constructor and the `new` keyword. In the prototypal inheritance paradigm, object instances inherit directly from other objects and are typically created using factory functions or `Object.create()`.

### Don’t forget:

### Additional links

- [MDN docs for inheritance and the prototype chain](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain)

### What is a pure function?

### Answer

A pure function is a function that satisfies these two conditions:

- Given the same input, the function returns the same output.
- The function doesn’t cause side effects outside of the function’s scope (i.e. mutate data outside the function or data supplied to the function). Pure functions can mutate local data within the function as long as it satisfies the two conditions above.

### Pure

```js
const a = (x, y) => x + y;
const b = (arr, value) => arr.concat(value);
const c = (arr) => [...arr].sort((a, b) => a - b);
```

### Impure

```js
const a = (x, y) => x + y + Math.random();
const b = (arr, value) => (arr.push(value), arr);
const c = (arr) => arr.sort((a, b) => a - b);
```

### Don’t forget:

- Pure functions are easier to reason about due to their reliability.
- All functions should be pure unless explicitly causing a side effect (i.e. `setInnerHTML`).
- If a function does not return a value, it is an indication that it is causing side effects.

### Additional links

- [Pure functions in JavaScript](http://www.nicoespeon.com/en/2015/01/pure-functions-javascript/)

### How do you write comments inside a JSX tree in React?

### Answer

Comments must be wrapped inside curly braces `{}` and use the `/* */` syntax.

```js
const tree = (
  <div>
    {/* Comment */}
    <p>Text</p>
  </div>
);
```

### What is recursion and when is it useful?

### Answer

Recursion is the repeated application of a process. In JavaScript, recursion involves functions that call themselves repeatedly until they reach a base condition. The base condition breaks out of the recursion loop because otherwise the function would call itself indefinitely. Recursion is very useful when working with data structures that contain nesting where the number of levels deep is unknown. For example, you may have a thread of comments returned from a database that exist in a flat array but need to be nested for display in the UI. Each comment is either a top-level comment (no parent) or is a reply to a parent comment. Comments can be a reply of a reply of a reply… we have no knowledge beforehand the number of levels deep a comment may be. This is where recursion can help.

````js

    const nest = (items, id = null, link = "parent_id") =>
      items
        .filter((item) => item[link] === id)
        .map((item) => ({ ...item, children: nest(items, item.id) }));
    const comments = [
      { id: 1, parent_id: null, text: "First reply to post." },
      { id: 2, parent_id: 1, text: "First reply to comment #1." },
      { id: 3, parent_id: 1, text: "Second reply to comment #1." },
      { id: 4, parent_id: 3, text: "First reply to comment #3." },
      { id: 5, parent_id: 4, text: "First reply to comment #4." },
      { id: 6, parent_id: null, text: "Second reply to post." },
    ];
    nest(comments);
    /*
    [
      { id: 1, parent_id: null, text: "First reply to post.", children: [...] },
      { id: 6, parent_id: null, text: "Second reply to post.", children: [] }
    ]
    */

In the above example, the base condition is met if `filter()` returns an empty array. The chained `map()` won’t invoke the callback function which contains the recursive call, thereby breaking the loop.

### Don’t forget:

- Recursion is useful when working with data structures containing an unknown number of nested structures.
- Recursion must have a base condition to be met that breaks out of the loop or it will call itself indefinitely.

### Additional links

- [In plain English, what is recursion?](https://softwareengineering.stackexchange.com/questions/25052/in-plain-english-what-is-recursion)

### What is the output of the following code?

```js

    const a = [1, 2, 3];
    const b = [1, 2, 3];
    const c = "1,2,3";
    console.log(a == c);
    console.log(a == b);
````

### Answer

The first `console.log` outputs `true` because JavaScript’s compiler performs type conversion and therefore it compares to strings by their value. On the other hand, the second `console.log` outputs `false` because Arrays are Objects and Objects are compared by reference.

### Don’t forget:

- JavaScript performs automatic type conversion
- Objects are compared by reference
- Primitives are compared by value

### Additional links

- [JavaScript Value vs Reference](https://medium.com/dailyjs/back-to-roots-javascript-value-vs-reference-8fb69d587a18)

### What are refs in React? When should they be used?

### Answer

Refs provide a way to access DOM nodes or React elements created in the render method. Refs should be used sparringly, but there are some good use cases for refs, such as:

- Managing focus, text selection, or media playback.
- Triggering imperative animations.
- Integrating with third-party DOM libraries. Refs are created using `React.createRef()` method and attached to React elements via the `ref` attribute. In order to use refs throughout the component, assign the `ref` to the instance property within the constructor:

  class MyComponent extends React.Component {
  constructor(props) {
  super(props);
  this.myRef = React.createRef();
  }
  render() {
  return <div ref={this.myRef} />;
  }
  }

Refs can also be used in functional components with the help of closures.

### Don’t forget:

- Refs are used to return a reference to an element.
- Refs shouldn’t be overused.
- You can create a ref using `React.createRef()` and attach to elements via the `ref` attribute.

### Additional links

- [React docs on Refs and the DOM](https://reactjs.org/docs/refs-and-the-dom.html)

### Where and why is the `rel="noopener"` attribute used?

### Answer

The `rel="noopener"` is an attribute used in `<a>` elements (hyperlinks). It prevents pages from having a `window.opener` property, which would otherwise point to the page from where the link was opened and would allow the page opened from the hyperlink to manipulate the page where the hyperlink is.

### Don’t forget:

- `rel="noopener"` is applied to hyperlinks.
- `rel="noopener"` prevents opened links from manipulating the source page.

### Additional links

- [Open external anchors using rel=“noopener”](https://developers.google.com/web/tools/lighthouse/audits/noopener)
- [About rel=“noopener”](https://mathiasbynens.github.io/rel-noopener/)

### What is REST?

### Answer

REST (REpresentational State Transfer) is a software design pattern for network architecture. A RESTful web application exposes data in the form of information about its resources. Generally, this concept is used in web applications to manage state. With most applications, there is a common theme of reading, creating, updating, and destroying data. Data is modularized into separate tables like `posts`, `users`, `comments`, and a RESTful API exposes access to this data with:

- An identifier for the resource. This is known as the endpoint or URL for the resource.
- The operation the server should perform on that resource in the form of an HTTP method or verb. The common HTTP methods are GET, POST, PUT, and DELETE. Here is an example of the URL and HTTP method with a `posts` resource:
- Reading: `/posts/` =&gt; GET
- Creating: `/posts/new` =&gt; POST
- Updating: `/posts/:id` =&gt; PUT
- Destroying: `/posts/:id` =&gt; DELETE

### Don’t forget:

- Alternatives to this pattern like GraphQL

### Additional links

- [What is REST — A Simple Explanation for Beginners, Part 1: Introduction](https://medium.com/extend/what-is-rest-a-simple-explanation-for-beginners-part-1-introduction-b4a072f8740f)

### What does the following function return?

    function greet() {
      return;
      {
        message: "hello";
      }
    }

````

### Answer

Because of JavaScript’s automatic semicolon insertion (ASI), the compiler places a semicolon after `return` keyword and therefore it returns `undefined` without an error being thrown.

### Don’t forget:

- Automatic semicolon placement can lead to time-consuming bugs

### Additional links

- [Automatic semicolon insertion in JavaScript](http://2ality.com/2011/05/semicolon-insertion.html) **Folders** [&lt;parent&gt;](../right.html) | **File** | **File** | **File** | **File** | **File** | **File** | | :——————————————————————— | :————————————————————————————————- | :———————————————————————————– | :—————————————————————– | :——————————————————————————————— | :——————————————————————————- | | [accessibility-aria.html](accessibility-aria.html) | [fibonacci.html](fibonacci.html) | [object-creation.html](object-creation.html) | [accessibility-contrast.md](accessibility-contrast.md) | [fibonacci.md](fibonacci.md) | [null-vs-undefined.md](null-vs-undefined.md) | | [accessibility-contrast.html](accessibility-contrast.html) | [find-the-anagrams.html](find-the-anagrams.html) | [parameter-vs-argument.html](parameter-vs-argument.html) | [accessibility-testing.md](accessibility-testing.md) | [find-the-anagrams.md](find-the-anagrams.md) | [object-creation.md](object-creation.md) | | [accessibility-testing.html](accessibility-testing.html) | [flex-layout.html](flex-layout.html) | [pass-by-value-reference.html](pass-by-value-reference.html) | [accessibility-tree.md](accessibility-tree.md) | [flex-layout.md](flex-layout.md) | [parameter-vs-argument.md](parameter-vs-argument.md) | | [accessibility-tree.html](accessibility-tree.html) | [floating-point.html](floating-point.html) | [passing-arguments-to-event-handlers.html](passing-arguments-to-event-handlers.html) | [alt-attribute.md](alt-attribute.md) | [floating-point.md](floating-point.md) | [pass-by-value-reference.md](pass-by-value-reference.md) | | [alt-attribute.html](alt-attribute.html) | [focus-ring.html](focus-ring.html) | [pipe.html](pipe.html) | [async-defer-attributes.md](async-defer-attributes.md) | [focus-ring.md](focus-ring.md) | [passing-arguments-to-event-handlers.md](passing-arguments-to-event-handlers.md) | | [async-defer-attributes.html](async-defer-attributes.html) | [for-each-map.html](for-each-map.html) | [portals.html](portals.html) | [async-functions.md](async-functions.md) | [for-each-map.md](for-each-map.md) | [pipe.md](pipe.md) | | [async-functions.html](async-functions.html) | [fragments.html](fragments.html) | [postfix-vs-prefix-increment.html](postfix-vs-prefix-increment.html) | [batches.md](batches.md) | [fragments.md](fragments.md) | [portals.md](portals.md) | | [batches.html](batches.html) | [functional-programming.html](functional-programming.html) | [promise-states.html](promise-states.html) | [bem.md](bem.md) | [functional-programming.md](functional-programming.md) | [postfix-vs-prefix-increment.md](postfix-vs-prefix-increment.md) | | [bem.html](bem.html) | [handling-route-changes-in-single-page-apps.html](handling-route-changes-in-single-page-apps.html) | [promises.html](promises.html) | [big-o-notation.md](big-o-notation.md) | [handling-route-changes-in-single-page-apps.md](handling-route-changes-in-single-page-apps.md) | [promise-states.md](promise-states.md) | | [big-o-notation.html](big-o-notation.html) | [hoc-component.html](hoc-component.html) | [prop-validation.html](prop-validation.html) | [bind-function.md](bind-function.md) | [hoc-component.md](hoc-component.md) | [promises.md](promises.md) | | [bind-function.html](bind-function.html) | [hoisting-example.html](hoisting-example.html) | [prototypal-inheritance.html](prototypal-inheritance.html) | [cache-busting.md](cache-busting.md) | [hoisting-example.md](hoisting-example.md) | [prop-validation.md](prop-validation.md) | | [cache-busting.html](cache-busting.html) | [hoisting.html](hoisting.html) | [pure-functions.html](pure-functions.html) | [callback-hell.md](callback-hell.md) | [hoisting.md](hoisting.md) | [prototypal-inheritance.md](prototypal-inheritance.md) | | [callback-hell.html](callback-hell.html) | [html-multiple-header-footers.html](html-multiple-header-footers.html) | [react-comments.html](react-comments.html) | [callback-in-setState.md](callback-in-setState.md) | [html-multiple-header-footers.md](html-multiple-header-footers.md) | [pure-functions.md](pure-functions.md) | | [callback-in-setState.html](callback-in-setState.html) | [html-specification-implementation.html](html-specification-implementation.html) | [recursion.html](recursion.html) | [callback-refs-vs-finddomnode.md](callback-refs-vs-finddomnode.md) | [html-specification-implementation.md](html-specification-implementation.md) | [react-comments.md](react-comments.md) | | [callback-refs-vs-finddomnode.html](callback-refs-vs-finddomnode.html) | [html-vs-react-event-handling.html](html-vs-react-event-handling.html) | [reference-example.html](reference-example.html) | [callbacks.md](callbacks.md) | [html-vs-react-event-handling.md](html-vs-react-event-handling.md) | [recursion.md](recursion.md) | | [callbacks.html](callbacks.html) | [html-vs-xhtml.html](html-vs-xhtml.html) | [refs.html](refs.html) | [children-prop.md](children-prop.md) | [html-vs-xhtml.md](html-vs-xhtml.md) | [reference-example.md](reference-example.md) | | [children-prop.html](children-prop.html) | [html5-semantic-elements-usage.html](html5-semantic-elements-usage.html) | [rel-noopener.html](rel-noopener.html) | [class-name.md](class-name.md) | [html5-semantic-elements-usage.md](html5-semantic-elements-usage.md) | [refs.md](refs.md) | | [class-name.html](class-name.html) | [html5-web-storage.html](html5-web-storage.html) | [rest.html](rest.html) | [clone-object.md](clone-object.md) | [html5-web-storage.md](html5-web-storage.md) | [rel-noopener.md](rel-noopener.md) | | [clone-object.html](clone-object.html) | [iife.html](iife.html) | [return-semicolon.html](return-semicolon.html) | [closures.md](closures.md) | [iife.md](iife.md) | [rest.md](rest.md) | | [closures.html](closures.html) | [imperative-vs-declarative.html](imperative-vs-declarative.html) | [right.html](right.html) | [comparing-objects.md](comparing-objects.md) | [imperative-vs-declarative.md](imperative-vs-declarative.md) | [return-semicolon.md](return-semicolon.md) | | [comparing-objects.html](comparing-objects.html) | [inline-conditional-expressions.html](inline-conditional-expressions.html) | [semicolons.html](semicolons.html) | [context.md](context.md) | [inline-conditional-expressions.md](inline-conditional-expressions.md) | [semicolons.md](semicolons.md) | | [context.html](context.html) | [keys.html](keys.html) | [short-circuit-evaluation.html](short-circuit-evaluation.html) | [cors.md](cors.md) | [keys.md](keys.md) | [short-circuit-evaluation.md](short-circuit-evaluation.md) | | [cors.html](cors.html) | [landmark-roles.html](landmark-roles.html) | [sprites.html](sprites.html) | [css-box-model.md](css-box-model.md) | [landmark-roles.md](landmark-roles.md) | [sprites.md](sprites.md) | | [css-box-model.html](css-box-model.html) | [lexical-vs-dynamic-scoping.html](lexical-vs-dynamic-scoping.html) | [stateful-components.html](stateful-components.html) | [css-preprocessors.md](css-preprocessors.md) | [lexical-vs-dynamic-scoping.md](lexical-vs-dynamic-scoping.md) | [stateful-components.md](stateful-components.md) | | [css-preprocessors.html](css-preprocessors.html) | [lifecycle-methods.html](lifecycle-methods.html) | [stateless-components.html](stateless-components.html) | [css-sibling-selectors.md](css-sibling-selectors.md) | [lifecycle-methods.md](lifecycle-methods.md) | [stateless-components.md](stateless-components.md) | | [css-sibling-selectors.html](css-sibling-selectors.html) | [lifecycle.html](lifecycle.html) | [static-vs-instance-method.html](static-vs-instance-method.html) | [css-specificity.md](css-specificity.md) | [lifecycle.md](lifecycle.md) | [static-vs-instance-method.md](static-vs-instance-method.md) | | [css-specificity.html](css-specificity.html) | [lift-state.html](lift-state.html) | [sync-vs-async.html](sync-vs-async.html) | [debouncing.md](debouncing.md) | [lift-state.md](lift-state.md) | [sync-vs-async.md](sync-vs-async.md) | | [debouncing.html](debouncing.html) | [mask.html](mask.html) | [this.html](this.html) | [dom.md](dom.md) | [mask.md](mask.md) | [this.md](this.md) | | [dom.html](dom.html) | [media-properties.html](media-properties.html) | [typeof-typeof.html](typeof-typeof.html) | [double-vs-triple-equals.md](double-vs-triple-equals.md) | [media-properties.md](media-properties.md) | [typeof-typeof.md](typeof-typeof.md) | | [double-vs-triple-equals.html](double-vs-triple-equals.html) | [memoize.html](memoize.html) | [types.html](types.html) | [element-vs-component.md](element-vs-component.md) | [memoize.md](memoize.md) | [types.md](types.md) | | [element-vs-component.html](element-vs-component.html) | [methods-context-react-classes.html](methods-context-react-classes.html) | [ui-library-framework-purpose.html](ui-library-framework-purpose.html) | [em-rem-difference.md](em-rem-difference.md) | [methods-context-react-classes.md](methods-context-react-classes.md) | [ui-library-framework-purpose.md](ui-library-framework-purpose.md) | | [em-rem-difference.html](em-rem-difference.html) | [mime.html](mime.html) | [use-strict.html](use-strict.html) | [error-boundaries.md](error-boundaries.md) | [mime.md](mime.md) | [use-strict.md](use-strict.md) | | [error-boundaries.html](error-boundaries.html) | [mutable-vs-immutable.html](mutable-vs-immutable.html) | [var-let-const.html](var-let-const.html) | [event-delegation.md](event-delegation.md) | [mutable-vs-immutable.md](mutable-vs-immutable.md) | [var-let-const.md](var-let-const.md) | | [event-delegation.html](event-delegation.html) | [nan.html](nan.html) | [virtual-dom.html](virtual-dom.html) | [event-driven-programming.md](event-driven-programming.md) | [nan.md](nan.md) | [virtual-dom.md](virtual-dom.md) | | [event-driven-programming.html](event-driven-programming.html) | [node-error-first-callback.html](node-error-first-callback.html) | [wcag.html](wcag.html) | [expression-vs-statement.md](expression-vs-statement.md) | [node-error-first-callback.md](node-error-first-callback.md) | [wcag.md](wcag.md) | | [expression-vs-statement.html](expression-vs-statement.html) | [node-event-loop.html](node-event-loop.html) | [xss.html](xss.html) | [falsy-truthy.md](falsy-truthy.md) | [node-event-loop.md](node-event-loop.md) | [xss.md](xss.md) | | [falsy-truthy.html](falsy-truthy.html) | [null-vs-undefined.html](null-vs-undefined.html) | [accessibility-aria.md](accessibility-aria.md) | | | | Folders: 1 Files: 219 Size of all files: 461594 K

### Are semicolons required in JavaScript?

### Answer

Sometimes. Due to JavaScript’s automatic semicolon insertion, the interpreter places semicolons after most statements. This means semicolons can be omitted in most cases. However, there are some cases where they are required. They are not required at the beginning of a block, but are if they follow a line and:

1.  The line starts with `[`

```js

    const previousLine = 3;
    [1, 2, previousLine].map((n) => n \* 2);

1.  The line starts with `(`

```js

    const previousLine = 3;
    (function () {
    // ...
    })();

In the above cases, the interpreter does not insert a semicolon after `3`, and therefore it will see the `3` as attempting object property access or being invoked as a function, which will throw errors.

### Don’t forget:

- Semicolons are usually optional in JavaScript but have edge cases where they are required.
- If you don’t use semicolons, tools like Prettier will insert semicolons for you in the places where they are required on save in a text editor to prevent errors.

### Additional links

### What is short-circuit evaluation in JavaScript?

### Answer

Short-circuit evaluation involves logical operations evaluating from left-to-right and stopping early.

    true || false;

In the above sample using logical OR, JavaScript won’t look at the second operand `false`, because the expression evaluates to `true` regardless. This is known as short-circuit evaluation. This also works for logical AND.

    false && true;

This means you can have an expression that throws an error if evaluated, and it won’t cause issues.

    true || nonexistentFunction();
    false && nonexistentFunction();

This remains true for multiple operations because of left-to-right evaluation.

    true || nonexistentFunction() || window.nothing.wouldThrowError;
    true || window.nothing.wouldThrowError;
    true;

A common use case for this behavior is setting default values. If the first operand is falsy the second operand will be evaluated.

```js

    const options = {};
    const setting = options.setting || "default";
    setting; // "default"

Another common use case is only evaluating an expression if the first operand is truthy.



```js


    // Instead of:
    addEventListener("click", (e) => {
      if (e.target.closest("button")) {
        handleButtonClick(e);
      }
    });
    // You can take advantage of short-circuit evaluation:
    addEventListener(
      "click",
      (e) => e.target.closest("button") && handleButtonClick(e)
    );

````

In the above case, if `e.target` is not or does not contain an element matching the `"button"` selector, the function will not be called. This is because the first operand will be falsy, causing the second operand to not be evaluated.

### Don’t forget:

- Logical operations do not produce a boolean unless the operand(s) evaluate to a boolean.

### Additional links

- [JavaScript: What is short-circuit evaluation?](https://codeburst.io/javascript-what-is-short-circuit-evaluation-ff22b2f5608c)

### What are the advantages of using CSS sprites and how are they utilized?

### Answer

CSS sprites combine multiple images into one image, limiting the number of HTTP requests a browser has to make, thus improving load times. Even under the new HTTP/2 protocol, this remains true. Under HTTP/1.1, at most one request is allowed per TCP connection. With HTTP/1.1, modern browsers open multiple parallel connections (between 2 to 8) but it is limited. With HTTP/2, all requests between the browser and the server are multiplexed on a single TCP connection. This means the cost of opening and closing multiple connections is mitigated, resulting in a better usage of the TCP connection and limits the impact of latency between the client and server. It could then become possible to load tens of images in parallel on the same TCP connection. However, according to [benchmark results](https://blog.octo.com/en/http2-arrives-but-sprite-sets-aint-no-dead/), although HTTP/2 offers 50% improvement over HTTP/1.1, in most cases the sprite set is still faster to load than individual images. To utilize a spritesheet in CSS, one would use certain properties, such as `background-image`, `background-position` and `background-size` to ultimately alter the `background` of an element.

### Don’t forget:

- `background-image`, `background-position` and `background-size` can be used to utilize a spritesheet.

### Additional links

- [CSS Sprites explained by CSS Tricks](https://css-tricks.com/css-sprites/)

### What is a stateful component in React?

### Answer

A stateful component is a component whose behavior depends on its state. This means that two separate instances of the component if given the same props will not necessarily render the same output, unlike pure function components.

```js
// Stateful class component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  render() {
    // ...
  }
}
// Stateful function component
function App() {
  const [count, setCount] = useState(0);
  return; // ...
}
```

### Don’t forget:

- Stateful components have internal state that they depend on.
- Stateful components are class components or function components that use stateful Hooks.
- Stateful components have their state initialized in the constructor or with `useState()`.

### Additional links

- [React docs on State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)

### What is a stateless component?

### Answer

A stateless component is a component whose behavior does not depend on its state. Stateless components can be either functional or class components. Stateless functional components are easier to maintain and test since they are guaranteed to produce the same output given the same props. Stateless functional components should be preferred when lifecycle hooks don’t need to be used.

### Don’t forget:

- Stateless components are independent of their state.
- Stateless components can be either class or functional components.
- Stateless functional components avoid the `this` keyword altogether.

### Additional links

- [React docs on State and Lifecycle](https://reactjs.org/docs/state-and-lifecycle.html)

### Explain the difference between a static method and an instance method.

### Answer

Static methods belong to a class and don’t act on instances, while instance methods belong to the class prototype which is inherited by all instances of the class and acts on them.

    Array.isArray; // static method of Array
    Array.prototype.push; // instance method of Array

In this case, the `Array.isArray` method does not make sense as an instance method of arrays because we already know the value is an array when working with it. Instance methods could technically work as static methods, but provide terser syntax:

````js

```js

    const arr = [1, 2, 3];
    arr.push(4);
    Array.push(arr, 4);
````

### Don’t forget:

- How to create static and instance methods with ES2015 class syntax

### Additional links

- [Classes on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)

### What is the difference between synchronous and asynchronous code in JavaScript?

### Answer

Synchronous means each operation must wait for the previous one to complete. Asynchronous means an operation can occur while another operation is still being processed. In JavaScript, all code is synchronous due to the single-threaded nature of it. However, asynchronous operations not part of the program (such as `XMLHttpRequest` or `setTimeout`) are processed outside of the main thread because they are controlled by native code (browser APIs), but callbacks part of the program will still be executed synchronously.

### Don’t forget:

- JavaScript has a concurrency model based on an “event loop”.
- Functions like `alert` block the main thread so that no user input is registered until the user closes it.

### Additional links

### What is the `this` keyword and how does it work?

### Answer

The `this` keyword is an object that represents the context of an executing function. Regular functions can have their `this` value changed with the methods `call()`, `apply()` and `bind()`. Arrow functions implicitly bind `this` so that it refers to the context of its lexical environment, regardless of whether or not its context is set explicitly with `call()`. Here are some common examples of how `this` works:

### Object literals

`this` refers to the object itself inside regular functions if the object precedes the invocation of the function. Properties set as `this` do not refer to the object.

```js
let myObject = {
  property: this,
  regularFunction: function () {
    return this;
  },
  arrowFunction: () => {
    return this;
  },
  iife: (function () {
    return this;
  })(),
};
myObject.regularFunction(); // myObject
myObject["regularFunction"](); // my Object
myObject.property; // NOT myObject; lexical `this`
myObject.arrowFunction(); // NOT myObject; lexical `this`
myObject.iife; // NOT myObject; lexical `this`
const regularFunction = myObject.regularFunction;
regularFunction(); // NOT myObject; lexical `this`
```

### Event listeners

`this` refers to the element listening to the event.

```js
document.body.addEventListener("click", function () {
  console.log(this); // document.body
});
```

### Constructors

`this` refers to the newly created object.

```js
class Example {
  constructor() {
    console.log(this); // myExample
  }
}
```

---

```js
const myExample = new Example();
```

### Manual

With `call()` and `apply()`, `this` refers to the object passed as the first argument.

    let myFunction = function () {
      return this;
    };
    myFunction.call({ customThis: true }); // { customThis: true }

### Unwanted `this`

Because `this` can change depending on the scope, it can have unexpected values when using regular functions.

```js
let obj = {
  arr: [1, 2, 3],
  doubleArr() {
    return this.arr.map(function (value) {
      // this is now this.arr
      return this.double(value);
    });
  },
  double() {
    return value * 2;
  },
};
obj.doubleArr(); // Uncaught TypeError: this.double is not a function
```

### Don’t forget:

- In non-strict mode, global `this` is the global object (`window` in browsers), while in strict mode global `this` is `undefined`.
- `Function.prototype.call` and `Function.prototype.apply` set the `this` context of an executing function as the first argument, with `call` accepting a variadic number of arguments thereafter, and `apply` accepting an array as the second argument which are fed to the function in a variadic manner.
- `Function.prototype.bind` returns a new function that enforces the `this` context as the first argument which cannot be changed by other functions.
- If a function requires its `this` context to be changed based on how it is called, you must use the `function` keyword. Use arrow functions when you want `this` to be the surrounding (lexical) context.

### Additional links

- [`this` on MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)

### What does the following code evaluate to?

    typeof typeof 0;

### Answer

It evaluates to `"string"`. `typeof 0` evaluates to the string `"number"` and therefore `typeof "number"` evaluates to `"string"`.

### Don’t forget:

### Additional links

- [MDN docs for typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)

### What are JavaScript data types?

### Answer

The latest ECMAScript standard defines seven data types, six of them being primitive: `Boolean`, `Null`, `Undefined`, `Number`, `String`, `Symbol` and one non-primitive data type: `Object`.

### Don’t forget:

- Mention of newly added `Symbol` data type
- `Array`, `Date` and `function` are all of type `object`
- Functions in JavaScript are objects with the capability of being callable

### Additional links

- [MDN docs for data types and data structures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)
- [Understanding Data Types in JavaScript](https://www.digitalocean.com/community/tutorials/understanding-data-types-in-javascript)

### What is the purpose of JavaScript UI libraries/frameworks like React, Vue, Angular, Hyperapp, etc?

### Answer

The main purpose is to avoid manipulating the DOM directly and keep the state of an application in sync with the UI easily. Additionally, they provide the ability to create components that can be reused when they have similar functionality with minor differences, avoiding duplication which would require multiple changes whenever the structure of a component which is reused in multiple places needs to be updated. When working with DOM manipulation libraries like jQuery, the data of an application is generally kept in the DOM itself, often as class names or `data` attributes. Manipulating the DOM to update the UI involves many extra steps and can introduce subtle bugs over time. Keeping the state separate and letting a framework handle the UI updates when the state changes reduces cognitive load. Saying you want the UI to look a certain way when the state is a certain value is the declarative way of creating an application, instead of the imperative way of manually updating the UI to reflect the new state.

### Don’t forget:

- The virtual DOM is a representation of the real DOM tree in the form of plain objects, which allows a library to write code as if the entire document is thrown away and rebuilt on each change, while the real DOM only updates what needs to be changed. Comparing the new virtual DOM against the previous one leads to high efficiency as changing real DOM nodes is costly compared to recalculating the virtual DOM.
- JSX is an extension to JavaScript that provides XML-like syntax to create virtual DOM objects which is transformed to function calls by a transpiler. It simplifies control flow (if statements/ternary expressions) compared to tagged template literals.

### Additional links

- [Virtual DOM in Hyperapp](https://github.com/hyperapp/hyperapp#view)

### What does `'use strict'` do and what are some of the key benefits to using it?

### Answer

Including `'use strict'` at the beginning of your JavaScript source file enables strict mode, which enforces more strict parsing and error handling of JavaScript code. It is considered a good practice and offers a lot of benefits, such as:

- Easier debugging due to eliminating silent errors.
- Disallows variable redefinition.
- Prevents accidental global variables.
- Oftentimes provides increased performance over identical code that is not running in strict mode.
- Simplifies `eval()` and `arguments`.
- Helps make JavaScript more secure.

### Don’t forget:

- Eliminates `this` coercion, throwing an error when `this` references a value of `null` or `undefined`.
- Throws an error on invalid usage of `delete`.
- Prohibits some syntax likely to be defined in future versions of ECMAScript

### Additional links

- [MDN docs for strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)

### What are the differences between `var`, `let`, `const` and no keyword statements?

### Answer

### No keyword

When no keyword exists before a variable assignment, it is either assigning a global variable if one does not exist, or reassigns an already declared variable. In non-strict mode, if the variable has not yet been declared, it will assign the variable as a property of the global object (`window` in browsers). In strict mode, it will throw an error to prevent unwanted global variables from being created.

### var

`var` was the default statement to declare a variable until ES2015. It creates a function-scoped variable that can be reassigned and redeclared. However, due to its lack of block scoping, it can cause issues if the variable is being reused in a loop that contains an asynchronous callback because the variable will continue to exist outside of the block scope. Below, by the time the the `setTimeout` callback executes, the loop has already finished and the `i` variable is `10`, so all ten callbacks reference the same variable available in the function scope.

```js
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    // logs `10` ten times
    console.log(i);
  });
}
/* Solutions with `var` */
for (let i = 0; i < 10; i++) {
  // Passed as an argument will use the value as-is in
  // that point in time
  setTimeout(console.log, 0, i);
}
for (let i = 0; i < 10; i++) {
  // Create a new function scope that will use the value
  // as-is in that point in time
  ((i) => {
    setTimeout(() => {
      console.log(i);
    });
  })(i);
}
```

### let

`let` was introduced in ES2015 and is the new preferred way to declare variables that will be reassigned later. Trying to redeclare a variable again will throw an error. It is block-scoped so that using it in a loop will keep it scoped to the iteration.

```js
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    // logs 0, 1, 2, 3, ...
    console.log(i);
  });
}
```

### const

`const` was introduced in ES2015 and is the new preferred default way to declare all variables if they won’t be reassigned later, even for objects that will be mutated (as long as the reference to the object does not change). It is block-scoped and cannot be reassigned.

````js

    const myObject = {};
    myObject.prop = "hello!"; // No error
    myObject = "hello"; // Error

### Don’t forget:

- All declarations are hoisted to the top of their scope.
- However, with `let` and `const` there is a concept called the temporal dead zone (TDZ). While the declarations are still hoisted, there is a period between entering scope and being declared where they cannot be accessed.
- Show a common issue with using `var` and how `let` can solve it, as well as a solution that keeps `var`.
- `var` should be avoided whenever possible and prefer `const` as the default declaration statement for all variables unless they will be reassigned later, then use `let` if so.

### Additional links

- [`let` vs `const`](https://wesbos.com/let-vs-const/)

### What is a virtual DOM and why is it used in libraries/frameworks?

### Answer

The virtual DOM (VDOM) is a representation of the real DOM in the form of plain JavaScript objects. These objects have properties to describe the real DOM nodes they represent: the node name, its attributes, and child nodes.

    <div class="counter">
      <h1>0</h1>
      <button>-</button>
      <button>+</button>
    </div>

The above markup’s virtual DOM representation might look like this:

    {
      nodeName: "div",
      attributes: { class: "counter" },
      children: [
        {
          nodeName: "h1",
          attributes: {},
          children: [0]
        },
        {
          nodeName: "button",
          attributes: {},
          children: ["-"]
        },
        {
          nodeName: "button",
          attributes: {},
          children: ["+"]
        }
      ]
    }

The library/framework uses the virtual DOM as a means to improve performance. When the state of an application changes, the real DOM needs to be updated to reflect it. However, changing real DOM nodes is costly compared to recalculating the virtual DOM. The previous virtual DOM can be compared to the new virtual DOM very quickly in comparison. Once the changes between the old VDOM and new VDOM have been calculated by the diffing engine of the framework, the real DOM can be patched efficiently in the least time possible to match the new state of the application.

### Don’t forget:

- Why accessing the DOM can be so costly.

### Additional links

- [The difference between Virtual DOM and DOM](http://reactkungfu.com/2015/10/the-difference-between-virtual-dom-and-dom/)

### What is WCAG? What are the differences between A, AA, and AAA compliance?

### Answer

WCAG stands for “Web Content Accessibility Guidelines”. It is a standard describing how to make web content more accessible to people with disabilities They have 12-13 guidelines and for each one, there are testable success criteria, which are at three levels: A, AA, and AAA. The higher the level, the higher the impact on the design of the web content. The higher the level, the web content is essentially more accessible by more users. Depending on where you live/work, there may be regulations requiring websites to meet certain levels of compliance. For instance, in Ontario, Canada, beginning January 1, 2021 all public websites and web content posted after January 1, 2012 must meet AA compliance.

### Don’t forget:

- A guideline for making web content more accessible
- 3 different levels (A, AA, and AAA) of compliance for each guideline
- Governments are starting to require web content to meet a certain level of compliance by law

### Additional links

- [Web Content Accessibility Guidelines (WCAG) Overview](https://www.w3.org/WAI/standards-guidelines/wcag/)
- [How to Meet WCAG](https://www.w3.org/WAI/WCAG21/quickref/)

### What is a cross-site scripting attack (XSS) and how do you prevent it?

### Answer

XSS refers to client-side code injection where the attacker injects malicious scripts into a legitimate website or web application. This is often achieved when the application does not validate user input and freely injects dynamic HTML content. For example, a comment system will be at risk if it does not validate or escape user input. If the comment contains unescaped HTML, the comment can inject a `<script>` tag into the website that other users will execute against their knowledge.

- The malicious script has access to cookies which are often used to store session tokens. If an attacker can obtain a user’s session cookie, they can impersonate the user.
- The script can arbitrarily manipulate the DOM of the page the script is executing in, allowing the attacker to insert pieces of content that appear to be a real part of the website.
- The script can use AJAX to send HTTP requests with arbitrary content to arbitrary destinations.

### Don’t forget:

- On the client, using `textContent` instead of `innerHTML` prevents the browser from running the string through the HTML parser which would execute scripts in it.
- On the server, escaping HTML tags will prevent the browser from parsing the user input as actual HTML and therefore won’t execute the script.

### Additional links

- [Cross-Site Scripting Attack (XSS)](https://www.acunetix.com/websitesecurity/cross-site-scripting/)

---

# ALL Prior Code

  ```js
```js

    // Normal promises in regular function:
    function foo() {
      promiseCall()
        .then(result => {
          // do something with the result
        })
    }
    // async functions
    async function foo() {
      const result = await promiseCall()
      // do something with the result
    }
    /**
    It accepts two objects as arguments: the first object is the recipe
    for the food, while the second object is the available ingredients.
    Each ingredient's value is a number representing how many units there are.
    `batches(recipe, available)`
    */
    // 0 batches can be made
    batches(
      { milk: 100, butter: 50, flour: 5 },
      { milk: 132, butter: 48, flour: 51 }
    )
    batches(
      { milk: 100, flour: 4, sugar: 10, butter: 5 },
      { milk: 1288, flour: 9, sugar: 95 }
    )
    // 1 batch can be made
    batches(
      { milk: 100, butter: 50, cheese: 10 },
      { milk: 198, butter: 52, cheese: 10 }
    )
    // 2 batches can be made
    batches(
      { milk: 2, sugar: 40, butter: 20 },
      { milk: 5, sugar: 120, butter: 500 }
    )
    const batches = (recipe, available) =>
      Math.floor(
        Math.min(...Object.keys(recipe).map(k => available[k] / recipe[k] || 0))
      )
    arr[arr.length - 1]
    arr.filter(fn)
    arr.some(fn)
    arr.sort(fn)
    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr.length; j++) {
        // ...
      }
    }

````

---

```js
const permutations = (arr) => {
  if (arr.length <= 2) return arr.length === 2 ? [arr, [arr[1], arr[0]]] : arr;
  return arr.reduce(
    (acc, item, i) =>
      acc.concat(
        permutations([...arr.slice(0, i), ...arr.slice(i + 1)]).map((val) => [
          item,
          ...val,
        ])
      ),
    []
  );
};
function example() {
  console.log(this);
}
```

---

```js
const boundExample = bind(example, { a: true });
boundExample.call({ b: true }); // logs { a: true }
```

---

```js
const bind =
  (fn, context) =>
  (...args) =>
    fn.apply(context, args);
getData(function (a) {
  getMoreData(a, function (b) {
    getMoreData(b, function (c) {
      getMoreData(c, function (d) {
        getMoreData(d, function (e) {
          // ...
        });
      });
    });
  });
});
async function asyncAwaitVersion() {
  const a = await getData();
  const b = await getMoreData(a);
  const c = await getMoreData(b);
  const d = await getMoreData(c);
  const e = await getMoreData(d);
  // ...
}
setState({ name: "sudheer" }, () => {
  console.log("The name has updated and component re-rendered");
});
// Legacy approach using findDOMNode()
class MyComponent extends Component {
  componentDidMount() {
    findDOMNode(this).scrollIntoView();
  }
  render() {
    return <div />;
  }
}
// Recommended approach using callback refs
class MyComponent extends Component {
  componentDidMount() {
    this.node.scrollIntoView();
  }
  render() {
    return <div ref={(node) => (this.node = node)} />;
  }
}
function onClick() {
  console.log("The user clicked on the page.");
}
document.addEventListener("click", onClick);
const map = (arr, callback) => {
  const result = [];
  for (let i = 0; i < arr.length; i++) {
    result.push(callback(arr[i], i));
  }
  return result;
};
map([1, 2, 3, 4, 5], (n) => n * 2); // [2, 4, 6, 8, 10]
function GenericBox({ children }) {
  return <div className="container">{children}</div>;
}
function App() {
  return (
    <GenericBox>
      <span>Hello</span> <span>World</span>
    </GenericBox>
  );
}
```

---

```js
const element = document.createElement("div");
element.className = "hello";
const element = {
  attributes: {
    class: "hello",
  },
};
```

---

```js
    const { class } = this.props // Error
    const { className } = this.props // All good
    const { class: className } =
        this.props // All good, but
    const obj = { a: 1, b: 2 }

```

---

```js
const shallowClone = { ...obj };
function isDeepEqual(obj1, obj2, testPrototypes = false) {
  if (obj1 === obj2) {
    return true;
  }
  if (typeof obj1 === "function" && typeof obj2 === "function") {
    return obj1.toString() === obj2.toString();
  }
  if (obj1 instanceof Date && obj2 instanceof Date) {
    return obj1.getTime() === obj2.getTime();
  }
  if (
    Object.prototype.toString.call(obj1) !==
      Object.prototype.toString.call(obj2) ||
    typeof obj1 !== "object"
  ) {
    return false;
  }
  const prototypesAreEqual = testPrototypes
    ? isDeepEqual(
        Object.getPrototypeOf(obj1),
        Object.getPrototypeOf(obj2),
        true
      )
    : true;
  const obj1Props = Object.getOwnPropertyNames(obj1);
  const obj2Props = Object.getOwnPropertyNames(obj2);
  return (
    obj1Props.length === obj2Props.length &&
    prototypesAreEqual &&
    obj1Props.every((prop) => isDeepEqual(obj1[prop], obj2[prop]))
  );
}
```

---

```js
    const { Provider, Consumer } = React.createContext(defaultValue)
    const debounce = (func, delay) => {
      let debounceTimer;
      return function() {
        const context = this;
        const args = arguments;
          clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => func.apply(context, args), delay);
      }
    }
    window.addEventListere('scroll', debounce(function() {
      // Do stuff, this function will be called after a delay of 1 second
    }, 1000));
    const Component = () => "Hello"
    const componentElement = <Component />
    const domNodeElement = <div />
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props)
        this.state = { hasError: false }
      }
      // Use componentDidCatch to log the error
      componentDidCatch(error, info) {
        // You can also log the error to an error reporting service
        logErrorToMyService(error, info)
      }
      // use getDerivedStateFromError to update state
      static getDerivedStateFromError(error) {
        // Display fallback UI
         return { hasError: true };
      }
      render() {
        if (this.state.hasError) {
          // You can render any custom fallback UI
          return <h1>Something went wrong.</h1>
        }
        return this.props.children
      }
    }
    document.querySelectorAll("button").forEach(button => {
      button.addEventListener("click", handleButtonClick)
    })
    document.addEventListener("click", e => {
      if (e.target.closest("button")) {
        handleButtonClick()
      }
    })
    document.addEventListener("click", function(event) {
      // This callback function is run when the user
      // clicks on the document.
    })
    const hub = createEventHub()
    hub.on("message", function(data) {
      console.log(`${data.username} said ${data.text}`)
    })
    hub.emit("message", {
      username: "John",
      text: "Hello?"
    })
    let x = 0
    function declaration() {}
    if (true) {
    }
    // Assign `x` to the absolute value of `y`.
    let x
    if (y >= 0) {
      x = y
    } else {
      x = -y
    }
    5 + 5 // => 10
    lastCharacter("input") // => "t"
    true === true // => true
    // Assign `x` as the absolute value of `y`.
    let x = y >= 0 ? y : -y
    Boolean("") // false
    Boolean([]) // true
    !!"" // false
    !![] // true
    const fibonacci = n =>
      [...Array(n)].reduce(
        (acc, val, i) => acc.concat(i > 1 ? acc[i - 1] + acc[i - 2] : i),
        []
      )
    const words = ['rates', 'rat', 'stare', 'taser', 'tears', 'art', 'tabs', 'tar', 'bats', 'state'];
    const words = ['rates', 'rat', 'stare', 'taser', 'tears', 'art', 'tabs', 'tar', 'bats', 'state'];
    function anagramGroups(wordAry){
        const groupedWords = {};
        // iterate over each word in the array
        wordAry.map(word => {
          // alphabetize the word and a separate variable
          alphaWord = word.split('').sort().join('');
          // if the alphabetize word is already a key, push the actual word value (this is an anagram)
          if(groupedWords[alphaWord]) {
            return groupedWords[alphaWord].push(word);
          }
          // otherwise add the alphabetize word key and actual word value (may not turn out to be an anagram)
          groupedWords[alphaWord] = [word];
        })
        return groupedWords;
    }
    // call the function and store results in a variable called collectedAnagrams
    const collectedAnagrams = anagramGroups(words);
    // iterate over groupedAnagrams, printing out group of values
    for(const sortedWord in collectedAnagrams) {
      if(collectedAnagrams[sortedWord].length > 1) {
        console.log(collectedAnagrams[sortedWord].toString());
      }
    }
    0.1 + 0.2 // 0.30000000000000004
    const approxEqual = (n1, n2, epsilon = 0.0001) => Math.abs(n1 - n2) < epsilon
    approxEqual(0.1 + 0.2, 0.3) // true
    render() {
      return (
        <React.Fragment>
          <ChildA />
          <ChildB />
          <ChildC />
        </React.Fragment>
      )
    };
    // Short syntax supported by Babel 7
    render() {
     return (
        <>
          <ChildA />
          <ChildB />
          <ChildC />
        </>
      );
    };
    const EnhancedComponent = higherOrderComponent(WrappedComponent)
    let foo = 1
    let foobar = function() {
      console.log(foo)
      let foo = 2
    }
    foobar()
    console.log(hoist)
    let hoist = "value"
    let hoist
    console.log(hoist)
    hoist = "value"
    myFunction() // No error; logs "hello"
    function myFunction() {
      console.log("hello")
    }
    myFunction() // Error: `myFunction` is not a function
    let myFunction = function() {
      console.log("hello")
    }

```

---

```js
const myLibrary = (function () {
  let privateVariable = 2;
  return {
    publicMethod: () => privateVariable,
  };
})();
privateVariable; // ReferenceError
myLibrary.publicMethod(); // 2
const numbers = [1, 2, 3, 4, 5];
const numbersDoubled = [];
for (let i = 0; i < numbers.length; i++) {
  numbersDoubled[i] = numbers[i] * 2;
}
```

---

```js
const numbers = [1, 2, 3, 4, 5];
const numbersDoubled = numbers.map((n) => n * 2);
function App({ messages, isVisible }) {
  return (
    <div>
      if (messages.length > 0){" "}
      {<h2>You have {messages.length} unread messages.</h2>} else{" "}
      {<h2>You have no unread messages.</h2>}
      if (isVisible) {<p>I am visible.</p>}
    </div>
  );
}
function App({ messages, isVisible }) {
  return (
    <div>
      {messages.length > 0 ? (
        <h2>You have {messages.length} unread messages.</h2>
      ) : (
        <h2>You have no unread messages.</h2>
      )}
      {isVisible && <p>I am visible.</p>}
    </div>
  );
}
```

---

```js
const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
const mask = (str, maskChar = "#") =>
  str.slice(-4).padStart(str.length, maskChar);
const memoize = (fn) => {
  const cache = new Map();
  return (value) => {
    const cachedResult = cache.get(value);
    if (cachedResult !== undefined) return cachedResult;
    const result = fn(value);
    cache.set(value, result);
    return result;
  };
};
```

---

```js
    constructor(props) {
      super(props);
      this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
      // Perform some logic
    }
    handleClick = () => {
      console.log('this is:', this);
    }
    render() {
      return (
        <button onClick={this.handleClick}>
          Click me
        </button>
      );
    }
    <button onClick={e => this.handleClick(e)}>Click me</button>
    const myString = "hello!"
    myString.replace("!", "") // returns a new string, cannot mutate the original value
    const originalArray = [1, 2, 3]
    originalArray.push(4) // mutates originalArray, now [1, 2, 3, 4]
    originalArray.concat(4) // returns a new array, does not mutate the original
    fs.readFile(filePath, function(err, data) {
      if (err) {
        // handle the error, the return is important here
        // so execution stops here
        return console.log(err)
      }
      // use the data object
      console.log(data)
    })
    let isTrue = function(value, callback) {
      if (value === true) {
        callback(null, "Value was true.")
      } else {
        callback(new Error("Value is not true!"))
      }
    }
    let callback = function(error, retval) {
      if (error) {
        console.log(error)
        return
      }
      console.log(retval)
    }
    isTrue(false, callback)
    isTrue(true, callback)
    /*
      { stack: [Getter/Setter],
        arguments: undefined,
        type: undefined,
        message: 'Value is not true!' }
      Value was true.
    */
    const person = {
      name: "John",
      age: 50,
      birthday() {
        this.age++
      }
    }
    person.birthday() // person.age === 51
    function Person(name, age) {
      this.name = name
      this.age = age
    }
    Person.prototype.birthday = function() {
      this.age++
    }

```

---

```js
const person1 = new Person("John", 50);
const person2 = new Person("Sally", 20);
person1.birthday(); // person1.age === 51
person2.birthday(); // person2.age === 21
const createPerson = (name, age) => {
  const birthday = () => person.age++;
  const person = { name, age, birthday };
  return person;
};
```

---

```js
const person = createPerson("John", 50);
person.birthday(); // person.age === 51
const personProto = {
  birthday() {
    this.age++;
  },
};
```

---

```js
    const person = Object.create(personProto)
    person.age = 50
    person.birthday() // person.age === 51
    Object.create(personProto, {
      age: {
        value: 50,
        writable: true,
        enumerable: true
      }
    })
    function myFunction(parameter1, parameter2) {
      console.log(arguments[0]) // "argument1"
    }
    myFunction("argument1", "argument2")
    <button onClick={() => this.handleClick(id)} />
    <button onClick={this.handleClick.bind(this, id)} />
    const square = v => v * v
    const double = v => v * 2
    const addOne = v => v + 1
    const res = pipe(square, double, addOne)
    res(3) // 19; addOne(double(square(3)))
    const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x)
    ReactDOM.createPortal(child, container)
    let i = 0
    i++ // 0
    // i === 1
    let i = 0
    ++i // 1
    // i === 1
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("result")
      }, 100)
    })
      .then(console.log)
      .catch(console.error)
    import PropTypes from "prop-types"
    class User extends React.Component {
      static propTypes = {
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired
      }
    //
    //   render() {
    //     return (
    //       <h1>Welcome, {this.props.name}</h1>
    //       <h2>Age, {this.props.age}
    //     )
    //   }
    // }

```

---

```js
    const a = (x, y) => x + y
    const b = (arr, value) => arr.concat(value)
    const c = arr => [...arr].sort((a, b) => a - b)
    const a = (x, y) => x + y + Math.random()
    const b = (arr, value) => (arr.push(value), arr)
    const c = arr => arr.sort((a, b) => a - b)
    const nest = (items, id = null, link = "parent_id") =>
      items
        .filter(item => item[link] === id)
        .map(item => ({ ...item, children: nest(items, item.id) }))
    const comments = [
      { id: 1, parent_id: null, text: "First reply to post." },
      { id: 2, parent_id: 1, text: "First reply to comment #1." },
      { id: 3, parent_id: 1, text: "Second reply to comment #1." },
      { id: 4, parent_id: 3, text: "First reply to comment #3." },
      { id: 5, parent_id: 4, text: "First reply to comment #4." },
      { id: 6, parent_id: null, text: "Second reply to post." }
    ]
    nest(comments)
    /*
    [
      { id: 1, parent_id: null, text: "First reply to post.", children: [...] },
      { id: 6, parent_id: null, text: "Second reply to post.", children: [] }
    ]
    */
    const a = [1, 2, 3]
    const b = [1, 2, 3]
    const c = "1,2,3"
    console.log(a == c)
    console.log(a == b)
    class MyComponent extends React.Component {
      constructor(props) {
        super(props)
        this.myRef = React.createRef()
      }
      render() {
        return <div ref={this.myRef} />
      }
    }
    >>>>function greet() {
      return
      {
        message: "hello"
      }
    }

```

---

```js
const previousLine = 3;
[1, 2, previousLine].map((n) => n * 2);
const previousLine = 3;
(function () {
  // ...
})();
true || false;
false && true;
true || nonexistentFunction();
false && nonexistentFunction();
true || nonexistentFunction() || window.nothing.wouldThrowError;
true || window.nothing.wouldThrowError;
true;
const options = {};
```

---

```js
const setting = options.setting || "default";
setting; // "default"
// Instead of:
addEventListener("click", (e) => {
  if (e.target.closest("button")) {
    handleButtonClick(e);
  }
});
// You can take advantage of short-circuit evaluation:
addEventListener(
  "click",
  (e) => e.target.closest("button") && handleButtonClick(e)
);
// Stateful class component
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }
  render() {
    // ...
  }
}
// Stateful function component
function App() {
  const [count, setCount] = useState(0);
  return; // ...
}
Array.isArray; // static method of Array
Array.prototype.push; // instance method of Array
const arr = [1, 2, 3];
arr.push(4);
Array.push(arr, 4);
let myObject = {
  property: this,
  regularFunction: function () {
    return this;
  },
  arrowFunction: () => {
    return this;
  },
  iife: (function () {
    return this;
  })(),
};
myObject.regularFunction(); // myObject
myObject["regularFunction"](); // my Object
myObject.property; // NOT myObject; lexical `this`
myObject.arrowFunction(); // NOT myObject; lexical `this`
myObject.iife; // NOT myObject; lexical `this`
const regularFunction = myObject.regularFunction;
regularFunction(); // NOT myObject; lexical `this`
document.body.addEventListener("click", function () {
  console.log(this); // document.body
});
class Example {
  constructor() {
    console.log(this); // myExample
  }
}
```

---

```js
const myExample = new Example();
let myFunction = function () {
  return this;
};
myFunction.call({ customThis: true }); // { customThis: true }
let obj = {
  arr: [1, 2, 3],
  doubleArr() {
    return this.arr.map(function (value) {
      // this is now this.arr
      return this.double(value);
    });
  },
  double() {
    return value * 2;
  },
};
obj.doubleArr(); // Uncaught TypeError: this.double is not a function
typeof typeof 0;
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    // logs `10` ten times
    console.log(i);
  });
}
/* Solutions with `var` */
for (let i = 0; i < 10; i++) {
  // Passed as an argument will use the value as-is in
  // that point in time
  setTimeout(console.log, 0, i);
}
for (let i = 0; i < 10; i++) {
  // Create a new function scope that will use the value
  // as-is in that point in time
  ((i) => {
    setTimeout(() => {
      console.log(i);
    });
  })(i);
}
for (let i = 0; i < 10; i++) {
  setTimeout(() => {
    // logs 0, 1, 2, 3, ...
    console.log(i);
  });
}
```

---

```js
const myObject = {};
myObject.prop = "hello!"; // No error
myObject = "hello"; // Error
```
