const notesContainer=document.getElementById('notes-container');
//only used to make it look fancier
function setupEventListeners() 
{
    // Get all paragraphs with the class 'editableParagraph'
    var paragraphs = document.querySelectorAll('.editableParagraph'); 

    paragraphs.forEach(function(paragraph) 
    {
        handleParagraphClick(paragraph);
        handleSelectionChange(paragraph);
    }
    );
}

function removeTask(e)
{
    e.target.parentNode.remove();
    saveData();
}

function updateCursorState(paragraph, selection) {
    var isCursorInParagraph = paragraph.contains(selection.anchorNode) || paragraph === selection.anchorNode;
    if (isCursorInParagraph) {
        paragraph.parentNode.className='selected';
    } else {
        paragraph.parentNode.className='input-box';
    }
  }
  
  

function handleParagraphClick(paragraph) 
{
    
    paragraph.addEventListener('click', function() 
    { 
      var selection = window.getSelection();
      updateCursorState(paragraph, selection);
    });
}

function handleSelectionChange(paragraph) 
{
    
    document.addEventListener('selectionchange', function()
    { 
      var selection = window.getSelection();
      updateCursorState(paragraph, selection);
      saveData();
    });
}

function addNote()
{

    let div=document.createElement("div");

    let p = document.createElement("p");
    p.contentEditable="true"; 
    p.className="editableParagraph"; 

    //setting up image stuff
    let img = document.createElement("img");  
    img.src = "./images/delete.png"; 
    img.className='image';
    img.setAttribute("onclick","removeTask(event)");
    //enable delete functionality of image
    
    
    div.appendChild(p); 
    div.appendChild(img);
    div.className="input-box"; 

    notesContainer.appendChild(div);  
    saveData(); 

    //divert to update paras
    setupEventListeners(); 
}
 
function saveData()
{
    localStorage.setItem('data',notesContainer.innerHTML);
}

function showTask()
{ 
    console.log(localStorage.getItem("data"));
    notesContainer.innerHTML=localStorage.getItem("data");
}

document.addEventListener("keydown",event =>{
    if(event.key=="Enter"){
        document.execCommand("insertLineBreak");
        //prevents default
        event.preventDefault();
    }
});
 
showTask(); 
setupEventListeners(); 