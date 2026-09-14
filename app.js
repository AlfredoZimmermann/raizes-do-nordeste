const products=[
 {id:1,name:'Baião de Dois',desc:'Arroz, feijão-verde, queijo coalho e temperos da casa.',price:26.9,emoji:'🍛'},
 {id:2,name:'Carne de Sol',desc:'Carne de sol acebolada com macaxeira e manteiga de garrafa.',price:34.9,emoji:'🥩'},
 {id:3,name:'Cuscuz Recheado',desc:'Cuscuz de milho com queijo coalho e frango desfiado.',price:21.5,emoji:'🌽'},
 {id:4,name:'Escondidinho',desc:'Purê de macaxeira com carne seca e queijo gratinado.',price:29.9,emoji:'🥘'},
 {id:5,name:'Tapioca Nordestina',desc:'Tapioca com queijo coalho, tomate e orégano.',price:16.9,emoji:'🫓'},
 {id:6,name:'Cartola',desc:'Banana, queijo, açúcar e canela.',price:14.5,emoji:'🍌'}
];
let cart={}; let discount=0;
function money(v){return v.toLocaleString('pt-BR',{style:'currency',currency:'BRL'})}
function go(id){document.querySelectorAll('.screen').forEach(s=>s.classList.remove('active'));document.getElementById(id).classList.add('active');window.scrollTo({top:0,behavior:'smooth'});}
function showPolicy(){document.getElementById('modal').classList.remove('hidden')}
function closeModal(){document.getElementById('modal').classList.add('hidden')}
function acceptConsent(){if(!document.getElementById('consent').checked){document.getElementById('consentError').textContent='É necessário registrar o consentimento para continuar neste protótipo.';return;} document.getElementById('consentError').textContent='';go('screen-menu')}
function renderProducts(){document.getElementById('productGrid').innerHTML=products.map(p=>`<div class="card product"><div class="emoji">${p.emoji}</div><h3>${p.name}</h3><p>${p.desc}</p><div class="price"><strong>${money(p.price)}</strong><button class="btn small" onclick="add(${p.id})">Adicionar</button></div></div>`).join('')}
function add(id){cart[id]=(cart[id]||0)+1;updateCartBar()}
function updateCartBar(){const count=Object.values(cart).reduce((a,b)=>a+b,0);const total=products.reduce((s,p)=>s+(cart[p.id]||0)*p.price,0);document.getElementById('cartCount').textContent=`${count} ${count===1?'item':'itens'}`;document.getElementById('cartTotal').textContent=money(total)}
function goCart(){renderCart();go('screen-cart')}
function renderCart(){let html='';let subtotal=0;for(const p of products){const q=cart[p.id]||0;if(!q)continue;subtotal+=q*p.price;html+=`<div class="cart-line"><div><strong>${p.name}</strong><small>${q} x ${money(p.price)}</small></div><strong>${money(q*p.price)}</strong><button class="linkbtn" onclick="removeItem(${p.id})">Remover</button></div>`}if(!html)html='<p class="helper">Seu carrinho está vazio.</p>';document.getElementById('cartItems').innerHTML=html;const d=subtotal*discount;document.getElementById('subtotal').textContent=money(subtotal);document.getElementById('discount').textContent='- '+money(d);document.getElementById('grandTotal').textContent=money(subtotal-d);document.getElementById('payTotal').textContent=money(subtotal-d)}
function removeItem(id){delete cart[id];renderCart();updateCartBar()}
function applyCoupon(){const c=document.getElementById('coupon').value.trim().toUpperCase();if(c==='RAIZES10'){discount=.10;document.getElementById('couponMsg').textContent='Cupom aplicado: 10% de desconto.';}else{discount=0;document.getElementById('couponMsg').textContent='Cupom inválido ou expirado.';}renderCart()}
function goPayment(){if(Object.keys(cart).length===0){document.getElementById('couponMsg').textContent='Adicione pelo menos um item para continuar.';return;}renderCart();go('screen-payment')}
function simulateFailure(){document.getElementById('payMsg').textContent='Falha simulada: serviço externo indisponível. Nenhum pedido foi duplicado. Tente novamente.'}
function finishOrder(){document.getElementById('payMsg').textContent='';document.getElementById('orderNumber').textContent='Pedido #'+Math.floor(4300+Math.random()*500);go('screen-success')}
function newOrder(){cart={};discount=0;updateCartBar();go('screen-menu')}
function openOrders(){go('screen-orders')}
renderProducts();updateCartBar();
