const jsonData = "./data.json";
const infoGraphContainer = document.querySelector(".infoGraphContainer")

document.addEventListener("DOMContentLoaded",()=>{
    setTimeout(() => {
        renderGraph()
    }, 500);
    
})

const renderGraph = async () => {
    let amounts=[]
    const graphData = await getData()

    for (let i =0; i< graphData.length; i++ ){
        amounts[i]=graphData[i].amount
    }

    graphData.forEach(data => {
        const infoGraph = document.createElement("div")
        infoGraph.classList.add("infoGraph")
        infoGraph.innerHTML = `
                                <div class="amount"></div>
                                <p class="graphDay">${data.day}</p>
                            `
        infoGraphContainer.appendChild(infoGraph)
    });
    const amount = document.querySelectorAll(".amount")

    amount.forEach((day, i)=>{
        day.style.height = `${amounts[i]*3}px`;        
        if(getActualDay() === graphData[i].day){
            day.style.backgroundColor = "var(--Cyan)"
        }

        day.addEventListener("mouseover",()=>{
            day.innerHTML= `<div class="hoverDiv"><p class="hoverP">$${amounts[i]}</p></div>`
        })

        day.addEventListener("mouseout",()=>{
            day.innerHTML= ""
        })
    })
}
const getData = async () => {
    try {
        const response = await fetch(jsonData);
        const data = await response.json();
        return data;
    } catch (error) {
        alert("There was an error in the request", error);
    }
}
const getActualDay = () =>{
    const week = ["mon", "tue", "wed", "thu", "fri", "sat",]
    const day = new Date()
    let actualDay = week[day.getDay().toLocaleString()-1]
    return actualDay
}
