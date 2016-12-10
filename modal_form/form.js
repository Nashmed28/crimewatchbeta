function delete_input(input) {
  $(input).parent().parent().parent().remove();
  console.log("Hi")
}

function calender() { $(function() {
  $(".date").datepicker({
    autoclose: true,
    todayBtn: 1,
    todayHighlight: false
  })
});}
calender();

function calender2(u) {
	$(document).ready(function() {

  $("#start_" + u).datepicker({
    todayBtn: 1,
    autoclose: true,
  }).on('changeDate', function(selected) {
    var minDate = new Date(selected.date.valueOf());
    $('#end_' + u).datepicker('setStartDate', minDate);
  });

  $("#end_" + u).datepicker({
    todayBtn: 1,
    autoclose: true,
  }).on('changeDate', function(selected) {
    var minDate = new Date(selected.date.valueOf());
    $('#start_' + u).datepicker('setEndDate', minDate);
  });
});}
calender2('');

function date_contain_second_parameter(option, u) {
  var second = document.getElementById("choices_" + u);
  if (option == "default") {
    var content = "<option> --------------------------- </option>"
    second.innerHTML = content;
  }
  if (option == "year") {
    var content = "<option> ----- Please select ----- </option><option>2014</option><option>2015</option><option>2016</option>"
    second.innerHTML = content;
  }
  if (option == "month") {
    var content = "<option> ----- Please select ----- </option><option>January</option><option>February</option><option>March</option><option>April</option><option>May</option><option>June</option><option>July</option><option>August</option><option>September</option><option>October</option><option>November</option><option>December</option>"
    second.innerHTML = content;
  }
  if (option == "day") {
    var content = "<option> ----- Please select ----- </option><option>Sunday</option><option>Monday</option><option>Tuesday</option><option>Wednesday</option><option>Thursday</option><option>Friday</option><option>Saturday</option>"
    second.innerHTML = content;
  }
}


function time() {(function($) {
  $(function() {
    $('input.timepicker').timepicker();
  });
})(jQuery);}


$('.filter_categories').change(function() {
    var ary = new Array();
    $('.filter_categories option:selected').each(function() {
        if ($(this).val().length > 0) {
            ary.push($(this).val());
        }
    });
    $('.filter_categories option').each(function() {
        if ($.inArray($(this).val(), ary) > -1) {
            $(this).attr('disabled', 'disabled');
        } else {
            $(this).removeAttr('disabled');
        }
    });
});


function ask_for_request (category) {
	if (category == 'date') {
		var content = '&nbsp&nbsp&nbsp&nbsp <input type="checkbox" value="value" onclick="Parameter_Populate(\'' + category + '\', this)" id="' + category + '_value"> Value &nbsp&nbsp&nbsp&nbsp <input type="checkbox" value="range" onclick="Parameter_Populate(\'' + category + '\', this)" id="' + category + '_range"> Range &nbsp&nbsp&nbsp&nbsp <input type="checkbox" value="contains" onclick="Parameter_Populate(\'' + category + '\', this)" id="' + category + '_contains"> Contains';
		document.getElementById('filter_forms').innerHTML = content;
	}
	else if (category == 'time') {
		var content = '&nbsp&nbsp&nbsp&nbsp <input type="checkbox" value="value" onclick="Parameter_Populate(\'' + category + '\', this)" id="' + category + '_value"> Value &nbsp&nbsp&nbsp&nbsp <input type="checkbox" value="range" onclick="Parameter_Populate(\'' + category + '\', this)" id="' + category + '_range"> Range';
		document.getElementById('filter_forms').innerHTML = content;
	}
	else if (category != 'default') {
		var content = '&nbsp&nbsp&nbsp&nbsp <input type="checkbox" value="value" onclick="Parameter_Populate(\'' + category + '\', this)" id="' + category + '_value"> Value';
		document.getElementById('filter_forms').innerHTML = content;
	}
	else if (category == 'default') {
		document.getElementById('filter_forms').innerHTML = '';
	}
}



// function Parameter_Populate (category, filter_choice) {    
//     // checks if thing is checked
//     if ($(filter_choice).prop('checked')) {
//     	filter_info_html(category, filter_choice.value);
//     }

//     // if not checked
//     else {
//     	console.log('not checked it')
//     }
// };




// function filter_info_html (category, filter_choice_value, num) {
// 	var num = (typeof num !== 'undefined') ?  num : '';

