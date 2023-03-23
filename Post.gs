function doPost(e){
  var action = e.parameter.action;

  if(action == 'verifyURL'){
    return verifyURL(e)
  }

}

function verifyURL(e){
  var data = JSON.parse(e.postData.contents)

  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const spreadsheetId = spreadsheet.getId();
  var spreadsheetURLId = extractSpreadsheetId(data.url);

  if(spreadsheetURLId == spreadsheetId){
    return ContentService.createTextOutput(JSON.stringify({"error":false,"urlVerified":true})).setMimeType(ContentService.MimeType.JSON);
  }
  else{
    return ContentService.createTextOutput(JSON.stringify({"error":false,"urlVerified":false})).setMimeType(ContentService.MimeType.JSON);
  }

}
