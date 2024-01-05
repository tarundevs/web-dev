const inputbox=document.getElementById("inputbox");
const display =document.getElementById("container");

function addTask()
{
    if(inputbox.value== '')
    {
        alert('Please enter a task');
    }
    else
    {
        let li = document.createElement("li");
        let img = document.createElement("img");
        let button = document.createElement("button");
        let h2 = document.createElement("h2");
        img.src = "./images/unchecked.png";
        button.innerHTML = 'x';

        h2.appendChild(img);
        h2.appendChild(document.createTextNode(inputbox.value));
        li.appendChild(h2);
        li.appendChild(button);

        li.className="unchecked";  
        display.appendChild(li);
        inputbox.value="";
        saveData();
    }
}

inputbox.addEventListener("keydown", 
    function(e)
    {
        if(e.key=='Enter')
        {
            addTask();
        }
    }
,false);

display.addEventListener("click",
    function(e)
    {    
        if(e.target.tagName == "BUTTON")
        {
            e.target.parentElement.remove();
        }
        else if(e.target.parentNode.className == "unchecked")
        {
            
            console.log('changed to check');
            e.target.parentNode.className="checked"; 
            e.target.getElementsByTagName('img')[0].src= "./images/checked.png";
        }
        else if(e.target.parentNode.className == "checked")
        {
            console.log('changed to uncheck');
            e.target.parentNode.className="unchecked";
            e.target.getElementsByTagName('img')[0].src= "./images/unchecked.png";
        }
        saveData();
        
    }
    ,false);

function saveData()
{
    localStorage.setItem('data',display.innerHTML);
}

function showTask()
{
    display.innerHTML=localStorage.getItem("data");
}
showTask();