
// get loading-spiner
const loadingSpiner = document.querySelector('.loading-spiner');
loadingSpiner.classList.remove('d-none')
    // get category container 
    const mainCategotuDiv = document.querySelector('.category-container');

try {
    // caragoty api call function 
    fetch('https://openapi.programming-hero.com/api/news/categories')
        .then(res => res.json())
        .then(data => displayCatagory(data.data.news_category))
  } catch (error) {
    console.log(error)
  }         
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

        try{
            fetch(`https://openapi.programming-hero.com/api/news/category/0${category_id}`)
            .then(res => res.json())
            .then(data => setDisplayNews(data.data))
        }catch(error){
            console.error(error)
        }

            setDisplayNews = (allNews) =>{
                document.querySelector('.alert-container').innerHTML = `
            <p class="p-2">${allNews.length} item found for category "${caragoty_name}"</p>`
            
            const mainCardDiv = document.querySelector('.news-card-container');
                mainCardDiv.innerHTML = '';

                // news sort function 
                allNews.sort((a, b) => {
                    return b.total_view - a.total_view;
                    });

            allNews.forEach(news =>{

                const singleCardDiv = document.createElement('div');
                singleCardDiv.innerHTML = `
            <div class="card mb-3 container-fluid">
                <div class="row g-0">
                    <div class="col-12 text-center col-md-4">
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
                        <p class="card-text">${news.details.slice(0, 500)}...</p>
                        
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
                            <div data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop">
                                <div class="card-button"  >
                                    <i onclick="openModel('${news._id}')" class="fa-solid fa-right-long"></i>
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

    // modal open function 
    const openModel = (newsId) =>{
        loadingSpiner.classList.remove('d-none')

        try{
            fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
            .then(res => res.json())
            .then(data => DisplayFullNews(data.data))
        }
        catch(error){
            console.log(error)
        }

            const DisplayFullNews = (fullNews) =>{

        document.getElementById('model-title').innerText = fullNews[0].title;
        document.getElementById('news-details').innerText = fullNews[0].details;
        document.getElementById('image-container').innerHTML = `
        <img class="img-fluid" src="${fullNews[0].image_url}" alt=""/>`

        document.getElementById('modal-footer').innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
                  <div class="athor-main d-flex align-items-center">
                    <div>
                      <img id="image" src="${fullNews[0].author.img}" alt="" />
                    </div>
                    <div>
                      <small>${fullNews[0].author.name}</small> <br />
                      <small>${fullNews[0].author.published_date}</small>
                    </div>
                  </div>

                  <div>
                    <i class="fa-solid fa-eye"></i>
                    <small>${fullNews[0].total_view}K</small>
                  </div>
                  <div class="d-none d-md-block">
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star text-warning"></i>
                    <i class="fa-solid fa-star-half-stroke text-warning"></i>
                    <i class="fa-regular fa-star text-warning"></i>
                  </div>
                  <div>
                    <div
                      class="card-button"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                    >
                      <i class="fa-sharp fa-solid fa-circle-xmark"></i>
                    </div>
                  </div>
                </div>`
            }   
        loadingSpiner.classList.add('d-none')
    }

        

    
    

    