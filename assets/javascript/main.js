/* SLIDER SCRIPT */

document.addEventListener("DOMContentLoaded", function () {
  let slider = document.querySelector(".slider");
  let prevBtn = document.querySelector(".prev-btn");
  let nextBtn = document.querySelector(".next-btn");
  let dotsContainer = document.querySelector(".page-dots");
  let dots = [];

  let slideIndex = 0;
  let slideInterval = 3000;

  function showSlide(index) {
    slider.style.transform = `translateX(-${index * 100}%)`;

    dots.forEach((dot, dotIndex) => {
      dot.classList.toggle("active-dot", dotIndex === index);
    });
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % dots.length;
    showSlide(slideIndex);
  }

  function prevSlide() {
    slideIndex = (slideIndex - 1 + dots.length) % dots.length;
    showSlide(slideIndex);
  }

  function createDots() {
    for (let i = 0; i < slider.children.length; i++) {
      let dot = document.createElement("span");
      dot.classList.add("dot");
      dot.addEventListener("click", () => showSlide(i));
      dots.push(dot);
      dotsContainer.appendChild(dot);
    }

    dots[0].classList.add("active-dot");
  }

  createDots();

  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);

  setInterval(nextSlide, slideInterval);
});
  
  /* SIDE MENU SCRIPT */

  document.addEventListener("DOMContentLoaded", function() {
    let sideMenu = document.querySelector(".side-menu-container");
    
    function toggleSideMenu() {
        if (window.pageYOffset > 150) {
            sideMenu.classList.add("active");
        } else {
            sideMenu.classList.remove("active");
        }
    }
    
    toggleSideMenu();
    
    window.addEventListener("scroll", function() {
        toggleSideMenu();
    });
});

/* NUMBER ANIMATION SCRIPT */

  function animateNumber(element, targetNumber, duration) {
    let currentNumber = 0;
    let step = Math.ceil(targetNumber / (duration / 16)); 

    let interval = setInterval(() => {
      currentNumber += step;
      if (currentNumber >= targetNumber) {
        currentNumber = targetNumber;
        clearInterval(interval);
      }

      element.innerText = currentNumber;
    }, 16); 
  }

  function handleIntersection(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        let numberElements = entry.target.querySelectorAll('.info-area h4');
        let targetNumbers = [1961, 9, 2000, 500];
        let animationDuration = 1000; 

        numberElements.forEach((element, index) => {
          animateNumber(element, targetNumbers[index], animationDuration);
        });

        observer.unobserve(entry.target); 
      }
    });
  }

  let options = {
    root: null, 
    rootMargin: '0px',
    threshold: 1.0,
  };

  let observer = new IntersectionObserver(handleIntersection, options);


  let foundationSection = document.querySelector('.foundation-section');
  if (foundationSection) {
    observer.observe(foundationSection);
  }
  

  /* SPINNER SCRIPT */

  document.addEventListener("DOMContentLoaded", function() {
    let spinner = document.getElementById("spinner");
    setTimeout(function() {
        spinner.style.display = "none";
    }, 1000); 
});


/* PRODUCTS SCRIPT */

function createArticle(article) {
  return `
    <a href="./product.html?slug=${article.slug}">
      <article>
        <div class="thumbnail">
          <img src="${article.thumbnail}" alt="${article.title}">
        </div>
        <div class="content">
          <a href="./product.html?slug=${article.slug}"><h5><i class="fa-solid fa-circle-chevron-right"></i> ${article.title}</h5></a>
        </div>
      </article>
    </a>
  `;
}


async function fetchAndDisplayArticles() {
  try {
    const response = await fetch('./articles.json');
    const data = await response.json();
    const articlesContainer = document.getElementById('articles-container');

    let articlesHTML = '';
    data.articles.forEach(article => {
      articlesHTML += createArticle(article);
    });

    articlesContainer.innerHTML = articlesHTML;
  } catch (error) {
    console.error('Error fetching or displaying articles:', error);
  }
}


fetchAndDisplayArticles();

/* NEWS SCRIPT */

document.addEventListener("DOMContentLoaded", function () {
  const newsContainer = document.getElementById("news-container");

  // Fetch news data from JSON file
  fetch("news.json")
    .then((response) => response.json())
    .then((data) => {
      const news = data.news;
      let newsHTML = "";

      // Loop through each news article and create HTML elements
      for (let i = 0; i < news.length; i++) {
        const article = news[i];
        const articleHTML = `
          <article>
            <div class="thumbnail">
              <img src="${article.thumbnail}" alt="News Thumbnail" />
             
            </div>
            <div class="content">
              <h5>${article.title}</h5>
              <div class="content-info">
                <div class="date-time">
                  <i class="fa-regular fa-clock"></i>
                  <span>${article.date}</span>
                  <span> / </span>
                  <span>${article.time}</span>
                </div>
                <button class="btn btn-primary" onclick="showNewsDetails(${article.id})">Read</button>
              </div>
            </div>
          </article>
        `;
        newsHTML += articleHTML;
      }

      // Add the generated HTML to the newsContainer
      newsContainer.innerHTML = newsHTML;
    })
    .catch((error) => console.error("Error fetching news data:", error));
});

// Function to open news details page with selected news article
function showNewsDetails(newsId) {
  // Redirect to news_details.html with the selected news ID as a query parameter
  window.location.href = `news_details.html?id=${newsId}`;
}


/* NEWS DETAILS SCRIPT */

// news_details.js

document.addEventListener("DOMContentLoaded", function () {
  // Get the news ID from the query parameter
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const newsId = parseInt(urlParams.get("id"));

  // Fetch news data from JSON file
  fetch("news.json")
    .then((response) => response.json())
    .then((data) => {
      const news = data.news;
      const selectedNews = news.find((article) => article.id === newsId);

      // Populate the news details page with the selected news article's data
      if (selectedNews) {
        document.getElementById("news-thumbnail").src = selectedNews.thumbnail;
        document.getElementById("news-title").innerHTML = selectedNews.title;
        document.getElementById("news-date-time").innerHTML = `${selectedNews.date} / ${selectedNews.time}`;
        document.getElementById("news-content").innerHTML = selectedNews.content;
      } else {
        console.error("Selected news article not found.");
      }
    })
    .catch((error) => console.error("Error fetching news data:", error));
});

