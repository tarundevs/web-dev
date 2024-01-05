const questions=[
    {
        question: "Which is largest animal in the world?",
        answers: [
            {text : "shark", correct: false},
            {text : "Blue Whale", correct: true},
            {text : "giraffe", correct: false},
            {text : "ant", correct: false}
        ]
    },
    {
        question: "Which is smallest country in the world?",
        answers: [
            {text : "Vatican city", correct: true},
            {text : "Bhutan", correct: false},
            {text : "Nepal", correct: false},
            {text : "Shri Lanka", correct: false}
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answers: [
            {text : "Kalahari", correct: false},
            {text : "Gobi", correct: false},
            {text : "Sahara", correct: false},
            {text : "Antartica", correct: true}
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answers: [
            {text : "Asia", correct: false},
            {text : "Australia", correct: true},
            {text : "Africa", correct: false},
            {text : "Antartica", correct: false}
        ]
    }
];

const element=document.getElementById('question');
const answer=document.getElementById('ans-buttons');
const next=document.getElementById('next');
let indexno=0;
let score=0;
let currentQuestion=0;

function startQuiz()
{
    ansbtn.childNodes.forEach((button,index) =>{
        if(button.innerHTML != undefined)
        {
             
            button.className="btn";
            button.disabled=false;
        }
    })
    ansbtn.parentNode.style.display='block';
    next.style.display='none';
    s=document.getElementById('score');
    s.style.display='none'; 
    r=document.getElementById('restart');
    r.style.display='none';

    indexno=0
    currentQuestion=0;
    score=0; 
    showQuestion();
}

function showQuestion()
{ 
    if(currentQuestion==questions.length)
    {
        //display score
        showScore();
    }
    else{
    let questionNo=currentQuestion+1;
    element.innerHTML= questionNo+'. '+questions[currentQuestion].question  

    answer.childNodes.forEach((button,index) => {
        if(button.innerHTML != undefined)
        {
            button.innerHTML=questions[currentQuestion].answers[(index-1)/2].text; 
        }
    });


}}

function nextQuestion()
{
    currentQuestion=currentQuestion+1; 

    ansbtn.childNodes.forEach((button,index) =>{
        if(button.innerHTML != undefined)
        {
            button.className="btn";
            button.disabled=false;
        }
    })
    next.style.display='none';
    showQuestion();
}

function showScore()
{ 
    next.style.display='none';
    ansbtn.parentNode. style.display='none'; 
    s=document.getElementById('score');
    s.style.display='flex';
    s.innerHTML='You got '+score+' questions correct out of '+questions.length+'.';
    r=document.getElementById('restart');
    r.style.display='flex';

}
ansbtn=document.getElementById('ans-buttons');
ansbtn.addEventListener("click",
    function(e)
    {     

        e.target.parentNode.childNodes.forEach((button,index) =>{
        if(button.innerHTML != undefined)
        {
            button.className="btn";
        }
        });
        
        e.target.className="selected";

        e.target.parentNode.childNodes.forEach((button,index) =>{
        if(button.innerHTML != undefined)
        {
            if(button.className=="selected")
            {
                indexno=index;
            }
        }
        });
        next.style.display="block";  
    }
    ,false);
 
next.addEventListener("click",
    function(e)
    {    
        if(ansbtn.childNodes[indexno].className != "selected")
        {
            if(ansbtn.childNodes[indexno].className != "btn")
            {
                nextQuestion();
            }
        }
        else{
        let select=questions[currentQuestion].answers[(indexno-1)/2].correct;
         
        if(select)
        {
            //answer is correct
            ansbtn.childNodes[(indexno)].className="correct";
            score=score+1;
            ansbtn.childNodes.forEach((button,index) =>{
                if(button.innerHTML != undefined)
                {
                    button.disabled=true; 
                }
            })
        }
        else{
            //answer is wrong
             
            ansbtn.childNodes[(indexno)].className="wrong"; 
            questions[currentQuestion].answers.forEach((correct,index) =>{
                
                    if(correct.correct)
                    {
                        indexno=2*index+1;
                    }
                
                });
            ansbtn.childNodes[(indexno)].className="correct";

            ansbtn.childNodes.forEach((button,index) =>{
                if(button.innerHTML != undefined)
                {
                    button.disabled=true; 
                }
            })
        }
    }

    }
,false);

startQuiz();