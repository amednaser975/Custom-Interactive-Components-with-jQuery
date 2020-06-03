$(document).ready(function(){
	var values =['hotmail.com' , 'gmail.com' , 'windoeslive.com' , 'swn-web' , 'phone.com'];
	var contanier = '';
	
	$('.ftherDiv').on('keyup','.textInput',function(e){
        
		if(e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13 && e.keyCode != 27){    
			contanier="";
			var valTrim = $('.textInput').val().trim();
			for(var x = 0 ; x<values.length ; x++){
				/**/
				if($('.textInput').val().indexOf('@') != -1){
					
					contanier='<li>'+valTrim+'</li>';
				}else{
					contanier+='<li>'+valTrim+'@'+values[x]+'</li>';
					
				}
				/**/
			}

			if(valTrim==""){
				$('ul').css({display:'none'}).children().remove();


			}else{
				$('ul').children().remove();
				$('ul').append(contanier).css({display:'block'});
				$('ul').children().eq(0).addClass('selected')
				

			}
		}else if(e.keyCode == 40){
			
			if($('ul').find('.selected').is(':last-child')){
				$('ul').children().eq(0).addClass('selected').siblings().removeClass('selected')
			}else{
				$('ul').find('.selected').next().addClass('selected').siblings().removeClass('selected');
				
			}
			
					
		}else if(e.keyCode == 38){
			if($('ul').find('.selected').is(':first-child')){
				$('ul').children().eq((values.length)-1).addClass('selected').siblings().removeClass('selected')
			}else{
				$('ul').find('.selected').prev().addClass('selected').siblings().removeClass('selected');
			
			}
			
		}else if(e.keyCode == 27){
			$('ul').css({display:'none'}).children().remove();

		}else if(e.keyCode == 13){
			if(!$('ul').is(":visible")){
				$('.textInput').blur()
			}else{
			var valSelected = $('ul .selected').text();
			$('.textInput').val(valSelected);
			$('ul').css({display:'none'}).children().remove();
				$('.textInput').blur()
			
			}
		}
		$('.textInput').click(function(){
			$(this).select()
		})
		
	});
	
	$('ul').on('click' , 'li' ,function(){
		$('.ftherDiv .textInput').val($(this).text()) ;
		$('ul').css({display:'none'}).children().remove();
	})
	$(document).on('click' , function(){
		$('ul').css({display:'none'}).children().remove();
	})
	
	
})