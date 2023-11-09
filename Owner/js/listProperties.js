const card = document.querySelector('.row');
let output ='';
const resource_url = 'https://dhvjbin5z2.execute-api.us-east-1.amazonaws.com/dev/properties';

function getListingData(url) {
  fetch(url)
    .then((res) => res.json())
    .then((data) => renderListings(data.body.properties));
}

function renderListings(data) {
  let html = "";
  for (let i = 0; i < data.length; i++) {
    const p = data[i];
    html = html + renderProperty(p);
  }
  card.innerHTML = html;
}

function renderProperty(p) {
  let htmlSegment = `
      <div class="col-md-4">
          <div class="card mb-4 box-shadow">
            <img class="card-img-top" src="./img/${p.pid}/${p.imgUrl[0]}" alt="Thumbnail [100%x225]" >
            <div class="list-card-info">  
                <a href="detail.html?id=${p.pid}" class="list-card-link list-card-link-top-margin" tabindex="0" id="">
                 <address class="list-card-addr">${p.str_address}</address></a> 
                <div class="list-card-footer">
                 <p class="list-card-extra-info">${p.city}, ${p.state}, ${p.zip}</p>
                </div>
                <div class="list-card-heading">
                    <div class="list-card-price">$${p.price}</div>
                    <ul class="list-card-details">
                      <li class="">${p.beds}<abbr class="list-card-label"> bds</abbr></li>
                      <li class="">${p.baths}<abbr class="list-card-label"> ba</abbr></li>
                      <li class="">${p.sqft}<abbr class="list-card-label"> sqft</abbr></li>
                      <li class="list-card-statusText">- ${p.type} for rent</li>
                 </ul>
              </div>
            </div>
          </div>
      </div>`;
  return htmlSegment;
}

getListingData(resource_url);


