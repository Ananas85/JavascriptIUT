var selection;
document.onmousemove = MouseMove;
document.onmousedown = pick;
document.onmouseup = checkCartContent;

function MouseMove(event) {
    var input = document.getElementById('coordonnes');
    input.value = event.clientX + ' px ' + event.clientY + ' px';
    if(typeof selection != 'undefined') {
        var s = selection.id;
        //On vérifie que ce soit une ball
        if (s.indexOf('b')>-1) {
            var mouseRect = selection.getBoundingClientRect();
            var centerH = event.clientY + (mouseRect.top - mouseRect.bottom) /2;
            var centerW = event.clientX - (mouseRect.right - mouseRect.left) /2;
            selection.style.position = 'absolute';
            selection.style.left = window.pageXOffset + centerW + 'px';
            selection.style.top = window.pageYOffset + centerH  + 'px';
        }
    }
}


function pick(ev)
{
    var imgs = document.getElementsByTagName('img');
    var i = 0;
    var trouve = false;
    while( i < imgs.length && !trouve){
        var rect = imgs[i].getBoundingClientRect();
        if (( rect.left < ev.clientX) & ( ev.clientX < rect.right) & (rect.top < ev.clientY) & (ev.clientY < rect.bottom))
        {
            selection = imgs[i];
            document.getElementById('current').value = selection.id;
            trouve = true;
            event.preventDefault();
        }
        i++;
    }

}

function checkCartContent(){
    if ( selection != null )
    {
        var cartRect = document.getElementById('cart').getBoundingClientRect();
        var selectRect = selection.getBoundingClientRect();
        if ( selectRect.left > cartRect.left && selectRect.right < cartRect.right && selectRect.top > cartRect.top && selectRect.bottom < cartRect.bottom ) {
            addInCart(selection.id);
            removeInCart('Aucun')
        } else { removeInCart(selection.id) }

        selection = null;
    }

}

function addInCart(id) {
    var select = document.getElementById('content');
    var option = document.createElement('option');
    option.text = id;
    select.add(option);


}

function removeInCart(id) {
    var select = document.getElementById('content');
    for( var i = 0; i < select.options.length; ++i){
        var option = select.options[i];
        if(option.text == id ) {
            select.removeChild(option);
        }
    }
    if ( select.options.length == 0 ){
        addInCart('Aucun');
    }

}