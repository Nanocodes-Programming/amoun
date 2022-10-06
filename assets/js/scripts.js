$(function(){

    if( $('input[type="range"]').length  > 0) {
        for (let e of document.querySelectorAll('input[type="range"].slider-progress')) {
            e.style.setProperty('--value', e.value);
            e.style.setProperty('--min', e.min == '' ? '0' : e.min);
            e.style.setProperty('--max', e.max == '' ? '100' : e.max);
            e.addEventListener('input', () => e.style.setProperty('--value', e.value));
        }

        var slider = document.getElementsByClassName("slider-progress");

        // Update the current slider value (each time you drag the slider handle)
        slider.oninput = function() {
            // $('.deposit_amount_block h4 i').html(this.value);
        }

    }

    $('.styled-slider').on('input', function () {
        $(this).closest('.right_mining').find('.value_mine span').html($(this).val());
    });

    // CUSTOM SELECT

    $(".custom_select").click(function(e){
        e.preventDefault();
        $(this).find('.menu_select').toggle();
    });

    $(document).mouseup(function (e) {
        var container = $(".menu_select");
        if (container.has(e.target).length === 0){
            container.hide();
        }
    });

    $(".menu_select li").click(function(e){
        e.preventDefault();
        var value = $(this).attr('data-val');
        var name = $(this).attr('data-name');
        var html = $(this).find('span').html();

        $(this).closest(".custom_select").find('.custom_item span').html( name );
        $(this).closest(".custom_select").find('.image_select img').attr('src', '/assets/assets/img/currency/'+value+'.svg');
        if( $(this).closest(".custom_select").attr('data-set') != 'false'  ){
            $(this).closest(".custom_select").find('input').val( value );
        }
    });

    
    $('.home_animation').each(function( index ) {
        let counter = $( this );

        let interval = setInterval(function(){
            let currentCount = parseFloat(counter.text());
            let newCount = currentCount+parseFloat((Math.random() * (0.0001 - 0.1500) + 0.1500));

            counter.text(newCount.toFixed(4));
        }, 500);

    });
    
    $('.comma_valid').keyup(function(){
        let val = $(this).val();
        let newVal = val.replace(/,/g, '.');
        $(this).val(newVal);
    });

    $('#calc_days, #calc_amount').keyup(function() {
        calculator();
    });

    $(".calc_invest_cur .menu_select li").click(function(e){
        e.preventDefault();
        calculator();
    });    
    
    $(".calc_mining_cur .menu_select li").click(function(e){
        e.preventDefault();
        calculator();
    });

    $('#supportForm').submit(function(event) {
		event.preventDefault();

		let returnBlock = $('#return_support');
		returnBlock.hide();
		returnBlock.html('');
		returnBlock.removeClass('alert-error alert-success');

		$.ajax({
		  url: $(this).attr('action'),
		  data: $(this).serialize(),
		  type: 'POST',
		  success: function (data) {
			returnBlock.addClass(data.class);
			returnBlock.html(data.message);
			returnBlock.show();
			
			setTimeout(function(){
			  document.location.reload();
			}, 2000);
		  },
		  error: function(data){
			console.log(data);
		  }
		});
	});

    $('#register-form').on('submit', function(e){
        e.preventDefault();
        
        $('.error-validation').hide();
        $('.error-validation').html('');

		$.ajax({
			url: $(this).attr('action'),
			data: $(this).serialize(),
			type: 'POST',
			success: function (data) {
			  location.href = '/wallet'
			},
			error: function(data){
                Object.entries(data.responseJSON.errors).forEach(([key, value]) => {
               
                    $('#regError_'+key).show();
                    $('#regError_'+key).html(value);
                });
			
			}
		});
    });
    
    $('#login-form').on('submit', function(e){
        e.preventDefault();

        $('.error-validation').hide();
        $('.error-validation').html('');

		$.ajax({
			url: $(this).attr('action'),
			data: $(this).serialize(),
			type: 'POST',
			success: function (data) {
			  location.href = '/wallet'
			},
			error: function(data){
			  Object.entries(data.responseJSON.errors).forEach(([key, value]) => {
               
                $('#loginError_'+key).show();
                $('#loginError_'+key).html(value);
			  });
			}
		});
    });

    $('.exchange_button').click(function(e){
        e.preventDefault();
    
        let conf = confirm("Are you sure you want to exchange?");
    
        if(conf == true){
            let currency = $(this).data('currency');
        
            $.ajax({
                url: '/ajax/deposit/exchangeCurrency',
                data: {
                    currency: currency
                },
                type: 'POST',
                headers: {
                    'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
                },
                success: function (data) {
                    if(data.status == 'success'){
                        $('#confirm_true').css('display', 'flex');
                        $('#confirm_true .conf_text').html(data.message);
    
                        setTimeout(function() { 
                            $('#confirm_true').css('display', 'none');
                            $('#confirm_true .conf_text').html('');
                            document.location.reload();
                        }, 2000);
                    }else{
                        $('#confirm_false').css('display', 'flex');
                        $('#confirm_false .conf_text').html(data.message);
    
                        setTimeout(function() { 
                            $('#confirm_false').css('display', 'none');
                            $('#confirm_false .conf_text').html('');
                        }, 2000);
                    }
                }
            });
        }
        
        
    });
    
    setInterval(function() { counter(); }, 1000);
    
    $('.range_mining').change(function() {
        const currencies = ['ltc', 'xlm', 'doge', 'zcash', 'btc', 'bch', 'dash', 'trx', 'eth', 'xrp'];
    
        let rangeInput = $(this);
    
        if(rangeInput.data('type') == 'scrypt'){
            let countAll= 0;
            $('.range_scrypt').each(function( index ) {
                if($(rangeInput).attr('id') != $(this).attr('id')){
                countAll = parseInt(countAll) + parseInt($(this).val());
                }
            });
            if((parseInt($(rangeInput).val()) + parseInt(countAll)) > 100){
                $(rangeInput).val(100-countAll)
            }
        }
    
        if(rangeInput.data('type') == 'sha256'){
            let countAll= 0;
            $('.range_sha256').each(function( index ) {
                if($(rangeInput).attr('id') != $(this).attr('id')){
                countAll = parseInt(countAll) + parseInt($(this).val());
                }
            });
            if((parseInt($(rangeInput).val()) + parseInt(countAll)) > 100){
                $(rangeInput).val(100-countAll)
            }
        }
    
        if(rangeInput.data('type') == 'ethash'){
            let countAll= 0;
            $('.range_ethash').each(function( index ) {
                if($(rangeInput).attr('id') != $(this).attr('id')){
                countAll = parseInt(countAll) + parseInt($(this).val());
                }
            });
            if((parseInt($(rangeInput).val()) + parseInt(countAll)) > 100){
                $(rangeInput).val(100-countAll)
            }
        }
        
        
        $(this).closest('.mining_block').find('.range-numb').html($(this).val());
        
        instokPercent();
    
        let ajaxData = {
            '_token': $('meta[name="csrf-token"]').attr('content'),
        };
    
        currencies.forEach(function(currency){
            ajaxData[currency] = parseInt($('#rng_'+currency).val());
        });
    
        //console.log(ajaxData);
        
        $.ajax({
            url: '/ajax/mining/saveMining',
            data: ajaxData,
            type: 'POST',
            success: function (data) {
                if(data.status == 'success'){
                    $('#confirm_true').css('display', 'flex');
                    $('#confirm_true .conf_text').html(data.message);
    
                    setTimeout(function() { 
                        $('#confirm_true').css('display', 'none');
                        $('#confirm_true .conf_text').html('');
                    }, 2000);
                }else{
                    $('#confirm_false').css('display', 'flex');
                    $('#confirm_false .conf_text').html(data.message);
    
                    setTimeout(function() { 
                        $('#confirm_false').css('display', 'none');
                        $('#confirm_false .conf_text').html('');
                    }, 2000);
                }
            
                currencies.forEach(function(currency){
                    $('#paySecond_'+currency).val(data.mining.payInSecond[currency]);
                });
    
            }
        });
        
    });

    $('.deposit_button').on('click', function(e){
        e.preventDefault();
        let currency = $(this).data('currency');
  
        if(currency != 'usd'){
          $('.modal_address_'+currency).val('Loading...');
          $('.modal_tag_'+currency).val('Loading...');
  
          $.ajax({
            url: '/ajax/deposit/createDepositAddress',
            data: {
              'currency': currency,
              '_token': $('meta[name="csrf-token"]').attr('content'),
            },
            type: 'POST',
            success: function (data) {
              $('.modal_address_'+currency).val(data.address);
              $('.modal_tag_'+currency).val(data.tag);
            }
          });
        }
  
        $('.m_modal').hide();
        $('.modal_over').show();
        $('.m_modal_'+currency).show();
    });


    $('.modal_over, .m_modal_close').on('click', function(){
        $('.modal_over').hide();
        $('.m_modal').hide();
    });

    $('.deposit_form').submit(function(event) {
        event.preventDefault();
    
    
        let returnBlock = $(this).find('.return_deposit');
        returnBlock.html('');
        returnBlock.hide();
        returnBlock.removeClass('alert-error alert-success');
    
        $.ajax({
        url: $(this).attr('action'),
        data: $(this).serialize(),
        type: 'POST',
        success: function (data) {
            if(data.status == 'success'){
                location.href = data.url;
            }else{
                returnBlock.addClass(data.class);
                returnBlock.html(data.message);
                returnBlock.show();
            }
            
        },
        error: function(data){
            console.log(data);
        }
        });
    });

    $('.show_withdraw_fotm').on('click', function(){
        let name = $(this).data('name');
        let iso = $(this).data('iso');

        $('#withdrawCurrency').val(iso);
        $('#withdrawImg').attr('src', '/assets/assets/img/currency/'+iso+'.svg');
        $('#withdrawName').html(name);

        if(iso == 'xlm' || iso == 'xrp'){
            $('.tag_block').show();
        }else{
            $('.tag_block').hide();
        }

        if(iso == 'usd'){
            $('#withdraw_paysystem').val('perfectmoney');
        }else{
            $('#withdraw_paysystem').val(iso);
        }
    });

    
    $(".withdraw_select .menu_select li").click(function(e){
        e.preventDefault();
        
        var value = $(this).attr('data-val');

        if(value == 'xlm' || value == 'xrp'){
            $('.tag_block').show();
        }else{
            $('.tag_block').hide();
        }

        if(value == 'usd'){
            $('#withdraw_paysystem').val('perfectmoney');
        }else{
            $('#withdraw_paysystem').val(value);
        }
    });

    $('#withdraw_form').submit(function(event) {
        event.preventDefault();
    
        let returnBlock = $(this).find('.wihdraw_return');
        returnBlock.html('');
        returnBlock.hide(); 
        returnBlock.removeClass('alert-error alert-success');
        
        let withBut = $(this).find('.submit_withdraw');
        withBut.prop( "disabled", true );
    
        $.ajax({
            url: $(this).attr('action'),
            data: $(this).serialize(),
            type: 'POST',
            success: function (data) {
    
                if(data.status == 'error'){
                    returnBlock.addClass(data.class);
                    returnBlock.html(data.message);
                    returnBlock.show();
                }else{
                    $(".modal-block").hide();
                    $(".modal").css("display", "flex");
                    $('.modal-withdraw-seccessful').css("display", "block");
    
                    setTimeout(function(){
                        location.reload();
                    }, 2000);
                }
    
                withBut.prop( "disabled", false );
            }
        });
    });

    $('#accountChangePassword').submit(function(event) {
        event.preventDefault();
        let returnBlock = $('#accountChangePassword_return');
        returnBlock.hide();
        returnBlock.html('');
        returnBlock.removeClass('alert-error alert-success');
    
        $.ajax({
            url: $(this).attr('action'),
            data: $(this).serialize(),
            type: 'POST',
            success: function (data) {
                returnBlock.addClass(data.class);
                returnBlock.html(data.message);
                returnBlock.show();
            },
            error: function(data){
                console.log(data);
            }
        });
    });

    $(".order_select .menu_select li").click(function(e){
        e.preventDefault();
        let value = $(this).attr('data-val');
        let form = $(this).closest('#order_form');

        $('.order_balance').hide();
        $('.order_balance_'+value).show();

        buyCalculator(form);
    });

    $('#order_amount').on('keyup', function(){
        let form = $(this).closest('#order_form');
        buyCalculator(form);
    });

    $('.order_tab').on('click', function(){
        let type = $(this).data('type');
        $('.buy_type').val(type);
    });


    $('#order_form').submit(function(e){
        e.preventDefault();

        let type = $(this).find('.buy_type');

        let returnBlock = $('.order_return');
        returnBlock.html('');
        returnBlock.hide(); 
        returnBlock.removeClass('alert-error alert-success');

        $.ajax({
            url: '/ajax/ajaxOrder',
            data: $(this).serialize(), 
            type: 'POST',
            success: function (data) {
                returnBlock.addClass(data.class);
                returnBlock.html(data.message);
                returnBlock.show();

                if(data.status != 'error'){
                    setTimeout(function(){
                        document.location.reload();
                    }, 2000);
                }
            }
        });
    });
});



