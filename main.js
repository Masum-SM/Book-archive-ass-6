// function for spinner and result showinng 
const toggleContent =(id,display) =>{
    document.getElementById(id).style.display = display;
}
// function for field area 
const fieldArea = id =>{
    const searchField = document.getElementById(id);
    return searchField;
}

// for searching result 
const searchBook =()=>{
   
    const searchFieldText = fieldArea('search-area').value ;
    fieldArea('search-area').value = ''

    // calling function 
    toggleContent('spinner','block');
    toggleContent('search','none')
   
    // for empty search 
    fieldArea('empty-search').textContent =''

    if(searchFieldText===''){
        toggleContent('spinner','none');
        const div = document.createElement('div');
        div.classList.add('mx-auto')
        div.innerHTML=`
        <h1 class='text-center text-warning'> Empty Search !!! Please write something to show result.</h1>
        `
        fieldArea('empty-search').appendChild(div);
    }
    else{
        const url =` https://openlibrary.org/search.json?q=${searchFieldText}`
        fetch(url)
        .then(res =>res.json())
        .then(data =>  displaySearchResult (data))
    }
}

// for display result 
const  displaySearchResult = data =>{
    const books = data.docs;
    // for search number 
    fieldArea('search-results').textContent =''
    const searchDiv=document.createElement('div');

    fieldArea('search-results').appendChild(searchDiv);
    fieldArea('display-result').textContent='';


    if(books.length===0){
        searchDiv.innerHTML=`
        <h1 class='text-center text-danger'>Search Result : Not Found</h1> 
        `
    }
    else{
        searchDiv.innerHTML=`
        <h1 class='text-center text-secondary fw-bolder'>Search Result : ${data.numFound}</h1>
        `
    }
    
   //    for each 
   books.forEach(book => {
        //   url for book cover page 
          const url =`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`

        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML=`
                <div id="card" class="card h-100">
                        <img height=300px' src="${url ? url:'not available'}" class="card-img-top" alt="...">
                          <div class="card-body">
                            <h2 class="card-title mb-4 text-dark fw-bold">${book.title}</h2>
                            <h5 class="text-primary">Auther: ${book.author_name ?book.author_name:'Not Available.'}</h5>
                            <h6 class="text-muted">Publisher: ${book.publisher?book.publisher:'Not Availabe.'}</h6>
                          </div>

                          <div class='mx-2'>
                             <small class="text-secondary mx-2">First Published : ${book.first_publish_year?book.first_publish_year:'Not Availabe.'}
                             </small>
                         </div>
                </div>
        `
        fieldArea('display-result').appendChild(div)
      });
    //   calling function 
      toggleContent('search','block');
      toggleContent('spinner','none');
}
