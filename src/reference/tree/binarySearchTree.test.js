// 이진 탐색 트리의 노드를 나타내는 클래스
class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

// 이진 탐색 트리 클래스
class BinarySearchTreeTest {
    constructor() {
        this.root = null;
    }

    // 새로운 노드를 추가하는 메서드
    insert(value) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
        } else {
            this.insertNode(this.root, newNode);
        }
    }

    // 재귀적으로 새로운 노드를 적절한 위치에 삽입하는 메서드
    insertNode(node, newNode) {
        if (newNode.value < node.value) {
            if (node.left === null) {
                node.left = newNode;
            } else {
                this.insertNode(node.left, newNode);
            }
        } else {
            if (node.right === null) {
                node.right = newNode;
            } else {
                this.insertNode(node.right, newNode);
            }
        }
    }

    // 트리에서 특정한 값을 검색하는 메서드
    search(value) {
        return this.searchNode(this.root, value);
    }

    // 재귀적으로 특정한 값을 검색하는 메서드
    searchNode(node, value) {
        if (node === null) {
            return false;
        }

        if (value === node.value) {
            return true;
        }

        if (value < node.value) {
            return this.searchNode(node.left, value);
        } else {
            return this.searchNode(node.right, value);
        }
    }
}

// 이진 탐색 트리 사용 예시
test('이진 탐색 트리 테스트', () => {
    const bst = new BinarySearchTreeTest();
    bst.insert(4);
    bst.insert(2);
    bst.insert(6);
    bst.insert(1);
    bst.insert(3);
    bst.insert(5);
    bst.insert(7);

    expect(bst.search(5)).toBe(true);
    expect(bst.search(8)).toBe(false);
});
