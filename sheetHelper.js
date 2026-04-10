// helper functions for constructing the totals spreadsheet
class Totals {
    constructor(sheet) {
        this.sheet = sheet;
        this.currentRow = HEADER_SIZE;
        return true;
    }

    clearAll() {
        const startRow = HEADER_SIZE + 1;
        const endRow = this.sheet.getMaxRows()-1; // must leave one non-frozen row
        const numRows = endRow - startRow + 1;

        this.sheet.deleteRows(startRow, numRows);
        SpreadsheetApp.flush();

        this.currentRow = HEADER_SIZE;
        return true;
    }

    // constructs a title row *below* the current row
    insertTitle(title) {
        this.sheet.insertRows(this.currentRow+1,2);
        this.currentRow++;
        const range = this.sheet.getRange(`A${this.currentRow}:${LAST_COLUMN}${this.currentRow}`);
        range.setFontWeight("bold")
             .merge()
             .setBackground("#c9daf8")
             .setHorizontalAlignment("left")
             .setValue(title);

        SpreadsheetApp.flush();
        return true;
    }

    // insert n rows *below* current row
    insertRows(n) {
        this.currentRow++;
        this.sheet.insertRows(this.currentRow, n);
        const range = this.sheet.getRange(`A${this.currentRow}:${LAST_COLUMN}${this.currentRow+n}`);
        range.setFontWeight("normal")
             .setVerticalAlignment("top");
        return true;
    }

    // insert an item *at* the current row
    insertItem(item) {
        const range = this.sheet.getRange(`A${this.currentRow}:${LAST_COLUMN}${this.currentRow}`);
        let cell = null;

        // quantity
        cell = range.getCell(1,1);
        cell.setValue(item.quantity);

        // item
        cell = range.getCell(1,2);
        cell.setValue(item.item);

        // location
        cell = range.getCell(1,3);
        cell.setValue([...item.location].join("\n"));

        // model
        cell = range.getCell(1,4);
        cell.setValue([...item.model].join("\n"));

        // serial number
        cell = range.getCell(1,5);
        cell.setValue([...item.serialNumber].join("\n"));

        // notes
        cell = range.getCell(1,6);
        cell.setValue([...item.notes].join("\n"));

        this.currentRow++;

        SpreadsheetApp.flush();
        return true;
    }


}