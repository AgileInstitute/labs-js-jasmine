function onCountryChange(form) {
	$('.new_address_form', form).hide();
	var country = $("#countrySelect", form).val();
    if (country === "JP") {
        $('.address_jp', form).show();
    }
    else {
        $('.address_generic', form).show();
    }
}