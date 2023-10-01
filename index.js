let count =0;
let fetchedTools =[];
let show1;
const loadData = async (show) => {
  let res = await fetch("https://openapi.programming-hero.com/api/ai/tools");
  let datas = await res.json();
  let alldata = datas.data.tools;
  // fetchedTools = datas.data.tools;
 
  allDataLoad(alldata,show);

};

const allDataLoad = (data,show) => {
  const container = document.getElementById("container");
  container.innerHTML ="";
  const showbtn = document.getElementById('showbtn');
  if(data.length>6){
    showbtn.classList.remove('hidden');
  }else{
    showbtn.classList.add('hidden')
  }

  if(!show){
    data = data.slice(0,7);
  }
if(show){
  showbtn.classList.add('hidden')
}

fetchedTools = data;

show1 = show;

  
  for (let item of data) {
    
    const div = document.createElement("div");
   
    div.innerHTML = ` <div class=" " >
    <div class="card w-[400px] h-[500px] bg-green-100 shadow-xl mb-6" onclick="showfeature('${item.id}')">
        <figure class="px-10 pt-10">
          <img src="${item.image}" alt="Shoes" class="rounded-xl" />
        </figure>
        <div class="card-body items-start text-left">
          <h2 class="card-title">Features</h2>
          <p>1. ${item.features[0]}</p>
          <p>2. ${item.features[1]}</p>
          <p>3. ${item.features[2]}</p>
          
        </div>
        <hr>
        <div class="items-start text-left p-4">
        <h2 class="card-title">${item.name}</h2>
        <p>${item.published_in}</p>
           
        </div>
      </div>
</div>`;
    container.appendChild(div);
    if (item.name == "Jasper Chat") {
      div.style.display = "none";
    }
    console.log(item)
  }
};

const showfeature = async (id) => {
  let res = await fetch(
    `https://openapi.programming-hero.com/api/ai/tool/${id}`
  );
  let datas = await res.json();
  let data = datas.data;
  showmodal(data);
  console.log(data);
};
const showall =(show) =>{
  loadData(true);
}

const showmodal = (item) =>{
  const section = document.getElementById('modaldiv');
  const div =document.createElement('div');
 
section.classList.remove('hidden');
div.textContent = '';
  div.innerHTML = `<div id="modal" class=" flex justify-center items-center gap-2 w-[700px] h-[500px] rounded-lg fixed top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%] bg-gray-300 ">
  <div class="px-6 py-4 flex flex-col justify-center items-center w-[350px] h-[400px] bg-red-100 rounded-md border-red-400 border-[1px]">
   <h1 class="text-lg font-bold mb-4">${item.description}</h1>
   <div class="flex justify-center items-center gap-2">
    <div class="w-[100px] h-[80px] rounded-md bg-white flex justify-center items-center">
     <p class="text-green-500 font-bold text-center">${item.pricing[0].price}<br>
       <span class="text-center">${item.pricing[0].plan}</span> </p>
    </div>
    <div class="w-[100px] h-[80px] rounded-md bg-white flex justify-center items-center">
        <p class="text-orange-500 font-bold text-center">${item.pricing[1].price}<br>
          <span class="text-center">${item.pricing[1].plan}</span> </p>
       </div>
       <div class="w-[100px] h-[80px] rounded-md bg-white flex justify-center items-center">
        <p class="text-red-500 font-bold text-center text-sm">${item.pricing[2].price} <br>
          <span class="text-center">${item.pricing[2].plan}</span> </p>
       </div>

   </div>
   <div class="flex gap-2 items-center justify-center mt-4">
    <div class="flex flex-col justify-center items-start ">
    
        <h1 class="font-semibold">Features</h1>
        <ul class="list-disc text-[12px] pl-2">
            <li>${item.features[1].feature_name}</li>
            <li>${item.features[2].feature_name}</li>
            <li>${item.features[3].feature_name}</li>
        </ul>
       </div>
       <div class="flex flex-col justify-center items-start pl-2">
    
        <h1 class="font-semibold">Integrations</h1>
        <ul class="list-disc text-[12px] pl-2">
            <li>${item.integrations[0]}</li>
            <li>${item.integrations[1]}</li>
            <li>${item.integrations[2]}</li>
        </ul>
       </div>
   </div>
   
  </div>
  <div class="w-[300px] h-[400px] bg-white rounded-md p-4 text-center">
   <img src="${item.image_link[0]}" class="rounded-lg" alt="">
   <h1 class="text-base font-bold mt-10 mb-4">Hi, how are you doing today?</h1>
   <p class="text-[12px]">I'm doing well, thank you for asking. How can I assist you today?</p>
  </div>
  <button class="btn btn-circle bg-red-300 absolute -top-[12px] -right-[22px]" onclick="closemodal()">
  <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" /></svg>
</button>

</div>`
section.appendChild(div);
  // console.log(i.id)
}

const closemodal =()=>{
  const section = document.getElementById('modaldiv');
  section.classList.add('hidden');
}
const sortByDate =() =>{
 let arr = fetchedTools.sort((a,b) =>{
  let date1 = a.published_in.split('/').join('-');
  let date2 =b.published_in.split('/').join('-');
  return new Date(date1) - new Date(date2);
})

  
allDataLoad(arr,show1);
console.log(arr);
}

loadData();