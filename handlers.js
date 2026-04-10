function onEdit(e) {
    const TARGET_SHEETNAME = 'Total';
    const TARGET_CELL = 'F2';
    const TARGET_STRING = 'yes';

    const sheet = e.source.getActiveSheet();
    const cell = e.range;

    // filtering conditions
    if (sheet.getName() !== TARGET_SHEETNAME) {
        return;
    }
    if (cell.getA1Notation() !== TARGET_CELL) {
        return;
    }
    if (cell.getValue().toString().toLowerCase() !== TARGET_STRING) {
        return;
    }

    cell.setValue('Reading...');
    SpreadsheetApp.flush();

    const inventory = new Inventory(e.source);
    inventory.read();

    cell.setValue('Writing...');
    SpreadsheetApp.flush();
    inventory.write();

    cell.setValue('Update?');
    SpreadsheetApp.flush();

    updateDate();

    return;
}

function manual() {
    const inventory = new Inventory(SpreadsheetApp.getActiveSpreadsheet());
    inventory.read();
    inventory.write();
    return;
}

function updateDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDate();

    sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Total");
    const range = sheet.getRange(2,3);
    range.setValue(`Last Update: ${month}/${day}/${year}`);
    return;
}
