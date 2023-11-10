//const api_url = 'https://ys8gxfz792.execute-api.us-east-1.amazonaws.com/prod';

//const resource = '/properties';
const url = "https://c7nq12veuh.execute-api.us-east-1.amazonaws.com/dev/listproperties";
const imageUrl = '../data/properties.json';

async function getListings() {

    try {
        let res = await fetch(url);
		let response = await res.json();
		console.log(response.body);
        let resJson = JSON.parse(response.body);
		console.log(resJson);
		let properties = resJson.properties;
		return properties;
    } catch (error) {
        console.log(error);
    }
}

async function getImages() {

    try {
        let res = await fetch(imageUrl);
        return await res.json();  
    } catch (error) {
        console.log(error);
    }
}

async function renderListings() {
    let listings = await getListings();
	let images = await getImages();
	console.log(listings);
    let html = '';
    listings.forEach(p => {
        let htmlSegment = `
        <div class="col-md-4">
            <div class="card mb-4 box-shadow">
              <div class="list-card-info">
					<img class="card-img-top" src="${images[Math.floor(Math.random() * images.length)]}" alt="Thumbnail [100%x225]" >			  
                   <address class="list-card-addr">${p.str_address} ${p.city} ${p.state} ${p.zip}</address>
                  <div class="list-card-footer">
				   <p class="list-card-extra-info">${p.year}</p>
                   <p class="list-card-extra-info">Willams Keller LLC</p>
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
        html += htmlSegment;
        })
    
    let card = document.querySelector('.row');
    card.innerHTML = html;
    }
    

renderListings();
