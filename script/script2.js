var main = {
	init: function() {

		if( $('.box-1').length){
			this.places();
		}
	},

	getStars: function(ammount){
		return (new Array(parseInt(ammount,10)+1)).join('<span class="icon-star-full"></span>');
	},

	getPlaces: function(page){
		var th = this,
			totalPages = 1;


		$.ajax({
			url: 'http://camp.efigence.com/camp/api/places',
			data: 'page='+page,
			success: function (data) {
				$('body').scrollTop(0);
				th.renderContent(data);
				renderPagination(data);
			}
		});

		function renderPagination(data) {
			var html = '';
			totalPages = data.total_pages;
			for (var i=1; i<=data.total_pages; i++) {
				//if (places[i].total_pages)
				html = [
					html,
					'<li class="'+ (i == data.page ? 'active' : '') +'"><a href="#" data-page="'+i+'">', i, '</a></li>',
				].join('');
			}

			html = ['<ul class="pagination"><li><a href="#" aria-label="Previous" data-page="'+(data.page-1)+'"><span class="icon-circle-left"></span><p class="pagination-text">poprzednia strona</p></a></li>', html, '<li><a href="#" aria-label="Next" data-page="'+(data.page+1)+'"><p class="pagination-text">nastpna strona</p><span class="icon-circle-right"></span></a></li></ul>'].join('');
			$('.pagination-content').empty().append(html);

			attachEvents();
		}

		function attachEvents() {
			$('.pagination-content').find('a').on('click', function(event) {
				event.preventDefault();
				var page = $(this).attr('data-page');
				if ( page > 0 && page <= totalPages) {
				th.getPlaces( page );
				}
			});
		}
	},

	renderContent: function(data) {
		var placesLength = data.places.length,
				html = '',
				places = data.places,
				th = this;
			for(i = 0; i < placesLength; i += 1) {

				var icons = [];
				if (places[i].wifi) {
					icons.push('<span class="icon-connection"></span>')
				}
				if (places[i].tv) {
					icons.push('<img class="icon-tv" src="public/css/images/background-img/tv.png">')
				}
				if (places[i].food) {
					icons.push('<span class="icon-spoon-knife"></span>')
				}
				if (places[i].paypas) {
					icons.push('<span class="icon-credit-card"></span>')
				}
				if (places[i].swimming) {
					icons.push('<img class="icon-life" src="public/css/images/background-img/life.png">')
				}
				if (places[i].airport) {
					icons.push('<img class="icon-plane" src="public/css/images/background-img/plane.png">')
				}
				if (places[i].parking) {
					icons.push('<img  class="icon-p" src="public/css/images/background-img/p.png">')
				}
				var result = icons.join('');

				var standard = [];
				if (places[i].score >= 9.1) {
					standard.push('Znakomity ')
				}
				if (places[i].score >= 8.5 && places[i].score < 9.1) {
					standard.push('Fantastyczny ')
				}
				if (places[i].score >= 7.7 && places[i].score < 8.5) {
					standard.push('Bardzo-dobry ')
				}
				if (places[i].score >= 5.4 && places[i].score < 7.7) {
					standard.push('Dobry ')
				}
				if (places[i].score >= 4 && places[i].score < 5.4) {
					standard.push('Średni ')
				}
				if (places[i].score >= 3 && places[i].score < 4) {
					standard.push('Taki sobie ')
				}
				if (places[i].score >= 2 && places[i].score < 3) {
					standard.push('Słaby ')
				}
				if (places[i].score >= 1 && places[i].score < 2) {
					standard.push('Lepiej unikaj ')
				}
				if (places[i].score >= 0 && places[i].score < 1) {
					standard.push('Budynek do rozbiórki ')
				}
				var standardMark = standard.join('');

				html = [
					html,
					'<tr>',
					'<td class="col-space col-lg-1"></td>',
					'<td class="col-lg-3 col-md-4 col-sm-3">',
					'<figure><img class="table-pic" src="', places[i].gallery[0], '" /></figure>',
					'</td>',
					'<td class="column col-lg-4 col-md-4 col-sm-4 col-xs-7">',
					'<h3>', places[i].name, '</h3>',
					'<p class="cell-text-add cell-text-sub">', places[i].place, '<p>',
					th.getStars(places[i].starts),
					'<p class="cell-text-basic cell-text-left">', places[i].description, '</p>',
					'<a href="#">Szczegóły</a>',
					'</td>',
					'<td class="column col-lg-1 col-md-1 col-sm-1">',
					result,
					'</td>',
					'<td class="column col-lg-2 col-md-3 col-sm-4 col-xs-5">',
					'<h4>', standardMark, places[i].score, '</h4>',
					'<p class="cell-text-add cell-text-sub">Ocena na podstawie ', places[i].opinion_count, ' opinii</p>',
					'<p class="cell-text-add cell-text-sub cell-cross-text">', places[i].oldprice, 'PLN</p>',
					'<p class="cell-text-basic cell-text-strong">', places[i].price, '</p>',
					'<p class="cell-text-sub cell-text-price">PLN</p>',
					'<p class="cell-text-basic cell-text-bottom">Cena za 3 noce</p>',
					'<button type="button" class="btn-basic btn-table">Zarezerwuj teraz</button>',
					'</td>',
					'<td class="col-space col-lg-1"></td>',
					'</tr>',
				].join('');
			}

			html = ['<table class="row>"><tbody>', html, '</tbody></table>'].join('');
			$('.box-1').empty().append(html);
	},

	places: function(){
		var th = this;

		th.getPlaces(1);
		
		


	}
};

$(document).ready(function(){
	main.init();	
});
