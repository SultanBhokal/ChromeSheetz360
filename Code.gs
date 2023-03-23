//var wbook = SpreadsheetApp.openByUrl('');

function test(){
  let arr = ['Date','Employee Name','Check-in time','Break-start time','Break-end time','Check-out time']
  // setFieldsLocalStorage(arr)
  // createSheet(sheetName.dataStorageSheetName)
  addCheckinRecord("Vandanp@gmail.com","11:30","11:30","11:30","11:30")
}

function simulatePostRequest() {
  // Set up the simulated doPost event with a payload containing a URL and email ID
  var payload = {
    contents: JSON.stringify({
      url: "https://docs.google.com/spreadsheets/d/1YzNSrWuWk4VNOvYzEhAJcgr4YQ-nHCY0wYY4XmMd4VY/edit#gid=1173174483",
      email: "vandanp89@gmail.com"
    })
  };
  var event = {parameter: {action: "verifyURL"}, postData: payload};
  
  // Call the verifyURL function with the simulated doPost event
  var response = verifyURL(event);
  
  // Log the response content for debugging purposes
  Logger.log(response.getContent());
}


