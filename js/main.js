let siteName = document.getElementById("siteName")
let url = document.getElementById("url")

let siteList = []

if (localStorage.getItem("siteNameContainer") !== null) {
    siteList = JSON.parse(localStorage.getItem("siteNameContainer"))
    displayData()
}

function addProduct() {
    if (validation(siteName , 'messageName') && validation(url , 'messageUrl')) {
        let site = {
            name: siteName.value,
            link: url.value
        };
        
        siteList.push(site)
        localStorage.setItem("siteNameContainer", JSON.stringify(siteList))
        displayData()
    
        clearForm()
    }else {
        alert("enter site name and URL")
    }
    
    
}

function clearForm() {
    siteName.value = null
    url.value = null

    siteName.classList.remove("is-valid")
    url.classList.remove("is-valid")
}

function displayData() {
    let blackBox = ""

    for (let i = 0; i < siteList.length; i++) {
        blackBox += `<tr>
                        <th scope="row">${i + 1}</th>
                        <td>${siteList[i].name}</td>
                        <td><a href="${siteList[i].link}" target="_blank" class="btn btn-md btn-success"><i class="fa-solid fa-eye"></i> visit</a></td>
                        <td><button onclick="deleteItem(${i})" class="btn btn-danger btn-md"><i class="fa-solid fa-trash"></i> Delete</button></td>
                    </tr>`
    }

    document.getElementById("table-body").innerHTML = blackBox
}

function deleteItem(index) {
    siteList.splice(index, 1)
    localStorage.setItem("siteNameContainer", JSON.stringify(siteList))
    
    displayData()
}

function validation(element, msgId) {
    const msg = document.getElementById(msgId);
    const regex = {
        siteName: /^[a-zA-Z][a-zA-Z0-9\s]{3,49}$/, 
        url: /^(https?:\/\/)?([\w\-]+\.)+[a-zA-Z]{2,}(\/.*)?$/, 
    };

    if (element.value.trim() === "") {
        msg.textContent = "This field is required.";
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        msg.classList.remove("d-none");
        return false;
    }

    const isValid = regex[element.id]?.test(element.value.trim());

    if (isValid) {
        element.classList.add('is-valid');
        element.classList.remove('is-invalid');
        msg.classList.add('d-none'); 
        return true;
    } else {
        msg.textContent = "Input is not valid."; 
        element.classList.add('is-invalid');
        element.classList.remove('is-valid');
        msg.classList.remove("d-none"); 
        return false;
    }
}
