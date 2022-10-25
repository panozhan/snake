class Node {
    constructor(num, next) {
        this.num = num;
        this.next = next;
    }
}

/**
 * @param {?Node} node 
 * @returns {number}
 */
function getLengthOfLinkedList(node) {
    if (node === undefined || node === null) {
        return 0;
    } else {
        let length = 0;
        while (node !== undefined) {
            length++;
            node = node.next;
        }
        return length;
    }
}

/**
 * @param {?Node} node 
 * @returns {number}
 */
function sumLinkedList(node) {
    
}

/**
 * This function should sum each node in the linked list with the following rule
 * 1. If the node is at an odd index, add the value of the index
 * 2. If the node is at an even index, add double the value of the index
 * 
 * For example, the input: (1) --> (2) --> (3) --> (4)
 * Should return 1 + 4 + 3 + 8 because (2) and (4) are at even indexes, so we 
 * double their value and return the sum.
 * @param {?Node} node 
 * @returns {number}
 */
 function modifiedSumLinkedList(node) {
    
}

/**
 * Given two indexes called index1 and index2 respectively, swap the nodes at index1
 * and index2 with each other and return the head of the linked list 
 * 
 * For example given a linked list (1) --> (2) --> (3) --> (4) --> (5),
 * and index1 = 1, index2 = 3, it should swap node (2) and (4). The result should be
 * (1) --> (4) --> (3) --> (2) --> (5)
 * @param {!Node} head The head of the linked list
 * @param {number} index1 The index of the first node to swap to position index2
 * @param {number} index2 The index of the second node to swap to position index 1
 * @returns {number}
0 */
 function swapElementOfLinkedList(head, index1, index2) {
    
}

class FancyIntegers {
    constructor(score, isFancy, next) {
        this.score = score;
        this.isFancy = isFancy;
        this.next = next;
    }
}

/**
 * For every integer that is fancy, double its score.
 * If it's not fancy, add one to its score
 * 
 * For example, given a linked list of fancy integers 
 * (score: 1, isFancy: false) --> (score: 2, isFancy: true) --> (score: 5, isFancy: false)
 * After calling this function, the linked list should be
 * (score: 2, isFancy: false) --> (score: 4, isFancy: true) --> (score: 6, isFancy: false)
 * @param {?FancyIntegers}   
 */
function rewardIntegers(fancyInteger) {

}

/**
 * Linked list leetcode problems
 * https://leetcode.com/problems/reverse-linked-list/
 * https://leetcode.com/problems/linked-list-cycle/
 * https://leetcode.com/problems/linked-list-cycle-ii/
 */

module.exports = {
    Node, 
    getLengthOfLinkedList, 
    sumLinkedList, 
    modifiedSumLinkedList, 
    swapElementOfLinkedList,
    FancyIntegers,
    rewardIntegers,
}