let container=document.querySelectorAll('.carousel-item')
let group=document.querySelector('.carousel-inner')
console.log(container)
let init=0;
function Element( carouselId,youtube=true,id, x, y, z, ry,autoplay,cssPic) {

    this.x=x
    this.y=y
    this.z=z
    this.ry=ry
    const div = document.createElement( 'div' );

    let isActive=false;
    div.id=cssPic
    div.className=cssPic
    //div.style.transform = `rotate3d(${this.x},${this.y},${this.z},${this.ry}deg)`; //rotates deg around a vector (x,y,z)    
    div.addEventListener('click',()=>{
      isActive=!isActive
      console.log(div.id)
    })
    const iframe = document.createElement( 'iframe' );
    
    cssPic=='device'?iframe.className='iframe':cssPic=='tv'?iframe.className='iframeTv':cssPic=='gameboy'?
    iframe.className='iframeGB':cssPic=='gbo'?iframe.className='iframeGBO':iframe.className='iframeIphone'

    youtube?iframe.src = [ 'https://www.youtube.com/embed/', id, '?autoplay=0' ].join( '' ):iframe.src=id;
    
  
    div.appendChild(iframe)
    container[carouselId].appendChild(div)

    this.moveBack = ()=>{
     /*this.z/=1.1;
      div.style.transform=`scale(${this.z})`*/
      if(isActive){
        this.z-=100;
        div.style.transform= `perspective(1000px) translateZ(${this.z}px)`
      }
      return
      
    }
    this.moveFwd = ()=>{
      //this.z*=1.1;
      //div.style.transform=`scale(${this.z})`
      if(isActive){
        this.z+=100;
        div.style.transform= `perspective(1000px) translateZ(${this.z}px)`
      }
      return
      
    }

}

let playlist=[{name: 'Skream 99 Infinity', emded: '6nLiZzryT8A'},
  {name:'Tina Moore Tuff Jam',embed:null},
  {name: 'Dole & Kom Together one time Butch', embed:'ctyDMv5tigo'},
  {name:'Shades of rhythm- Hylo edit', embed:null},
  {name:'Tyreese -Criminal minds instrumental',embed:'tlCKXknvUSg'},
  {name:'Kiesza-Hideaway', embed:'Vnoz5uBEWOA'}


]
console.log(playlist[3].name)


//let vid1= new Element( 'jzDYPFNdI0Y', 0, 10, 1, 0,false,'tv'); //Neo Trinity
//Cjf5RmSYPXM
let vid1= new Element( 0,false,'', 0, 10, 1, 0,false,'tv')
let vid2= new Element( 1,true,'Cjf5RmSYPXM', 0, 10, 1, 0,false,'iphone') ;
let vid3 = new Element(2,false,'./Vids/BC1.mp4',0,10,1,0,false, 'device') 
//let v1=new Element( 'wBd4euHxP0w', 0, 10, 0, 0,false,'iphone')
let v2= new Element(3,true,'mZPJfU4ZiQY',0,10,10,0,false,'gameboy'); 
//let v3= new Element('ZqpRraPbZ-w',0,10,0,0,false,'gbo') 








document.onkeydown = function(e) { 
    //console.log(e.keyCode)
    e.preventDefault();
    if (e.keyCode === 37) {       // left
     console.log('left')
     init+=72;
     group.style.transform= `rotateY(${init}deg)`
     group.style.transition=`transform 0.8s ease`
    }
    else if (e.keyCode === 39) {  // 
      console.log('right')
      init-=72;
     group.style.transform= `rotateY(${init}deg)`
     group.style.transition=`transform 0.8s ease`
    }
    else if (e.keyCode == 38){ 
        console.log('up')
        vid1.moveFwd()
        vid2.moveFwd()
        vid3.moveFwd()
        v2.moveFwd()
  
        
    }
    else if (e.keyCode == 40){ 
        console.log('down')
        vid1.moveBack()
        vid2.moveBack()
        vid3.moveBack()
        v2.moveBack()
    
    }
}


let tv=document.getElementById("tv")
let tablet=document.getElementById('device')
let iphone=document.getElementById("iphone")
let gameboy=document.getElementById("gameboy")

// Make the DIV element draggable:


dragElement(tv);

dragElement(iphone);
dragElement(gameboy);
dragElement(tablet)

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





