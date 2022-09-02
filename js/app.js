
// get loading-spiner
const loadingSpiner = document.querySelector('.loading-spiner');
loadingSpiner.classList.remove('d-none')

// caragoty api call function 
fetch('https://openapi.programming-hero.com/api/news/categories')
    .then(res => res.json())
    .then(data => displayCatagory(data.data.news_category))

    // get category container 
    const mainCategotuDiv = document.querySelector('.category-container');

    // display catagoty function 
    displayCatagory = (categorys)=>{
        categorys.forEach(category => {
            const caragotyDiv = document.createElement('div');
            caragotyDiv.classList.add('p-2')
            caragotyDiv.innerHTML = `
            <button class="btn btn-primary" onclick="displayNews(${category.category_id}, '${category.category_name}')">${category.category_name}</button>
            `
            mainCategotuDiv.appendChild(caragotyDiv);
        });
        
        loadingSpiner.classList.add('d-none')
    }
    


    // display news 
    const displayNews = (category_id, caragoty_name)=>{
    loadingSpiner.classList.remove('d-none')

        console.log(category_id)
        fetch(`https://openapi.programming-hero.com/api/news/category/0${category_id}`)
            .then(res => res.json())
            .then(data => setDisplayNews(data.data))

            setDisplayNews = (news) =>{
                console.log(news)

                document.querySelector('.alert-container').innerHTML = `
            <p class="p-2">${news.length} item found for category "${caragoty_name}"</p>`            
            loadingSpiner.classList.add('d-none')
        }


            

    }