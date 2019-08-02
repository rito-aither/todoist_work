//定義
var token = 'XXXXXXXXXXXXXXXX';
var spreadsheet = SpreadsheetApp.openById('XXXXXXXXXXXXXXXXXXXXXXXXX');
var sheetdb = spreadsheet.getSheetByName('tasks');
var sheetprojects = spreadsheet.getSheetByName("projects");
var sheettest= spreadsheet.getSheetByName("test");
var date = new Date();
  


//スプレッドシートからタスクを取得
function　initial_tasks (){

  var getdbtasks = [];
  //スプレッドシートタスク取得
  var sheetdb_lsatRow = sheetdb.getLastRow();
  var sheetdb_lastColumn = sheetdb.getLastColumn();
  var primary = sheetdb_lsatRow -1 ;
  getdbtasks = sheetdb.getRange(2,1,sheetdb_lsatRow-1,sheetdb_lastColumn).getValues();
  
  return getdbtasks;
  

  
}

//todoistAPIからタスクを取得
function initial_response_tasks(){
 //todoistタスク取得
  var todoistEndpoint = 'https://beta.todoist.com/API/v8/tasks?token='+token;
  var response_tasks = JSON.parse(UrlFetchApp.fetch(todoistEndpoint).getContentText());
  
 
  return response_tasks;
}
