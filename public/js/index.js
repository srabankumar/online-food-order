var totalBills = 0;
var userSelectionList = [];
  
/*login validation */


 function checkUser()
    {
        
       if(event.charCode>=48 && event.charCode<=57)
       {
         $('.error1').html("characters only");
          $('.error1').removeClass("hide");
         return false;
       }
        else
        {
            $('.error1').addClass("hide");
        }
    }
function login()
{

   var userName = $("#name").val();
    if(!userName)
    {
        $('.error1').html("Name is required");
        $('.error1').removeClass("hide");
        return false;
    }
}
    

/* login validation end */
    

   
    
 
/*if($("#total").val())
    {
        totalBills = parseInt($("#total").val(),10);
    }
else
    {
        totalBills = 0;
    }*/
if(sessionStorage.getItem('selection'))
{
 checkSelection();

}


function checkSelection()
{
    var Itemtemp = sessionStorage.getItem('selection');
    console.log(Itemtemp);
    var Items = Itemtemp.split(',');
   // console.log(typeof(Items));
    var labelName = $('.name').toArray();
    //console.log(labelName);
    labelName.forEach(function(label){
        Items.forEach(function(item){
            if(item === label.innerHTML)
                {
                    $(label).siblings('input').prop('checked',true);
                    calculateAmount($(label).siblings('input'));
                }
        })
    })
    
}

    /*$("#order").on('click',function(){
       var totalItems = $(".checkbox");
        
        
           for(var i = 0;i<totalItems.length;i++)
               {
                   var itemObj = $(totalItems[i]);
                if(itemObj.find('input').prop('checked'))
                    {
                        var itemPrice = parseInt(itemObj.find('label')[1].innerHTML,10);
                        totalBills+=itemPrice;
               
                    }
           
           
               }
        
       alert(totalBills);
        
    })*/
    
    function calculateAmount(obj)
    {
        console.log(obj);
        var userChoice = $(obj).prop('checked');
       // console.log($(obj).prop('checked'));
        //alert(typeof($("#total").val()))
        var itemName  = $(obj).closest('.checkbox').find('.name')[0].innerHTML;
// Regular exp to find price because we will get price with indian currency symbol
        var price = $(obj).closest('.checkbox').find('.price')[0].innerHTML.match(/[0-9]+/)[0]; 
        var itemPrice  = parseInt(price,10);
        if(userChoice)
            {
                userSelectionList.push(itemName);
                totalBills+=itemPrice;
            }
        else
            {
                       selectionIndex = userSelectionList.indexOf(itemName);
                       userSelectionList.splice(selectionIndex,1);
                        totalBills-=itemPrice;
                    
            }
         sessionStorage.setItem('selection',userSelectionList);
         
         $("#details").val(userSelectionList);
         $("#totalPrice").val(totalBills);
        
        //$('#total').val(totalBills);
        $('#total').html('&#8377;' + JSON.stringify(totalBills));
        //console.log($(price).innerHTML)
    }

    function submitOrder(e)
    {
        
        if(totalBills == 0)
            {
                
                alert("Please Select at least one Item");
                e.preventDefault();
                
            }
       
    }


function homeNavigation()
{
   sessionStorage.setItem('selection',null);
}


/*payment page script */

function checkCard(obj)
{
    //console.log(event.charCode);
   
    if(validationCheck(obj))
    {
   
               var breakPoints = [4,9,14] ;
        breakPoints.forEach(function(point)
                        {
    
                  if($(obj).val().length == point)
                    {
                          var cardNo = $(obj).val();
                         // console.log("working");
                        if(event.which!=8)
                        {
                          cardNo+="-" ;
                          $(obj).val(cardNo);
                        }
                          

                    }

    })
        
      
    }
    else
    {
      return false;
    }

}

/*var monthString = "";
function monthCheck(obj)
{
    //console.log(event.charCode);
   
    if(validationCheck(obj))
    {
        console.log(monthString);
        monthString += event.which;
        //console.log(monthString);
      
        if(monthString ==="9696" || monthString ==="4848")
        {
            if($(".error").length == 0)
            {
                
                $('<p style="color:red" class="error">Enter a Valid Month</p>').insertAfter($(obj));
                monthString = monthString.match(/[0-2]/);
                return false;
            }
        }
        
      
    }
    else
    {
      return false;
    }

}



function yearCheck(obj)
{
    //console.log(event.charCode);
   
    if(validationCheck(obj))
    {
   
      var year = parseInt($(obj).val(),10);
        if(year<=2016 || year>=2030)
        {
            if($(".error").length == 0)
            {
                $('<p style="color:red" class="error">Enter a Valid Year</p>').insertAfter($(obj));
                return false;
            }
        }
        
      
    }
    else
    {
      return false;
    }

}*/




function validationCheck(obj)
{
    var condition = (event.which >= 48 && event.which <= 57) || (event.which >= 96 && event.which <= 105 )|| event.which==8;
    if(!condition)
    {
    
       if($(".error").length == 0)
            {
                $('<p style="color:red" class="error">Numbers Only</p>').insertAfter($(obj))
            }
       
        //console.log($(obj));
       return false;
    
    
    }
    else
    {
      return true;
    }
        
}


function deleteErrorMsg(obj)
{
   $(".error").remove();
   
}



    