function buyCalculator(form){
    $.ajax({
        url: '/ajax/calcBuy',
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        data: $(form).serialize(),
        dataType: 'json',
        type: 'POST',
        success: function (data) {
            $('#buy_purchScrypt').html(parseFloat(data.scrypt.purchased).toFixed(2));
            $('#buy_totalScrypt').html(parseFloat(data.scrypt.total).toFixed(2));
            $('#buy_percentScrypt').html(parseFloat(data.scrypt.percent).toFixed(1));
  
            $('#buy_purchSha256').html(parseFloat(data.sha256.purchased).toFixed(2));
            $('#buy_totalSha256').html(parseFloat(data.sha256.total).toFixed(2));
            $('#buy_percentSha256').html(parseFloat(data.sha256.percent).toFixed(1));
  
            $('#buy_purchEthash').html(parseFloat(data.ethash.purchased).toFixed(2));
            $('#buy_totalEthash').html(parseFloat(data.ethash.total).toFixed(2));
            $('#buy_percentEthash').html(parseFloat(data.ethash.percent).toFixed(1));
  
        }
    });
}

function copy(id, button) {
    let copyText = document.querySelector(id);
    copyText.select();
    document.execCommand("copy");
  
    console.log(button);
    button.innerText = 'Copied';
}


function counter(){
    $('.pay_in_second').each(function( index ) {
      if($(this).val() > 0){
        let numb = $(this).closest('.mining_block').find( ".mining_numb" );
        let newCount = parseFloat($(numb).text()) + parseFloat($(this).val());
        $(numb).text(newCount.toFixed(12));
        
      }
    });
}

function instokPercent(){
    let countScrypt = 0;
    $('.range_scrypt').each(function( index ) {
        countScrypt = parseInt(countScrypt) + parseInt($(this).val());
    });
    $('#hs_used_scrypt').html(countScrypt);
    $('#hs_instock_scrypt').html(100 - countScrypt);

    let countSha256 = 0;
    $('.range_sha256').each(function( index ) {
        countSha256 = parseInt(countSha256) + parseInt($(this).val());
    });
    $('#hs_used_sha256').html(countSha256);
    $('#hs_instock_sha256').html(100 - countSha256);

    let countEthash = 0;
    $('.range_ethash').each(function( index ) {
        countEthash = parseInt(countEthash) + parseInt($(this).val());
    });
    $('#hs_used_ethash').html(countEthash);
    $('#hs_instock_ethash').html(100 - countEthash);
}


function calculator(){
    $.ajax({
        url: '/ajax/calculator/calculate',
        type: "POST",
        //dataType: 'json',
        data: $('#calculatorForm').serialize(),
        headers: {
            'X-CSRF-Token': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (data) {
            $('.calc_return').html(data);
        }
    });
}