// 	var u = '' + category + '_' + filter_choice_value;
// 	if (category == 'date') {
// 		if (filter_choice_value == 'value') {
// 			var content = '<div class="flex option date_value"><div class="text">Date:</div><div class="input-group date" data-date-format="mm/dd/yyyy"><input class="form-control" type="text" placeholder="mm/dd/yyyy" /><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div>';
// 			document.getElementById('output').innerHTML = content;
// 			calender();
// 		}		
// 		else if (filter_choice_value == 'range') {
// 			var content = '<div class="flex option date_range"><div class="text">From</div><div class="input-group date" data-date-format="mm/dd/yyyy"><input class="form-control" type="text" placeholder="mm/dd/yyyy" id="start_'+ u +'" /><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span></div><div class="text">to</div><div class="input-group date" data-date-format="mm/dd/yyyy"><input class="form-control" type="text" placeholder="mm/dd/yyyy" id="end_'+ u +'" /><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div>';
// 			document.getElementById('output').innerHTML = content;
// 			calender();
// 			calender2(u);			
// 		}
// 		else if (filter_choice_value == 'contains') {
// 			var content = '<div class="flex option date_contains"><div class="text">By:</div><div class="input-group contains"><select class="form-control dropdown" onchange="date_contain_second_parameter(this.value, \'' + u + '\')"><option value="default"> ----- Please select ----- </option><option value="year">Year</option><option value="month">Month</option><option value="day">Day of the Week</option></select></div><div class="text">on:</div><div class="input-group contains"><select class="form-control dropdown" id="choices_' + u + '"><option> --------------------------- </option></select></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div>';
// 			document.getElementById('output').innerHTML = content;
// 			calender();
// 		}
// 	}
// 	else if (category == 'time') {
// 		if (filter_choice_value == 'value') {
// 			var content = '<div class="flex option time_value"><div class="text">Time:</div><div class="input-group time"><input class="form-control timepicker" type="text" placeholder="HH:MM AM/PM" /><span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div>';
// 			document.getElementById('output').innerHTML = content;
// 			time();	
// 		}		
// 		else if (filter_choice_value == 'range') {
// 			var content = '<div class="flex option time_range"><div class="text">From</div><div class="input-group time"><input class="form-control timepicker" type="text" placeholder="HH:MM AM/PM" /><span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span></div><div class="text">to</div><div class="input-group time"><input class="form-control timepicker" type="text" placeholder="HH:MM AM/PM" /><span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div>';
// 			document.getElementById('output').innerHTML = content;
// 			time();	
// 		}
// 	}
// 	else {
// 		var content = '<div class="flex option other_value"><div class="text">Value:</div><div class="input-group others" data-date-format="mm/dd/yyyy"><input class="form-control" type="Text" placeholder="text" /><span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div>';
// 		document.getElementById('output').innerHTML = content;	
// 	}
// }



function Parameter_Populate (category, filter_choice) {    
    // checks if thing is checked
    if ($(filter_choice).prop('checked')) {
       	filter_info_html(category, filter_choice.value);
    	// var plus_content = '<div class="spacer"></div><div class="adding" onclick="test()"><span class="glyphicon glyphicon-plus"></span></div></div>'
    }

    // if not checked
    else {
    	console.log('not checked it')
    }
};



function filter_info_html (category, filter_choice_value, num) {
	var num = (typeof num !== 'undefined') ?  num : '0';

	var u = '' + filter_choice_value + '_' + category;
	var d = '' + filter_choice_value + '_' + category + num;
	if (category == 'date') {
		if (filter_choice_value == 'value') {
			var content = '<div id="' + u + '" class="flex_line"><div id="' + d + '" class="flex_line serial"><div class="flex option date_value"><div class="text">Date:</div><div class="input-group date" data-date-format="mm/dd/yyyy"><input class="form-control" type="text" placeholder="mm/dd/yyyy" /><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div></div><div class="adding" onclick="filter_info_html_for_adding(\'' + category + '\', \'' + filter_choice_value + '\', \'0\')"><span class="glyphicon glyphicon-plus"></span></div></div>';
			$("#output").append(content);
			calender();
		}		
		else if (filter_choice_value == 'range') {
			var content = '<div id="' + u + '" class="flex_line"><div id="' + d + '" class="flex_line serial"><div class="flex option date_range"><div class="text">From</div><div class="input-group date" data-date-format="mm/dd/yyyy"><input class="form-control" type="text" placeholder="mm/dd/yyyy" id="start_'+ u +'" /><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span></div><div class="text">to</div><div class="input-group date" data-date-format="mm/dd/yyyy"><input class="form-control" type="text" placeholder="mm/dd/yyyy" id="end_'+ u +'" /><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div></div><div class="adding" onclick="filter_info_html_for_adding(\'' + category + '\', \'' + filter_choice_value + '\', \'0\')"><span class="glyphicon glyphicon-plus"></span></div></div>';
			$("#output").append(content);
			calender();
			calender2(u);			
		}
		else if (filter_choice_value == 'contains') {
			var content = '<div class="flex"><div id="' + d + '"><div class="flex option date_contains"><div class="text">By:</div><div class="input-group contains"><select class="form-control dropdown" onchange="date_contain_second_parameter(this.value, \'' + u + '\')"><option value="default"> ----- Please select ----- </option><option value="year">Year</option><option value="month">Month</option><option value="day">Day of the Week</option></select></div><div class="text">on:</div><div class="input-group contains"><select class="form-control dropdown" id="choices_' + u + '"><option> --------------------------- </option></select></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div></div><div class="spacer"></div><div class="adding" onclick="test()"><span class="glyphicon glyphicon-plus"></span></div></div>';
			$("#output").append(content);
			calender();
		}
	}
	else if (category == 'time') {
		if (filter_choice_value == 'value') {
			var content = '<div class="flex"><div id="' + d + '"><div class="flex option time_value"><div class="text">Time:</div><div class="input-group time"><input class="form-control timepicker" type="text" placeholder="HH:MM AM/PM" /><span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div></div><div class="spacer"></div><div class="adding" onclick="test()"><span class="glyphicon glyphicon-plus"></span></div></div>';
			$("#output").append(content);
			time();	
		}		
		else if (filter_choice_value == 'range') {
			var content = '<div class="flex"><div id="' + d + '"><div class="flex option time_range"><div class="text">From</div><div class="input-group time"><input class="form-control timepicker" type="text" placeholder="HH:MM AM/PM" /><span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span></div><div class="text">to</div><div class="input-group time"><input class="form-control timepicker" type="text" placeholder="HH:MM AM/PM" /><span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div></div><div class="spacer"></div><div class="adding" onclick="test()"><span class="glyphicon glyphicon-plus"></span></div></div>';
			$("#output").append(content);
			time();	
		}
	}
	else {
		var content = '<div class="flex"><div id="' + d + '"><div class="flex option other_value"><div class="text">Value:</div><div class="input-group others" data-date-format="mm/dd/yyyy"><input class="form-control" type="Text" placeholder="text" /><span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div></div><div class="spacer"></div><div class="adding" onclick="test()"><span class="glyphicon glyphicon-plus"></span></div></div>';
			$("#output").append(content);
	}
}


