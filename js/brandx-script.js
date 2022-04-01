var obj = {
    '8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d' : 'key1',
    '9G7-wafyUsNQ4y4pu41iiJ-NwDoZDAmBNel1YYxChnY' : 'key2',
    'BywnXD-Scg78p0TznWvf_BqaEzajemRtrCkAksy92FA' : 'key3',
    '9ad80b14098bcead9c7de952435e937cc3723ae61084ba8e729adb642daf0251' : 'key4'
}
  
const keys = Object.keys(obj)
const apiKey = keys[Math.floor(Math.random() * keys.length)]
// console.log(apiKey);

//1.Unsplash API and variable initial.
const count=90;
const apiURL=`https://api.unsplash.com/photos/random?query=fashion&client_id=${apiKey}&count=${count}`;
const imageContainerLeft = document.getElementById('image-containerLeft');
const imageContainerCenter = document.getElementById('image-containerCenter');
const imageContainerRight = document.getElementById('image-containerRight');
const imageContainerMobile = document.getElementById('image-container-mobile');
const loader= document.getElementById('loader');
let screenWidth=document.body.clientWidth;
let screenThreshold=1010;
console.log(screenWidth);
let photoArray=[]; //All Photo Array
let photoArrayL=[];//Photo Array for left container
let photoArrayC=[];//Photo Array for left container
let photoArrayR=[];//Photo Array for right container
let photoArrayM=[];//Photo Array for mobile device

//2.Enable/disable DIV for different device.
if(screenWidth>screenThreshold){
    document.getElementById("image-containerLeft").style.display="";
    document.getElementById("image-containerCenter").style.display="";
    document.getElementById("image-containerRight").style.display="";
    document.getElementById("image-container-mobile").style.display="none";
}else{
    document.getElementById("image-containerLeft").style.display="none";
    document.getElementById("image-containerCenter").style.display="none";
    document.getElementById("image-containerRight").style.display="none";
    document.getElementById("image-container-mobile").style.display="";
}

//5.1 Assembler Function
function elementAssembling(element,attribute){
    for (const key in attribute){
        element.setAttribute(key,attribute[key]);
    }
}

//5.Assemble element for large screen device
function displayPhotos(){
    photoArrayL.forEach((photo)=>{
        //create <a> to link to Unsplash
        const a_tag = document.createElement('a');
        const figure_elem = document.createElement('figure');
        const figcaption_elem = document.createElement('figcaption');
        elementAssembling(a_tag,{
        //a_tag.setAttribute('href', photo.links.html);
            href:photo.links.html+'?utm_source=fashion-infinite-gallery&utm_medium=referral',
            target:'_blank',
        });

        //create <img> for photo 
        const img_tag = document.createElement('img');
        const img_author = document.createTextNode(photo.user.name);
        elementAssembling(img_tag,{
        //img_tag.setAttribute('src', photo.urls.regular);
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        //Insert <img> into <a>,
        figure_elem.appendChild(img_tag);
        figure_elem.appendChild(figcaption_elem);
        figcaption_elem.appendChild(a_tag);
        a_tag.appendChild(img_author);
        //then insert the "finished" <a> into <div id="image-container"></div>
        imageContainerLeft.appendChild(figure_elem);
    });

    photoArrayC.forEach((photo)=>{
        const a_tag = document.createElement('a');
        const figure_elem = document.createElement('figure');
        const figcaption_elem = document.createElement('figcaption');
        elementAssembling(a_tag,{
            href:photo.links.html,
            target:'_blank',
        });

        const img_tag = document.createElement('img');
        const img_author = document.createTextNode(photo.user.name);
        elementAssembling(img_tag,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        figure_elem.appendChild(img_tag);
        figure_elem.appendChild(figcaption_elem);
        figcaption_elem.appendChild(a_tag);
        a_tag.appendChild(img_author);
        imageContainerCenter.appendChild(figure_elem);
    });

    photoArrayR.forEach((photo)=>{
        const a_tag = document.createElement('a');
        const figure_elem = document.createElement('figure');
        const figcaption_elem = document.createElement('figcaption');
        elementAssembling(a_tag,{
            href:photo.links.html,
            target:'_blank',
        });

        const img_tag = document.createElement('img');
        const img_author = document.createTextNode(photo.user.name);
        elementAssembling(img_tag,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        figure_elem.appendChild(img_tag);
        figure_elem.appendChild(figcaption_elem);
        figcaption_elem.appendChild(a_tag);
        a_tag.appendChild(img_author);
        imageContainerRight.appendChild(figure_elem);
    });
}

//5.Assemble element for mobile device
function mobilePhotos(){
    photoArrayM.forEach((photo)=>{
        const a_tag = document.createElement('a');
        const figure_elem = document.createElement('figure');
        const figcaption_elem = document.createElement('figcaption');
        elementAssembling(a_tag,{
            href:photo.links.html,
            target:'_blank',
        });

        const img_tag = document.createElement('img');
        const img_author = document.createTextNode(photo.user.name);
        elementAssembling(img_tag,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description
        });
        figure_elem.appendChild(img_tag);
        figure_elem.appendChild(figcaption_elem);
        figcaption_elem.appendChild(a_tag);
        a_tag.appendChild(img_author);
        imageContainerMobile.appendChild(figure_elem);
    });
}

//4.Get photo from Unsplash API, for mobile drvice.
async function getMobilePhotos(){
    try{
        const response= await fetch(apiURL);
        photoArrayM= await response.json();
        mobilePhotos();
    }catch(error){
        console.log('Error happen');
    }
}

//4.Get photo from Unsplash API, for large screen drvice.
async function getPhotos(){
    try{
        const response= await fetch(apiURL);
        photoArray= await response.json();
        let quaterLength=photoArray.length/3;
        let halfLength=photoArray.length/2;
        //Cut the photos array into half and fulfil the Left/Right container 
        for(let counter=0;counter<halfLength;counter++){
            photoArrayL.push(photoArray[counter]);
        }
        for(let counter=halfLength;counter<photoArray.length;counter++){
            photoArrayR.push(photoArray[counter]);
        }
        // for(let counter=0;counter<quaterLength;counter++){
        //     photoArrayL.push(photoArray[counter]);
        // }        
        // for(let counter=halfLength;counter<photoArray.length;counter++){
        //     photoArrayR.push(photoArray[counter]);
        // }
        for(let counter=3;counter<quaterLength+3;counter++){
            photoArrayC.push(photoArray[counter]);
        }
        displayPhotos();
    }catch(error){
        console.log('Error happen');
    }
}

//Infinite scroll effort
window.addEventListener('scroll',()=>{
//innerHeight is the height of viewport,it's determined by screen size
//and fixed once the page loaded.
//scrollY is how far the mouse scrolled.
//document.body.offsetHeight is the height of whole document(include the invisible part)
//So "window.innerHeight+window.scrollY" equal the current mileage on the page.
//"document.body.offsetHeight-1000" means there is 1000px to the bottom of the page,
//then it's time to load new page.
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight-8300){
        deviceRouter();
        console.log('Loading....');
    }
})

//3.router, by different type of device
function deviceRouter(){
if(screenWidth>screenThreshold)
    {getPhotos();
}else
    {getMobilePhotos();
}};

deviceRouter();
