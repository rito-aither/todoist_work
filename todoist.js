
function todoist_work() {
  
  add()
  Completion()
  
}




// スプレッドシートにタスクがなければ追加
function add() { 
  
  var sheetdb_lsatRow = sheetdb.getLastRow();
  var primary = sheetdb_lsatRow -1 ;
  var getdbtasks =initial_tasks()
  var response_tasks  = initial_response_tasks()
  var add = [];
  var primary ;
  
  
  for( var i =0; i <response_tasks.length;i++){
    
    var count = 0;
    
    for(var j = 0; j<getdbtasks.length; j++){
      
      if(response_tasks[i]["id"]==getdbtasks[j][1]){
        
        count = 1;
        
      }
    }
    
    if(count==0){ 
      
      primary++;
      add.push([[primary],[response_tasks[i]["id"]],[response_tasks[i]["content"]],[response_tasks[i]["due"]],[response_tasks[i]["project_id"]],["×"],[date]]);
    }
  }
  
  if(add.length!==0){
    sheetdb.getRange(getdbtasks.length+2,1,add.length,add[0].length).setValues(add);

  } 
}   



// todoistAPIにタスクがなければ完了
function Completion　(){
  
  var getdbtasks =initial_tasks()
  var response_tasks  = initial_response_tasks()
  var add =[] ;
  
  for( var i =0; i <getdbtasks.length;i++){
    
    var count = 0;
    
    for(var j = 0; j<response_tasks.length; j++){
      
      if(getdbtasks[i][1]==response_tasks[j]["id"]){
        
        count = 1;
        add.push([[i+1],[response_tasks[j]["id"]],[response_tasks[j]["content"]],[response_tasks[j]["due"]],[response_tasks[j]["project_id"]],["×"],getdbtasks[i][6],[""]]);
        
      }
    }
    
    if(count==0){ 
      
      if(getdbtasks[i][7]==""){ 
        add.push([[i+1],[getdbtasks[i][1]],[getdbtasks[i][2]],[getdbtasks[i][3]],[getdbtasks[i][4]],["〇"],getdbtasks[i][6],[date]]);
       
        //完了の場合googleカレンダーに追加
        addCalendar(getdbtasks[i][2],date,date)
        
     }else{
        
        add.push([[i+1],[getdbtasks[i][1]],[getdbtasks[i][2]],[getdbtasks[i][3]],[getdbtasks[i][4]],[getdbtasks[i][5]],[getdbtasks[i][6]],[getdbtasks[i][7]]]);
        
      }
    }
  }
  
  if(add.length!==0){
    sheetdb.getRange(2,1,add.length,add[0].length).setValues(add);
  } 
}   

function makeprojects(){
  var ans_projects =[]
  var todoistproject = 'https://beta.todoist.com/API/v8/projects?token='+ token;
  var response_projects = JSON.parse(UrlFetchApp.fetch(todoistproject).getContentText());
  Logger.log(response_projects);
  
  for(var i = 0 ;i <response_projects.length ;i++ ){
    ans_projects[i]=[[response_projects[i]["name"]],[response_projects[i]["id"]]];
    
  }
  
  sheetprojects.getRange(1,1,ans_projects.length,ans_projects[0].length).setValues(ans_projects);
  
}