function filter_info_html_for_adding (category, filter_choice_value, num) {
	var num = (typeof num !== 'undefined') ?  num : 0;
	var u = '' + filter_choice_value + '_' + category;
	var d2 = '' + filter_choice_value + '_' + category + num;	

	var index = parseInt(num) + 1;
	var num = String(index);

	var d = '' + filter_choice_value + '_' + category + num;

	if (category == 'date') {
		if (filter_choice_value == 'value') {
			$("#" + d2).next().remove();
			var content = '<div id="' + d + '" class="flex_line serial"><div class="flex option date_value"><div class="text">Date:</div><div class="input-group date" data-date-format="mm/dd/yyyy"><input class="form-control" type="text" placeholder="mm/dd/yyyy" /><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div></div><div class="adding" onclick="filter_info_html_for_adding(\'' + category + '\', \'' + filter_choice_value + '\', \'' + num + '\')"><span class="glyphicon glyphicon-plus"></span></div>';

			$("#" + u).append(content);
			calender();
		}		
		else if (filter_choice_value == 'range') {
			var content = '<div class="flex option date_range"><div class="text">From</div><div class="input-group date" data-date-format="mm/dd/yyyy"><input class="form-control" type="text" placeholder="mm/dd/yyyy" id="start_'+ u +'" /><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span></div><div class="text">to</div><div class="input-group date" data-date-format="mm/dd/yyyy"><input class="form-control" type="text" placeholder="mm/dd/yyyy" id="end_'+ u +'" /><span class="input-group-addon"><i class="glyphicon glyphicon-calendar"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div>';
			$("#" + u).append(content);
			calender();
			calender2(u);			
		}
		else if (filter_choice_value == 'contains') {
			var content = '<div class="flex option date_contains"><div class="text">By:</div><div class="input-group contains"><select class="form-control dropdown" onchange="date_contain_second_parameter(this.value, \'' + u + '\')"><option value="default"> ----- Please select ----- </option><option value="year">Year</option><option value="month">Month</option><option value="day">Day of the Week</option></select></div><div class="text">on:</div><div class="input-group contains"><select class="form-control dropdown" id="choices_' + u + '"><option> --------------------------- </option></select></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div>';
			$("#" + u).append(content);
			calender();
		}
	}
	else if (category == 'time') {
		if (filter_choice_value == 'value') {
			var content = '<div class="flex option time_value"><div class="text">Time:</div><div class="input-group time"><input class="form-control timepicker" type="text" placeholder="HH:MM AM/PM" /><span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div>';
			$("#" + u).append(content);
			time();	
		}		
		else if (filter_choice_value == 'range') {
			var content = '<div class="flex option time_range"><div class="text">From</div><div class="input-group time"><input class="form-control timepicker" type="text" placeholder="HH:MM AM/PM" /><span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span></div><div class="text">to</div><div class="input-group time"><input class="form-control timepicker" type="text" placeholder="HH:MM AM/PM" /><span class="input-group-addon"><i class="glyphicon glyphicon-time"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div>';
			$("#" + u).append(content);
			time();	
		}
	}
	else {
		var content = '<div class="flex option other_value"><div class="text">Value:</div><div class="input-group others" data-date-format="mm/dd/yyyy"><input class="form-control" type="Text" placeholder="text" /><span class="input-group-addon"><i class="glyphicon glyphicon-pencil"></i></span></div><div class="trashcan"><img src="http://downloadicons.net/sites/default/files/trash-can-icon-63148.png" alt="delete" style="width:20px;height:20px;" onclick="delete_input(this)"></div></div>';
		$("#" + u).append(content);	
	}
}











function test() {
	alert('hi')
}