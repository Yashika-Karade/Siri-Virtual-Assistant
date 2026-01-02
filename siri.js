let btn=document.querySelector("#btn");
let BtnContent=document.querySelector("#start");
let record=document.querySelector("#record");
let speak=(text)=>{
    let textArea=new SpeechSynthesisUtterance(text);
    textArea.rate=1;
    textArea.volume=1;
    textArea.pitch=1;
    textArea.lang="hi-IN"
    window.speechSynthesis.speak(textArea);

}
let wish=()=>{
    let day=new Date();
    let hours=day.getHours();
    if(hours >=0 && hours < 12 ){
        speak("Good Morning, How may I help you");
    }
    else if(hours >=12 && hours < 16 ){
        speak("Good Afternoon, How may I help you");
    }
    else{
        speak("Good Evening, How may I help you")
    }
}
window.addEventListener('load',()=>{
    wish()
})

let speechRecognition=window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition=new speechRecognition();
recognition.onresult=(events)=>{
    
    console.log(events);

    let currentIndex=events.resultIndex;
    let data=events.results[currentIndex][0].transcript;
    BtnContent.innerText=data;
    command(data.toLowerCase());
    
}
btn.addEventListener("click",()=>{
    recognition.start();
    btn.style.display="none";
    record.style.display="block";


})
let command=(message)=>{
    btn.style.display="flex";
    record.style.display="none";
    if(message.includes("hello") || message.includes("hey") || message.includes("Hi")){
        speak("Hello How can i help you")
    }
    else if(message.includes("open youtube")){
        speak("Opening YouTube")
        window.open("https://www.youtube.com/")
    }
    else if(message.includes("open google")){
        speak("opening google")
        window.open("https://www.google.com/?zx=1767191537214&no_sw_cr=1");
    }
    else if(message.includes("open chatGpt")){
        speak("opening chatGpt")
        window.open("https://chatgpt.com/c/69551aac-e1f8-8320-8ee9-5372a42160e1");
    }
    else if(message.includes("open calculator")){
        speak("opening calculator");
        window.open("calculator://")
    }
    else if(message.includes("time")){
        let time=new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"});
        speak(time);
    }
    else if(message.includes("date")){
        let date=new Date().toLocaleString(undefined,{day:"numeric",month:"short"});
        speak(date);
    }
    else if(message.includes("who are you")){
        speak("I am siri your virtual assistant, created by Yashika Karade")
    }

    else{
        let finalText="This is what i found on internet regarding"+message.replace("siri","");
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("siri","")}`,"_blank");
    }
}