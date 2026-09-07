const products = [
  {id:"raspberry", name:"Куст малины", price:3500, text:"Ваш куст в ягоднике. Урожай — ориентировочно с 2-го сезона.", image:"images/raspberry.svg"},
  {id:"currant", name:"Куст смородины", price:3200, text:"Чёрная смородина для варенья, пирогов и свежего урожая.", image:"images/currant.svg"},
  {id:"apple", name:"Яблоня", price:8500, text:"Молодая яблоня на участке. Следите за ростом дерева год за годом.", image:"images/apple.svg"},
  {id:"bed", name:"Грядка зелени", price:2500, text:"Персональная грядка с укропом, петрушкой, салатами и сезонной зеленью.", image:"images/greens.svg"},
  {id:"potato", name:"Грядка картошки", price:3000, text:"Небольшая картофельная грядка. Урожай собираем в конце сезона.", image:"images/potato.svg"},
  {id:"strawberry", name:"Грядка клубники", price:4200, text:"Сочная садовая клубника. Можно выбрать получение урожая или продажу.", image:"images/strawberry.svg"},
];

const cart = JSON.parse(localStorage.getItem("peno-cart") || "[]");
const money = n => new Intl.NumberFormat("ru-RU").format(n) + " ₽";

document.getElementById("products").innerHTML = products.map(p => `
  <article class="product">
    <div class="product-image" style="background-image:url('${p.image}')"></div>
    <div class="product-body">
      <p class="eyebrow">${p.id === "bed" || p.id === "potato" ? "Грядка" : "Посадка"}</p>
      <h3>${p.name}</h3><p>${p.text}</p>
      <div class="price">${money(p.price)}</div>
      <button onclick="addToCart('${p.id}')">Добавить</button>
    </div>
  </article>`).join("");

function addToCart(id){
  const p = products.find(x => x.id === id);
  cart.push(p);
  saveCart();
  renderCart();
  document.getElementById("cartModal").classList.add("open");
}
function saveCart(){localStorage.setItem("peno-cart", JSON.stringify(cart));document.getElementById("cartCount").textContent=cart.length}
function renderCart(){
  const el=document.getElementById("cartItems");
  if(!cart.length){el.innerHTML="<p>Корзина пока пуста.</p>";}
  else el.innerHTML=cart.map((p,i)=>`<div class="cart-row"><span>${p.name}</span><b>${money(p.price)}</b><button onclick="removeItem(${i})">×</button></div>`).join("");
  document.getElementById("cartTotal").textContent=money(cart.reduce((s,p)=>s+p.price,0));
}
function removeItem(i){cart.splice(i,1);saveCart();renderCart()}
function openModal(id){document.getElementById(id).classList.add("open")}
function closeModals(){document.querySelectorAll(".modal").forEach(m=>m.classList.remove("open"))}
document.getElementById("cartBtn").onclick=()=>openModal("cartModal");
document.getElementById("donateBtn").onclick=()=>openModal("donateModal");
document.querySelectorAll("[data-close]").forEach(x=>x.onclick=closeModals);

let donation=1000;
document.querySelectorAll("[data-donate]").forEach(b=>b.onclick=()=>{
  donation=Number(b.dataset.donate);
  document.querySelectorAll("[data-donate]").forEach(x=>x.classList.remove("selected"));
  b.classList.add("selected");
});
document.getElementById("checkoutBtn").onclick=()=>{
  alert("Демо-режим: здесь нужно вызвать ваш серверный endpoint создания платежа (например, /api/create-payment).");
};
document.getElementById("donatePay").onclick=()=>{
  alert("Демо-режим: здесь нужно вызвать ваш серверный endpoint пожертвования на сумму " + money(donation) + ".");
};
saveCart(); renderCart();
