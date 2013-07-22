function loaderCalendar( updateMonth ) {

	var
		date 		= new Date(),
		upMonth		= ( (updateMonth == null) ?  date.getMonth() : updateMonth ),
		startday 	= setStartDay( date.getFullYear(), upMonth, 1 );

	loadMonths( upMonth );
	loadDays( startday , getQtdMonth( upMonth  ) );

}

function loadMonths ( currentMoth ) {

	var
		groupMonths  		= document.getElementById("months"),
		titleMonths 		= ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'],
		titleMonthsLeng 	= titleMonths.length,
		newMonthButton 		= null,
		newMonthButtonText 	= null,
		newMonthClass 			= 'btn'; // Default Class

		for( var i = 0; i < titleMonthsLeng; i++ ) {

			newMonthButton = document.createElement('button');

			//Set Class
			newMonthButton.className  	=	'btn';
				//Set Class to Current Month
				if( i == currentMoth )
					newMonthButton.className += ' btn-success'

			//set value for new button
			newMonthButton.value = i;

			//add event listiner
			newMonthButton.addEventListener("click", updateCaledar, false );

			//Add Text Node
			newMonthButton.textContent  = titleMonths[ i ];

			//Add button to container Month
			groupMonths.appendChild( newMonthButton );
		}
}

function loadDays ( startday, daysMonth ) {


	var
		groupDays  	= document.getElementById("days"),
		block  		= 1,
		blockDays 	= 42, // 7 col x 6 lines
		newLineDays  	= document.createElement('tr'),
		newBlockDay 	= null,
		setStartDay 	= null;

		groupDays.innerHTML = '';

		for ( block ; block <= blockDays; block ++ ) {

			//setStartDay
			setStartDay = ( (block - startday >= 0) && (block - startday < daysMonth ) ? block - startday + 1 : "&nbsp;" );

			newBlockDay = document.createElement('td');
			newBlockDay.innerHTML = setStartDay ;

			newLineDays.appendChild( newBlockDay );
			groupDays.appendChild( newLineDays );
			
			if ( ( block % 7 == 0 ) && ( block < 36 ) ) {
				newLineDays  	= document.createElement('tr');
				groupDays.appendChild( newLineDays );
			}

		}
	
}

// Update Calendar
function updateCaledar () {

	var
		date = new Date(),
		startday 	= setStartDay( date.getFullYear(), this.value , 1 );

	setMonthActive( this );

	loadDays( startday , getQtdMonth(this.value) );
}


//Helpers

// Get days of the Moths
function getQtdMonth ( monthId ) {
	
	//Months 0 - 11
	var 
		fullYear = new Date().getFullYear(),
		daysMonth = [ 31 , 0 , 31 , 30 , 31 , 30 , 31 , 30 , 31 , 30 , 31 , 30 ];

		//Set Leap Year
		daysMonth[1] = ( ( ( fullYear%100!=0 ) && ( fullYear % 4 == 0 ) ) || ( fullYear % 400 == 0 ) ) ? 29 : 28;

		return daysMonth[ monthId ];

}

//Get start Date
function setStartDay ( year, month, day ) {
	var 
		date 			= new Date( year, month, day ),
		startDay 	= date.getDay() + 1;
		return startDay;
}

//Remove Class 'btn-success'
//Set Months Active
function setMonthActive( active ) {
	var
		btnMoths = document.querySelectorAll('.btn-group .btn'),
		totalArr = btnMoths.length;

	for( var x = 0; x < totalArr; x++ ){
		if( btnMoths[x].className.match(/\bbtn-success\b/) ){
			btnMoths[x].classList.remove ('btn-success');
		}
	}

	active.className += ' btn-success';

}
