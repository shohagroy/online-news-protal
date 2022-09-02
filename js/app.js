
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

        fetch(`https://openapi.programming-hero.com/api/news/category/0${category_id}`)
            .then(res => res.json())
            .then(data => setDisplayNews(data.data))

            setDisplayNews = (allNews) =>{
                document.querySelector('.alert-container').innerHTML = `
            <p class="p-2">${allNews.length} item found for category "${caragoty_name}"</p>`               

            allNews.forEach(news =>{
                console.log(news)

                const mainCardDiv = document.querySelector('.news-card-container');
                const singleCardDiv = document.createElement('div');
                singleCardDiv.innerHTML = `
                <div class="card mb-3 container-fluid">
            <div class="row g-0">
              <div class="col-12 col-md-4">
                <img
                  src="${news.thumbnail_url}"
                  class="img-fluid rounded-start py-2"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    ${news.title}
                  </h5>
                  <p class="card-text">${news.details}</p>
                   
                </div>
              </div>
              <div class="card-footer bg-transparent border-success">
                <div class="d-flex justify-content-between align-items-center">
                  <div class="athor-main d-flex align-items-center">
                    <div>
                      <img class="" src="${news.author.img}" alt="" />
                    </div>
                    <div>
                      <small>${news.author.name}</small> <br />
                      <small>${news.author.published_date}</small>
                    </div>
                  </div>

                  <div>
                    <i class="fa-solid fa-eye"></i>
                    <small>${news.total_view}K</small>
                  </div>
                  <div class="d-none d-md-block">
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star-half-stroke text-warning"></i>
                    <i class="fa-regular fa-star text-warning"></i>
                  </div>
                  <div>
                    <div class="card-button">
                      <i class="fa-solid fa-right-long"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        `

                mainCardDiv.appendChild(singleCardDiv);
            })

            loadingSpiner.classList.add('d-none')
        }
        


            

    }