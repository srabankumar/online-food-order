$(function() {
    
    /* login form validation*/
   
    
    

    
    
  $('form.require-validation').bind('submit', function(e) {
    var $form         = $(e.target).closest('form'),
        inputSelector = ['input[type=email]', 'input[type=password]',
                         'input[type=text]', 'input[type=file]',
                         'textarea'].join(', '),
        $inputs       = $form.find('.required').find(inputSelector),
        $errorMessage = $form.find('div.error'),
        valid         = true;

    $errorMessage.addClass('hide');
    $('.has-error').removeClass('has-error');
    function errorNotify(inputObj)
      {
                inputObj.parent().addClass('has-error');
        $errorMessage.removeClass('hide');
        e.preventDefault(); // cancel on first error
      
      }
      
      
      
    $inputs.each(function(i, el) {
        console.log($(el).siblings('label')[0].innerHTML);
      var $input = $(el);
      if ($input.val() === '')
      {
       errorNotify($input);
      }
        else
        {
            var labelName = $(el).siblings('label')[0].innerHTML;
            if(labelName)
            {
                   switch(labelName)
                   {
                   case 'Card Number':
                           if($input.val().length <16) errorNotify($input);break;
                   case 'Expiration':
                           if($input.val() == 0 || $input.val()>=13 || $input.val().length <2) errorNotify($input);break;
                   case 'CVV':
                           if($input.val().length <3) errorNotify($input);break;
                   case '&nbsp;':
                 if($input.val() <= 2016 ||  $input.val() >= 2030 || $input.val().length <4)errorNotify($input);break;
                           
                   }    
            }
            
        
         
                   

        }
    });
  });
});

