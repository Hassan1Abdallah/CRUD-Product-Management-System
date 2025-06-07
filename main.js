let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let count = document.getElementById('count');
let total = document.getElementById('total');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

let mode = 'create';
let tmp;

// get total price
function getTotal() {
    if (price.value != '') {
        let result = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.innerHTML = result;
        total.style.background = '#00ff00b5';
    } else {
        total.innerHTML = '';
        total.style.background = '#a30202bc';
    }
}

// create product
let dataProduct;
if (localStorage.Products != null) {
    dataProduct = JSON.parse(localStorage.Products)
} else {
    dataProduct = [];
}

submit.onclick = function () {
    let newProduct = {
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value,
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    }
    if (title.value !== ''
        && price.value !== ''
        && category.value !== ''
        && newProduct.count <= 100
    ) {
        if (mode === 'create') {
            if (newProduct.count > 1) {
                for (let i = 0; i < newProduct.count; i++) {
                    dataProduct.push(newProduct);
                }
            } else {
                dataProduct.push(newProduct);
            }
        } else {
            dataProduct[tmp] = newProduct;
            mode = 'create';
            submit.innerHTML = 'create';
            count.style.display = 'block';
        }
        clearData()
    }

// save data localstorage
    localStorage.setItem('Products', JSON.stringify(dataProduct));

    showData()
}

// clear input

function clearData() {
    title.value = '';
    price.value = '';
    ads.value = '';
    taxes.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}


// read
function showData() {
    let table = '';
    getTotal();
    for (let i = 0; i < dataProduct.length; i++) {
        table += `
        <tr>
            <td>${i + 1}</td>
            <td>${dataProduct[i].title}</td>
            <td>${dataProduct[i].price}</td>
            <td>${dataProduct[i].taxes}</td>
            <td>${dataProduct[i].ads}</td>
            <td>${dataProduct[i].discount}</td>
            <td>${dataProduct[i].total}</td>
            <td>${dataProduct[i].category}</td>
            <td><button onclick = "updateData(${i})" id="update">Update</button></td>
            <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
        </tr>`
    }
    document.getElementById('tbody').innerHTML = table;
    let btnDelete = document.getElementById('deleteAll');

    if (dataProduct.length > 0) {
        btnDelete.innerHTML = `
        <button onclick="deleteAll()">Delete All (${dataProduct.length})</button>
       `
    } else {
        btnDelete.innerHTML = '';
    }

}

showData();


// count


// delete
function deleteData(i) {
    dataProduct.splice(i, 1);
    localStorage.setItem('Products', JSON.stringify(dataProduct));
    showData();
}

// delete All
function deleteAll() {
    localStorage.clear();
    dataProduct.splice(0);
    showData();
}


// update
function updateData(i) {
    title.value = dataProduct[i].title;
    price.value = dataProduct[i].price;
    taxes.value = dataProduct[i].taxes;
    ads.value = dataProduct[i].ads;
    discount.value = dataProduct[i].discount;
    getTotal();
    category.value = dataProduct[i].category;
    count.style.display = "none";
    submit.innerHTML = "Update";
    mode = 'update';
    tmp = i;
    scroll({
        top: 0,
        behavior: 'smooth',
    })
}

// search
let searchMood = 'title';

function getSearchMood(id) {
    let search = document.getElementById('search');
    if (id === 'searchTitle') {
        searchMood = 'title';
    } else {
        searchMood = 'category';
    }
    search.placeholder = 'Search by ' + searchMood;
    search.focus();
    search.value = '';
    showData();
}

function searchData(value) {
    let table = '';
    for (let i = 0; i < dataProduct.length; i++) {
        if (searchMood === 'title') {
            if (dataProduct[i].title.includes(value.toLowerCase())) {

                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                        <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                    </tr>`
            }
        } else {
            if (dataProduct[i].category.includes(value.toLowerCase())) {

                table += `
                    <tr>
                        <td>${i}</td>
                        <td>${dataProduct[i].title}</td>
                        <td>${dataProduct[i].price}</td>
                        <td>${dataProduct[i].taxes}</td>
                        <td>${dataProduct[i].ads}</td>
                        <td>${dataProduct[i].discount}</td>
                        <td>${dataProduct[i].total}</td>
                        <td>${dataProduct[i].category}</td>
                        <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                        <td><button onclick = "deleteData(${i})" id="delete">Delete</button></td>
                    </tr>`
            }

        }
    }

    document.getElementById('tbody').innerHTML = table;

}

// clean date
