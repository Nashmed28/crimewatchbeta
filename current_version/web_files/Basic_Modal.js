function search_type_chosen(dropdown) {
    if (dropdown.value == "type") {
        if (document.getElementById('type') == null) {
            type();
        }
    }
    else if (dropdown.value == "status") {
        if (document.getElementById('status') == null) {
            status();
        }
    }
    else if (dropdown.value == "date") {
        if (document.getElementById('date') == null) {
            date();
        }
    }
    else if (dropdown.value == "drange") {
        if (document.getElementById('drange') == null) {
            drange();
        }
    }
    else if (dropdown.value == "time") {
        if (document.getElementById('time') == null) {
            time();
        }
    }
    else if (dropdown.value == "trange") {
        if (document.getElementById('trange') == null) {
            trange();
        }
    }
    else if (dropdown.value == "keywords") {
        if (document.getElementById('keywords') == null) {
            keywords();
        }
    }
    dropdown.value = "default"
}

function type () {
    $("#main_form_body").append('<tr id="type" style=""><td class="search_label"><span style="font-weight:bold">Pick Crime Type(s):</span></td> <td class="search_parameter"><select id="types" data-placeholder="Choose a Type of Crime" class="type-select" multiple style="width:400px;" tabindex="4"><option value=""></option><option value="209 A SERVICE">209 A SERVICE</option><option value="ANNOYING CALL(S) - SCAM">ANNOYING CALL(S) - SCAM</option><option value="ANNOYING CALLS/TEXTS/EMAILS">ANNOYING CALLS/TEXTS/EMAILS</option><option value="ASSAULT REPORT">ASSAULT REPORT</option><option value="ASSIST BOSTON POLICE">ASSIST BOSTON POLICE</option><option value="ASSIST BPD - THEFT REPORT">ASSIST BPD - THEFT REPORT</option><option value="ASSIST CAMBRIDGE POLICE">ASSIST CAMBRIDGE POLICE</option><option value="ASSIST CITIZEN">ASSIST CITIZEN</option><option value="ASSIST CPD - THEFT REPORT">ASSIST CPD - THEFT REPORT</option><option value="ASSIST MSP - THEFT REPORT">ASSIST MSP - THEFT REPORT</option><option value="ASSIST OTHER AGENCY">ASSIST OTHER AGENCY</option><option value="ASSIST OTHER HARVARD DEPT.">ASSIST OTHER HARVARD DEPT.</option><option value="ASSIST OTHER PD">ASSIST OTHER PD</option><option value="ASSIST STATE POLICE">ASSIST STATE POLICE</option><option value="ASSIST TRANSIT POLICE">ASSIST TRANSIT POLICE</option><option value="BOMB THREAT">BOMB THREAT</option><option value="CHEMICAL SPILL">CHEMICAL SPILL</option><option value="DEMONSTRATION">DEMONSTRATION</option><option value="DISORDERLY CONDUCT">DISORDERLY CONDUCT</option><option value="DISTURBANCE">DISTURBANCE</option><option value="DOMESTIC DISTURBANCE">DOMESTIC DISTURBANCE</option><option value="FIELD INTERVIEW">FIELD INTERVIEW</option><option value="FIRE">FIRE</option><option value="FRAUD">FRAUD</option><option value="HARASSMENT">HARASSMENT</option><option value="HARASSMENT PROTECTION ORDER">HARASSMENT PROTECTION ORDER</option><option value="HAZARDOUS CONDITION">HAZARDOUS CONDITION</option><option value="INFORMATION SECURITY BREACH">INFORMATION SECURITY BREACH</option><option value="LOST PROPERTY">LOST PROPERTY</option><option value="LOUD PARTY">LOUD PARTY</option><option value="MOTOR VEHICLE ACCIDENT">MOTOR VEHICLE ACCIDENT</option><option value="NOISE COMPLAINT">NOISE COMPLAINT</option><option value="PEEPING AND SPYING">PEEPING AND SPYING</option><option value="PROPERTY DAMAGE">PROPERTY DAMAGE</option><option value="RAPE">RAPE</option><option value="REMOVE GROUP">REMOVE GROUP</option><option value="SKATEBOARD/BIKE COMPLAINT">SKATEBOARD/BIKE COMPLAINT</option><option value="SUDDEN DEATH">SUDDEN DEATH</option><option value="SUSPICIOUS ACTIVITY">SUSPICIOUS ACTIVITY</option><option value="SUSPICIOUS MAIL/ PACKAGE/BAG">SUSPICIOUS MAIL/ PACKAGE/BAG</option><option value="SUSPICIOUS ODOR/SMOKE">SUSPICIOUS ODOR/SMOKE</option><option value="THEFT REPORT">THEFT REPORT</option><option value="THREAT(S)">THREAT(S)</option><option value="TRESPASS LETTER">TRESPASS LETTER</option><option value="TRESPASS WARNING">TRESPASS WARNING</option><option value="TRESPASSING">TRESPASSING</option><option value="UNWANTED GUEST">UNWANTED GUEST</option><option value="VANDALISM">VANDALISM</option><option value="WARRANT ARREST">WARRANT ARREST</option></select> <button class="type-button">Reset</button><script>$(".type-select").chosen();$(".type-button").click(function(){$(".type-select").val("").trigger("chosen:updated");});</script></td><td class="search_remove"><button onclick="type_remove()">Remove</button></td></tr>');
}
function type_remove () {
    $("#type").remove();
}



