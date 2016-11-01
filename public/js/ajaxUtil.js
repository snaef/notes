;(function($) {

    function ajax(metod, url, data, headers) {
        return $.ajax({
            dataType: "json",
            contentType: "application/json",
            headers: headers,
            method: metod,
            url: url,
            data: JSON.stringify(data)
        }).done(function( data ) {
                if ( console && console.log ) {
                    console.log( "Sample of data:", data.slice( 0, 100 ) );
                }
            }).fail(function (jqXHR, textStatus) {
                alert( "Request failed: " + textStatus );
        });
    }
    window.ajax = { ajax : ajax };
}(jQuery));