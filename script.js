window.addEventListener('load', () => {
  if (window.location.pathname === '/items/') {
    loadItemsPage();
  } else {
    loadHomePage();
  }
}, false);

function loadHomePage() {
  document.getElementById('reviews-btn')
    .addEventListener('click', () => {
      fetch(ajaxLocalisedObj.ajaxUrl, {
        method: 'POST',
        credentials: 'same-origin',
        headers: new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' }),
        body: 'action=get_posts_by_category&category=review'
      })
        .then(response => response.json())
        .then(json => {
          json.forEach((review) => {
            document.getElementById('home').innerHTML +=
              `<div class="card">
              <div class="card-content">
                ${review.post_content}
              </div>
            </div>`;
          })
        })
    })
}

function loadItemsPage() {
  fetch(ajaxLocalisedObj.ajaxUrl, {
    method: 'POST',
    credentials: 'same-origin',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded'
    }),
    body: 'action=get_posts_by_category&category=item'
  })
    .then(response => response.json())
    .then(json => {
      json.forEach((item) => {
        const blocks = splitBlocksByClass(item.post_content);
        document.getElementById('items').innerHTML +=
          `<div class="card">
            <div class="card-content">
              ${blocks.item__heading}
              ${blocks.item__img}
              ${blocks.item__details}
              ${blocks.item__price}
            </div>
          </div>`;
      })
    })
}

function splitBlocksByClass(postContent) {
	const splitBlocks = {};
  const splitBlocksArray = postContent
    .split('\n')
    .filter(
      i => i.length > 0 && 
      !i.includes('<!-- wp:') && 
      !i.includes('<!-- /wp:')
    );
  splitBlocksArray.forEach(block => {
    let className = block.split('class=\"')[1];
    if (className.length > 0) {
      className = className.split('\"')[0];
      // Get last class which is the 'Additional CSS Class' WordPress field
      className = className.split(' ').pop();
      splitBlocks[className] = block;
    }
  })
  return splitBlocks;
}