function status () {
    $("#main_form_body").append('<tr id="status" style=""><td class="search_label"><span style="font-weight:bold">Pick status(es):</span></td> <td class="search_parameter"><select id="statuses" data-placeholder="Choose a Crime Status" class="status-select" multiple style="width:400px;" tabindex="4"><option value=""></option><option value="OPEN">OPEN</option><option value="CLOSED">CLOSED</option><option value="ARREST">ARREST</option></select> <button class="status-button">Reset</button><script>$(".status-select").chosen();$(".status-button").click(function(){$(".status-select").val("").trigger("chosen:updated");});</script></td><td class="search_remove"><button onclick="status_remove()">Remove</button></td></tr>');
}
function status_remove () {
    $("#status").remove();
}



var num_of_date_input = 1;
function date () {
    $("#main_form_body").append('<tr id="date" style=""><td class="search_label"><span style="font-weight:bold">Pick Date(s):</span></td><td class="search_parameter" id="date_input"><div id="0date"><input type="date" id="date0"> <button id="date_button" onclick="add_new_date()">+</button></div></td><td class="search_remove"><button onclick="date_remove()">Remove</button></td></tr>');
}
function add_new_date() {
    $("#date_input").append('<div id="'+num_of_date_input+'date"><input type="date" id="date'+num_of_date_input+'"> <button id="remove_date'+num_of_date_input+'" onclick="remove_date('+num_of_date_input+')">T</button></div>');
    num_of_date_input++;
}
function remove_date (num) {
    $("#"+num+"date").remove();
}
function date_remove () {
    $("#date").remove();
}



var num_of_drange_input = 1;
function drange () {
    $("#main_form_body").append('<tr id="drange" style=""><td class="search_label"><span style="font-weight:bold">Set Date Range(s):</span></td><td class="search_parameter" id="drange_input"><div id="drange0"><input type="date" id="drange0a" onfocusout="valid_interval(0, this)"> to <input type="date" id="drange0b" onfocusout="valid_interval(0, this)"> <button id="drange_button" onclick="add_new_drange()">+</button></div></td><td class="search_remove"><button onclick="drange_remove()">Remove</button></td></tr>');
}
function valid_interval(num, input) {
    var first = document.getElementById("drange"+num+"a").value;
    var second = document.getElementById("drange"+num+"b").value;
    if (first != "" && second != "") {
        var first_date = new Date(first);
        var second_date = new Date(second);
        if (first_date > second_date) {
            alert("Invalid date range. First date should be before the second one.")
            input.value = "";
        }
    }
}
function add_new_drange() {
    $("#drange_input").append('<div id="drange'+num_of_drange_input+'"><input type="date" id="drange'+num_of_drange_input+'a" onfocusout="valid_interval('+num_of_drange_input+', this)"> to <input type="date" id="drange'+num_of_drange_input+'b" onfocusout="valid_interval('+num_of_drange_input+', this)"> <button id="remove_drange'+num_of_drange_input+'" onclick="remove_drange('+num_of_drange_input+')">T</button></div>');
    num_of_drange_input++;
}
function remove_drange (num) {
    $("#drange"+num).remove();
}
function drange_remove () {
    $("#drange").remove();
}



var num_of_time_input = 1;
function time () {
    $("#main_form_body").append('<tr id="time" style=""><td class="search_label"><span style="font-weight:bold">Pick Time(s):</span></td><td class="search_parameter" id="time_input"><div id="0time"><input type="time" id="time0"> <button id="time_button" onclick="add_new_time()">+</button></div></td><td class="search_remove"><button onclick="time_remove()">Remove</button></td></tr>');
}
function add_new_time() {
    $("#time_input").append('<div id="'+num_of_time_input+'time"><input type="time" id="time'+num_of_time_input+'"> <button id="remove_time'+num_of_time_input+'" onclick="remove_time('+num_of_time_input+')">T</button></div>');
    num_of_time_input++;
}
function remove_time (num) {
    $("#"+num+"time").remove();
}
function time_remove () {
    $("#time").remove();
}



