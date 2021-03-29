'use strict';
const rounds=25;
let clickTimes=0;
let previousIteration=[];
let votes=[];
let views=[];
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
  this.votes=0,
  this.show=0,
  Products.all.push(this);
}
Products.all=[];

for (let i = 0; i < imageNames.length; i++) {
  new Products(imageNames[i]);
}
// console.log(Products.all);

// console.log(randomNumber(0,imageNames.length));
function render(){
  // previousIteration=[];
  firtProductIndex=randomNumber(0,imageNames.length-1);
  previousIteration[0]=(firtProductIndex);
  firtProduct.src=Products.all[firtProductIndex].path;
  firtProduct.alt=Products.all[firtProductIndex].name;
  firtProduct.title=Products.all[firtProductIndex].name;
  Products.all[firtProductIndex].show+=1;
  /*---------------*/
  secondProductIndex=randomNumber(0,imageNames.length-1);
  while(secondProductIndex === firtProductIndex){
    secondProductIndex=randomNumber(0,imageNames.length-1);
  }
  previousIteration[1]=(secondProductIndex);
  secondProduct.src=Products.all[secondProductIndex].path;
  secondProduct.alt=Products.all[secondProductIndex].name;
  secondProduct.title=Products.all[secondProductIndex].name;
  Products.all[secondProductIndex].show+=1;
  // ---------------------------------
  thirdProductIndex=randomNumber(0,imageNames.length-1);
  while(thirdProductIndex === firtProductIndex || thirdProductIndex===secondProductIndex ){
    thirdProductIndex=randomNumber(0,imageNames.length-1);
  }
  previousIteration[2]=(thirdProductIndex);
  thirdProduct.src=Products.all[thirdProductIndex].path;
  thirdProduct.alt=Products.all[thirdProductIndex].name;
  thirdProduct.title=Products.all[thirdProductIndex].name;
  Products.all[thirdProductIndex].show+=1;
  // -------------------------------
}
render();
// console.log(previousIteration);

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
      // console.log(previousIteration);
      render();
    }
  }
  if(clickTimes===rounds){
    // console.log('test');
    imageContainer.removeEventListener;
    button.style.display = 'block';
  }

}


console.log(Products.all);
button.addEventListener('click',renderTheResults);
function renderTheResults(){
  let ul=document.getElementById('resultUl');
  for (let i = 0; i < imageNames.length; i++) {
    // console.log(`${Products.all[i].name} had ${Products.all[i].votes} Votes, And was seen ${Products.all[i].show} Times.`);
    let litextContent=`${Products.all[i].name} had ${Products.all[i].votes} Votes, And was seen ${Products.all[i].show} Times.`;
    votes.push(Products.all[i].votes);
    views.push(Products.all[i].show);
    let li=document.createElement('li');
    ul.appendChild(li);
    li.textContent=litextContent;


  }
  // console.log(`Total Rounds : ${clickTimes}` );
  let resultH1=document.createElement('h1');
  ul.appendChild(resultH1);
  resultH1.textContent=`Total Rounds : ${clickTimes}`;
  button.removeEventListener('click',renderTheResults);
  let canvasTag=document.getElementById('myChart');
  canvasTag.style.display = 'block';
  chartRender();

}
function chartRender() {
  let ctx = document.getElementById('myChart').getContext('2d');
  let chart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'bar',

    // The data for our dataset
    data: {
      labels: imageNames,
      datasets: [{
        label: 'Image votes',
        backgroundColor: 'red',
        borderColor: 'rgb(255, 99, 132)',
        data: votes
      },
      {
        label: 'Image views',
        backgroundColor: 'green',
        borderColor: 'rgb(255, 99, 132)',
        data: views
      }]
    },

    // Configuration options go here
    options: {}
  });
}
