'use strict';
const rounds=25;
let clickTimes=0;
let firtProductIndex;
let secondProductIndex;
let thirdProductIndex;
let button=document.getElementById('btn');
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
// console.log(randomNumber(1,3));

let imageContainer =document.getElementById('imageContainer');
let firtProduct =document.getElementById('firstImage');
let secondProduct = document.getElementById('secondImage');
let thirdProduct =document.getElementById('thirdImage');
// console.log(firtProduct,secondProduct,thirdProduct);

const imageNames=['bag','banana','bathroom','boots','bubblegum','chair','cthulhu','dog-duck','dragon','pen','pet-sweep','scissors','shark','tauntaun','unicorn','breakfast','water-can','wine-glass']; //'sweep',//'usb',

function Products(name){
  this.name=name,
  this.path=`./img/${name}.jpg`,
  this.votes=0;
  this.show=0;
  Products.all.push(this);

}
Products.all=[];

for (let i = 0; i < imageNames.length; i++) {
  new Products(imageNames[i]);
}
// console.log(Products.all);

// console.log(randomNumber(0,imageNames.length));
function render(){
  firtProductIndex=randomNumber(0,imageNames.length-1);
  firtProduct.src=Products.all[firtProductIndex].path;
  firtProduct.alt=Products.all[firtProductIndex].name;
  firtProduct.title=Products.all[firtProductIndex].name;
  Products.all[firtProductIndex].show+=1;
  // console.log(firtProduct);
  // console.log(firtProductIndex);
  secondProductIndex=randomNumber(0,imageNames.length-1);
  while(secondProductIndex === firtProductIndex){
    secondProductIndex=randomNumber(0,imageNames.length-1);

  }
  secondProduct.src=Products.all[secondProductIndex].path;
  secondProduct.alt=Products.all[secondProductIndex].name;
  secondProduct.title=Products.all[secondProductIndex].name;
  Products.all[secondProductIndex].show+=1;
  // console.log(secondProductIndex);


  thirdProductIndex=randomNumber(0,imageNames.length-1);
  while(thirdProductIndex === firtProductIndex || thirdProductIndex===secondProductIndex ){
    thirdProductIndex=randomNumber(0,imageNames.length-1);
  }
  thirdProduct.src=Products.all[thirdProductIndex].path;
  thirdProduct.alt=Products.all[thirdProductIndex].name;
  thirdProduct.title=Products.all[thirdProductIndex].name;
  Products.all[thirdProductIndex].show+=1;
  // console.log(thirdProductIndex);
}
render();

imageContainer.addEventListener('click',handleClick);

function handleClick(event){
  // console.log(event.target);
  if(clickTimes<rounds){
    let selectedElement=event.target.id;

    if (selectedElement !== 'imageContainer'){
    // console.log(selectedElement);
      if(event.target.id === firtProduct.id)
      {
        Products.all[firtProductIndex].votes+=1;
        clickTimes++;
      }
      else if (event.target.id === secondProduct.id){
        Products.all[secondProductIndex].votes=+1;
        clickTimes++;
      }
      else if (event.target.id=== thirdProduct.id){
        Products.all[thirdProductIndex].votes=+1;
        clickTimes++;
      }
    // else{
    //   console.log('out of the range');
    // }
    }
    // console.log(clickTimes);
    // console.log(rounds);
    // console.table(Products.all);
    render();
  }
  if(clickTimes===rounds){
    // console.log('test');
    imageContainer.removeEventListener;
    button.style.display = 'block';
  }

}


button.addEventListener('click',renderTheResults);
function renderTheResults(){
  let ul=document.getElementById('resultUl');
  for (let i = 0; i < imageNames.length; i++) {
    console.log(`${Products.all[i].name} had ${Products.all[i].votes} Votes,and was seen ${Products.all[i].show} Times.`);
    let litextContent=`${Products.all[i].name} had ${Products.all[i].votes} Votes,and was seen ${Products.all[i].show} Times.`;
    let li=document.createElement('li');
    ul.appendChild(li);
    li.textContent=litextContent;


  }
  // console.log(`Total Rounds : ${clickTimes}` );
  let resultH1=document.createElement('h1');
  ul.appendChild(resultH1);
  resultH1.textContent=`Total Rounds : ${clickTimes}`;

}







// console.table(Products.all);
// if(clickTimes<=rounds){
//   console.log(clickTimes);
//   console.log(rounds);
//   console.table(Products.all);
//   render();
// }
