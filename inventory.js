class Inventory {
    constructor(source) {
        this.sheets = source.getSheets();
        this.totals = this.sheets.filter(sheet => sheet.getName() == "Total")[0];
        this.sheets = this.sheets.filter(sheet => sheet.getName() !== "Total");

        this.directory = new Map();
        return true;
    }

    read() {
        this.sheets.forEach(sheet => {
            this.readSheet(sheet);
        })
        return true;
    }

    readSheet(sheet) {
        const lastRow = sheet.getLastRow();
        let currentDirectory = null;

        for (let i = HEADER_SIZE + 1; i <= lastRow; i++) {
            const cell = sheet.getRange(i,1);

            // header row?
            if (cell.isPartOfMerge()) {
                if (!this.directory.has(cell.getValue())) {
                    this.directory.set(cell.getValue(), new Map());
                }
                currentDirectory = this.directory.get(cell.getValue());
                continue;
            }

            // must be data row
            const row = sheet.getRange(`A${i}:${LAST_COLUMN}${i}`).getValues()[0];
            const item = new Item(row);
            if (item.validate()) {
                if (currentDirectory.has(item.item)) {
                    currentDirectory.get(item.item).add(item);
                } else {
                    currentDirectory.set(item.item, item);
                }
            }
        }
        return true;
    }

    write() {
        const target = new Totals(this.totals);
        target.clearAll();

        for (const [title, list] of this.directory) {
            target.insertTitle(title);
            target.insertRows(list.size);

            for (const [, item] of list) {
                target.insertItem(item);
            }
        }

        return true;
    }
}



