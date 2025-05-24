let container=document.getElementById('container')
console.log(container)

function Element( id, x, y, z, ry,autoplay=false,cssPic) {

    this.x=x
    this.y=y
    this.z=z
    this.ry=ry
    const div = document.createElement( 'div' );
    div.id=cssPic
    div.className=cssPic
    div.style.transform = `rotate3d(${this.x},${this.y},${this.z},${this.ry}deg)`; //rotates deg around a vector (x,y,z)    

    const iframe = document.createElement( 'iframe' );
    //cssPic=='device'?iframe.className='iframe':iframe.className='iframeTv'
    cssPic=='device'?iframe.className='iframe':cssPic=='tv'?iframe.className='iframeTv':cssPic=='gameboy'?iframe.className='iframeGB':iframe.className='iframeIphone'

    iframe.src = [ 'https://www.youtube.com/embed/', id, '?autoplay=1' ].join( '' );
    if (autoplay) iframe.allow='autoplay'
    div.appendChild(iframe)
    container.appendChild(div)
    this.rotateLeft= function (){
        this.ry-=10
        div.style.transform = `rotate3d(${this.x},${this.y},${this.z},${this.ry}deg)`;
    }
    this.rotateRight= function (){
        this.ry+=10
        div.style.transform = `rotate3d(${this.x},${this.y},${this.z},${this.ry}deg)`;
        
    }

}



//green writing below=comments= ignored
//let v1=new Element( 'pgGrQjYcm5A', 0, 200, 240, -90); //What is PI?
//let v2=new Element('JJMPDABlKWA', 500, 200, 240, 90 );


let vid1= new Element( 'jzDYPFNdI0Y', 0, 10, 0, -45,false,'tv'); 
let vid2= new Element( 'wBd4euHxP0w', 0, 10, 0, 45,false,'device') ;
let v1=new Element( 'pgGrQjYcm5A', 0, 10, 0, 0,false,'iphone')
let v2= new Element('JJMPDABlKWA',0,10,0,0,false,'gameboy')

//This is the Youtube videos embed code
// You can right click on a youtube vid & find the embed code there


document.onkeydown = function(e) { 
    //console.log(e.keyCode)
    e.preventDefault();
    if (e.keyCode === 37) {       // left
      console.log('left')
      vid1.rotateLeft()  
      vid2.rotateLeft()
      v1.rotateLeft()
      v2.rotateLeft()
      
      
    //This function above rotates the element when the left arrow is pressed 
    //the number 37 represents the UNICODE value in 
    //usually characters are stored either in Binary(powers of 2) or Hexadecimal (powers of 16)
    }
    else if (e.keyCode === 39) {  // 
      console.log('right')
      vid1.rotateRight()
      vid2.rotateRight()
      v1.rotateRight()
      v2.rotateRight()
      
      
    }
    else if (e.keyCode == 38){ 
        console.log('up')
  
        
    }
    else if (e.keyCode == 40){ 
        console.log('down')
        vid1.moveBack()
    
    }
}




// Make the DIV element draggable:
dragElement(document.getElementById("tv"));
dragElement(document.getElementById("device"));
dragElement(document.getElementById("iphone"));
dragElement(document.getElementById("gameboy"));

function dragElement(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id)) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id).onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
    elmnt.ontouchmove= dragMouseDown;
  }

  function dragMouseDown(e) {
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX||e.pageX;
    pos4 = e.clientY||e.pageY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
    document.addEventListener('touchmove', function (e) {
  //if one finger touch
  if(event.targetTouches.length == 1)
  {
     var touch = e.targetTouches[0];
    
    let xy=[touch.pageX,touch.pageY]
    console.log(xy)
     pos1 = pos3 - touch.pageX;
    pos2 = pos4 - touch.pageY;
    pos3 = touch.pageX;
    pos4 = touch.pageY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }
}, false);
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }


}





