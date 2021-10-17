const portfolio = {
	"crg": [
		{"image":"crg_01", "alt":"crg home"},
		{"image":"crg_02", "alt":"crg home"},
		{"image":"crg_readings", "alt":"crg readings"},
	],
	"hoda": [
		{"image":"hoda_archives", "alt":"hoda archives"},
		{"image":"hoda_home", "alt":"hoda home"},
		{"image":"hoda_home_2", "alt":"hoda events"},
		{"image":"hoda_about", "alt":"hoda about"},
		{"image":"hoda_post", "alt":"hoda post"},
		{"image":"hoda_allarchives", "alt":"hoda all archives"},
		{"image":"hoda_press", "alt":"hoda press"}
		],
	"bwr": [
		{"image":"bwr_mobile", "alt":"archives"},
		{"image":"bwr_home", "alt":"archives"},
		{"image":"bwr_guide", "alt":"archives"},
		{"image":"bwr_bookdetails", "alt":"archives"}
	],
	"cdf": [
		{"image":"cdf-01", "alt":"archives"},
		{"image":"cdf-02", "alt":"archives"},
		{"image":"cdf-03", "alt":"archives"}
		],
	"blue_tin": [
		{"image":"blue-tin", "alt":"archives"},
		{"image":"blue-tin-invite", "alt":"archives"}
	],
	/*"brilliant": [
		{"image":"brilliant_dashboard", "alt":"archives"},
		{"image":"brill_photos", "alt":"archives", "type": "gif"},
		{"image":"brilliant_mobile", "alt":"archives"},
		{"image":"brilliant_catalog", "alt":"archives"}
	],
	"dh": [
		{"image":"dh", "alt":"archives"},
		{"image":"dh-mobile", "alt":"archives"},
		{"image":"dh-03", "alt":"archives"}
	],
	"girlgaze": [
		{"image":"ggcurated-images", "alt":"archives"},
		{"image":"amaalsaid", "alt":"archives"},
		{"image":"girlgaze", "alt":"archives"},
		{"image":"ggwebsite", "alt":"archives"},
		{"image":"gginsta", "alt":"archives"},
		{"image":"girlgaze_story", "alt":"archives"}
	],
	"hips": [
		{"image":"get-up", "alt":"archives"},
		{"image":"get-up-remix", "alt":"archives"}
	],
	"hhs": [
		{"image":"househousesea_01", "alt":"archives"},
		{"image":"househousesea_02", "alt":"archives"},
		{"image":"househousesea_03", "alt":"archives"},
		{"image":"househousesea_04", "alt":"archives"},
		{"image":"househousesea_05", "alt":"archives"},
		{"image":"househousesea_06", "alt":"archives"}
	],		
	"pulp": [
		{"image":"pulp-issuetwo", "alt":"archives"},
		{"image":"pulp-issueone", "alt":"archives"},
		{"image":"pulp-table", "alt":"archives"}
	],
	"unique": [
		{"image":"unique", "alt":"archives"},
		{"image":"unique_02", "alt":"archives"}
	]*/
}

// CLASSES
class Slideshow {
	constructor(slides) {
		this.slide = 0;
		this.slides = slides;
	}
	nextSlide() {
		if (this.slide < this.slides.length - 1) {
			this.slide = this.slide + 1;	
		} else {
			this.slide = 0;
		}		
	}
	imageSrc() {
		let string = this.slides[this.slide].image;
		let type = this.slides[this.slide].type;
		return `content/${string}.${type || 'jpg'}`
	}
	imageAlt(){
		let string = this.slides[this.slide].alt;
		return string
	}
}


//MAIN

document.addEventListener("DOMContentLoaded", function() {
	let contents = document.querySelector(".contents");
	let projectNames = document.querySelectorAll('.project-name');
	watch(projectNames);


	clickNameScrollProject(projectNames);
	imageSlideAndScroll(projectNames);

	let open = document.querySelector('.open');
	open.onclick = function (e) {
		e.preventDefault;
		let info = document.querySelector('.off-canvas');
	    info.classList.toggle('slide');
	    info.classList.toggle('hide-for-small');
	    open.classList.toggle('move-right');
	    open.querySelector('img').classList.toggle('rotate');
	}
})


// SITE FXNS

function clickNameScrollProject(collection) {
	collection.forEach(item => {
		item.onclick = function(e) {
			dehighlight(collection, 'active');
			highlight(this);

			let projectId = this.dataset.id;
			scrollll(projectId);
		}
	})
}

function imageSlideAndScroll(collection){
	let images = document.querySelectorAll('.image');
	images.forEach( image => {	

		let img = image.querySelector('img');
		let projectName = img.dataset.name;
		let projectImages = portfolio[projectName];
		let slideshow = new Slideshow(projectImages);

		image.onclick = function(event) {
			let displayedImage = event.target;

			let projectId = displayedImage.closest('.project-photos').id;

			scrollll(projectId);

			let projects = document.querySelector(".table-of");
			let contents = document.querySelector(".contents");

			let indexName = projects.querySelector(`[data-id="${projectId}"]`);
			dehighlight(collection);
			highlight(indexName);


			let mobileName = contents.querySelector(`[data-id="${projectId}"]`);
			highlight(mobileName);


			slideshow.nextSlide();
			displayedImage.src = slideshow.imageSrc();
			displayedImage.alt = slideshow.imageAlt();
		}
	})
}






//BASIC FXNS

function scrollll(id){
	let contents = document.querySelector(".contents");

	let work = document.getElementById(id);
	let pixelsFromTop = work.offsetTop;

	contents.scroll({
		top: pixelsFromTop - 69,
		behavior: 'smooth'
	})

}

function highlight(item) {
	item.classList.add('active');
	item.querySelector('.project-description').style.display = 'inline';
}

function dehighlight(collection) {
	collection.forEach(item => {
		item.classList.remove('active');
		item.querySelector('.project-description').style.display = 'none';
	})
}

function watch(collection) {
	let projects = document.querySelector(".table-of");
	let contents = document.querySelector(".contents");

	document.addEventListener('click', function(event) {
		let isClickInside = projects.contains(event.target) || contents.contains(event.target);

		if (!isClickInside) {
			dehighlight(collection, 'active');
		}
	})
}































