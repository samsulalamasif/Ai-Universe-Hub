const loadData = async () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools"
    try {
        toggleSpinner(true)
        const res = await fetch(url)
        const data = await res.json()
        displayData(data.data.tools.slice(0, 6));
    }
    catch (error) {
        console.log(error);
    }
}




const displayData = (tool) => {

    const cardContainer = document.getElementById("card-container")
    cardContainer.innerHTML = ""
    tool.forEach(data => {
        // console.log(data);
        const { image, features, name, published_in, id } = data
        const div = document.createElement("div")
        div.classList.add("col")
        div.innerHTML = `
<div class="card h-100 rounded-4 shadow-lg">
    <img height=300px; src="${image}" class="card-img-top p-3 rounded-5 " alt="...">
        <div class="card-body">
            <h5 class="card-title fs-3 fw-bold">Features</h5>  
            <p class="fs-6 m-0 p-0 fw-semibold text-secondary">1. ${features[0] ? features[0] : "not available"}</p>
            <p class="fs-6 m-0 p-0 fw-semibold text-secondary">2. ${features[1] ? features[1] : "not available"}</p>
            <p class="fs-6 m-0 p-0 fw-semibold text-secondary">3. ${features[2] ? features[2] : "not available"}</p>
        </div>
        <hr class= mx-3>
        <div class="d-flex justify-content-between align-items-center px-3">
            <div >
                <p class="fs-3 fw-bold">${name ? name : "not available"}<p>
                <div class="d-flex align-items-center gap-2 mb-3">
                    <i class="fa-regular fa-calendar-days"></i>
                    <p class="fs-6 m-0 p-0 fw-semibold text-secondary">
                        ${published_in ? published_in : "not available"}</p>
                </div>
            </div>
            <a class="rounded-5" onclick="singleData('${id}')" data-bs-toggle="modal" data-bs-target="#showModal">
            <i class="fa-2x fa-solid fa-arrow-right"></i></a>

        </div>
</div>
        `
        cardContainer.appendChild(div)
        toggleSpinner(false)
    })
}



/* show all button */
const showAllDataBtn = () => {
    const url = "https://openapi.programming-hero.com/api/ai/tools"
    fetch(url)
        .then((res) => res.json())
        .then((data) => {
            displayData(data.data.tools);
        });
        if(showAllDataBtn){
            document.getElementById("show-btn").classList.add("d-none")
        }
}


/* spinner loading */
const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById("loader")
    if (isLoading) {
        loaderSection.classList.remove("d-none")
    }
    else {
        loaderSection.classList.add("d-none")
    }
}




/* single data load */
const singleData = async (id) => {
    // console.log(id);
    const url = `https://openapi.programming-hero.com/api/ai/tool/${id}`
    try {
        const res = await fetch(url)
        const data = await res.json()
        showSingleData(data.data)
    }
    catch (error) {
        console.log(error);
    }
}


const showSingleData = (data) => {
    // console.log(data);
    const { tool_name, image_link, input_output_examples, accuracy, description, pricing, features, integrations } = data
    document.getElementById("showModalLabel").innerText = tool_name
    const modalBody = document.getElementById("modal-body").innerHTML = `
    <div class="row">
                <div class="col-sm-6 mb-3 mb-sm-0" >
                    <div class="card w-100 h-100 rounded-4" style="border: 1px solid red; background: #f8f3f3;">
                        <div class="card-body">
                            <h5 class="card-title fs-5 fw-bold">${description ? description : "not available"}</h5>
                            <div class="d-flex mt-3 justify-content-between align-items-center gap-3">
                                <div 
                                style="width: 130px; height: 100px; 
                                background: #ffffff;color: #03A30A;" 
                                class="rounded-4 d-flex flex-column justify-content-center 
                                align-items-center">
                                <p class="fw-bold fs-6 text-center m-0">
                                ${pricing ? pricing[0].price : "Free Of Cost"}
                                </p>
                                <p class="fw-bold fs-6 text-center m-0">
                                ${pricing ? pricing[0].plan : "Basic"}
                                </p>
                                </div>
                                <div 
                                style="width: 130px; height: 100px; 
                                background: #ffffff;color:#F28927;" 
                                class="rounded-4 d-flex flex-column justify-content-center 
                                align-items-center">
                                <p class="fw-bold fs-6 text-center m-0">
                                ${pricing ? pricing[1].price : "Free Of Cost"}
                                </p>
                                <p class="fw-bold fs-6 text-center m-0">
                                ${pricing ? pricing[1].plan : "Pro"}
                                </p> 
                                </div>
                                <div 
                                style="width: 130px; height: 100px; 
                                background: #ffffff;color:#EB5757;" 
                                class="rounded-4 d-flex flex-column justify-content-center
                                align-items-center ">
                                <p class="fw-bold fs-6 text-center m-0">
                                ${pricing ? pricing[2].price : "Free Of Cost"}
                                </p>
                                <p class="fw-bold fs-6 text-center m-0">
                                ${pricing ? pricing[2].plan : "Enterprise"}
                                </p>                              
                                </div>                        
                            </div>
                            <div class="d-flex justify-content-between mt-5">
                                    <div>
                                        <p class="fs-4 fw-bold">Features</p>
                                        <ul style="font-size: smaller;" class=" text-secondary">
                                        <li>
                                        ${features[1] && features[1].feature_name ? features[1].feature_name : "No data Found"}
                                        </li>
                                        <li>
                                        ${features[2] && features[2].feature_name ? features[2].feature_name : "No data Found"}
                                        </li>
                                        <li>
                                        ${features && features[3].feature_name ? features[3].feature_name : "No data Found"}
                                        </li>      
                                        </ul>                              
                                    </div>
                                    <div>
                                        <p class="fs-4 fw-bold">Integrations</p>
                                        <ul style="font-size: smaller;" class="text-secondary">
                                        <li >
                                        ${integrations && integrations[0] ? integrations[0] : "No data Found"}
                                        </li>
                                        <li>
                                        ${integrations && integrations[1] ? integrations[1] : "No data Found"}
                                        </li>
                                        <li>
                                        ${integrations && integrations[2] ? integrations[2] : "No data Found"}
                                        </li>
                                        </li>
                                        </ul>                              
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
                <div class="col-sm-6">
                    <div class="card w-100 h-100 rounded-4 ">
                        <img height=300px; src="${image_link ? image_link[0] : ""}" class="card-img-top p-3 rounded-5 " alt="...">
                        <p class="${accuracy.score ? 'd-block' : 'd-none'}" style="position: absolute; top: 20px; right: 30px;"><span class="badge text-bg-danger">${accuracy &&  accuracy.score ? accuracy.score * 100 + "% accuracy" : "" }</span></p>
                        <div class="card-body">
                            <h5 class="card-title text-center fw-bold">
                            ${input_output_examples ? input_output_examples[0].input : "Can you give any example?"}</h5>
                            <p class="card-text text-secondary text-center">
                            ${input_output_examples ? input_output_examples[0].output : "No! Not Yet! Take a break!!!"}
                            </p>
                        </div>
                    </div>
                </div>
              </div>
    `
}





/* loadData() */