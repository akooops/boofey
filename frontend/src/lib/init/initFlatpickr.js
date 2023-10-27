export function InitFlatPickr(){
    var flatpickrExamples = document.querySelectorAll("[data-provider]");
		flatpickrExamples.forEach(function (item) {
			if (item.getAttribute("data-provider") == "flatpickr") {
				var dateData = {};
				var isFlatpickerVal = item.attributes;
				if (isFlatpickerVal["data-date-format"])
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				if (isFlatpickerVal["data-enable-time"]) {
					(dateData.enableTime = true),
					(dateData.enableSeconds = true),
					(dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString() + " H:i:S");
				}
				if (isFlatpickerVal["data-altFormat"]) {
					(dateData.altInput = true),
					(dateData.altFormat = isFlatpickerVal["data-altFormat"].value.toString());
				}
				if (isFlatpickerVal["data-minDate"]) {
					dateData.minDate = isFlatpickerVal["data-minDate"].value.toString();
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-maxDate"]) {
					dateData.maxDate = isFlatpickerVal["data-maxDate"].value.toString();
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-deafult-date"]) {
					dateData.defaultDate = isFlatpickerVal["data-deafult-date"].value.toString();
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-multiple-date"]) {
					dateData.mode = "multiple";
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-range-date"]) {
					dateData.mode = "range";
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-inline-date"]) {
					(dateData.inline = true),
					(dateData.defaultDate = isFlatpickerVal["data-deafult-date"].value.toString());
					dateData.dateFormat = isFlatpickerVal["data-date-format"].value.toString();
				}
				if (isFlatpickerVal["data-disable-date"]) {
					var dates = [];
					dates.push(isFlatpickerVal["data-disable-date"].value);
					dateData.disable = dates.toString().split(",");
				}
				flatpickr(item, dateData);
			} else if (item.getAttribute("data-provider") == "timepickr") {
				var timeData = {};
				var isTimepickerVal = item.attributes;
				if (isTimepickerVal["data-time-basic"]) {
					(timeData.enableTime = true),
					(timeData.noCalendar = true),
					(timeData.dateFormat = "H:i");
				}
				if (isTimepickerVal["data-time-hrs"]) {
					(timeData.enableTime = true),
					(timeData.noCalendar = true),
					(timeData.dateFormat = "H:i"),
					(timeData.time_24hr = true);
				}
				if (isTimepickerVal["data-min-time"]) {
					(timeData.enableTime = true),
					(timeData.noCalendar = true),
					(timeData.dateFormat = "H:i"),
					(timeData.minTime = isTimepickerVal["data-min-time"].value.toString());
				}
				if (isTimepickerVal["data-max-time"]) {
					(timeData.enableTime = true),
					(timeData.noCalendar = true),
					(timeData.dateFormat = "H:i"),
					(timeData.minTime = isTimepickerVal["data-max-time"].value.toString());
				}
				if (isTimepickerVal["data-default-time"]) {
					(timeData.enableTime = true),
					(timeData.noCalendar = true),
					(timeData.dateFormat = "H:i"),
					(timeData.defaultDate = isTimepickerVal["data-default-time"].value.toString());
				}
				if (isTimepickerVal["data-time-inline"]) {
					(timeData.enableTime = true),
					(timeData.noCalendar = true),
					(timeData.defaultDate = isTimepickerVal["data-time-inline"].value.toString());
					timeData.inline = true;
				}
				flatpickr(item, timeData);
			}
		});
}


export function loadDefaultDate(node,date){
    let fp = node._flatpickr.setDate(date)
}

export function getDatesFromRange(range){
	let formattedStartDate
	let formattedEndDate
	if(range.includes("to")){
		const dateParts = range.split(" to ");
		
		
		const startDate = new Date(dateParts[0]);
		const endDate = new Date(dateParts[1]);
		
		formattedStartDate = startDate.toISOString().split('T')[0];
		formattedEndDate = endDate.toISOString().split('T')[0];
	}else {
		let date = new Date(range)
		formattedStartDate = date.toISOString().split('T')[0];
		formattedEndDate = formattedStartDate
	}

	return [formattedStartDate, formattedEndDate];

}