var num_of_trange_input = 1;
function trange () {
    $("#main_form_body").append('<tr id="trange" style=""><td class="search_label"><span style="font-weight:bold">Set Time Range(s):</span></td><td class="search_parameter" id="trange_input"><div id="trange0"><input type="time" id="trange0a"> to <input type="time" id="trange0b"> <button id="trange_button" onclick="add_new_trange()">+</button></div></td><td class="search_remove"><button onclick="trange_remove()">Remove</button></td></tr>');
}
function add_new_trange() {
    $("#trange_input").append('<div id="trange'+num_of_trange_input+'"><input type="time" id="trange'+num_of_trange_input+'a"> to <input type="time" id="trange'+num_of_trange_input+'b"> <button id="remove_trange'+num_of_trange_input+'" onclick="remove_trange('+num_of_trange_input+')">T</button></div>');
    num_of_trange_input++;
}
function remove_trange (num) {
    $("#trange"+num).remove();
}
function trange_remove () {
    $("#trange").remove();
}



function keywords () {
    $("#main_form_body").append('<tr id="keywords" style=""><td class="search_label" style="font-weight:bold; vertical-align:middle;">Search Keyword(s): </td><td class="search_parameter"><textarea rows="4" cols="50" style="width:400px;resize:none;" id="keywords_search" placeholder="Separate keywords by commas (do not use and/or) (Example: knife, bike, wallet)"></textarea></td><td class="search_remove"><button onclick="keywords_remove()">Remove</button></td></tr>');
}
function keywords_remove () {
    $("#keywords").remove();
}



function submit () {
    var form_info = {
        "type": [],
        "status": [],
        "date": [],
        "drange": [],
        "time": [],
        "trange": [],
        "keywords": []
    }

    var filters = $("#main_form_body").children();
    if (filters.length <= 1) {
        return;
    }
    
    for (i = 1; i < filters.length; i++) {
        if (filters[i].id == "type") {
            var types_chosen = $("#types").val();
            if (types_chosen.includes("")) {
                types_chosen.splice(types_chosen.indexOf(""), 1);
            }
            form_info["type"] = types_chosen;
        }
        else if (filters[i].id == "status") {
            var statuses_chosen = $("#statuses").val();
            if (statuses_chosen.includes("")) {
                statuses_chosen.splice(statuses_chosen.indexOf(""), 1);
            }
            form_info["status"] = statuses_chosen;
        }
        else if (filters[i].id == "date") {
            var dates_chosen = [];
            for (j = 0; j < num_of_date_input; j++) {
                if (document.getElementById("date"+j) != null) {
                    if (document.getElementById("date"+j).value != "") {
                        dates_chosen.push(new Date(document.getElementById("date"+j).value));
                    }
                }
            }
            form_info["date"] = dates_chosen;
        }
        else if (filters[i].id == "drange") {
            var drange_chosen = [];
            for (j = 0; j < num_of_drange_input; j++) {
                if (document.getElementById("drange"+j) != null) {
                    if (document.getElementById("drange"+j+"a").value != "" && document.getElementById("drange"+j+"b").value != "") {
                        drange_chosen.push([new Date(document.getElementById("drange"+j+"a").value), new Date(document.getElementById("drange"+j+"b").value)]);
                    }
                }
            }
            form_info["drange"] = drange_chosen;
        }
        else if (filters[i].id == "time") {
            var times_chosen = [];
            for (j = 0; j < num_of_time_input; j++) {
                if (document.getElementById("time"+j) != null) {
                    if (document.getElementById("time"+j).value != "") {
                        times_chosen.push(document.getElementById("time"+j).value);
                    }
                }
            }
            form_info["time"] = times_chosen;
        }
        else if (filters[i].id == "trange") {
            var trange_chosen = [];
            for (j = 0; j < num_of_trange_input; j++) {
                if (document.getElementById("trange"+j) != null) {
                    if (document.getElementById("trange"+j+"a").value != "" && document.getElementById("trange"+j+"b").value != "") {
                        trange_chosen.push([document.getElementById("trange"+j+"a").value, document.getElementById("trange"+j+"b").value]);
                    }
                }
            }
            form_info["trange"] = trange_chosen;
        }
        else if (filters[i].id == "keywords") {
            var keywords_entered = document.getElementById("keywords_search").value.split(",");
            for (i = 0; i < keywords_entered.length; i++) {
                keywords_entered[i] = keywords_entered[i].trim();
            }
            form_info["keywords"] = keywords_entered;
        }        
    }
    console.log(form_info);
}



function reset () {
    if (document.getElementById('type') != null) {
        type_remove();
    }    
    if (document.getElementById('status') != null) {
        status_remove();
    }    
    if (document.getElementById('date') != null) {
        date_remove();
    }    
    if (document.getElementById('drange') != null) {
        drange_remove();
    }    
    if (document.getElementById('time') != null) {
        time_remove();
    }    
    if (document.getElementById('trange') != null) {
        trange_remove();
    }    
    if (document.getElementById('keywords') != null) {
        keywords_remove();
    }    
}