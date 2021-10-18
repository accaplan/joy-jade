const portfolio = {
	"infinite": [
		{"image":"infinite_01", "alt":"infinite website"},
		{"image":"infinite_02", "alt":"infinite website"},
		{"image":"infinite_03", "alt":"infinite website"},
		{"image":"infinite_04", "alt":"infinite website"},
		{"image":"infinite_05", "alt":"infinite website"},
		{"image":"infinite_06", "alt":"infinite website"}
	],
	"leisure": [
		{"image":"leisure_01", "alt":"leisure cooperative website"},
		{"image":"leisure_02", "alt":"leisure cooperative website"},
		{"image":"leisure_03", "alt":"leisure cooperative website"},
		{"image":"leisure_04", "alt":"leisure cooperative website"}
		],
	"dense": [
		{"image":"dense_01", "alt":"dense journal website"}
	],
	"idle": [
		{"image":"idlehours_01", "alt":"idle hours company website"},
		{"image":"idlehours_02", "alt":"idle hours company website"},
		{"image":"idlehours_03", "alt":"idle hours company website"}
		],
	"enough": [
		{"image":"enough_01", "alt":"enough structures website"},
		{"image":"enough_02", "alt":"enough structures website"},
		{"image":"enough_03", "alt":"enough structures website"},
		{"image":"enough_04", "alt":"enough structures website"},
		{"image":"enough_05", "alt":"enough structures website"},
		{"image":"enough_06", "alt":"enough structures website"},
		{"image":"enough_07", "alt":"enough structures website"},
		{"image":"enough_08", "alt":"enough structures website"}
	],
	"makespace": [
		{"image":"makespace_01", "alt":"how to make space website"},
		{"image":"makespace_02", "alt":"how to make space website"},
		{"image":"makespace_03", "alt":"how to make space website"},
		{"image":"makespace_04", "alt":"how to make space website"}
		/*{"image":"brill_photos", "alt":"archives", "type": "gif"},*/
	],
	/*"dh": [
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































