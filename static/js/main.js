$(document).ready(function () {
    // Init
    $('.image-section').hide();
    $('.loader').hide();
    $('#result').hide();

    // Upload Preview
    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#multiFiles").change(function () {
        $('.image-section').show();
        $('#btn-predict').show();
        $('#result').text('');
        $('#result').hide();
        readURL(this);
    });

    // Predict
    $('#btn-predict').click(function () {
       var form_data = new FormData();
				var ins = document.getElementById('multiFiles').files.length;
				// alert(ins);
				if(ins == 0) {
					$('#msg').html('<span style="color:red">Select at least one file</span>');
					return;
				}
				
				for (var x = 0; x < ins; x++) {
					form_data.append("files", document.getElementById('multiFiles').files[x]);
				}
				
				// alert(form_data);
				// alert('ffff');
				
				$.ajax({
					url: '/flaskupload', // point to server-side URL
					// dataType: 'json', // what to expect back from server
					cache: false,
					contentType: false,
					processData: false,
					data: form_data,
					type: 'post',
					success: function (response) { // display success response
						alert('hiii');
						$('#msg').html('');
						$.each(response, function (key, data) {							
							if(key !== 'message') {
								$('#msg').append(key + ' -> ' + data + '<br/>');
							} else {
								$('#msg').append(data + '<br/>');
							}
						})
					},
					error: function (response) {
						$('#msg').html(response.message); // display error response
					}
				});
			
    });

});
