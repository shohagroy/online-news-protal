
// caragoty api call function 
fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCatagory(data.data.news_category))


    // get category container 
    const mainCategotuDiv = document.querySelector('.category-container');

    // display catagoty function 
    displayCatagory = (categorys)=>{
        categorys.forEach(category => {
            console.log(category)
            const caragotyDiv = document.createElement('div');
            caragotyDiv.classList.add('p-2')
            caragotyDiv.innerHTML = `
            <button class="btn btn-primary" onclick="displayNews(${category.category_id})">${category.category_name}</button>
            `
            mainCategotuDiv.appendChild(caragotyDiv);
        });
    }



    // display news 
    const displayNews = (id)=>{
        console.log(id)
    }