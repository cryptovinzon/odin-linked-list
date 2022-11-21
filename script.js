// https://sebhastian.com/linked-list-javascript/

// node factory
function createNode(value) {
    return {
        value: value,
        next: null,
    }
}

// linked list
class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.length = 0;
    }

    // add node to end
    append(value) {
        this.length++;
        let newNode = createNode(value);

        // if linkedlist has a tail
        if (this.tail) {
            this.tail.next = newNode; // link old tail with new node
            this.tail = newNode; // asign new node as new tail
            return newNode;
        }

        // if no tail (linkedlist is empty), create newNode object with head & tail pointers
        this.head = this.tail = newNode;
        return newNode;
    }

    // remove node from end
    pop() {
        if (this.tail) {
            this.length--;
            const tailNode = this.tail;

            // find node before tail (last node)
            let currentNode = this.head;
            while (currentNode.next != this.tail) {
                currentNode = currentNode.next;
            }
            const beforeTail = currentNode;
            this.tail = beforeTail; // asign this beforeTail node as new tail
            this.tail.next = null; // removes link to the node after
            return tailNode;
        }
        return undefined; // if tail is null (empty list), return undefined
    }

    // insert node at head
    prepend(value) {
        this.length++;
        let newNode = createNode(value);

        // if head exisits
        if (this.head) {
            newNode.next = this.head; // links new node before current head
            this.head = newNode; // sets new head to new node
            return newNode;
        }

        // if linkedList is empty
        this.head = this.tail = newNode;
        return newNode;
    }

    // remove node at head
    removeHead() {
        if (this.head) {
            this.length--;
            const removedNode = this.head;
            this.head = this.head.next; // sets new head to it's next value
            return removedNode;
        }
        return undefined; // undefined if no linkedList
    }

    // insert node at specific index
    insertIndex(value, index) {
        // check index to insert < linkedList length
        if (index >= this.length) {
            throw new Error("out of bounds!")
        }

        // if insert at head (index = 0), we can call insertHead()
        if (index === 0) {
            return this.insertHead(value)
        }

        // insert node elsewhere
        let previousNode = null;
        let currentNode = this.head; // start at head

        for (let i=0; i < index; i++) { // move to location of index required
            previousNode = currentNode; // i.e. if index = 1, previous node index = 0
            currentNode = currentNode.next; // replace currentNode with it's next value (index = 2)
        }

        const newNode = createNode(value);
        newNode.next = currentNode; // connect newNode's next value to currentNode (index = 2)
        previousNode.next = newNode; // connect previousNode's (index = 0) next value to newNode (index = 1)
        this.length++;
        return newNode;
    }

    // remove node at specific index
    removeIndex(index) {
        // check index to insert < linkedList length
        if (index >= this.length) {
            throw new Error("out of bounds!")
        }

        // if remove at head (index = 0), we can call removeHead()
        if (index === 0) {
            return this.removeHead(value)
        }        
        
        // remove node elsewhere
        let previousNode = null;
        let currentNode = this.head;

        for (let i=0; i < index; i++) {
            previousNode = currentNode;
            currentNode = currentNode.next
        }

        previousNode.next = currentNode.next; // link previousNode's next value to currenNode's next value (link of currentNode terminated)
        this.length--;
        return currentNode;
    }

    size() {
        return this.length;
    }
    
    returnHead() {
        return this.head.value;
    }

    returnTail() {
        return this.tail.value;
    }

    at(index) {
        if (index >= this.length) {
            throw new Error("out of bounds!")
        }

        let previousNode = null;
        let currentNode = this.head;
        for (let i=0; i < index; i++) {
            previousNode = currentNode;
            currentNode = currentNode.next;
        }
        return currentNode;
    }

    contains(value) {
        let current = this.head;
        while (current) {
            if (current.value === value) return true;
            current = current.next;            
        }
        return false;
    }

    find(value) {
        let current = this.head;
        let index = 0;
        while (current) {            
            if (current.value === value) return index;
            index++;
            current = current.next;            
        }
        return null;
    }

    toString() {
        let current = this.head;
        let fullList = '';
        while (current) {
          fullList = fullList.concat(`( ${current.value} ) --> `);
          current = current.next;
        }
        fullList = fullList.concat(`null`)
        return fullList;
    }
}

const list = new LinkedList();

const run = async() => {
await list.append(5);    
await list.append(6);
await list.append(7);
await list.append(8);
await list.append(9);
await list.prepend(4);
console.log(list.returnHead())
console.log(list.returnTail())
console.log(list.size())
console.log(list.at(2))
console.log(list.contains(6))
console.log(list.contains(9))
console.log(list.contains(10))
console.log(list.find(5))
console.log(list.find(9))
console.log(list.find(10))
console.log(list.toString())
}

run()

