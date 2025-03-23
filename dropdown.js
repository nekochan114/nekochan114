// Código JavaScript para manejar los menús desplegables
document.addEventListener('DOMContentLoaded', function() {
  // Manejar selección de motor de búsqueda desde el menú desplegable
  const searchEngineOptions = document.querySelectorAll('.search-engine-option');
  const searchOptionDisplay = document.querySelector('.search-options .search-option');
  let currentEngine = 'google';

  searchEngineOptions.forEach(option => {
    option.addEventListener('click', function() {
      const engine = this.getAttribute('data-engine');
      currentEngine = engine;
      
      // Actualizar el texto mostrado
      searchOptionDisplay.innerHTML = this.textContent + ' <span class="dropdown-arrow">▼</span>';
      
      // Cerrar el menú desplegable
      this.closest('.dropdown-content').style.display = 'none';
      setTimeout(() => {
        this.closest('.dropdown-content').style.display = '';
      }, 100);
    });
  });

  // Manejar selección de tipo de búsqueda desde el menú desplegable
  const searchTypeItems = document.querySelectorAll('.search-type-item');
  const searchTypeDisplay = document.querySelector('.search-type .search-type-option');
  let currentType = 'web';

  searchTypeItems.forEach(item => {
    item.addEventListener('click', function() {
      const type = this.getAttribute('data-type');
      currentType = type;
      
      // Actualizar el texto mostrado
      searchTypeDisplay.innerHTML = this.textContent + ' <span class="dropdown-arrow">▼</span>';
      
      // Cerrar el menú desplegable
      this.closest('.dropdown-content').style.display = 'none';
      setTimeout(() => {
        this.closest('.dropdown-content').style.display = '';
      }, 100);
    });
  });

  // Manejar la búsqueda
  const searchInput = document.querySelector('.search-input');
  const searchButton = document.querySelector('.search-button');

  function performSearch() {
    const query = searchInput.value.trim();
    if (!query) return;
    
    let searchUrl;
    
    switch (currentEngine) {
      case 'google':
        searchUrl = currentType === 'images' 
          ? `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=isch` 
          : currentType === 'videos' 
            ? `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=vid`
            : currentType === 'news' 
              ? `https://www.google.com/search?q=${encodeURIComponent(query)}&tbm=nws`
              : `https://www.google.com/search?q=${encodeURIComponent(query)}`;
        break;
      case 'duckduckgo':
        searchUrl = currentType === 'images'
          ? `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=images&ia=images`
          : currentType === 'videos'
            ? `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iax=videos&ia=videos`
            : currentType === 'news'
              ? `https://duckduckgo.com/?q=${encodeURIComponent(query)}&iar=news&ia=news`
              : `https://duckduckgo.com/?q=${encodeURIComponent(query)}`;
        break;
      case 'yandex':
        searchUrl = currentType === 'images'
          ? `https://yandex.com/images/search?text=${encodeURIComponent(query)}`
          : currentType === 'videos'
            ? `https://yandex.com/video/search?text=${encodeURIComponent(query)}`
            : currentType === 'news'
              ? `https://yandex.com/news/search?text=${encodeURIComponent(query)}`
              : `https://yandex.com/search/?text=${encodeURIComponent(query)}`;
        break;
      case 'bing':
        searchUrl = currentType === 'images'
          ? `https://www.bing.com/images/search?q=${encodeURIComponent(query)}`
          : currentType === 'videos'
            ? `https://www.bing.com/videos/search?q=${encodeURIComponent(query)}`
            : currentType === 'news'
              ? `https://www.bing.com/news/search?q=${encodeURIComponent(query)}`
              : `https://www.bing.com/search?q=${encodeURIComponent(query)}`;
        break;
      default:
        searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
    }
    
    window.open(searchUrl, '_blank');
  }

  searchButton.addEventListener('click', performSearch);
  
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });
});
