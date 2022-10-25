const {Node, getLengthOfLinkedList, sumLinkedList, modifiedSumLinkedList, swapElementOfLinkedList,
FancyIntegers, rewardIntegers} = require('./practice');

describe('Test linked list excercises', () => {
    expect.extend({
        toHaveEachValueBe(head, values) {
            let node = head;
            let pass = true;
            let actual = [];
            for (const val of values) {
                expect(node instanceof Node).toBe(true);
                if (!(node instanceof Node)) {
                    pass = false;
                    break;
                }
                expect(node.num).toBe(val);
                actual.push(node.num);
                node = node.next;
            }
            expect(node instanceof Node).toBe(false);
            const actualVisualization = actual.map(e => `(${e})`).join(' --> ');
            const correctVisualization = values.map(e => `(${e})`).join(' --> ');
            return {
                pass: pass,
                message: () => {
                    if (actual.length === 0) {
                        return 'The length of the linked list after swapping is zero.';
                    } else {
                        return `The linked list after swapping is ${actualVisualization}. It should be ${correctVisualization}`
                    }
                }
            }
        },
    })
    test('Get length', () => {
        expect(getLengthOfLinkedList(null)).toBe(0);
        expect(getLengthOfLinkedList(new Node(0))).toBe(1);
        expect(getLengthOfLinkedList(new Node(0, new Node(1)))).toBe(2);
        expect(getLengthOfLinkedList(new Node(0, new Node(1, new Node(2))))).toBe(3);
        expect(getLengthOfLinkedList(new Node(0, new Node(1, new Node(2, new Node(3)))))).toBe(4);
        expect(getLengthOfLinkedList(new Node(0, new Node(1, new Node(2, new Node(3, new Node(4))))))).toBe(5);
    });

    test('Sum Linked List', () => {
        expect(sumLinkedList(null)).toBe(0);
        expect(sumLinkedList(new Node(0))).toBe(0);
        expect(sumLinkedList(new Node(0, new Node(1)))).toBe(1);
        expect(sumLinkedList(new Node(0, new Node(1, new Node(2))))).toBe(3);
        expect(sumLinkedList(new Node(0, new Node(1, new Node(2, new Node(3)))))).toBe(6);
        expect(sumLinkedList(new Node(0, new Node(1, new Node(2, new Node(3, new Node(4))))))).toBe(10);
    });

    test('Modified Sum Linked List', () => {
        expect(modifiedSumLinkedList(null)).toBe(0);
        expect(modifiedSumLinkedList(new Node(0))).toBe(0);
        expect(modifiedSumLinkedList(new Node(0, new Node(1)))).toBe(2);
        expect(modifiedSumLinkedList(new Node(0, new Node(1, new Node(2))))).toBe(4);
        expect(modifiedSumLinkedList(new Node(0, new Node(1, new Node(2, new Node(3)))))).toBe(10);
        expect(modifiedSumLinkedList(new Node(0, new Node(1, new Node(2, new Node(3, new Node(4))))))).toBe(14);
    });

    test('Modified Sum Linked List', () => {
        expect(modifiedSumLinkedList(null)).toBe(0);
        expect(modifiedSumLinkedList(new Node(0))).toBe(0);
        expect(modifiedSumLinkedList(new Node(0, new Node(1)))).toBe(2);
        expect(modifiedSumLinkedList(new Node(0, new Node(1, new Node(2))))).toBe(4);
        expect(modifiedSumLinkedList(new Node(0, new Node(1, new Node(2, new Node(3)))))).toBe(10);
        expect(modifiedSumLinkedList(new Node(0, new Node(1, new Node(2, new Node(3, new Node(4))))))).toBe(14);
    });

    test('Swap element of linked list', () => {
        const makeLinkedList = () => new Node(0, new Node(1, new Node(2, new Node(3, new Node(4)))));
        expect(swapElementOfLinkedList(makeLinkedList(), 1, 3)).toHaveEachValueBe([0,3,2,1,4]);
        expect(swapElementOfLinkedList(makeLinkedList(), 1, 4)).toHaveEachValueBe([0,4,2,3,1]);
        expect(swapElementOfLinkedList(makeLinkedList(), 0, 3)).toHaveEachValueBe([3,1,2,0,4]);
        expect(swapElementOfLinkedList(makeLinkedList(), 0, 4)).toHaveEachValueBe([4,1,2,3,0]);
    });

    test('Fancy Integers', () => {
        const makeList = (arr) => {
            let fancy = true;
            const m = arr.map(e => {
                fancy = !fancy;
                return new FancyIntegers(e, fancy);
            })
            for(let i = 0; i < m.length - 1; ++i) {
                m.next = m[i + 1];
            }
            return m[0];
        }
        expect(rewardIntegers(makeList([0,1,2,3,4]))).toHaveEachValueBe([1,2,3,6,5]);
        const l = makeList([0,1,2,3,4]);
        rewardIntegers(l);
        rewardIntegers(l);
        expect(l).toHaveEachValueBe([2,4,4,12,6]);
        const d = makeList([0,1,2,3,4]);
        rewardIntegers(d);
        rewardIntegers(d);
        rewardIntegers(d);
        expect(d).toHaveEachValueBe([3,8,5,24,7]);
    });
});