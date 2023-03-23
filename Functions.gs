// Sheet Name for localStorage.

var sheetName = {
  localStorageSheetName : "localStorage",
  dataStorageSheetName : "Database"
}


var myObject = {
  localStorageFieldName: {
    location:"A1",
    value:"Fields",
    sheetName:sheetName.localStorageSheetName
  },
  localStorageFieldValue:{
    location: "B1",
    value: "json value here",
    sheetName: sheetName.localStorageSheetName
  }

};

function createSheet(sheetName) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  if (ss.getSheetByName(sheetName) == null) {
    ss.insertSheet(sheetName);
    console.log("Created sheet"+sheetName)
  }
  //ss.getSheetByName(sheetName).hideSheet();
}

function extractSpreadsheetId(url) {
  var spreadsheetId = "";
  var match = url.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  if (match) {
    spreadsheetId = match[1];
  }
  return spreadsheetId;
}

// not being used
function protectSheet() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName.localStorageSheetName);
  var protection = sheet.protect().setDescription("Protected Sheet");
  
  // Set protected ranges and permissions
  var range = sheet.getDataRange();
  protection.setUnprotectedRanges([range]);
  var editors = protection.getEditors();
  protection.addEditor(editors[0]);
  protection.removeEditors(editors);
  if (protection.canDomainEdit()) {
    protection.setDomainEdit(false);
  }
}

function setFieldsLocalStorage(fieldsArray) {

  // Get the localStorage spreadsheet and set the B1 cell value to the JSON string
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetName.localStorageSheetName);
  sheet.getRange(myObject.localStorageFieldName.location).setValue(myObject.localStorageFieldName.value);

  var jsonObj = {}
  // Create a JSON object from the fields array
  for(var i=0; i<= fieldsArray.length; i++){
    jsonObj[i] = fieldsArray[i];
  }
  
  // Convert the JSON object to a string
  var jsonString = JSON.stringify(jsonObj);
  sheet.getRange(myObject.localStorageFieldValue.location).setValue(jsonString);

  setValueFromJSON()
}

function setValueFromJSON() {
  var sourceSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName.localStorageSheetName);
  var targetSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName.dataStorageSheetName);
  var json = sourceSheet.getRange(myObject.localStorageFieldValue.location).getValue();
  var data = JSON.parse(json);
  var headers = Object.keys(data);
  var values = headers.map(function(header) {
    return data[header];
  });
  var tmp = targetSheet.getRange(1, 1, 1, values.length).setValues([values]).setFontWeight("bold");
  
  var range = targetSheet.getDataRange();
  var lastColumn = range.getLastColumn();
  for (var i = 1; i <= lastColumn; i++) {
    targetSheet.autoResizeColumn(i);
  }

}

function addCheckinRecord(employeeName, checkinTime, breakStartTime, breakEndTime, checkoutTime) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName.dataStorageSheetName);
  var lastRow = sheet.getLastRow();
  var currentDate = new Date().toLocaleDateString();
  var dataRange = sheet.getDataRange();
  var data = dataRange.getValues();
  var headers = data[0];
  var dateIndex = headers.indexOf("Date");
  var employeeIndex = headers.indexOf("Employee Name");
  var checkinIndex = headers.indexOf("Check-in time");
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var rowDate = row[dateIndex].toLocaleDateString();
    var rowEmployeeName = row[employeeIndex];
    if (rowDate === currentDate && rowEmployeeName === employeeName) {
      // A check-in record already exists for this employee on the current date
      console.log("record exists");
      return;
    }
  }
  // Add a new check-in record for the employee
  var newRow = [currentDate, employeeName, checkinTime, breakStartTime, breakEndTime, checkoutTime];
  sheet.appendRow(newRow);
}



























