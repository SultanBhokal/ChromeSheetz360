function doGet(e){
  var action = e.parameter.action;
  
  if(action == "check"){
    return checkAPI(e)
  }

}

function checkAPI(e){
  var result = JSON.stringify({"error":true,"data":"working","Response From":"Sheets Automation-Extnesion"});  

  // console.log(result);
  return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON);
}
