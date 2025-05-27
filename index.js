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

    this.moveBack = ()=>{
      this.z/=1.1;
      div.style.transform= `scale(${this.z})`
    }
    this.moveFwd = ()=>{
      this.z*=1.1;
      div.style.transform= `scale(${this.z})`
    }

}



let vid1= new Element( 'jzDYPFNdI0Y', 0, 10, 1, 0,false,'tv'); 
let vid2= new Element( 'tCGmrFyXlGw', 0, 10, 0, 0,false,'device') ; //Pogo No Worries
let v1=new Element( 'wBd4euHxP0w', 0, 10, 0, 0,false,'iphone');//High contrast
let v2= new Element('LeBf0wh9n0E',0,10,0,0,false,'gameboy');//Monroe Emily Makis

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
        vid1.moveFwd()
  
        
    }
    else if (e.keyCode == 40){ 
        console.log('down')
        vid1.moveBack()
    
    }
}


let tv=document.getElementById("tv")
let tablet=document.getElementById("device")
let iphone=document.getElementById("iphone")
let gameboy=document.getElementById("gameboy")

// Make the DIV element draggable:
dragElement(tv);
dragElement(tablet);
dragElement(iphone);
dragElement(gameboy);

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
  if(e.targetTouches.length == 1)
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

// Helper function to calculate the distance between two touch points
function getDistance(touch1, touch2) {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
}


let initialDistance = 0;
let scale = 1;
document.addEventListener('touchstart', (event) => {
    if (event.touches.length === 2) {
        // Calculate the initial distance between two fingers
        initialDistance = getDistance(event.touches[0], event.touches[1]);
        
    }
});


document.addEventListener('touchmove', function (event) {
  
  
   if (event.touches.length === 2) {
         
        // Calculate the current distance between two fingers
        const currentDistance = getDistance(event.touches[0], event.touches[1]);
        console.log(initialDistance,currentDistance)
        
        // Calculate the scale factor
        scale = currentDistance / initialDistance;

        // Apply the scale transformation
        tv.style.transform = `scale(${scale/1},${scale/1})`;
        tablet.style.transform = `scale(${scale/1},${scale/1})`;
    }
}, false);





