
const vipNumbers = [
{
number:"98765 11111",
operator:"Jio",
price:"₹15,000",
status:"Available"
},
{
number:"98765 22222",
operator:"Airtel",
price:"₹12,000",
status:"Available"
},
{
number:"98765 33333",
operator:"Jio",
price:"₹18,000",
status:"Available"
},
{
number:"98765 44444",
operator:"Vi",
price:"₹9,999",
status:"Available"
},
{
number:"98765 55555",
operator:"BSNL",
price:"₹7,999",
status:"Available"
},
{
number:"98765 786786",
operator:"Jio",
price:"₹25,000",
status:"Featured"
}
];

const container = document.getElementById("numbers");

function showNumbers(list){
container.innerHTML="";

list.forEach(item=>{

container.innerHTML += `
<div class="card">
<h2>${item.number}</h2>

<p><b>Operator:</b> ${item.operator}</p>

<p><b>Price:</b> ${item.price}</p>

<p><b>Status:</b> ${item.status}</p>

<a class="buy-btn"
href="https://wa.me/918070424242?text=I want VIP Number ${item.number}">
Book Now
</a>

</div>
`;

});

}

showNumbers(vipNumbers);
function searchNumber(){

const text=document
.getElementById("searchBox")
.value
.toLowerCase();

const result = vipNumbers.filter(item =>
item.number.replace(/\s/g,"").includes(text.replace(/\s/g,""))
);

showNumbers(result);

}
