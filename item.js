class Item {
    constructor(row) {
        this.quantity = +row[0];
        this.item = row[1];
        this.location = row[2] == "" ? new Set() : new Set([row[2]]); 
        this.model = row[3] == "" ? new Set() : new Set([row[3]]);
        this.serialNumber = row[4] == "" ? new Set() : new Set([row[4]]);
        this.notes = row[5] == "" ? new Set() : new Set([row[5]]);
    }

    // operator overloading for '+'
    add(other) {
        // make sure item is the same
        if (this.equals(other)) {
            this.quantity += other.quantity;
            this.location = new Set([...this.location, ...other.location]);
            this.model = new Set([...this.model, ...other.model]);
            this.serialNumber = new Set([...this.serialNumber, ...other.serialNumber]);
            this.notes = new Set([...this.notes, ...other.notes]);
            return true;
        }
        return false;
    }

    // operator overloading for '=='
    equals(other) {
        if (this.item.trim().toLowerCase() === other.item.trim().toLowerCase()) {
            return true;
        } 
        return false;
    }

    // valid item?
    validate() {
        if (this.quantity == 0 && isNaN(this.quantity)) {
            return false;
        }
        if (this.item === "") {
            return false;
        }
        return true;
    }
}